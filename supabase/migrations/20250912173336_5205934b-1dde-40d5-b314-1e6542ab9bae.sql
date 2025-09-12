-- Fix the automated newsletter cron job with proper JSON syntax
-- First, unschedule any existing broken cron jobs
SELECT cron.unschedule('automated-newsletter-schedule');

-- Create a new cron job with properly formatted JSON
-- Schedule for Tuesdays and Fridays at 10:00 AM UTC (0 10 * * 2,5)
SELECT cron.schedule(
  'automated-newsletter-schedule',
  '0 10 * * 2,5',
  $$
  SELECT
    net.http_post(
        url:='https://srzxvvbxmcrxsplwutxv.supabase.co/functions/v1/schedule-newsletter',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyenh2dmJ4bWNyeHNwbHd1dHh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNzMyMzIsImV4cCI6MjA2Nzc0OTIzMn0.zc7-UaG5iIK7mhJY9IAm2XMeBg1zV95aOxgRnjqVnSs"}'::jsonb,
        body:='{"source": "cron"}'::jsonb
    ) as request_id;
  $$
);