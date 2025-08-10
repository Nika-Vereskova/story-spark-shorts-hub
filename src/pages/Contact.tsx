
import React from 'react';
import Navigation from '@/components/Navigation';
import ContactHeader from '@/components/ContactHeader';
import EmailContactCard from '@/components/EmailContactCard';
import SocialLinksGrid from '@/components/SocialLinksGrid';
import NewsletterSignup from '@/components/NewsletterSignup';
import SEO from '@/components/SEO';

const Contact = () => {
  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern">
      <SEO title="Contact – STEaM LOGIC Studio AB" description="Get in touch about AI services, books, or collaborations." />
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
