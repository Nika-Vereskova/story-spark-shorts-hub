import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterData {
  subject?: string;
  content?: string;
  htmlContent?: string;
  triggerZapier?: boolean;
  zapierWebhookUrl?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Generate newsletter function called");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { triggerZapier = false, zapierWebhookUrl }: NewsletterData = await req.json();

    // Get latest AI news posts (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const { data: newsData, error: newsError } = await supabaseClient
      .from('news_posts')
      .select('title, summary, article_url, published_at')
      .gte('published_at', weekAgo.toISOString())
      .order('published_at', { ascending: false })
      .limit(3);

    if (newsError) {
      console.error('Error fetching news posts:', newsError);
    }

    const news = newsData || [];

    // Get latest newsletters for inspiration
    const { data: recentNewsletters } = await supabaseClient
      .from('newsletters')
      .select('subject, content')
      .order('sent_at', { ascending: false })
      .limit(5);

    // Generate newsletter content
    const subject = `🔧 Weekly Clockwork Chronicles - ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;
    
    const tipOfTheWeek = generateTipOfTheWeek();
    const youtubeSectionContent = generateYouTubeSection();
    const bookUpdatesContent = generateBookUpdatesSection();
    
    const content = `Dear Fellow Inventors,

Welcome to this week's Clockwork Chronicles! Where steampunk stories meet cutting-edge AI.

🗞️ LATEST AI INSIGHTS
${news.length > 0 ? news.map(item => `• ${item.title}${item.summary ? ': ' + item.summary.substring(0, 100) + '...' : ''}`).join('\n') : '• Keep an eye out for fresh AI developments this week!'}

📺 WORKSHOP HIGHLIGHTS
${youtubeSectionContent}

📚 BOOK CORNER
${bookUpdatesContent}

💡 TIP OF THE WEEK
${tipOfTheWeek}

🎯 WHAT'S BREWING
• New steampunk tales in development
• AI workshop planning for schools
• Custom GPT prototypes for storytelling

Until next Tuesday, keep your gears turning and your imagination soaring!

With clockwork wishes,
Nika Vereskova
Chief Inventor & Storyteller
STEaM LOGIC Studio AB`;

    const htmlContent = generateHTMLContent(subject, content, news);

    // If this is a Zapier trigger, send webhook
    if (triggerZapier && zapierWebhookUrl) {
      try {
        await fetch(zapierWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject,
            content,
            htmlContent,
            newsItems: news,
            generated_at: new Date().toISOString(),
            newsletter_type: "weekly_automated"
          }),
        });
        console.log("Newsletter sent to Zapier webhook successfully");
      } catch (error) {
        console.error("Error sending to Zapier:", error);
      }
    }

    return new Response(JSON.stringify({ 
      success: true,
      subject,
      content,
      htmlContent,
      newsItems: news
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    console.error("Error in generate newsletter function:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

function generateTipOfTheWeek(): string {
  const tips = [
    "When working with AI tools, always start with clear, specific prompts. Think of AI as a brilliant assistant who needs good instructions to help you best.",
    "In storytelling, the most powerful tool isn't magic—it's asking 'What if?' Let your imagination explore the impossible.",
    "Building with AI is like clockwork engineering: each small gear (prompt) must work perfectly with others to create something magnificent.",
    "Remember: the best stories solve problems with creativity, not force. The same applies to AI solutions!",
    "When teaching children about AI, start with wonder, add ethics, and season generously with hands-on exploration.",
    "Every great invention starts with observing a problem others have accepted as normal. Question everything!",
    "AI can generate ideas, but human wisdom chooses which ones deserve building. Be the curator of your AI's creativity."
  ];
  
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  return randomTip;
}

function generateYouTubeSection(): string {
  return `• New steampunk story snippet: "The Clockmaker's Apprentice"
• Behind-the-scenes: How I design mechanical characters
• Quick AI tip: Making child-safe chatbots for schools`;
}

function generateBookUpdatesSection(): string {
  return `Plumberella continues to delight readers worldwide! This week:
• Featured in 3 school libraries across Sweden
• New Russian translation making progress
• Planning the next adventure: "The Brass Butterfly Chronicles"`;
}

function generateHTMLContent(subject: string, content: string, news: any[]): string {
  const newsSection = news.length > 0 ? `
    <div style="background: rgba(255,255,255,0.9); padding: 20px; border-radius: 8px; border: 2px solid #8b7355; margin-bottom: 20px;">
      <h3 style="color: #2c5530; margin-bottom: 15px; font-size: 18px;">🗞️ Latest AI Insights</h3>
      ${news.map(item => `
        <div style="margin-bottom: 10px; padding: 10px; background: rgba(176, 196, 175, 0.1); border-left: 3px solid #8b7355;">
          <strong style="color: #2c5530;">${item.title}</strong>
          ${item.summary ? `<p style="margin: 5px 0; color: #2c5530; font-size: 14px;">${item.summary.substring(0, 150)}...</p>` : ''}
          ${item.article_url ? `<a href="${item.article_url}" style="color: #8b7355; text-decoration: none; font-size: 12px;">Read more →</a>` : ''}
        </div>
      `).join('')}
    </div>
  ` : '';

  return `
    <div style="font-family: 'Playfair Display', 'Georgia', serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f4f1e8 0%, #e8dcc0 100%); padding: 20px; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #2c5530; font-size: 28px; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
          ${subject}
        </h1>
        <div style="margin-top: 10px; height: 2px; background: linear-gradient(90deg, #8b7355, #2c5530, #8b7355); width: 100px; margin-left: auto; margin-right: auto;"></div>
      </div>
      
      ${newsSection}
      
      <div style="background: rgba(255,255,255,0.7); padding: 25px; border-radius: 8px; border: 2px solid #8b7355; margin-bottom: 20px;">
        <div style="color: #2c5530; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">
          ${content.replace(/🗞️ LATEST AI INSIGHTS[\s\S]*?(?=📺|$)/, '').trim()}
        </div>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <table style="width: 100%; margin: 20px 0;">
          <tr>
            <td style="text-align: center; padding: 15px;">
              <a href="https://nikavereskova.com" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #8b7355, #a68b5b); color: white; text-decoration: none; border-radius: 25px; font-weight: bold; box-shadow: 0 4px 15px rgba(139, 115, 85, 0.3);">
                🏠 Visit Our Site
              </a>
            </td>
            <td style="text-align: center; padding: 15px;">
              <a href="https://www.youtube.com/@NikaVereskova" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #2c5530, #4a7c59); color: white; text-decoration: none; border-radius: 25px; font-weight: bold; box-shadow: 0 4px 15px rgba(44, 85, 48, 0.3);">
                📺 New Videos
              </a>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center; padding: 15px;">
              <a href="https://nikavereskova.com/books" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #8b7355, #2c5530); color: white; text-decoration: none; border-radius: 25px; font-weight: bold; box-shadow: 0 4px 15px rgba(139, 115, 85, 0.3);">
                📚 Explore New Stories
              </a>
            </td>
          </tr>
        </table>
      </div>
      
      <div style="text-align: center; color: #2c5530; font-size: 14px; margin-top: 20px;">
        <p style="margin: 0;">
          With clockwork wishes,<br>
          <strong>Nika Vereskova</strong><br>
          <em>Chief Inventor & Storyteller</em><br>
          <em>STEaM LOGIC Studio AB</em>
        </p>
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #8b7355;">
          <a href="{unsubscribe_url}" style="color: #8b7355; text-decoration: none; font-size: 12px;">
            Unsubscribe from future emails
          </a>
        </div>
      </div>
    </div>
  `;
}

serve(handler);