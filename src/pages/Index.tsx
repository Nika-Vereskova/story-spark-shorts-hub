
import React, { Suspense } from 'react';
import Navigation from '@/components/Navigation';
import NewHeroSection from '@/components/NewHeroSection';
import AboutPreview from '@/components/AboutPreview';
import ServicesTeaser from '@/components/ServicesTeaser';
// Keep lazy loading only for non-critical content
const AINewsCarousel = React.lazy(() => import('@/components/AINewsCarousel'));
const ContactCTA = React.lazy(() => import('@/components/ContactCTA'));
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import AdSenseBanner from '@/components/AdSenseBanner';
import AdSenseSquare from '@/components/AdSenseSquare';

const Index = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Rendering revamped Index page');
  }

  return (
    <div className="min-h-screen vintage-paper-light parchment-scroll relative">
      <SEO 
        title="STEaM LOGIC Studio AB | AI Consulting & Creative Technology by CEO Renata Khakimova" 
        description="Expert AI consulting services by STEaM LOGIC Studio AB. WE specialize in custom GPT development, AI strategy, and automation solutions." 
        keywords="STEaM LOGIC Studio AB, Renata Khakimova CEO, AI consulting, custom GPT development, AI strategy consultant, Nika Vereskova books, steampunk children's books, Europe capitals trainer, Learn AI beginners, artificial intelligence consultant Sweden, process automation, ChatGPT development, AI workshops"
      />
      
      {/* Navigation */}
      <Navigation currentPage="home" />

      {/* Hero Section - Critical for SEO */}
      <NewHeroSection />
      
      <AdSenseBanner position="top" />

      {/* About Me Preview - Critical for SEO */}
      <AboutPreview />
      
      <AdSenseSquare size="medium" />

      {/* Services Teaser - Critical for SEO */}
      <ServicesTeaser />

      {/* AI News Highlight */}
      <Suspense fallback={<div>Loading...</div>}>
        <AINewsCarousel />
      </Suspense>
      
      <AdSenseBanner position="middle" />

      {/* Contact CTA */}
      <Suspense fallback={<div>Loading...</div>}>
        <ContactCTA />
      </Suspense>
      
      <AdSenseSquare size="small" />

      {/* Footer */}
      <Footer />
      
      <AdSenseBanner position="bottom" />
    </div>
  );
};

export default Index;
