
import React from 'react';
import { t } from '@/lib/i18n';

const ServicesHeader = () => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl text-oxidized-teal mb-6 font-playfair drop-shadow-text-drop">
        {t('services.title')}
      </h1>
      <p className="text-xl text-oxidized-teal/80 max-w-3xl mx-auto font-playfair leading-relaxed">
        {t('services.subtitle')}
      </p>
    </div>
  );
};

export default ServicesHeader;
