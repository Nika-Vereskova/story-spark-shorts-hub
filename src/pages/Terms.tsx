
import React from 'react';
import Navigation from '@/components/Navigation';
import { t } from '@/lib/i18n';
import SEO from '@/components/SEO';
import AdSenseUnit from '@/components/AdSenseUnit';

const Terms = () => {
  return (
    <div className="min-h-screen bg-parchment">
      <SEO title="Terms of Service – STEaM LOGIC" description="Read our terms of service and usage guidelines." noindex />
      <Navigation currentPage="terms" />
      
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <h1 className="text-4xl text-oxidized-teal mb-8 text-center font-playfair">
          {t('termsPage.title')}
        </h1>
        
        <div className="prose prose-lg max-w-none text-oxidized-teal/90 font-inter space-y-6">
          <p>
            <strong>{t('termsPage.lastUpdated')}</strong>{' '}
            {new Date().toLocaleDateString()}
          </p>
          
          <section>
            <h2 className="text-2xl text-oxidized-teal mb-4 font-playfair">
              {t('termsPage.acceptance.title')}
            </h2>
            <p>{t('termsPage.acceptance.text')}</p>
          </section>
          
          <section>
            <h2 className="text-2xl text-oxidized-teal mb-4 font-playfair">
              {t('termsPage.license.title')}
            </h2>
            <p>{t('termsPage.license.text')}</p>
          </section>
          
          <section>
            <h2 className="text-2xl text-oxidized-teal mb-4 font-playfair">
              {t('termsPage.disclaimer.title')}
            </h2>
            <p>{t('termsPage.disclaimer.text')}</p>
          </section>
          
          <section>
            <h2 className="text-2xl text-oxidized-teal mb-4 font-playfair">
              {t('termsPage.limitations.title')}
            </h2>
            <p>{t('termsPage.limitations.text')}</p>
          </section>
          
          <section>
            <h2 className="text-2xl text-oxidized-teal mb-4 font-playfair">
              {t('termsPage.contact.title')}
            </h2>
            <p>{t('termsPage.contact.text')}</p>
          </section>
        </div>
        <AdSenseUnit
          adSlot="9759787900"
          adFormat="autorelaxed"
          className="my-8"
        />
      </div>
    </div>
  );
};

export default Terms;
