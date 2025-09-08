
import React from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { t } from '@/lib/i18n';

const EmailContactCard = () => {
  return (
    <Card className="bg-parchment/90 border-2 border-brass shadow-brass-drop relative">
      {/* Ornate brass corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass"></div>
      
      <CardHeader>
        <CardTitle className="text-oxidized-teal text-2xl font-playfair drop-shadow-text-drop flex items-center">
          <Mail className="mr-2 h-6 w-6" />
          {t('contact.emailDirect')}
        </CardTitle>
        <CardDescription className="text-oxidized-teal/80 font-inter">
          {t('contact.emailDesc')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          size="lg" 
          className="bg-brass hover:bg-brass-dark text-parchment px-8 py-3 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
          onClick={() => window.location.href = 'mailto:hello@steamlogic.se'}
        >
          <Mail className="mr-2 h-5 w-5" />
          {t('contact.sendEmail')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmailContactCard;
