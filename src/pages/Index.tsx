
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
        title="STEaM LOGIC Studio AB - AI Consulting & Custom GPT Development | Nika Vereskova" 
        description="Expert AI consultant Nika Vereskova offers custom GPT development, AI strategy, workshops, and automation solutions. Transform your business with inventive storytelling and intelligent technology." 
        keywords="AI consulting, custom GPT development, AI workshops, ChatGPT development, AI automation, AI strategy consultant, artificial intelligence consultant, Sweden, process automation, AI assistant development, GPT training workshops"
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
