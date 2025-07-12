
import React from 'react';
import Navigation from '@/components/Navigation';
import { t } from '@/lib/i18n';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-parchment">
      <Navigation currentPage="privacy" />
      
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold text-oxidized-teal mb-8 text-center font-playfair">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg max-w-none text-oxidized-teal/90 font-inter space-y-6">
          <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-2xl font-bold text-oxidized-teal mb-4 font-playfair">Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you subscribe to our newsletter or contact us.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-oxidized-teal mb-4 font-playfair">Cookies and Tracking</h2>
            <p>We use cookies and similar tracking technologies to track activity on our website and store certain information. We use Google Analytics and PostHog for analytics purposes.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-oxidized-teal mb-4 font-playfair">Third-Party Advertising</h2>
            <p>We use Google AdSense to serve advertisements on our website. Google may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google's Ads Settings.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-oxidized-teal mb-4 font-playfair">Data Protection</h2>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-oxidized-teal mb-4 font-playfair">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us through our contact page.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
