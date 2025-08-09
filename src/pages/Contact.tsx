
import React from 'react';
import Navigation from '@/components/Navigation';
import ContactHeader from '@/components/ContactHeader';
import EmailContactCard from '@/components/EmailContactCard';
import SocialLinksGrid from '@/components/SocialLinksGrid';
import NewsletterSignup from '@/components/NewsletterSignup';

const Contact = () => {
  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern">
      <Navigation currentPage="contact" />

      <div className="pt-6 md:pt-10 pb-6 md:pb-10 px-6">
        <div className="container mx-auto max-w-[1080px]">
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
