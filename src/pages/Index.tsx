
import React, { Suspense } from 'react';
import Navigation from '@/components/Navigation';
const SplitHeroSection = React.lazy(() => import('@/components/SplitHeroSection'));
const FeaturedServices = React.lazy(() => import('@/components/FeaturedServices'));
const AINewsCarousel = React.lazy(() => import('@/components/AINewsCarousel'));
const TestimonialSlider = React.lazy(() => import('@/components/TestimonialSlider'));
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Index = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Rendering revamped Index page');
  }

  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern">
      <SEO title="AI & Storytelling Services – STEaM LOGIC" description="Building futures with AI animation, custom GPTs, and enchanting books. Explore services and stories." />
      {/* Navigation */}
      <Navigation currentPage="home" />

      {/* Split-Hero Banner */}
      <Suspense fallback={<div>Loading...</div>}>
        <SplitHeroSection />
      </Suspense>

      {/* Featured Services (3 side-by-side cards) */}
      <Suspense fallback={<div>Loading...</div>}>
        <FeaturedServices />
      </Suspense>

      {/* Latest AI News Carousel */}
      <Suspense fallback={<div>Loading...</div>}>
        <AINewsCarousel />
      </Suspense>

      {/* Testimonial Slider */}
      <Suspense fallback={<div>Loading...</div>}>
        <TestimonialSlider />
      </Suspense>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
