
import React from 'react';
import Navigation from '@/components/Navigation';
import { t } from '@/lib/i18n';

const Terms = () => {
 return (
 <div className="min-h-screen bg-parchment">
 <Navigation currentPage="terms" />
 
 <div className="container mx-auto px-6 py-6 md:py-10 max-w-[1080px]">
 <h1 className="text-4xl font-bold text-oxidized-teal mb-8 text-center font-playfair">
 {t('termsPage.title')}
 </h1>
 
 <div className="prose prose-lg max-w-none text-oxidized-teal/90 space-y-6">
 <p>
 <strong>{t('termsPage.lastUpdated')}</strong>{' '}
 {new Date().toLocaleDateString()}
 </p>
 
 <section>
 <h2 className="text-2xl font-bold text-oxidized-teal mb-4 font-playfair">
 {t('termsPage.acceptance.title')}
 </h2>
 <p>{t('termsPage.acceptance.text')}</p>
 </section>
 
 <section>
 <h2 className="text-2xl font-bold text-oxidized-teal mb-4 font-playfair">
 {t('termsPage.license.title')}
 </h2>
 <p>{t('termsPage.license.text')}</p>
 </section>
 
 <section>
 <h2 className="text-2xl font-bold text-oxidized-teal mb-4 font-playfair">
 {t('termsPage.disclaimer.title')}
 </h2>
 <p>{t('termsPage.disclaimer.text')}</p>
 </section>
 
 <section>
 <h2 className="text-2xl font-bold text-oxidized-teal mb-4 font-playfair">
 {t('termsPage.limitations.title')}
 </h2>
 <p>{t('termsPage.limitations.text')}</p>
 </section>
 
 <section>
 <h2 className="text-2xl font-bold text-oxidized-teal mb-4 font-playfair">
 {t('termsPage.contact.title')}
 </h2>
 <p>{t('termsPage.contact.text')}</p>
 </section>
 </div>
 </div>
 </div>
 );
};

export default Terms;
