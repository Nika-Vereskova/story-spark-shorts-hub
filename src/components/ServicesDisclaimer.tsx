
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Construction } from 'lucide-react';
import { t } from '@/lib/i18n';

const ServicesDisclaimer = () => {
  return (
    <Alert className="mb-8 bg-amber-50/80 border-2 border-amber-200 text-amber-800">
      <Construction className="h-4 w-4" />
      <AlertTitle className="font-playfair text-lg">{t('services.disclaimer.title')}</AlertTitle>
      <AlertDescription className="font-inter">
        {t('services.disclaimer.description')}
      </AlertDescription>
    </Alert>
  );
};

export default ServicesDisclaimer;
