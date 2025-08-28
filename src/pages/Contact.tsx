
import React from 'react';
import { Settings } from 'lucide-react';
import Navigation from '@/components/Navigation';
import ContactHeader from '@/components/ContactHeader';
import EmailContactCard from '@/components/EmailContactCard';
import SocialLinksGrid from '@/components/SocialLinksGrid';
import NewsletterSignup from '@/components/NewsletterSignup';
import SEO from '@/components/SEO';

const Contact = () => {
  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern relative">
      {/* Clockwork Gear Decorations */}
      <Settings className="absolute top-28 right-8 w-12 h-12 text-brass/15 animate-gear-rotation" style={{animationDelay: '2s'}} />
      <Settings className="absolute top-2/3 left-12 w-10 h-10 text-brass/20 animate-gear-rotation" style={{animationDelay: '4s'}} />
      <Settings className="absolute bottom-40 right-1/4 w-14 h-14 text-brass/10 animate-gear-rotation" style={{animationDelay: '1s'}} />
      <SEO title="Contact STEaM LOGIC Studio AB - AI Consulting & Custom GPT Development" description="Contact STEaM LOGIC Studio AB for AI consulting, custom GPT development, automation solutions, and AI strategy. Expert AI services by Nika Vereskova." />
      <Navigation currentPage="contact" />

      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <ContactHeader />
          
          <div className="mb-12">
            <EmailContactCard />
          </div>

          <SocialLinksGrid />

          <NewsletterSignup />
        </div>
      </div>
    </div>
  );
};

export default Contact;
