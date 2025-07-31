import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

interface NewsletterPostRequest {
  subject: string;
  content: string;
  htmlContent?: string;
  summary?: string;
  cover_url?: string | null;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "No authorization header" }), {
      status: 401,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  const { subject, content, htmlContent, summary, cover_url }: NewsletterPostRequest = await req.json();

  const sendUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-newsletter`;
  const sendRes = await fetch(sendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: authHeader,
    },
    body: JSON.stringify({ subject, content, htmlContent }),
  });

  const sendData = await sendRes.json();
  if (!sendRes.ok) {
    return new Response(JSON.stringify(sendData), {
      status: sendRes.status,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  const postSummary = summary || content.slice(0, 200);
  const { error: postError } = await supabase.from("news_posts").insert([
    {
      title: subject,
      slug: slugify(subject),
      summary: postSummary,
      cover_url: cover_url || null,
      article_url: null,
    },
  ]);

  if (postError) {
    console.error("Failed to create news post:", postError);
  }

  return new Response(
    JSON.stringify({ success: true, send: sendData, news_post_error: postError?.message }),
    { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
  );
};

serve(handler);
