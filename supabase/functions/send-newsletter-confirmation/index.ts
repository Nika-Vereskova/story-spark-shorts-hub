
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RESEND_FROM_EMAIL =
  Deno.env.get("RESEND_FROM_EMAIL") || "Nika Vereskova <noreply@resend.dev>";

let resend: Resend | null = null;
let supabaseClient: ReturnType<typeof createClient> | null = null;
let configError: string | null = null;

const missingVars: string[] = [];
if (!SUPABASE_URL) missingVars.push("SUPABASE_URL");
if (!SUPABASE_SERVICE_ROLE_KEY) missingVars.push("SUPABASE_SERVICE_ROLE_KEY");
if (!RESEND_API_KEY) missingVars.push("RESEND_API_KEY");

if (missingVars.length) {
  configError = `Missing required environment variables: ${missingVars.join(", ")}`;
  console.error(configError);
} else {
  resend = new Resend(RESEND_API_KEY!);
  supabaseClient = createClient(
    SUPABASE_URL!,
    SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false }
    }
  );
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NewsletterConfirmationRequest {
  email: string;
  locale?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (Deno.env.get('NODE_ENV') === 'development') {
    console.log("Newsletter confirmation function called");
  }

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (configError) {
    return new Response(
      JSON.stringify({ error: configError }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
  const { email, locale = 'en' }: NewsletterConfirmationRequest = await req.json();
  if (Deno.env.get('NODE_ENV') === 'development') {
    console.log("Sending newsletter confirmation to:", email);
  }

  if (!email) {
    console.error("Missing email");
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  }

  const { data: tokenData, error: tokenError } = await supabaseClient
    .from('newsletter_subscribers')
    .select('confirmation_token')
    .eq('email', email)
    .single();

  if (tokenError || !tokenData) {
    console.error('Error fetching confirmation token:', tokenError);
    return new Response(JSON.stringify({ error: 'Unable to find confirmation token' }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  }

  const confirmationToken = tokenData.confirmation_token;

    // Check if RESEND_API_KEY is available
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    const confirmationUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/confirm-newsletter?token=${confirmationToken}`;
    if (Deno.env.get('NODE_ENV') === 'development') {
      console.log("Confirmation URL:", confirmationUrl);
    }

    const { data, error } = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: [email],
      subject: "Please confirm your subscription to the Inventor's Guild! ⚙️",
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f4f1e8 0%, #e8dcc0 100%); padding: 20px; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2c5530; font-size: 32px; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
              Welcome to the Inventor's Guild! ⚙️
            </h1>
          </div>
          
          <div style="background: rgba(255,255,255,0.7); padding: 25px; border-radius: 8px; border: 2px solid #8b7355; margin-bottom: 20px;">
            <p style="color: #2c5530; font-size: 18px; line-height: 1.6; margin: 0 0 15px 0;">
              Dear Fellow Inventor,
            </p>
            
            <p style="color: #2c5530; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
              Thank you for your interest in joining the Inventor's Guild! To complete your subscription and start receiving our clockwork adventures, please confirm your email address by clicking the button below.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmationUrl}" style="background: #8b7355; color: #f4f1e8; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; border: 2px solid #2c5530; box-shadow: 2px 2px 4px rgba(0,0,0,0.2);">
                Confirm Your Subscription
              </a>
            </div>
            
            <p style="color: #2c5530; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
              Once confirmed, you'll receive:
            </p>
            
            <ul style="color: #2c5530; font-size: 16px; line-height: 1.8; margin: 0 0 15px 20px;">
              <li>📚 Updates about new steampunk fairy tales</li>
              <li>🎬 Notifications for workshop videos and behind-the-scenes content</li>
              <li>⚙️ Exclusive clockwork adventures and activities</li>
              <li>🎁 Special surprises and downloadable content</li>
            </ul>
            
            <p style="color: #2c5530; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0; font-style: italic;">
              If you didn't sign up for this newsletter, you can safely ignore this email.
            </p>
          </div>
          
          <div style="text-align: center; color: #2c5530; font-size: 14px; margin-top: 20px;">
            <p style="margin: 0;">
              With clockwork wishes,<br>
              <strong>Nika Vereskova</strong><br>
              <em>Chief Inventor & Storyteller</em>
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (Deno.env.get('NODE_ENV') === 'development') {
      console.log("Email sent successfully:", data);
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    console.error("Error in newsletter confirmation function:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
