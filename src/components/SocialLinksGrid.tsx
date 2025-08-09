
import React from 'react';
import { ExternalLink, Facebook, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { t } from '@/lib/i18n';

const SocialLinksGrid = () => {
  const socialLinks = [
    {
      name: t('contact.youtube'),
      url: 'https://www.youtube.com/@NikaVereskova',
      icon: Youtube,
      description: t('contact.youtubeDesc')
    },
    {
      name: t('contact.instagram'),
      url: 'https://www.instagram.com/vereskovanika',
      icon: Instagram,
      description: t('contact.instagramDesc')
    },
    {
      name: t('contact.facebook'),
      url: 'https://www.facebook.com/profile.php?id=61577838015246',
      icon: Facebook,
      description: t('contact.facebookDesc')
    }
  ];

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-oxidized-teal mb-8 text-center font-playfair drop-shadow-text-drop">
        {t('contact.socialTitle')}
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {socialLinks.map((social, index) => {
          const IconComponent = social.icon;
          return (
            <Card key={index} className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 hover:scale-105 shadow-brass-drop relative">
              {/* Ornate brass corners */}
              <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-brass"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-brass"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-brass"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-brass"></div>
              
              <CardHeader>
                <CardTitle className="text-oxidized-teal text-xl font-playfair drop-shadow-text-drop flex items-center">
                  <IconComponent className="mr-2 h-6 w-6" />
                  {social.name as string}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-oxidized-teal/80 mb-4 text-sm">
                  {social.description as string}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-brass text-brass hover:bg-brass hover:text-parchment transition-all duration-300 font-medium"
                  onClick={() => window.open(social.url, '_blank', 'noopener,noreferrer')}
                >
                  {t<string>('contact.visit')} {social.name as string}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinksGrid;
