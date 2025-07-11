
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

    console.log('Attempting to increment visit counter...')

    // Use upsert to either insert or update the record
    const { data, error } = await supabase
      .from('site_metrics')
      .upsert(
        { 
          id: 'global', 
          total_visits: 1,
          updated_at: new Date().toISOString()
        },
        { 
          onConflict: 'id',
          ignoreDuplicates: false
        }
      )
      .select('total_visits')
      .single()

    if (error) {
      console.error('Upsert failed, trying manual increment:', error)
      
      // If upsert fails, try to increment manually
      const { data: currentData, error: selectError } = await supabase
        .from('site_metrics')
        .select('total_visits')
        .eq('id', 'global')
        .maybeSingle()

      if (selectError) {
        console.error('Error selecting current visits:', selectError)
        return new Response(
          JSON.stringify({ error: 'Database query failed' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      const currentCount = currentData?.total_visits || 0
      const newCount = currentCount + 1

      if (!currentData) {
        // Insert new record
        const { data: insertData, error: insertError } = await supabase
          .from('site_metrics')
          .insert({ id: 'global', total_visits: newCount })
          .select('total_visits')
          .single()

        if (insertError) {
          console.error('Error inserting record:', insertError)
          return new Response(
            JSON.stringify({ error: 'Failed to create record' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )
        }

        console.log('Successfully created record with visits:', insertData.total_visits)
        return new Response(
          JSON.stringify({ total_visits: insertData.total_visits }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      } else {
        // Update existing record
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

        console.log('Successfully incremented visits to:', updateData.total_visits)
        return new Response(
          JSON.stringify({ total_visits: updateData.total_visits }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }
    }

    console.log('Successfully upserted visits to:', data.total_visits)
    return new Response(
      JSON.stringify({ total_visits: data.total_visits }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
