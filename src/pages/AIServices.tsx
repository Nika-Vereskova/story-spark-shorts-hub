import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ServicesHeader from '@/components/ServicesHeader';
import ServicesDisclaimer from '@/components/ServicesDisclaimer';
import ServicesGrid from '@/components/ServicesGrid';
import SEO from '@/components/SEO';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import AdSenseBanner from '@/components/AdSenseBanner';
import AdSenseSquare from '@/components/AdSenseSquare';
import { t } from '@/lib/i18n';

const AIServices = () => {
  return (
    <div className="min-h-screen bg-parchment">
      <SEO title="AI Consulting Services | STEaM LOGIC Studio AB" description="AI strategy, custom GPT development, automation, and training by STEaM LOGIC Studio AB. Led by CEO Renata Khakimova." />
      <Navigation currentPage="ai-services" />
      <main className="pt-20 pb-12">
        <AdSenseBanner position="top" />
        <div className="container mx-auto px-6">
          <BreadcrumbNav items={[{ label: t('nav.aiServices') || 'AI Services' }]} />
          <ServicesHeader />
          <AdSenseSquare size="medium" />
          <ServicesDisclaimer />
          <ServicesGrid />
          <AdSenseBanner position="bottom" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIServices;