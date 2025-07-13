
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

    if (!token) {
      return new Response(
        `<html><body><h1>Invalid confirmation link</h1><p>The confirmation token is missing.</p></body></html>`,
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
        `<html><body><h1>Error</h1><p>Failed to confirm subscription. Please try again.</p></body></html>`,
        { 
          status: 500, 
          headers: { "Content-Type": "text/html", ...corsHeaders } 
        }
      );
    }

    if (!data || data.length === 0) {
      return new Response(
        `<html><body><h1>Already Confirmed</h1><p>This email is already confirmed or the link is invalid.</p></body></html>`,
        { 
          status: 200, 
          headers: { "Content-Type": "text/html", ...corsHeaders } 
        }
      );
    }

    console.log(`Successfully confirmed subscription: ${data[0].email}`);

    return new Response(
      `<html>
        <head>
          <title>Email Confirmed Successfully</title>
          <style>
            body { font-family: Georgia, serif; max-width: 600px; margin: 50px auto; padding: 20px; background: linear-gradient(135deg, #f4f1e8 0%, #e8dcc0 100%); }
            .container { background: rgba(255,255,255,0.7); padding: 30px; border-radius: 8px; border: 2px solid #8b7355; text-align: center; }
            h1 { color: #2c5530; margin-bottom: 20px; }
            p { color: #2c5530; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Email Confirmed Successfully! ⚙️</h1>
            <p>Thank you for confirming your email address. You are now subscribed to the Inventor's Guild newsletter and will receive updates about new steampunk fairy tales, workshop videos, and exclusive clockwork adventures.</p>
            <p>Keep your goggles polished and your gears turning – magical updates are heading your way!</p>
            <p style="margin-top: 30px; font-style: italic;">
              With clockwork wishes,<br>
              <strong>Nika Vereskova</strong><br>
              <em>Chief Inventor & Storyteller</em>
            </p>
          </div>
        </body>
      </html>`,
      { 
        status: 200, 
        headers: { "Content-Type": "text/html", ...corsHeaders } 
      }
    );

  } catch (error: any) {
    console.error("Error in newsletter confirmation function:", error);
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

