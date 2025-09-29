// supabase/functions/send-contact-form/index.ts
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// --- Config ---
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
const FROM_EMAIL =
  Deno.env.get("RESEND_FROM_EMAIL") || "hello@steamlogic.se"; // must be a VERIFIED sender/domain in Resend
const ADMIN_INBOX = "hello@steamlogic.se"; // where you want to receive submissions

// --- CORS ---
const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(
  body: unknown,
  status = 200,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

// --- Utils ---
function escapeHtml(input = ""): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function parseBody(req: Request): Promise<{
  name: string;
  email: string;
  organization?: string;
  message: string;
  serviceType?: string;
}> {
  const ct = req.headers.get("content-type") || "";

  // JSON
  if (ct.includes("application/json")) {
    const data = await req.json();
    return {
      name: String(data.name ?? ""),
      email: String(data.email ?? ""),
      organization: data.organization ? String(data.organization) : undefined,
      message: String(data.message ?? ""),
      serviceType: data.serviceType ? String(data.serviceType) : undefined,
    };
  }

  // FormData (URL-encoded or multipart)
  if (ct.includes("application/x-www-form-urlencoded") ||
      ct.includes("multipart/form-data")) {
    const form = await req.formData();
    return {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      organization: form.get("organization")
        ? String(form.get("organization"))
        : undefined,
      message: String(form.get("message") ?? ""),
      serviceType: form.get("serviceType")
        ? String(form.get("serviceType"))
        : undefined,
    };
  }

  // Fallback: try JSON parse
  try {
    const text = await req.text();
    if (text) {
      const data = JSON.parse(text);
      return {
        name: String(data.name ?? ""),
        email: String(data.email ?? ""),
        organization: data.organization ? String(data.organization) : undefined,
        message: String(data.message ?? ""),
        serviceType: data.serviceType ? String(data.serviceType) : undefined,
      };
    }
  } catch {
    /* ignore */
  }

  return { name: "", email: "", message: "" };
}

const resend = new Resend(RESEND_API_KEY);

serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  if (!RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY");
    return jsonResponse(
      { error: "Server misconfigured: RESEND_API_KEY is not set." },
      500,
    );
  }

  // Parse & validate
  let payload;
  try {
    payload = await parseBody(req);
  } catch (e) {
    console.error("Failed to parse body:", e);
    return jsonResponse({ error: "Invalid request body" }, 400);
  }

  const name = payload.name.trim();
  const email = payload.email.trim().toLowerCase();
  const organization = (payload.organization || "").trim();
  const message = payload.message.trim();
  const serviceType = (payload.serviceType || "General Contact").trim();

  if (!name || !email || !message) {
    return jsonResponse(
      { error: "Name, email, and message are required." },
      400,
    );
  }
  if (!isValidEmail(email)) {
    return jsonResponse({ error: "Invalid email format." }, 400);
  }

  // Sanitize for HTML
  const sName = escapeHtml(name);
  const sEmail = escapeHtml(email);
  const sOrg = escapeHtml(organization);
  const sMsg = escapeHtml(message).replace(/\n/g, "<br>");
  const sService = escapeHtml(serviceType);

  // Email contents
  const adminHtml = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Service Type:</strong> ${sService}</p>
    <p><strong>Name:</strong> ${sName}</p>
    <p><strong>Email:</strong> ${sEmail}</p>
    ${organization ? `<p><strong>Organization:</strong> ${sOrg}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${sMsg}</p>
    <hr>
    <p><em>Sent from the STEaM LOGIC contact form.</em></p>
  `.trim();

  const adminText =
    `New ${serviceType} submission\nName: ${name}\nEmail: ${email}\n` +
    (organization ? `Organization: ${organization}\n` : "") +
    `\nMessage:\n${message}\n`;

  const userHtml = `
    <h2>Thank you for your message, ${sName}!</h2>
    <p>We’ve received your ${sService.toLowerCase()} request and will get back to you as soon as possible.</p>
    <p><strong>Your submitted information:</strong></p>
    <ul>
      <li><strong>Name:</strong> ${sName}</li>
      <li><strong>Email:</strong> ${sEmail}</li>
      ${organization ? `<li><strong>Organization:</strong> ${sOrg}</li>` : ""}
      <li><strong>Service:</strong> ${sService}</li>
    </ul>
    <p><strong>Your message:</strong></p>
    <p>${sMsg}</p>
    <hr>
    <p>Best regards,<br/>The STEaM LOGIC Team</p>
    <p><a href="https://steamlogic.se">steamlogic.se</a></p>
  `.trim();

  const userText =
    `Thank you, ${name}!\n\nWe received your ${serviceType} request.\n\n` +
    `Submitted details:\n- Name: ${name}\n- Email: ${email}\n` +
    (organization ? `- Organization: ${organization}\n` : "") +
    `- Service: ${serviceType}\n\nMessage:\n${message}\n\n` +
    `The STEaM LOGIC Team — steamlogic.se`;

  // Send emails
  try {
    // 1) Admin email
    const adminRes = await resend.emails.send({
      from: `STEaM LOGIC <${FROM_EMAIL}>`,
      to: [ADMIN_INBOX],
      reply_to: email, // Reply straight to submitter
      subject: `New ${serviceType} request from ${name}`,
      html: adminHtml,
      text: adminText,
    });

    // 2) User confirmation (don’t block admin delivery on this; but we still try/catch together to keep code compact)
    const userRes = await resend.emails.send({
      from: `STEaM LOGIC <${FROM_EMAIL}>`,
      to: [email],
      subject: "Thank you for contacting STEaM LOGIC",
      html: userHtml,
      text: userText,
    });

    return jsonResponse({
      success: true,
      message: "Contact form submitted successfully.",
      adminEmailId: adminRes?.data?.id ?? null,
      userEmailId: userRes?.data?.id ?? null,
    });
  } catch (err: any) {
    console.error("Resend error:", err);
    const msg = err?.message || "Failed to send emails.";
    return jsonResponse({ error: msg }, 500);
  }
});
