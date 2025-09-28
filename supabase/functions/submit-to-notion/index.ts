import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const NOTION_API_KEY = Deno.env.get('NOTION_API_KEY');
const NOTION_DATABASE_ID = Deno.env.get('NOTION_DATABASE_ID');

interface FormData {
  name: string;
  email: string;
  organization?: string;
  message: string;
  serviceType: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }

  // Check for required environment variables
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.error('Missing required environment variables');
    return new Response(
      JSON.stringify({ error: 'Server configuration error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }

  try {
    const formData: FormData = await req.json();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, email, and message are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Prepare data for Notion
    const notionData = {
      parent: {
        database_id: NOTION_DATABASE_ID
      },
      properties: {
        'Name': {
          title: [
            {
              text: {
                content: formData.name
              }
            }
          ]
        },
        'Email': {
          email: formData.email
        },
        'Organization': {
          rich_text: [
            {
              text: {
                content: formData.organization || 'Not specified'
              }
            }
          ]
        },
        'Message': {
          rich_text: [
            {
              text: {
                content: formData.message
              }
            }
          ]
        },
        'Service Type': {
          select: {
            name: formData.serviceType || 'Education Service'
          }
        },
        'Status': {
          select: {
            name: 'New'
          }
        },
        'Submitted At': {
          date: {
            start: new Date().toISOString()
          }
        }
      }
    };

    console.log('Submitting to Notion:', { name: formData.name, email: formData.email });

    // Submit to Notion API
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify(notionData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Notion API error:', response.status, errorText);
      throw new Error(`Notion API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Successfully submitted to Notion:', result.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully',
        notionPageId: result.id 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in submit-to-notion function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to submit form',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});