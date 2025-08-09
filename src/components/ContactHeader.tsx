
import React from 'react';
import { t } from '@/lib/i18n';

const ContactHeader = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-5xl font-bold text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">
        {t('contact.title')}
      </h1>
      <p className="text-xl text-oxidized-teal/80 max-w-2xl mx-auto">
        {t('contact.subtitle')}
      </p>
    </div>
  );
};

export default ContactHeader;
