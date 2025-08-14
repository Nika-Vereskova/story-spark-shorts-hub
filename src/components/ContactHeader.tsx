
import React from 'react';
import { t } from '@/lib/i18n';

const ContactHeader = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-6xl mb-4 victorian-heading">
        {t('contact.title')}
      </h1>
      <p className="text-xl max-w-2xl mx-auto victorian-subheading">
        {t('contact.subtitle')}
      </p>
    </div>
  );
};

export default ContactHeader;
