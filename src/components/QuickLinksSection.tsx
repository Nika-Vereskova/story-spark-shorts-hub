
import React from 'react';
import { Key, Cog, Glasses, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { t } from '@/lib/i18n';

const QuickLinksSection = () => {
  return (
    <section className="py-16 px-6 bg-gear-etch/20">
      <div className="container mx-auto">
        <h2 className="text-4xl text-oxidized-teal mb-12 text-center font-playfair drop-shadow-text-drop">{t('home.exploreBooks')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 hover:scale-105 shadow-brass-drop relative">
            {/* Ornate brass corners */}
            <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-brass"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-brass"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-brass"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-brass"></div>
            
            <CardHeader>
              <CardTitle className="text-oxidized-teal text-xl font-playfair drop-shadow-text-drop flex items-center">
                <Key className="mr-2 h-6 w-6" />
                {t('nav.books')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-oxidized-teal/80 mb-4 font-inter">
                {t('books.subtitle')}
              </p>
              <Link to="/books">
                <Button 
                  variant="outline" 
                  className="border-2 border-brass text-brass hover:bg-brass/10 shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                >
                  {t('home.exploreBooks')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 hover:scale-105 shadow-brass-drop relative">
            {/* Ornate brass corners */}
            <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-brass"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-brass"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-brass"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-brass"></div>
            
            <CardHeader>
              <CardTitle className="text-oxidized-teal text-xl font-playfair drop-shadow-text-drop flex items-center">
                <Cog className="mr-2 h-6 w-6" />
                {t('nav.videos')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-oxidized-teal/80 mb-4 font-inter">
                {t('videos.subtitle')}
              </p>
              <Link to="/videos">
                <Button 
                  variant="outline" 
                  className="border-2 border-brass text-brass hover:bg-brass/10 shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium hover:sepia"
                >
                  {t('home.watchVideos')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 hover:scale-105 shadow-brass-drop relative">
            {/* Ornate brass corners */}
            <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-brass"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-brass"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-brass"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-brass"></div>
            
            <CardHeader>
              <CardTitle className="text-oxidized-teal text-xl font-playfair drop-shadow-text-drop flex items-center">
                <Glasses className="mr-2 h-6 w-6" />
                {t('nav.about')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-oxidized-teal/80 mb-4 font-inter">
                {t('about.subtitle')}
              </p>
              <Link to="/about">
                <Button 
                  variant="outline" 
                  className="border-2 border-brass text-brass hover:bg-brass/10 shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                >
                  {t('home.learnMore')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuickLinksSection;
