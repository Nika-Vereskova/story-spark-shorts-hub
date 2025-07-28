import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ServicesHeader from '@/components/ServicesHeader';
import ServicesDisclaimer from '@/components/ServicesDisclaimer';
import ServicesGrid from '@/components/ServicesGrid';

const AIServices = () => {
  return (
    <div className="min-h-screen bg-parchment">
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