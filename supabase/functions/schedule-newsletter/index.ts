import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.5';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = new Date();
  const requestId = crypto.randomUUID().substring(0, 8);
  
  console.log('=== NEWSLETTER AUTOMATION STARTED ===');
  console.log(`Request ID: ${requestId}`);
  console.log(`Timestamp: ${startTime.toISOString()}`);
  console.log(`Request method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  
  // Parse request body for debugging
  let requestBody = {};
  try {
    const text = await req.text();
    if (text) {
      requestBody = JSON.parse(text);
      console.log(`Request body:`, JSON.stringify(requestBody));
    }
  } catch (e) {
    console.log('No JSON body or invalid JSON, proceeding with empty body');
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');

    // Validate required environment variables
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing required Supabase environment variables');
      return new Response(JSON.stringify({ 
        error: 'Server configuration error - missing Supabase credentials',
        timestamp: new Date().toISOString()
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (!perplexityApiKey) {
      console.error('Missing Perplexity API key');
      return new Response(JSON.stringify({ 
        error: 'Server configuration error - missing Perplexity API key',
        timestamp: new Date().toISOString()
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Newsletter scheduler triggered at:', new Date().toISOString());

    // Check if today is Tuesday (2) or Friday (5)
    const today = new Date();
    const dayOfWeek = today.getDay();
    
    if (dayOfWeek !== 2 && dayOfWeek !== 5) {
      console.log(`Today is not Tuesday or Friday (day: ${dayOfWeek}), skipping newsletter`);
      return new Response(JSON.stringify({ 
        message: 'Not a newsletter day',
        dayOfWeek,
        date: today.toISOString(),
        skipped: true 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log(`Newsletter day detected (day: ${dayOfWeek}) at ${today.toISOString()}, proceeding...`);

    // Step 1: Generate news summary
    console.log('Step 1: Generating news summary...');
    const summaryResponse = await supabase.functions.invoke('generate-news-summary', {
      body: { daysBack: 4 }, // Analyze last 4 days
      headers: {
        'x-automated-call': 'true', // Flag for service-to-service call
        'Content-Type': 'application/json'
      }
    });

    if (summaryResponse.error) {
      console.error('Failed to generate summary:', summaryResponse.error);
      console.error('Summary response details:', JSON.stringify(summaryResponse, null, 2));
      return new Response(JSON.stringify({ 
        error: 'Failed to generate news summary',
        details: summaryResponse.error,
        timestamp: new Date().toISOString(),
        step: 'generate-news-summary'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const summaryData = summaryResponse.data;
    console.log('Summary generation response:', JSON.stringify(summaryData, null, 2));
    
    if (!summaryData.success) {
      console.error('Summary generation unsuccessful:', summaryData);
      return new Response(JSON.stringify({ 
        error: 'Summary generation was not successful',
        details: summaryData,
        step: 'validate-summary-response'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const summaryId = summaryData.summary.id;
    console.log('Summary generated successfully with ID:', summaryId);

    // Step 2: Generate and send newsletter using the summary
    console.log('Step 2: Generating newsletter with summary ID:', summaryId);
    const newsletterResponse = await supabase.functions.invoke('generate-newsletter', {
      body: { 
        useSummary: true,
        summaryId: summaryId,
        triggerZapier: false // Don't trigger Zapier from automated flow
      }
    });

    if (newsletterResponse.error) {
      console.error('Failed to generate newsletter:', newsletterResponse.error);
      console.error('Newsletter response details:', JSON.stringify(newsletterResponse, null, 2));
      return new Response(JSON.stringify({ 
        error: 'Failed to generate newsletter',
        details: newsletterResponse.error,
        summaryId: summaryId,
        timestamp: new Date().toISOString(),
        step: 'generate-newsletter'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const newsletterData = newsletterResponse.data;
    console.log('Newsletter generated successfully, proceeding to send...');
    console.log('Newsletter data:', JSON.stringify({ subject: newsletterData.subject, contentLength: newsletterData.content?.length }));

    // Step 3: Send the newsletter
    console.log('Step 3: Sending newsletter to subscribers...');
    const sendResponse = await supabase.functions.invoke('send-newsletter', {
      body: {
        subject: newsletterData.subject,
        content: newsletterData.content,
        htmlContent: newsletterData.htmlContent
      }
    });

    if (sendResponse.error) {
      console.error('Failed to send newsletter:', sendResponse.error);
      console.error('Send response details:', JSON.stringify(sendResponse, null, 2));
      return new Response(JSON.stringify({ 
        error: 'Failed to send newsletter',
        details: sendResponse.error,
        summaryId: summaryId,
        timestamp: new Date().toISOString(),
        step: 'send-newsletter'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Step 4: Mark summary as sent
    console.log('Step 4: Marking summary as sent...');
    const { error: updateError } = await supabase
      .from('news_summaries')
      .update({ newsletter_sent: true })
      .eq('id', summaryId);

    if (updateError) {
      console.error('Failed to update summary status:', updateError);
      // This is not critical, so we don't fail the whole process
    } else {
      console.log('Summary marked as sent successfully');
    }

    const sendData = sendResponse.data;
    const completionSummary = {
      summaryId,
      emailsSent: sendData.emailsSent || 0,
      errors: sendData.errors || [],
      completedAt: new Date().toISOString(),
      dayOfWeek,
      automatedRun: true
    };
    
    console.log('=== NEWSLETTER AUTOMATION COMPLETED SUCCESSFULLY ===');
    console.log('Completion summary:', JSON.stringify(completionSummary, null, 2));

    return new Response(JSON.stringify({
      success: true,
      message: 'Newsletter automation completed successfully',
      dayOfWeek,
      summaryId,
      emailsSent: sendData.emailsSent || 0,
      errors: sendData.errors || [],
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Error in schedule-newsletter function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};

serve(handler);