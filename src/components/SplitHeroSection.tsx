import React from 'react';
import { Cog, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { t, getCurrentLocale } from '@/lib/i18n';
import { posthog } from '@/lib/posthog';
import { useNavigate } from 'react-router-dom';

const SplitHeroSection = () => {
  const navigate = useNavigate();
  const locale = getCurrentLocale();

  const handleBookSample = () => {
    posthog.capture('book_sample_clicked', {
      book_title: 'Plumberella',
      source: 'split_hero'
    });
    navigate(`/${locale}/books`);
  };

  const handleAIServices = () => {
    posthog.capture('ai_services_clicked', {
      source: 'split_hero'
    });
    navigate(`/${locale}/ai-services`);
  };
  return (
    <>
      {/* Short & Punchy Banner */}
      <section 
        className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-parchment to-brass border-b border-brass/30"
      >
        {/* Minimal cog line-drawing in corner */}
        <div className="absolute -bottom-6 -right-6 opacity-20 pointer-events-none">
          <Cog className="w-24 sm:w-32 h-24 sm:h-32 text-brass" strokeWidth={1} />
        </div>

        <div className="container mx-auto relative z-10 min-h-[320px] sm:min-h-[280px] lg:min-h-[320px] flex items-center">
          <div className="max-w-3xl w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair text-oxidized-teal leading-tight">
              Building Futures with AI & Storytelling
            </h1>
            <p className="mt-3 sm:mt-4 text-oxidized-teal/80 text-base sm:text-lg font-inter">
              AI animation, custom GPTs, and enchanting books for curious minds.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button variant="steam" size="lg" onClick={handleAIServices} className="w-full sm:w-auto">
                Explore Our Services
              </Button>
              <Button variant="outline" size="lg" onClick={handleBookSample} className="w-full sm:w-auto">
                Read a Sample Chapter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section - Featured Book & AI Services */}
      <section className="py-12 px-6 bg-parchment">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Panel - Plumberella */}
            <Card className="card bg-parchment hover:border-brass-dark transition-all duration-300 hover:scale-105 shadow-brass-drop relative overflow-hidden">
              {/* Ornate brass corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass"></div>
              
              <div className="relative overflow-hidden">
                <AspectRatio ratio={4/3}>
                  <img
                    src="/lovable-uploads/64f9c8ed-7532-43d6-a694-85153b7cae57.png"
                    alt={t('splitHero.altText')}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-300 hover:scale-110 hover:sepia"
                  />
                </AspectRatio>
                <div className="absolute top-4 right-4">
                  <span className="px-4 py-2 bg-brass/90 text-parchment border border-brass-dark font-medium font-inter flex items-center">
                    <Book className="w-3 h-3 mr-1" />
                    {t('splitHero.featuredBook')}
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-oxidized-teal text-3xl font-playfair drop-shadow-text-drop">{t('splitHero.plumberellaTitle')}</CardTitle>
                <CardDescription className="text-brass font-medium font-inter text-lg">{t('splitHero.plumberellaDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="steam"
                  className="w-full min-h-[44px] font-inter font-medium text-lg py-3"
                  onClick={handleBookSample}
                >
                  <Book className="mr-2 h-5 w-5" />
                  {t('splitHero.readSample')}
                </Button>
                
                {/* Hidden steam effect SVG */}
                <svg className="steam hidden">
                  <circle cx="10" cy="10" r="2" fill="white" opacity="0.6"/>
                </svg>
              </CardContent>
            </Card>

            {/* Right Panel - AI Services */}
            <Card className="card bg-parchment hover:border-brass-dark transition-all duration-300 hover:scale-105 shadow-brass-drop relative overflow-hidden">
              {/* Holographic effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[slide-in-right_3s_ease-in-out_infinite] pointer-events-none"></div>
              
              {/* Brass rim effect */}
              <div className="absolute inset-0 rounded-lg border-4 border-brass/30 pointer-events-none"></div>
              
              <CardHeader className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-brass/20 rounded-full flex items-center justify-center">
                    <Cog className="w-6 h-6 text-brass animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                  <div>
                    <CardTitle className="text-oxidized-teal text-3xl font-playfair drop-shadow-text-drop">{t('splitHero.aiTitle')}</CardTitle>
                    <CardDescription className="text-brass font-medium font-inter text-lg">{t('splitHero.aiSubtitle')}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Cog className="w-5 h-5 text-brass mt-1 animate-spin" style={{ animationDuration: '4s' }} />
                    <div>
                      <h4 className="text-oxidized-teal font-semibold font-inter">{t('splitHero.aiStrategyTitle')}</h4>
                      <p className="text-oxidized-teal/70 text-sm font-inter">{t('splitHero.aiStrategyDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Cog className="w-5 h-5 text-brass mt-1 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
                    <div>
                      <h4 className="text-oxidized-teal font-semibold font-inter">{t('splitHero.aiCustomTitle')}</h4>
                      <p className="text-oxidized-teal/70 text-sm font-inter">{t('splitHero.aiCustomDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Cog className="w-5 h-5 text-brass mt-1 animate-spin" style={{ animationDuration: '5s' }} />
                    <div>
                      <h4 className="text-oxidized-teal font-semibold font-inter">{t('splitHero.aiWorkshopsTitle')}</h4>
                      <p className="text-oxidized-teal/70 text-sm font-inter">{t('splitHero.aiWorkshopsDesc')}</p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="steam"
                  className="w-full min-h-[44px] font-inter font-medium text-lg py-3"
                  onClick={handleAIServices}
                >
                  <Cog className="mr-2 h-5 w-5 animate-spin" style={{ animationDuration: '6s' }} />
                  {t('splitHero.exploreServices')}
                </Button>
                
                {/* Hidden steam effect SVG */}
                <svg className="steam hidden">
                  <circle cx="10" cy="10" r="2" fill="white" opacity="0.6"/>
                </svg>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default SplitHeroSection;
