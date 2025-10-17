
import React from 'react';
import Navigation from '@/components/Navigation';
import { t } from '@/lib/i18n';
import SEO from '@/components/SEO';
import AdSenseUnit from '@/components/AdSenseUnit';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-parchment">
      <SEO title="Privacy Policy – STEaM LOGIC" description="Read our privacy practices and data protection policy." />
      <Navigation currentPage="privacy" />
      
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <h1 className="text-4xl text-oxidized-teal mb-8 text-center font-playfair">
          {t('privacyPage.title')}
        </h1>
        
        <div className="prose prose-lg max-w-none text-oxidized-teal/90 font-inter space-y-6">
          <p>
            <strong>{t('privacyPage.lastUpdated')}</strong>{' '}
            {new Date().toLocaleDateString()}
          </p>
          
          <section>
            <h2 className="text-2xl text-oxidized-teal mb-4 font-playfair">
              {t('privacyPage.infoCollect.title')}
            </h2>
            <p>{t('privacyPage.infoCollect.text')}</p>
          </section>
          
          <section>
            <h2 className="text-2xl text-oxidized-teal mb-4 font-playfair">
              {t('privacyPage.cookies.title')}
            </h2>
            <p>{t('privacyPage.cookies.text')}</p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('privacyPage.cookies.list[0]')}</li>
              <li>{t('privacyPage.cookies.list[1]')}</li>
              <li>{t('privacyPage.cookies.list[2]')}</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl text-oxidized-teal mb-4 font-playfair">
              {t('privacyPage.advertising.title')}
            </h2>
            <p>{t('privacyPage.advertising.text')}</p>
          </section>
          
          <section>
            <h2 className="text-2xl text-oxidized-teal mb-4 font-playfair">
              {t('privacyPage.dataProtection.title')}
            </h2>
            <p>{t('privacyPage.dataProtection.text')}</p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('privacyPage.dataProtection.list[0]')}</li>
              <li>{t('privacyPage.dataProtection.list[1]')}</li>
              <li>{t('privacyPage.dataProtection.list[2]')}</li>
              <li>{t('privacyPage.dataProtection.list[3]')}</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl text-oxidized-teal mb-4 font-playfair">
              {t('privacyPage.rights.title')}
            </h2>
            <p>{t('privacyPage.rights.text')}</p>
          </section>
          
          <section>
            <h2 className="text-2xl text-oxidized-teal mb-4 font-playfair">
              {t('privacyPage.contact.title')}
            </h2>
            <p>{t('privacyPage.contact.text')}</p>
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

export default Privacy;
