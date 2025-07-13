
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Newsletter confirmation function called");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    console.log("Confirmation token received:", token);

    if (!token) {
      console.error("Missing confirmation token");
      const redirectUrl = `${url.protocol}//${url.host}/newsletter-confirmed?error=missing_token`;
      return new Response(null, {
        status: 302,
        headers: {
          "Location": redirectUrl,
          ...corsHeaders
        }
      });
    }

    // Initialize Supabase client with service role key for admin operations
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    console.log("Attempting to confirm subscription with token:", token);

    // Update subscriber status to confirmed
    const { data, error } = await supabaseClient
      .from('newsletter_subscribers')
      .update({ 
        is_confirmed: true, 
        confirmed_at: new Date().toISOString() 
      })
      .eq('confirmation_token', token)
      .eq('is_confirmed', false)
      .select('email');

    if (error) {
      console.error('Error confirming subscription:', error);
      const redirectUrl = `${url.protocol}//${url.host}/newsletter-confirmed?error=database_error`;
      return new Response(null, {
        status: 302,
        headers: {
          "Location": redirectUrl,
          ...corsHeaders
        }
      });
    }

    console.log("Database update result:", data);

    if (!data || data.length === 0) {
      console.log("No rows updated - subscription may already be confirmed or token invalid");
      const redirectUrl = `${url.protocol}//${url.host}/newsletter-confirmed?error=invalid_token`;
      return new Response(null, {
        status: 302,
        headers: {
          "Location": redirectUrl,
          ...corsHeaders
        }
      });
    }

    console.log(`Successfully confirmed subscription: ${data[0].email}`);

    // Successful confirmation redirect
    const redirectUrl = `${url.protocol}//${url.host}/newsletter-confirmed?success=true`;
    
    console.log("Redirecting to:", redirectUrl);
    
    return new Response(null, {
      status: 302,
      headers: {
        "Location": redirectUrl,
        ...corsHeaders
      }
    });

  } catch (error: any) {
    console.error("Error in newsletter confirmation function:", error);
    const url = new URL(req.url);
    const redirectUrl = `${url.protocol}//${url.host}/newsletter-confirmed?error=server_error`;
    return new Response(null, {
      status: 302,
      headers: {
        "Location": redirectUrl,
        ...corsHeaders
      }
    });
  }
};

serve(handler);
