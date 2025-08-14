import React, { createContext, useContext, ReactNode } from 'react';

interface AnalyticsContextType {
  trackEvent: (action: string, category: string, label?: string, value?: number) => void;
  trackPageView: (page: string, title?: string) => void;
  trackAIServiceClick: (serviceName: string) => void;
  trackContactFormSubmit: () => void;
  trackNewsletterSignup: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    // Enhanced Google Analytics 4 event tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        custom_parameter_1: 'AI_consulting',
        page_location: window.location.href,
        page_title: document.title
      });
    }
    
    // PostHog tracking integration
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture(action, {
        category,
        label,
        value,
        $current_url: window.location.href,
        $title: document.title
      });
    }
  };

  const trackPageView = (page: string, title?: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'G-MEASUREMENT_ID', {
        page_title: title || document.title,
        page_location: window.location.href,
        content_group1: 'AI Consulting',
        content_group2: page
      });
    }
  };

  const trackAIServiceClick = (serviceName: string) => {
    trackEvent('ai_service_click', 'engagement', serviceName);
  };

  const trackContactFormSubmit = () => {
    trackEvent('contact_form_submit', 'engagement', 'contact_form', 1);
  };

  const trackNewsletterSignup = () => {
    trackEvent('newsletter_signup', 'engagement', 'newsletter', 1);
  };

  const value = {
    trackEvent,
    trackPageView,
    trackAIServiceClick,
    trackContactFormSubmit,
    trackNewsletterSignup
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

// Performance monitoring utilities
export const trackCoreWebVitals = () => {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    // Track Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'LCP', {
            event_category: 'Web Vitals',
            value: Math.round(entry.startTime),
            non_interaction: true
          });
        }
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Track First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'FID', {
            event_category: 'Web Vitals',
            value: Math.round((entry as any).processingStart - entry.startTime),
            non_interaction: true
          });
        }
      }
    }).observe({ entryTypes: ['first-input'] });

    // Track Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      
      if ((window as any).gtag) {
        (window as any).gtag('event', 'CLS', {
          event_category: 'Web Vitals',
          value: Math.round(clsValue * 1000),
          non_interaction: true
        });
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }
};

export default AnalyticsProvider;