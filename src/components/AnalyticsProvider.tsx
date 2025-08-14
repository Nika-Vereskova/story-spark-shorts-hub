import React, { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Core Web Vitals tracking
const reportWebVitals = () => {
  if (typeof window !== 'undefined') {
    import('web-vitals').then(({ onLCP, onINP, onCLS, onFCP, onTTFB }) => {
      onLCP((metric) => {
        window.gtag('event', 'LCP', {
          event_category: 'Web Vitals',
          value: Math.round(metric.value),
          metric_id: metric.id,
          metric_value: metric.value,
          metric_delta: metric.delta,
        });
      });

      onINP((metric) => {
        window.gtag('event', 'INP', {
          event_category: 'Web Vitals',
          value: Math.round(metric.value),
          metric_id: metric.id,
          metric_value: metric.value,
          metric_delta: metric.delta,
        });
      });

      onCLS((metric) => {
        window.gtag('event', 'CLS', {
          event_category: 'Web Vitals',
          value: Math.round(metric.value * 1000),
          metric_id: metric.id,
          metric_value: metric.value,
          metric_delta: metric.delta,
        });
      });

      onFCP((metric) => {
        window.gtag('event', 'FCP', {
          event_category: 'Web Vitals',
          value: Math.round(metric.value),
          metric_id: metric.id,
          metric_value: metric.value,
        });
      });

      onTTFB((metric) => {
        window.gtag('event', 'TTFB', {
          event_category: 'Web Vitals',
          value: Math.round(metric.value),
          metric_id: metric.id,
          metric_value: metric.value,
        });
      });
    }).catch((error) => {
      console.warn('Web Vitals not available:', error);
    });
  }
};

// Enhanced event tracking functions
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      ...parameters,
    });
  }
};

export const trackPageView = (pageName: string, pageTitle?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-MEASUREMENT_ID', {
      page_title: pageTitle || document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
    
    window.gtag('event', 'page_view', {
      page_title: pageTitle || document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }
};

export const trackServiceInteraction = (serviceType: string, action: string) => {
  trackEvent('service_interaction', {
    service_type: serviceType,
    action: action,
    event_label: `${serviceType}_${action}`,
  });
};

export const trackNewsletterSignup = () => {
  trackEvent('newsletter_signup', {
    event_category: 'conversion',
    event_label: 'newsletter_form',
  });
};

export const trackContactFormSubmit = (formType: string = 'general') => {
  trackEvent('contact_form_submit', {
    event_category: 'conversion',
    form_type: formType,
    event_label: `contact_${formType}`,
  });
};

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  useEffect(() => {
    // Initialize Web Vitals tracking
    reportWebVitals();
    
    // Track initial page load
    trackPageView(window.location.pathname);
    
    // Enhanced scroll tracking
    let scrollDepth = 0;
    let maxScroll = 0;
    
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      const currentScrollPercentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
      
      if (currentScrollPercentage > maxScroll) {
        maxScroll = currentScrollPercentage;
        
        // Track scroll milestones
        if (maxScroll >= 25 && scrollDepth < 25) {
          scrollDepth = 25;
          trackEvent('scroll_depth', { depth: '25%' });
        } else if (maxScroll >= 50 && scrollDepth < 50) {
          scrollDepth = 50;
          trackEvent('scroll_depth', { depth: '50%' });
        } else if (maxScroll >= 75 && scrollDepth < 75) {
          scrollDepth = 75;
          trackEvent('scroll_depth', { depth: '75%' });
        } else if (maxScroll >= 90 && scrollDepth < 90) {
          scrollDepth = 90;
          trackEvent('scroll_depth', { depth: '90%' });
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Track time on page
    const startTime = Date.now();
    
    const handleBeforeUnload = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      trackEvent('time_on_page', {
        value: timeOnPage,
        event_category: 'engagement',
      });
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return <>{children}</>;
};

export default AnalyticsProvider;