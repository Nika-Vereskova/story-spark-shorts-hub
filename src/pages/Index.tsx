
import React, { useState } from 'react';
import { posthog } from '@/lib/posthog';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ExcerptModal from '@/components/ExcerptModal';
import QuickLinksSection from '@/components/QuickLinksSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [showExcerpt, setShowExcerpt] = useState(false);

  const handleReadExcerpt = () => {
    // Track engagement event
    posthog.capture('excerpt_opened', {
      book_title: 'Plumberella',
      source: 'hero_section'
    });
    
    setShowExcerpt(true);
  };

  const handleCloseExcerpt = () => {
    setShowExcerpt(false);
  };

  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern">
      {/* Navigation */}
      <Navigation currentPage="home" />

      {/* Hero Section with Clockwork Animation */}
      <HeroSection onReadExcerpt={handleReadExcerpt} />

      {/* Excerpt Modal */}
      <ExcerptModal isOpen={showExcerpt} onClose={handleCloseExcerpt} />

      {/* Quick Links Section */}
      <QuickLinksSection />

      {/* Newsletter Signup Section */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
