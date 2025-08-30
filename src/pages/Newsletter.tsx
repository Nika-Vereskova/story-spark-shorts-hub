import React from 'react';
import Navigation from '@/components/Navigation';
import NewsletterAutomation from '@/components/NewsletterAutomation';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import AdSenseUnit from '@/components/AdSenseUnit';

const Newsletter = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-parchment bg-gear-pattern">
        <Navigation />
      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl text-oxidized-teal mb-4 font-playfair">
            Access Restricted
          </h1>
          <p className="text-oxidized-teal/80 font-inter">
            Admin access required to view newsletter automation settings.
          </p>
          <AdSenseUnit
            adSlot="9759787900"
            adFormat="autorelaxed"
            className="my-8"
          />
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern">
      <Navigation />
      
        <div className="pt-24 pb-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">
                Newsletter Automation
            </h1>
            <p className="text-xl text-oxidized-teal/80 font-inter">
              Set up your weekly AI-powered newsletter with Zapier integration
            </p>
            </div>

            <NewsletterAutomation />
            <AdSenseUnit
              adSlot="9759787900"
              adFormat="autorelaxed"
              className="my-8"
            />
          </div>
        </div>
      </div>
    );
  };

export default Newsletter;
