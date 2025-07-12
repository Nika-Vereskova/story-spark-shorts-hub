
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
  console.log("Newsletter confirmation function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, locale = 'en' }: NewsletterConfirmationRequest = await req.json();
    console.log("Sending newsletter confirmation to:", email);

    const emailResponse = await resend.emails.send({
      from: "Nika Vereskova <noreply@resend.dev>",
      to: [email],
      subject: "Welcome to the Inventor's Guild! ⚙️",
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
              Thank you for joining the Inventor's Guild! You've just taken the first step into a world of clockwork wonders and steampunk adventures.
            </p>
            
            <p style="color: #2c5530; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
              As a member of the guild, you'll receive:
            </p>
            
            <ul style="color: #2c5530; font-size: 16px; line-height: 1.8; margin: 0 0 15px 20px;">
              <li>📚 Updates about new steampunk fairy tales</li>
              <li>🎬 Notifications for workshop videos and behind-the-scenes content</li>
              <li>⚙️ Exclusive clockwork adventures and activities</li>
              <li>🎁 Special surprises and downloadable content</li>
            </ul>
            
            <p style="color: #2c5530; font-size: 16px; line-height: 1.6; margin: 0;">
              Keep your goggles polished and your gears turning – magical updates are heading your way!
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

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in newsletter confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
