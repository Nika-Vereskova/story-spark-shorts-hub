-- Enable pg_cron and pg_net extensions for scheduling
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create a cron job to run newsletter automation on Tuesdays and Fridays at 10 AM UTC
-- This will trigger every Tuesday (2) and Friday (5) at 10:00 AM
SELECT cron.schedule(
  'newsletter-automation-tuesday-friday',
  '0 10 * * 2,5', -- At 10:00 AM on Tuesday and Friday
  $$
  SELECT
    net.http_post(
        url:='https://srzxvvbxmcrxsplwutxv.supabase.co/functions/v1/schedule-newsletter',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyenh2dmJ4bWNyeHNwbHd1dHh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNzMyMzIsImV4cCI6MjA2Nzc0OTIzMn0.zc7-UaG5iIK7mhJY9IAm2XMeBg1zV95aOxgRnjqVnSs"}'::jsonb,
        body:='{"triggered_by": "cron", "time": "' || now()::text || '"}'::jsonb
    ) as request_id;
  $$
);