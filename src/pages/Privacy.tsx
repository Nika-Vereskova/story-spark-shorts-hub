
import React from 'react';
import Navigation from '@/components/Navigation';
import { t } from '@/lib/i18n';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-parchment">
      <Navigation currentPage="privacy" />
      
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <h1 className="text-4xl text-oxidized-teal mb-8 text-center font-playfair">
          {t('privacyPage.title')}
        </h1>
        
        <div className="prose prose-lg max-w-none text-oxidized-teal/90 font-playfair space-y-6">
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
      </div>
    </div>
  );
};

export default Privacy;
