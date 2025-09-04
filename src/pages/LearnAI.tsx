import React from 'react';
import { Brain, Settings } from 'lucide-react';
import { t } from '@/lib/i18n';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import AdSenseBanner from '@/components/AdSenseBanner';
import AdSenseSquare from '@/components/AdSenseSquare';
import SteampunkGearCluster from '@/components/SteampunkGearCluster';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ContactCTA from '@/components/ContactCTA';

const LearnAI = () => {
  const { elementRef: headerRef } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern relative">
      <SEO 
        title="Learn AI - Artificial Intelligence Education | STEaM LOGIC Studio AB" 
        description="Learn AI fundamentals, advanced techniques, and practical applications. Educational resources, widgets, and interactive tools for AI learning."
      />
      
      {/* Decorative Gear Clusters */}
      <SteampunkGearCluster 
        className="opacity-10" 
        size="lg" 
        position="top-left" 
      />
      <SteampunkGearCluster 
        className="opacity-15" 
        size="md" 
        position="top-right" 
      />
      <SteampunkGearCluster 
        className="opacity-20" 
        size="sm" 
        position="bottom-left" 
      />
      <SteampunkGearCluster 
        className="opacity-10" 
        size="lg" 
        position="bottom-right" 
      />
      
      {/* Floating gears */}
      <Settings className="absolute top-32 left-8 w-14 h-14 text-brass/15 animate-gear-rotation" style={{animationDelay: '1s'}} />
      <Settings className="absolute top-1/3 right-8 w-10 h-10 text-brass/20 animate-gear-rotation" style={{animationDelay: '3s'}} />
      <Settings className="absolute bottom-40 left-1/4 w-12 h-12 text-brass/10 animate-gear-rotation" style={{animationDelay: '5s'}} />

      <Navigation currentPage="learn-ai" />

      <div className="pt-24 pb-16 px-6">
        <AdSenseBanner position="top" />
        
        <div className="container mx-auto">
          {/* Header Section */}
          <div ref={headerRef} className="text-center mb-16 relative">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Brain className="w-16 h-16 text-brass animate-pulse" />
              <Settings className="w-12 h-12 text-oxidized-teal animate-gear-rotation" />
            </div>
            
            <h1 className="text-5xl md:text-6xl text-oxidized-teal mb-6 font-playfair drop-shadow-text-drop">
              {t('learnAI.title')}
            </h1>
            <p className="text-xl text-oxidized-teal/80 max-w-3xl mx-auto font-inter leading-relaxed">
              {t('learnAI.subtitle')}
            </p>
          </div>

          <AdSenseSquare size="medium" />

          {/* Introduction Section */}
          <div className="mb-16 bg-parchment/90 border-2 border-brass/30 p-8 shadow-brass-drop relative">
            {/* Ornate corners */}
            <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-brass z-10"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-brass z-10"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-brass z-10"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-brass z-10"></div>

            <h2 className="text-3xl text-oxidized-teal mb-4 font-playfair text-center">
              {t('learnAI.introduction.title')}
            </h2>
            <p className="text-lg text-oxidized-teal/80 font-inter text-center max-w-2xl mx-auto">
              {t('learnAI.introduction.description')}
            </p>
          </div>

          {/* Widget Areas */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Primary Widget Area */}
            <div className="bg-gradient-to-br from-brass/10 to-oxidized-teal/10 border-2 border-brass/40 p-8 shadow-brass-drop relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass"></div>

              <h3 className="text-2xl text-oxidized-teal mb-4 font-playfair">
                {t('learnAI.primaryWidget.title')}
              </h3>
              
              {/* Widget Container - Replace with your widget code */}
              <div className="min-h-[300px] bg-parchment/50 border border-brass/20 p-4 flex items-center justify-center">
                <p className="text-oxidized-teal/60 font-inter italic">
                  {/* Primary AI Learning Widget will be inserted here */}
                  Widget placeholder - Replace with your AI learning tool
                </p>
              </div>
            </div>

            {/* Secondary Widget Area */}
            <div className="bg-gradient-to-br from-oxidized-teal/10 to-brass/10 border-2 border-oxidized-teal/40 p-8 shadow-brass-drop relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-oxidized-teal"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-oxidized-teal"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-oxidized-teal"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-oxidized-teal"></div>

              <h3 className="text-2xl text-oxidized-teal mb-4 font-playfair">
                {t('learnAI.secondaryWidget.title')}
              </h3>
              
              {/* Widget Container - Replace with your widget code */}
              <div className="min-h-[300px] bg-parchment/50 border border-oxidized-teal/20 p-4 flex items-center justify-center">
                <p className="text-oxidized-teal/60 font-inter italic">
                  {/* Secondary AI Tool Widget will be inserted here */}
                  Widget placeholder - Replace with your AI practice tool
                </p>
              </div>
            </div>
          </div>

          <AdSenseBanner position="middle" />

          {/* Learning Resources Section */}
          <div className="mb-16">
            <h2 className="text-4xl text-oxidized-teal mb-8 font-playfair text-center">
              {t('learnAI.resources.title')}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Beginner Resources */}
              <div className="bg-parchment/90 border-2 border-brass/30 p-6 shadow-brass-drop">
                <h3 className="text-xl text-brass mb-3 font-playfair">
                  {t('learnAI.resources.beginner.title')}
                </h3>
                <p className="text-oxidized-teal/80 font-inter">
                  {t('learnAI.resources.beginner.description')}
                </p>
              </div>

              {/* Intermediate Resources */}
              <div className="bg-parchment/90 border-2 border-oxidized-teal/30 p-6 shadow-brass-drop">
                <h3 className="text-xl text-oxidized-teal mb-3 font-playfair">
                  {t('learnAI.resources.intermediate.title')}
                </h3>
                <p className="text-oxidized-teal/80 font-inter">
                  {t('learnAI.resources.intermediate.description')}
                </p>
              </div>

              {/* Advanced Resources */}
              <div className="bg-parchment/90 border-2 border-brass/30 p-6 shadow-brass-drop">
                <h3 className="text-xl text-brass mb-3 font-playfair">
                  {t('learnAI.resources.advanced.title')}
                </h3>
                <p className="text-oxidized-teal/80 font-inter">
                  {t('learnAI.resources.advanced.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Full-Width Interactive Widget Area */}
          <div className="mb-16 bg-gradient-to-r from-brass/20 to-oxidized-teal/20 border-2 border-brass/30 p-8 shadow-brass-drop relative">
            <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass"></div>

            <h2 className="text-3xl text-oxidized-teal mb-6 font-playfair text-center">
              {t('learnAI.interactiveWidget.title')}
            </h2>
            
            {/* Full-width widget container - Replace with your widget code */}
            <div className="min-h-[400px] bg-parchment/50 border border-brass/20 p-6 flex items-center justify-center">
              <p className="text-oxidized-teal/60 font-inter italic text-center">
                {/* Interactive AI Learning Widget will be inserted here */}
                Interactive widget placeholder - Replace with your main AI learning interface
              </p>
            </div>
          </div>

          <ContactCTA />
        </div>
        
        <AdSenseBanner position="bottom" />
      </div>

      <Footer />
    </div>
  );
};

export default LearnAI;