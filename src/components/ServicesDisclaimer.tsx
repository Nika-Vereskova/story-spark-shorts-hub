
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Construction } from 'lucide-react';

const ServicesDisclaimer = () => {
  return (
    <Alert className="mb-8 bg-amber-50/80 border-2 border-amber-200 text-amber-800">
      <Construction className="h-4 w-4" />
      <AlertTitle className="font-playfair text-lg">Services Under Construction</AlertTitle>
      <AlertDescription className="font-inter">
        Please note that all services listed below are currently under construction and not yet available for purchase. 
        This page is for demonstration purposes only. We're working hard to bring these services to you soon!
      </AlertDescription>
    </Alert>
  );
};

export default ServicesDisclaimer;
