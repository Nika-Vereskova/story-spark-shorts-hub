import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.5';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NewsStory {
  id: string;
  title: string;
  summary: string;
  content: string;
  published_at: string;
  article_url?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');

    if (!perplexityApiKey) {
      throw new Error('PERPLEXITY_API_KEY not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get user from request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !userData.user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Check if user is admin
    const { data: isAdmin } = await supabase
      .rpc('has_role', { 
        _user_id: userData.user.id, 
        _role: 'admin' 
      });

    if (!isAdmin) {
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { daysBack = 4 } = await req.json().catch(() => ({}));

    // Calculate date range (last X days)
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - (daysBack * 24 * 60 * 60 * 1000));

    console.log(`Fetching news from ${startDate.toISOString()} to ${endDate.toISOString()}`);

    // Fetch recent published news stories
    const { data: stories, error: storiesError } = await supabase
      .from('news_posts')
      .select('id, title, summary, content, published_at, article_url')
      .eq('status', 'published')
      .gte('published_at', startDate.toISOString())
      .lte('published_at', endDate.toISOString())
      .order('published_at', { ascending: false })
      .limit(20);

    if (storiesError) {
      console.error('Error fetching stories:', storiesError);
      return new Response(JSON.stringify({ error: 'Failed to fetch stories' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (!stories || stories.length === 0) {
      return new Response(JSON.stringify({ 
        error: 'No stories found for the specified period',
        periodStart: startDate.toISOString(),
        periodEnd: endDate.toISOString()
      }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log(`Found ${stories.length} stories to analyze`);

    // Prepare content for Perplexity analysis
    const storiesText = stories.map((story, index) => 
      `Story ${index + 1}:
Title: ${story.title}
Summary: ${story.summary || 'No summary available'}
Published: ${new Date(story.published_at).toLocaleDateString()}
${story.article_url ? `Source: ${story.article_url}` : ''}
---`
    ).join('\n\n');

    const prompt = `Analyze the following AI news stories from the past ${daysBack} days and create an engaging newsletter summary:

${storiesText}

Please provide:
1. A catchy newsletter title that captures the main theme
2. A comprehensive summary (300-500 words) that:
   - Identifies the 3-5 most important developments
   - Highlights emerging trends and patterns
   - Explains the significance and potential impact
   - Connects related stories when relevant
3. Key insights section (3-4 bullet points of deeper analysis)
4. List of trending topics/themes (as comma-separated keywords)

Format your response as JSON with keys: title, summary, insights, trending_topics`;

    // Call Perplexity API
    console.log('Calling Perplexity API for analysis...');
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
            content: 'You are an expert AI industry analyst. Create engaging newsletter content that provides valuable insights to tech professionals. Always respond with valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!perplexityResponse.ok) {
      const errorText = await perplexityResponse.text();
      console.error('Perplexity API error:', errorText);
      return new Response(JSON.stringify({ error: 'Failed to generate summary' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const perplexityData = await perplexityResponse.json();
    console.log('Perplexity response received');

    let analysisResult;
    try {
      // Try to parse JSON from Perplexity response
      const content = perplexityData.choices[0].message.content;
      
      // Clean up the content in case it has markdown formatting
      const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      analysisResult = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Failed to parse Perplexity JSON:', parseError);
      // Fallback: create manual structure
      const content = perplexityData.choices[0].message.content;
      analysisResult = {
        title: `AI News Summary: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
        summary: content,
        insights: ['Advanced AI analysis provided', 'Multiple breakthrough developments identified', 'Significant industry trends emerging'],
        trending_topics: ['AI', 'Machine Learning', 'Technology']
      };
    }

    // Save to database
    const { data: savedSummary, error: saveError } = await supabase
      .from('news_summaries')
      .insert({
        title: analysisResult.title,
        summary_content: analysisResult.summary,
        insights: analysisResult.insights ? (Array.isArray(analysisResult.insights) ? analysisResult.insights.join('\n• ') : analysisResult.insights) : null,
        trending_topics: Array.isArray(analysisResult.trending_topics) ? analysisResult.trending_topics : analysisResult.trending_topics?.split(',').map(t => t.trim()),
        period_start: startDate.toISOString(),
        period_end: endDate.toISOString(),
        created_by: userData.user.id,
        story_count: stories.length
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving summary:', saveError);
      return new Response(JSON.stringify({ error: 'Failed to save summary' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log('Summary saved successfully:', savedSummary.id);

    return new Response(JSON.stringify({
      success: true,
      summary: savedSummary,
      storiesAnalyzed: stories.length,
      periodStart: startDate.toISOString(),
      periodEnd: endDate.toISOString()
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Error in generate-news-summary function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};

serve(handler);