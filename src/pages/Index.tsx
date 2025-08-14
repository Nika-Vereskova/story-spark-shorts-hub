
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

const Index = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Rendering revamped Index page');
  }

  return (
    <div className="min-h-screen">
      <SEO title="STEaM LOGIC Studio AB - Inventive Storytelling × Intelligent Technology" description="Where story magic meets machine logic. AI consulting, storytelling, and creative technology solutions by Nika Vereskova." />
      
      {/* Navigation */}
      <Navigation currentPage="home" />

      {/* Hero Section - White background */}
      <section className="bg-white border-t border-black/[0.06] py-18 md:py-24">
        <div className="max-w-[1100px] mx-auto px-6">
          <NewHeroSection />
        </div>
      </section>

      {/* About Me Preview - Parchment background */}
      <section className="bg-parchment border-t border-black/[0.06] py-12 md:py-18">
        <div className="max-w-[1100px] mx-auto px-6">
          <AboutPreview />
        </div>
      </section>

      {/* Services Teaser - White background */}
      <section className="bg-white border-t border-black/[0.06] py-12 md:py-18">
        <div className="max-w-[1100px] mx-auto px-6">
          <ServicesTeaser />
        </div>
      </section>

      {/* AI News Highlight - Parchment background */}
      <section className="bg-parchment border-t border-black/[0.06] py-12 md:py-18">
        <div className="max-w-[1100px] mx-auto px-6">
          <Suspense fallback={<div>Loading...</div>}>
            <AINewsCarousel />
          </Suspense>
        </div>
      </section>

      {/* Contact CTA - White background */}
      <section className="bg-white border-t border-black/[0.06] py-12 md:py-18">
        <div className="max-w-[1100px] mx-auto px-6">
          <Suspense fallback={<div>Loading...</div>}>
            <ContactCTA />
          </Suspense>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
