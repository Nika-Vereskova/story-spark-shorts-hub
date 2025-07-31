# Automate Newsletter and AI News Posting with Zapier

This guide explains how to use Zapier to automatically send the weekly newsletter and create a matching AI News post using the new `send-newsletter-and-post` Supabase Edge Function.

## 1. Prepare the Edge Function

Deploy the `send-newsletter-and-post` function to your Supabase project:

```sh
supabase functions deploy send-newsletter-and-post
```

Make sure the environment variables `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set for the function (these are normally configured in the Supabase dashboard).

## 2. Create a Zap

1. **Trigger** – choose the **Schedule** trigger and set it to run weekly on your preferred day and time.
2. **Action** – add **Webhooks by Zapier → Custom Request**.
   - Method: `POST`
   - URL: `https://<your-project>.supabase.co/functions/v1/send-newsletter-and-post`
   - Headers:
     - `Content-Type: application/json`
     - `Authorization: Bearer <your admin JWT>`
   - Data: JSON with these fields:
     ```json
     {
       "subject": "<newsletter subject>",
       "content": "<plain text content>",
       "htmlContent": "<optional HTML>",
       "summary": "<short excerpt for the site>",
       "cover_url": "<optional image URL>"
     }
     ```
3. **Test** the step in Zapier. A successful request sends the emails and inserts the news post.
4. **Turn on the Zap**. Your newsletter will now be sent on schedule and the website will show the new AI News post automatically.

Keep your JWT or service role key secure inside Zapier’s environment.
