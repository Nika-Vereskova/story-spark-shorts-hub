
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (Deno.env.get('NODE_ENV') === 'development') {
    console.log("Unsubscribe function called");
  }

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return new Response(
        `<html><body><h1>Invalid unsubscribe link</h1><p>The unsubscribe token is missing.</p></body></html>`,
        { 
          status: 400, 
          headers: { "Content-Type": "text/html", ...corsHeaders } 
        }
      );
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Update subscriber status to inactive
    const { data, error } = await supabaseClient
      .from('newsletter_subscribers')
      .update({ is_active: false })
      .eq('unsubscribe_token', token)
      .eq('is_active', true)
      .select('email');

    if (error) {
      console.error('Error unsubscribing:', error);
      return new Response(
        `<html><body><h1>Error</h1><p>Failed to unsubscribe. Please try again.</p></body></html>`,
        { 
          status: 500, 
          headers: { "Content-Type": "text/html", ...corsHeaders } 
        }
      );
    }

    if (!data || data.length === 0) {
      return new Response(
        `<html><body><h1>Already Unsubscribed</h1><p>This email is already unsubscribed or the link is invalid.</p></body></html>`,
        { 
          status: 200, 
          headers: { "Content-Type": "text/html", ...corsHeaders } 
        }
      );
    }

      if (Deno.env.get('NODE_ENV') === 'development') {
        console.log(`Successfully unsubscribed: ${data[0].email}`);
      }

    return new Response(
      `<html>
        <head>
          <title>Unsubscribed Successfully</title>
          <style>
            body { font-family: Georgia, serif; max-width: 600px; margin: 50px auto; padding: 20px; background: linear-gradient(135deg, #f4f1e8 0%, #e8dcc0 100%); }
            .container { background: rgba(255,255,255,0.7); padding: 30px; border-radius: 8px; border: 2px solid #8b7355; text-align: center; }
            h1 { color: #2c5530; margin-bottom: 20px; }
            p { color: #2c5530; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Successfully Unsubscribed ⚙️</h1>
            <p>You have been successfully unsubscribed from the Inventor's Guild newsletter.</p>
            <p>We're sorry to see you go! If you change your mind, you can always subscribe again from our website.</p>
            <p style="margin-top: 30px; font-style: italic;">
              Safe travels,<br>
              <strong>The Inventor's Guild</strong>
            </p>
          </div>
        </body>
      </html>`,
      { 
        status: 200, 
        headers: { "Content-Type": "text/html", ...corsHeaders } 
      }
    );

  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    console.error("Error in unsubscribe function:", err);
    return new Response(
      `<html><body><h1>Error</h1><p>An unexpected error occurred. Please try again.</p></body></html>`,
      {
        status: 500,
        headers: { "Content-Type": "text/html", ...corsHeaders }
      }
    );
  }
};

serve(handler);
