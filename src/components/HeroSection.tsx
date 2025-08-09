import React from 'react';
import { Cog, Key, Play, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { t } from '@/lib/i18n';
import { posthog } from '@/lib/posthog';

interface HeroSectionProps {
  onReadExcerpt: () => void;
}

const HeroSection = ({ onReadExcerpt }: HeroSectionProps) => {
  const handleBuyPlumberella = () => {
    posthog.capture('book_purchase_clicked', {
      book_title: 'Plumberella',
      source: 'hero_section'
    });
    
    window.open('https://amzn.eu/d/hmK81Zj', '_blank', 'noopener,noreferrer');
  };

  const handleWatchStoryTime = () => {
    posthog.capture('story_video_clicked', {
      source: 'hero_section'
    });
    
    window.open('https://www.youtube.com/@NikaVereskova/videos', '_blank', 'noopener,noreferrer');
  };

  return (
    // Adjusted padding-top using responsive classes to better fit varying header heights.
    // Also ensuring min-h-screen to make sure content doesn't get cut off vertically.
    <section className="pt-16 sm:pt-24 md:pt-32 pb-40 px-6 relative overflow-hidden min-h-screen">
      {/* Animated Clockwork Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 opacity-10">
          <Cog className="w-full h-full text-brass animate-spin" style={{ animationDuration: '12s' }} />
        </div>
        <div className="absolute top-40 right-20 w-24 h-24 opacity-15">
          <Cog className="w-full h-full text-oxidized-teal animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
        </div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 opacity-10">
          <Cog className="w-full h-full text-brass animate-spin" style={{ animationDuration: '12s' }} />
        </div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 opacity-15">
          <Cog className="w-full h-full text-oxidized-teal animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
        </div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="sr-only">
              {t('home.title')}
            </h1>
            <p className="text-xl text-oxidized-teal/80 mb-8 max-w-2xl font-inter">
              {t('home.subtitle')}
              <br /><br />
              {t('home.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-brass hover:bg-brass-dark text-parchment px-8 py-3 text-lg border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                onClick={onReadExcerpt}
              >
                <Key className="mr-2 h-5 w-5" />
                {t('home.featuredBook')}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 px-8 py-3 text-lg shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium hover:sepia"
                onClick={handleWatchStoryTime}
              >
                <Play className="mr-2 h-5 w-5" />
                {t('home.watchVideos')}
              </Button>
            </div>
          </div>
          
          {/* Featured Book - Plumberella */}
          <div className="animate-scale-in">
            <Card className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 hover:scale-105 shadow-brass-drop relative overflow-hidden">
              {/* Ornate brass corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass"></div>
              
              <div className="relative overflow-hidden">
                <img 
                  src="/lovable-uploads/64f9c8ed-7532-43d6-a694-85153b7cae57.png"
                  alt="Plumberella - Latest Children's Book"
                  className="w-full h-80 object-cover transition-all duration-300 hover:scale-110 hover:sepia"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-4 py-2 bg-brass/90 text-parchment border border-brass-dark font-medium font-inter flex items-center">
                    <Cog className="w-3 h-3 mr-1" />
                    {t('common.featured')}
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-oxidized-teal text-2xl font-playfair drop-shadow-text-drop">Plumberella</CardTitle>
                <CardDescription className="text-brass font-medium font-inter">{t('common.ageRange')} • Steampunk Fairy Tale</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-oxidized-teal/80 mb-6 font-inter">
                  Plumberella is a witty, heartwarming steampunk fairytale about a girl, a vanishing bathroom, and the invention of truth.
                  <br /><br />
                  When a charming but deceitful stepmother moves in, young Plumberella finds herself banished to the basement while frilly dresses replace her tools. But she isn't the type to mope — she's a certified pipe-wrangler with a talent for fixing more than just faucets.
                </p>
                <Button 
                  className="w-full bg-oxidized-teal hover:bg-oxidized-teal-light text-parchment border-2 border-oxidized-teal-light shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                  onClick={handleBuyPlumberella}
                >
                  Buy on Amazon KDP
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;