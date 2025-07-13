
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRequest {
  subject: string;
  content: string;
  htmlContent: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Send newsletter function called");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client with service role key for admin operations
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get the authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No authorization header" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Verify the user is authenticated and has admin role
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace("Bearer ", "")
    );

    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid authentication" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Check if user has admin role
    const { data: roleData, error: roleError } = await supabaseClient
      .rpc('has_role', { _user_id: user.id, _role: 'admin' });

    if (roleError || !roleData) {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { subject, content, htmlContent }: NewsletterRequest = await req.json();

    if (!subject || !content) {
      return new Response(JSON.stringify({ error: "Subject and content are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Get all active AND confirmed subscribers
    const { data: subscribers, error: subscribersError } = await supabaseClient
      .from('newsletter_subscribers')
      .select('email, unsubscribe_token')
      .eq('is_active', true)
      .eq('is_confirmed', true);

    if (subscribersError) {
      console.error('Error fetching subscribers:', subscribersError);
      return new Response(JSON.stringify({ error: "Failed to fetch subscribers" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (!subscribers || subscribers.length === 0) {
      return new Response(JSON.stringify({ message: "No confirmed active subscribers found" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log(`Sending newsletter to ${subscribers.length} confirmed subscribers`);

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    // Send emails in batches to avoid rate limits
    const batchSize = 50;
    let sentCount = 0;
    const errors: string[] = [];

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      
      const emailPromises = batch.map(async (subscriber) => {
        try {
          const unsubscribeUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/unsubscribe?token=${subscriber.unsubscribe_token}`;
          
          const finalHtmlContent = htmlContent || `
            <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f4f1e8 0%, #e8dcc0 100%); padding: 20px; border-radius: 10px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #2c5530; font-size: 28px; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
                  ${subject}
                </h1>
              </div>
              
              <div style="background: rgba(255,255,255,0.7); padding: 25px; border-radius: 8px; border: 2px solid #8b7355; margin-bottom: 20px;">
                <div style="color: #2c5530; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">
                  ${content}
                </div>
              </div>
              
              <div style="text-align: center; color: #2c5530; font-size: 14px; margin-top: 20px;">
                <p style="margin: 0;">
                  With clockwork wishes,<br>
                  <strong>Nika Vereskova</strong><br>
                  <em>Chief Inventor & Storyteller</em>
                </p>
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #8b7355;">
                  <a href="${unsubscribeUrl}" style="color: #8b7355; text-decoration: none; font-size: 12px;">
                    Unsubscribe from future emails
                  </a>
                </div>
              </div>
            </div>
          `;

          await resend.emails.send({
            from: "Nika Vereskova <noreply@resend.dev>",
            to: [subscriber.email],
            subject: subject,
            html: finalHtmlContent,
          });

          return { success: true, email: subscriber.email };
        } catch (error) {
          console.error(`Failed to send to ${subscriber.email}:`, error);
          return { success: false, email: subscriber.email, error: error.message };
        }
      });

      const results = await Promise.allSettled(emailPromises);
      
      results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value.success) {
          sentCount++;
        } else {
          const email = result.status === 'fulfilled' ? result.value.email : 'unknown';
          const error = result.status === 'fulfilled' ? result.value.error : result.reason;
          errors.push(`${email}: ${error}`);
        }
      });

      // Add a small delay between batches
      if (i + batchSize < subscribers.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Save newsletter record
    const { error: saveError } = await supabaseClient
      .from('newsletters')
      .insert([{
        subject,
        content,
        recipient_count: sentCount,
        created_by: user.id
      }]);

    if (saveError) {
      console.error('Error saving newsletter record:', saveError);
    }

    console.log(`Newsletter sent successfully to ${sentCount} confirmed subscribers`);
    
    return new Response(JSON.stringify({ 
      success: true, 
      sent_count: sentCount,
      total_subscribers: subscribers.length,
      errors: errors.length > 0 ? errors : undefined
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error in send newsletter function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);

