import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting AI news extraction process...');
    
    const { prompt, autoPublish = false, maxArticles = 3 } = await req.json();
    
    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!perplexityApiKey) {
      throw new Error('Perplexity API key not configured');
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

    // Default search prompt if none provided
    const searchPrompt = prompt || `Find the latest 3 AI and technology news stories from today. Include stories about:
    - AI model releases and updates
    - ChatGPT and OpenAI developments  
    - Tech industry AI adoption
    - AI research breakthroughs
    - Machine learning innovations
    - AI policy and regulations
    
    For each story, provide:
    1. A compelling headline (under 80 characters)
    2. A brief summary (2-3 sentences)
    3. Full article content (300-500 words)
    4. Publication date
    5. Original source URL if available
    6. SEO-friendly slug
    7. Meta description (under 160 characters)
    
    Format as JSON with an array of articles.`;

    console.log('Calling Perplexity API with prompt:', searchPrompt);

    // Call Perplexity API
    const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are an expert AI news curator. Extract the latest AI and technology news and format them as JSON articles with proper structure for a news website.'
          },
          {
            role: 'user',
            content: searchPrompt
          }
        ],
        temperature: 0.2,
        max_tokens: 4000,
        top_p: 0.9,
        return_images: false,
        return_related_questions: false,
        search_recency_filter: 'day',
        frequency_penalty: 1,
        presence_penalty: 0
      }),
    });

    if (!perplexityResponse.ok) {
      const errorText = await perplexityResponse.text();
      console.error('Perplexity API error:', errorText);
      throw new Error(`Perplexity API error: ${perplexityResponse.status} - ${errorText}`);
    }

    const perplexityData = await perplexityResponse.json();
    console.log('Perplexity API response received');

    let aiContent = perplexityData.choices[0].message.content;
    
    // Try to extract JSON from the response
    let articles;
    try {
      // Look for JSON in the response
      const jsonMatch = aiContent.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        articles = JSON.parse(jsonMatch[0]);
      } else {
        // If no JSON array found, try to parse the whole response
        articles = JSON.parse(aiContent);
      }
    } catch (parseError) {
      console.log('Failed to parse as JSON, creating structured articles from text');
      // If JSON parsing fails, create a single article from the content
      articles = [{
        title: "Latest AI News Digest",
        content: aiContent,
        summary: aiContent.substring(0, 200) + "...",
        slug: "ai-news-digest-" + new Date().toISOString().split('T')[0],
        meta_description: "Stay updated with the latest AI and technology news",
        source_url: null
      }];
    }

    console.log(`Processing ${articles.length} articles`);

    // Process and insert articles into database
    const insertedArticles = [];
    const maxToProcess = Math.min(articles.length, maxArticles);

    for (let i = 0; i < maxToProcess; i++) {
      const article = articles[i];
      
      // Generate slug if not provided
      const slug = article.slug || article.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Check if article with this slug already exists
      const { data: existingArticle } = await supabase
        .from('news_posts')
        .select('id')
        .eq('slug', slug)
        .single();

      if (existingArticle) {
        console.log(`Article with slug ${slug} already exists, skipping`);
        continue;
      }

      const articleData = {
        title: article.title || `AI News Update ${i + 1}`,
        slug: slug,
        content: article.content || article.summary || aiContent,
        summary: article.summary || article.content?.substring(0, 200) + "..." || "Latest AI news update",
        status: autoPublish ? 'published' : 'draft',
        source: 'perplexity',
        extraction_prompt: searchPrompt,
        article_url: article.source_url || article.url || null,
        meta_description: article.meta_description || article.summary?.substring(0, 160) || "Latest AI and technology news",
        published_at: autoPublish ? new Date().toISOString() : null,
      };

      console.log('Inserting article:', articleData.title);

      const { data: insertedArticle, error: insertError } = await supabase
        .from('news_posts')
        .insert([articleData])
        .select()
        .single();

      if (insertError) {
        console.error('Error inserting article:', insertError);
        throw insertError;
      }

      insertedArticles.push(insertedArticle);
    }

    console.log(`Successfully processed ${insertedArticles.length} articles`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully extracted and processed ${insertedArticles.length} news articles`,
        articles: insertedArticles,
        status: autoPublish ? 'published' : 'draft'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in extract-ai-news function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});