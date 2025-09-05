import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { initPostHog } from '@/lib/posthog';
import { Toaster } from '@/components/ui/toaster';
import './index.css';

// Initialize analytics on idle to keep it off the critical path
if (typeof window !== 'undefined') {
  const initAnalytics = () => {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => initPostHog());
    } else {
      setTimeout(() => initPostHog(), 1500);
    }
  };
  if (document.readyState === 'complete') initAnalytics();
  else window.addEventListener('load', initAnalytics, { once: true });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>
);
