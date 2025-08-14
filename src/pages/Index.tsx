
import React, { Suspense, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import NewHeroSection from '@/components/NewHeroSection';
import AboutPreview from '@/components/AboutPreview';
import ServicesTeaser from '@/components/ServicesTeaser';
// Keep lazy loading only for non-critical content
const AINewsCarousel = React.lazy(() => import('@/components/AINewsCarousel'));
const ContactCTA = React.lazy(() => import('@/components/ContactCTA'));
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import AnalyticsProvider, { trackCoreWebVitals } from '@/components/AnalyticsProvider';

const Index = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Rendering revamped Index page');
  }

  // Initialize performance tracking
  useEffect(() => {
    trackCoreWebVitals();
  }, []);

  return (
    <AnalyticsProvider>
      <div className="min-h-screen bg-parchment bg-gear-pattern">
        <SEO 
          title="STEaM LOGIC Studio AB - AI Consulting & Custom GPT Development | Nika Vereskova" 
          description="Expert AI consultant Nika Vereskova offers custom GPT development, AI strategy, workshops, and automation solutions. Transform your business with inventive storytelling and intelligent technology." 
          keywords="AI consulting, custom GPT development, AI workshops, ChatGPT development, AI automation, AI strategy consultant, artificial intelligence consultant, Sweden, process automation, AI assistant development, GPT training workshops"
        />
        
        {/* Navigation */}
        <Navigation currentPage="home" />

        {/* Main content with proper ARIA landmark */}
        <main id="main-content" role="main">
          {/* Hero Section - Critical for SEO */}
          <NewHeroSection />

          {/* About Me Preview - Critical for SEO */}
          <AboutPreview />

          {/* Services Teaser - Critical for SEO */}
          <ServicesTeaser />

          {/* AI News Highlight */}
          <Suspense fallback={
            <div className="flex justify-center items-center py-16" role="status" aria-label="Loading AI news content">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brass"></div>
              <span className="sr-only">Loading...</span>
            </div>
          }>
            <AINewsCarousel />
          </Suspense>

          {/* Contact CTA */}
          <Suspense fallback={
            <div className="flex justify-center items-center py-16" role="status" aria-label="Loading contact section">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brass"></div>
              <span className="sr-only">Loading...</span>
            </div>
          }>
            <ContactCTA />
          </Suspense>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </AnalyticsProvider>
  );
};

export default Index;
