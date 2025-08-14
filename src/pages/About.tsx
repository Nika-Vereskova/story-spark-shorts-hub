
import React from 'react';
import { Mail, ExternalLink, Wrench, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { t } from '@/lib/i18n';
import Navigation from '@/components/Navigation';
import SEO from '@/components/SEO';

const About = () => {
  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern relative">
      {/* Clockwork Gear Decorations */}
      <Settings className="absolute top-24 right-8 w-16 h-16 text-brass/15 animate-gear-rotation" />
      <Settings className="absolute top-1/2 left-8 w-12 h-12 text-brass/20 animate-gear-rotation" style={{animationDelay: '2s'}} />
      <Settings className="absolute bottom-32 right-1/4 w-10 h-10 text-brass/10 animate-gear-rotation" style={{animationDelay: '4s'}} />
      <SEO title="About Nika Vereskova – STEaM LOGIC" description="Author and AI consultant behind STEaM LOGIC Studio AB." />
      <Navigation currentPage="about" />

      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">
              {t('about.title')}
            </h1>
            <p className="text-xl text-brass font-inter">
              {t('about.subtitle')}
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Photo */}
            <div className="lg:col-span-1">
              <div className="w-full max-w-sm mx-auto relative">
                {/* Ornate brass frame */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-brass"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 border-r-4 border-t-4 border-brass"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-4 border-b-4 border-brass"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-brass"></div>
                
                <img
                  src="/lovable-uploads/8b2801e0-86c4-4ebc-9c8d-e51acaef11d8.png"
                  alt="Nika Vereskova"
                  loading="lazy"
                  className="w-full h-80 object-cover border-4 border-brass shadow-brass-drop"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-2">
              <Card className="bg-parchment/90 border-2 border-brass shadow-brass-drop relative">
                {/* Ornate brass corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass"></div>
                
                <CardContent className="p-8">
                  <h2 className="text-2xl text-oxidized-teal mb-6 font-playfair drop-shadow-text-drop flex items-center">
                    <Wrench className="mr-2 h-6 w-6" />
                    {t('about.myStory')}
                  </h2>
                  <div className="space-y-4 text-oxidized-teal/80 leading-relaxed font-inter">
                    <p>{t('about.bio1')}</p>
                    <p>{t('about.bio2')}</p>
                    <p>{t('about.bio3')}</p>
                    <p>{t('about.bio4')}</p>
                    <p>{t('about.bio5')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Links */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl text-oxidized-teal mb-8 font-playfair drop-shadow-text-drop">
              {t('about.connect')}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-brass hover:bg-brass-dark text-parchment px-8 py-3 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                onClick={() => window.location.href = 'mailto:nika.vereskova@gmail.com'}
              >
                <Mail className="mr-2 h-5 w-5" />
                nika.vereskova@gmail.com
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 px-8 py-3 shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                {t('about.followSocial')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
