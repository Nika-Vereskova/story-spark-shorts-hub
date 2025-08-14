
import React from 'react';
import { t } from '@/lib/i18n';

const ServicesHeader = () => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-6xl mb-6 victorian-heading">
        {t('services.title')}
      </h1>
      <p className="text-xl max-w-3xl mx-auto leading-relaxed victorian-subheading">
        {t('services.subtitle')}
      </p>
    </div>
  );
};

export default ServicesHeader;
