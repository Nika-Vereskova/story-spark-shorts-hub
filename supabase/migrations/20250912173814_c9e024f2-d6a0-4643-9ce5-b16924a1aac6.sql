-- Fix the automated newsletter cron job with proper JSON syntax
-- First, remove the existing broken cron job
SELECT cron.unschedule('automated-newsletter-schedule');

-- Create the cron job with proper static JSON body
SELECT cron.schedule(
  'automated-newsletter-schedule',
  '0 10 * * 2,5', -- Every Tuesday and Friday at 10 AM UTC
  $$
  SELECT
    net.http_post(
        url := 'https://srzxvvbxmcrxsplwutxv.supabase.co/functions/v1/schedule-newsletter',
        headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyenh2dmJ4bWNyeHNwbHd1dHh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNzMyMzIsImV4cCI6MjA2Nzc0OTIzMn0.zc7-UaG5iIK7mhJY9IAm2XMeBg1zV95aOxgRnjqVnSs"}'::jsonb,
        body := '{"source": "cron"}'::jsonb
    ) as request_id;
  $$
);