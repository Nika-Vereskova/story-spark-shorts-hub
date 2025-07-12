
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
            <p>We collect information you provide directly to us, such as when you subscribe to our newsletter or contact us. We do not store personal email addresses in our analytics systems.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-oxidized-teal mb-4 font-playfair">Cookies and Tracking</h2>
            <p>We use cookies and similar tracking technologies to track activity on our website and store certain information. We use PostHog for analytics purposes with privacy-preserving practices:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>We track user interactions without storing personal identifiers</li>
              <li>Email addresses are hashed before any analytics processing</li>
              <li>We collect anonymized usage statistics to improve our services</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-oxidized-teal mb-4 font-playfair">Third-Party Advertising</h2>
            <p>We use Google AdSense to serve advertisements on our website. Google may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google's Ads Settings.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-oxidized-teal mb-4 font-playfair">Data Protection</h2>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our security practices include:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Input validation and sanitization</li>
              <li>Secure data transmission</li>
              <li>Privacy-preserving analytics</li>
              <li>Regular security reviews</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-oxidized-teal mb-4 font-playfair">Your Rights</h2>
            <p>You have the right to access, update, or delete your personal information. Since we minimize data collection and use privacy-preserving techniques, most interactions are anonymous by design.</p>
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
