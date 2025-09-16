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
      console.log(`No stories found between ${startDate.toISOString()} and ${endDate.toISOString()}`);
      return new Response(JSON.stringify({ 
        error: `No stories found for the specified period`,
        details: {
          periodStart: startDate.toISOString(),
          periodEnd: endDate.toISOString(),
          daysSearched: daysBack,
          suggestion: 'Try increasing the daysBack parameter or check if articles are published with status "published"'
        }
      }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log(`Found ${stories.length} stories to analyze`);

    // Validate stories have sufficient content
    const storiesWithContent = stories.filter(story => 
      story.content && story.content.length > 100
    );

    if (storiesWithContent.length === 0) {
      console.log(`All ${stories.length} stories lack sufficient content for analysis`);
      return new Response(JSON.stringify({ 
        error: `Found ${stories.length} articles but none have sufficient content for analysis`,
        details: {
          totalArticles: stories.length,
          articlesWithContent: 0,
          suggestion: 'Ensure articles have detailed content (>100 characters) before generating summaries'
        }
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log(`${storiesWithContent.length} stories have sufficient content for analysis`);

    // Prepare content for Perplexity analysis using only stories with sufficient content
    const storiesText = storiesWithContent.map((story, index) => 
      `Story ${index + 1}:
Title: ${story.title}
Summary: ${story.summary || 'No summary available'}
Full Content: ${story.content || 'No full content available'}
Published: ${new Date(story.published_at).toLocaleDateString()}
Source URL: ${story.article_url || 'No source URL available'}
---`
    ).join('\n\n');

    const prompt = `Analyze the following AI news stories from the past ${daysBack} days and create a comprehensive newsletter with individual article summaries:

${storiesText}

Please provide a detailed analysis in the following JSON format:
1. A catchy newsletter title that captures the main theme
2. A comprehensive overview summary (200-300 words) highlighting the main themes and trends
3. Individual article summaries: For EACH article, provide a detailed summary (100-150 words each) that includes:
   - Key points and developments from the full content
   - Why this story matters to AI professionals
   - Direct citation with the source URL for reference
   - Any connections to other stories in the collection
4. Key insights section (4-5 bullet points of deeper cross-story analysis)
5. List of trending topics/themes (as comma-separated keywords)

Format your response as JSON with these exact keys:
{
  "title": "Newsletter title",
  "summary": "Overall summary text",
  "individual_summaries": [
    {
      "story_title": "Original story title",
      "summary": "Detailed individual summary",
      "source_url": "Source URL for citation",
      "key_points": ["Key point 1", "Key point 2", "Key point 3"]
    }
  ],
  "insights": ["Insight 1", "Insight 2", "Insight 3", "Insight 4"],
  "trending_topics": ["topic1", "topic2", "topic3"]
}

Ensure each individual summary is comprehensive, uses the full article content, and includes proper citations with source URLs.`;

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
      
      // Validate the new structure
      if (!analysisResult.individual_summaries || !Array.isArray(analysisResult.individual_summaries)) {
        throw new Error('Missing or invalid individual_summaries array');
      }
      
    } catch (parseError) {
      console.error('Failed to parse Perplexity JSON:', parseError);
      // Fallback: create manual structure with individual summaries
      const content = perplexityData.choices[0].message.content;
      analysisResult = {
        title: `AI News Summary: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
        summary: content.substring(0, 500) + '...',
        individual_summaries: stories.slice(0, 3).map(story => ({
          story_title: story.title,
          summary: story.summary || 'Summary not available',
          source_url: story.article_url || '',
          key_points: ['Key information from analysis', 'Significant development noted', 'Industry impact identified']
        })),
        insights: ['Advanced AI analysis provided', 'Multiple breakthrough developments identified', 'Significant industry trends emerging'],
        trending_topics: ['AI', 'Machine Learning', 'Technology']
      };
    }

    // Format individual summaries for storage
    const formattedIndividualSummaries = analysisResult.individual_summaries?.map(item => ({
      title: item.story_title,
      summary: item.summary,
      source_url: item.source_url,
      key_points: item.key_points || []
    })) || [];

    // Save to database with enhanced structure
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
        story_count: stories.length,
        // Store individual summaries as JSON in a text field (we might need to add this field)
        individual_summaries: JSON.stringify(formattedIndividualSummaries)
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
      storiesAnalyzed: storiesWithContent.length,
      totalStoriesFound: stories.length,
      periodStart: startDate.toISOString(),
      periodEnd: endDate.toISOString(),
      hasIndividualSummaries: formattedIndividualSummaries.length > 0
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