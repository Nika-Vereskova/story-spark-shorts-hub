import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ServicesHeader from '@/components/ServicesHeader';
import ServicesDisclaimer from '@/components/ServicesDisclaimer';
import ServicesGrid from '@/components/ServicesGrid';
import SEO from '@/components/SEO';

const AIServices = () => {
  return (
    <div className="min-h-screen bg-parchment">
      <SEO title="AI Services – Strategy, Custom GPTs, Workshops" description="Practical AI services: roadmaps, custom GPTs, automation, and training." />
      <Navigation currentPage="ai-services" />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          <ServicesHeader />
          <ServicesDisclaimer />
          <ServicesGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIServices;