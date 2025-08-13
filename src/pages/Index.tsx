
import React, { Suspense } from 'react';
import Navigation from '@/components/Navigation';
const NewHeroSection = React.lazy(() => import('@/components/NewHeroSection'));
const AboutPreview = React.lazy(() => import('@/components/AboutPreview'));
const ServicesTeaser = React.lazy(() => import('@/components/ServicesTeaser'));
const AINewsCarousel = React.lazy(() => import('@/components/AINewsCarousel'));
const ContactCTA = React.lazy(() => import('@/components/ContactCTA'));
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Index = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Rendering revamped Index page');
  }

  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern">
      <SEO title="STEaM LOGIC Studio AB - Inventive Storytelling × Intelligent Technology" description="Where story magic meets machine logic. AI consulting, storytelling, and creative technology solutions by Nika Vereskova." />
      
      {/* Navigation */}
      <Navigation currentPage="home" />

      {/* Hero Section */}
      <Suspense fallback={<div>Loading...</div>}>
        <NewHeroSection />
      </Suspense>

      {/* About Me Preview */}
      <Suspense fallback={<div>Loading...</div>}>
        <AboutPreview />
      </Suspense>

      {/* Services Teaser */}
      <Suspense fallback={<div>Loading...</div>}>
        <ServicesTeaser />
      </Suspense>

      {/* AI News Highlight */}
      <Suspense fallback={<div>Loading...</div>}>
        <AINewsCarousel />
      </Suspense>

      {/* Contact CTA */}
      <Suspense fallback={<div>Loading...</div>}>
        <ContactCTA />
      </Suspense>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
