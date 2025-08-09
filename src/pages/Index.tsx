
import React, { Suspense } from 'react';
import Navigation from '@/components/Navigation';
const SplitHeroSection = React.lazy(() => import('@/components/SplitHeroSection'));
const FeaturedServices = React.lazy(() => import('@/components/FeaturedServices'));
const AINewsCarousel = React.lazy(() => import('@/components/AINewsCarousel'));
const NewsletterSection = React.lazy(() => import('@/components/NewsletterSection'));
const TestimonialSlider = React.lazy(() => import('@/components/TestimonialSlider'));
const CalloutFooter = React.lazy(() => import('@/components/CalloutFooter'));
import Footer from '@/components/Footer';

const Index = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Rendering revamped Index page');
  }

  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern">
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

      {/* Newsletter Strip */}
      <Suspense fallback={<div>Loading...</div>}>
        <NewsletterSection />
      </Suspense>

      {/* Testimonial Slider */}
      <Suspense fallback={<div>Loading...</div>}>
        <TestimonialSlider />
      </Suspense>

      {/* Call-out Footer Block */}
      <Suspense fallback={<div>Loading...</div>}>
        <CalloutFooter />
      </Suspense>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
