
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ServicesHeader from '@/components/ServicesHeader';
import ServicesDisclaimer from '@/components/ServicesDisclaimer';
import ServicesGrid from '@/components/ServicesGrid';
import SEO from '@/components/SEO';

const Services = () => {
  return (
    <div className="min-h-screen bg-parchment">
      <SEO title="AI Services - STEaM LOGIC Studio AB | Custom GPT Development & AI Strategy" description="Professional AI services from STEaM LOGIC Studio AB: AI strategy, custom GPT development, and hands-on workshops to transform your business with intelligent technology." />
      <Navigation currentPage="services" />
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

export default Services;
