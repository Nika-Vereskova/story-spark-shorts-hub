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
    const { articleId, action = 'publish' } = await req.json();

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

    console.log(`Processing article ${articleId} with action: ${action}`);

    // Get the article
    const { data: article, error: fetchError } = await supabase
      .from('news_posts')
      .select('*')
      .eq('id', articleId)
      .single();

    if (fetchError || !article) {
      throw new Error('Article not found');
    }

    let updateData: any = {};

    switch (action) {
      case 'publish':
        updateData = {
          status: 'published',
          published_at: new Date().toISOString()
        };
        break;

      case 'archive':
        updateData = {
          status: 'archived'
        };
        break;

      case 'draft':
        updateData = {
          status: 'draft',
          published_at: null
        };
        break;

      case 'enhance':
        // Use Perplexity to enhance the content
        const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');
        
        if (!perplexityApiKey) {
          throw new Error('Perplexity API key not configured');
        }

        const enhancePrompt = `Please enhance and improve this news article content while keeping it factual and accurate:

Title: ${article.title}
Current Content: ${article.content}

Please provide:
1. Enhanced and better structured content (400-600 words)
2. Improved summary (2-3 sentences)
3. Better SEO meta description (under 160 characters)
4. Relevant keywords for SEO

Return as JSON with fields: enhanced_content, improved_summary, meta_description, keywords`;

        const enhanceResponse = await fetch('https://api.perplexity.ai/chat/completions', {
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
                content: 'You are an expert content editor. Enhance news articles while maintaining accuracy and improving readability.'
              },
              {
                role: 'user',
                content: enhancePrompt
              }
            ],
            temperature: 0.3,
            max_tokens: 2000,
          }),
        });

        if (!enhanceResponse.ok) {
          const errorText = await enhanceResponse.text();
          console.error('Perplexity API error:', enhanceResponse.status, errorText);
          throw new Error(`Perplexity API error: ${enhanceResponse.status} - ${errorText}`);
        }

        const enhanceData = await enhanceResponse.json();

        if (!enhanceData.choices || !enhanceData.choices[0]?.message?.content) {
          throw new Error('Unexpected Perplexity response format');
        }

        const enhancedContent = enhanceData.choices[0].message.content;

        try {
          const cleaned = enhancedContent.replace(/```json\n?/g, '').replace(/```/g, '').trim();
          const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            updateData = {
              content: parsed.enhanced_content || article.content,
              summary: parsed.improved_summary || article.summary,
              meta_description: parsed.meta_description || article.meta_description,
              meta_keywords: parsed.keywords ? (Array.isArray(parsed.keywords) ? parsed.keywords : parsed.keywords.split(',').map((k: string) => k.trim())) : article.meta_keywords
            };
          }
        } catch (parseError) {
          // If parsing fails, just use the enhanced content as is
          updateData = {
            content: enhancedContent
          };
        }
        break;

      default:
        throw new Error('Invalid action specified');
    }

    // Update the article
    const { data: updatedArticle, error: updateError } = await supabase
      .from('news_posts')
      .update(updateData)
      .eq('id', articleId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating article:', updateError);
      throw updateError;
    }

    console.log(`Article ${articleId} successfully processed with action: ${action}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Article ${action}ed successfully`,
        article: updatedArticle
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in process-news-content function:', error);
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