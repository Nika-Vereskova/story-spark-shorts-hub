
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
      return new Response(
        `<html><body><h1>Invalid confirmation link</h1><p>The confirmation token is missing.</p></body></html>`,
        { 
          status: 400, 
          headers: { "Content-Type": "text/html", ...corsHeaders } 
        }
      );
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
      return new Response(
        `<html><body><h1>Error</h1><p>Failed to confirm subscription. Please try again.</p><p>Error: ${error.message}</p></body></html>`,
        { 
          status: 500, 
          headers: { "Content-Type": "text/html", ...corsHeaders } 
        }
      );
    }

    console.log("Database update result:", data);

    if (!data || data.length === 0) {
      console.log("No rows updated - subscription may already be confirmed or token invalid");
      return new Response(
        `<html><body><h1>Already Confirmed</h1><p>This email is already confirmed or the link is invalid.</p></body></html>`,
        { 
          status: 200, 
          headers: { "Content-Type": "text/html", ...corsHeaders } 
        }
      );
    }

    console.log(`Successfully confirmed subscription: ${data[0].email}`);

    // Get the correct redirect URL - check for custom domain or use the request origin
    const requestUrl = new URL(req.url);
    const redirectUrl = `${requestUrl.protocol}//${requestUrl.host}/newsletter-confirmed`;
    
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
    return new Response(
      `<html><body><h1>Error</h1><p>An unexpected error occurred: ${error.message}</p></body></html>`,
      { 
        status: 500, 
        headers: { "Content-Type": "text/html", ...corsHeaders } 
      }
    );
  }
};

serve(handler);
