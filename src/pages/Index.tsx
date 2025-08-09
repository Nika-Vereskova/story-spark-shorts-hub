
import React from 'react';
import { posthog } from '@/lib/posthog';
import Navigation from '@/components/Navigation';
import SplitHeroSection from '@/components/SplitHeroSection';
import FeaturedServices from '@/components/FeaturedServices';
import AINewsCarousel from '@/components/AINewsCarousel';
import NewsletterSection from '@/components/NewsletterSection';
import TestimonialSlider from '@/components/TestimonialSlider';
import CalloutFooter from '@/components/CalloutFooter';
import Footer from '@/components/Footer';
import HeroBanner from '@/components/HeroBanner';

const Index = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Rendering revamped Index page');
  }

  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern">
      {/* Navigation */}
      <Navigation currentPage="home" />

      {/* Hero Banner */}
      <HeroBanner
        title="Story Spark Shorts"
        subtitle="Short tales to ignite imagination"
      />

      {/* Split-Hero Banner */}
      <SplitHeroSection />

      {/* Featured Services (3 side-by-side cards) */}
      <FeaturedServices />

      {/* Latest AI News Carousel */}
      <AINewsCarousel />

      {/* Newsletter Strip */}
      <NewsletterSection />

      {/* Testimonial Slider */}
      <TestimonialSlider />

      {/* Call-out Footer Block */}
      <CalloutFooter />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
