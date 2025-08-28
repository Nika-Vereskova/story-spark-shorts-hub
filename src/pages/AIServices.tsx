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
      <SEO title="AI Consulting Services - STEaM LOGIC Studio AB | Expert AI Strategy & Automation" description="STEaM LOGIC Studio AB provides practical AI services: strategic roadmaps, custom GPT development, intelligent automation, and professional AI training worldwide." />
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