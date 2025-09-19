
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
import { useSiteSettings } from '@/hooks/useSiteSettings';

const Index = () => {
  const { settings } = useSiteSettings();
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Rendering revamped Index page');
  }

  return (
    <div className="min-h-screen vintage-paper-light parchment-scroll relative">
      <SEO 
        title={settings?.site_title}
        description={settings?.site_description}
        keywords={settings?.meta_keywords?.join(', ')}
        image={settings?.seo_image_url}
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
