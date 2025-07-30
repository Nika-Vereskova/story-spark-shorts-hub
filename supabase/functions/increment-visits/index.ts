
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    if (Deno.env.get('NODE_ENV') === 'development') {
      console.log('Attempting to increment visit counter...')
    }

    // First, try to get the current count and increment it
    const { data: currentData, error: selectError } = await supabase
      .from('site_metrics')
      .select('total_visits')
      .eq('id', 'global')
      .single()

    if (selectError) {
      console.error('Error selecting current visits:', selectError)
      // If no record exists, create one
      const { data: insertData, error: insertError } = await supabase
        .from('site_metrics')
        .insert({ id: 'global', total_visits: 1 })
        .select('total_visits')
        .single()

      if (insertError) {
        console.error('Error inserting initial record:', insertError)
        return new Response(
          JSON.stringify({ error: 'Failed to create initial record' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      return new Response(
        JSON.stringify({ total_visits: insertData.total_visits }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Increment the counter
    const newCount = (currentData.total_visits || 0) + 1
    const { data: updateData, error: updateError } = await supabase
      .from('site_metrics')
      .update({ 
        total_visits: newCount,
        updated_at: new Date().toISOString()
      })
      .eq('id', 'global')
      .select('total_visits')
      .single()

    if (updateError) {
      console.error('Error updating visits:', updateError)
      return new Response(
        JSON.stringify({ error: 'Failed to increment visits' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (Deno.env.get('NODE_ENV') === 'development') {
      console.log('Successfully incremented visits to:', updateData.total_visits)
    }

    return new Response(
      JSON.stringify({ total_visits: updateData.total_visits }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
