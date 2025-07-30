import React from 'react';
import { Cog, Book, Sparkles, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { t } from '@/lib/i18n';
import { posthog } from '@/lib/posthog';

const SplitHeroSection = () => {
  const handleBookSample = () => {
    posthog.capture('book_sample_clicked', {
      book_title: 'Plumberella',
      source: 'split_hero'
    });
    // Navigate to books page
    window.location.href = '/books';
  };

  const handleAIServices = () => {
    posthog.capture('ai_services_clicked', {
      source: 'split_hero'
    });
    // Navigate to AI services page
    window.location.href = '/ai-services';
  };

  return (
    <section 
      className="pt-24 pb-8 px-6 relative overflow-hidden hero h-[300px] md:h-[30vh] max-h-[400px]"
      style={{
        backgroundImage: 'url(/lovable-uploads/e3cfb4ba-d1c1-45ec-9d05-cbdd7e1bcacc.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Backdrop filter overlay */}
      <div className="absolute inset-0" style={{ backdropFilter: 'sepia(0.2)' }}></div>
      
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
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Plumberella */}
          <Card className="card bg-parchment/90 hover:border-brass-dark transition-all duration-300 hover:scale-105 shadow-brass-drop relative overflow-hidden">
            {/* Ornate brass corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass"></div>
            
            <div className="relative overflow-hidden">
              <img 
                src="/lovable-uploads/64f9c8ed-7532-43d6-a694-85153b7cae57.png"
                alt="Plumberella - Steampunk Children's Book"
                className="w-full h-80 object-cover transition-all duration-300 hover:scale-110 hover:sepia"
              />
              <div className="absolute top-4 right-4">
                <span className="px-4 py-2 bg-brass/90 text-parchment border border-brass-dark font-medium font-inter flex items-center">
                  <Book className="w-3 h-3 mr-1" />
                  Featured Book
                </span>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-oxidized-teal text-3xl font-playfair drop-shadow-text-drop">Plumberella</CardTitle>
              <CardDescription className="text-brass font-medium font-inter text-lg">A witty steampunk fairytale about truth, tools, and transformation</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="steam"
                className="w-full font-inter font-medium text-lg py-3"
                onClick={handleBookSample}
              >
                <Book className="mr-2 h-5 w-5" />
                Read a Sample Chapter
              </Button>
              
              {/* Hidden steam effect SVG */}
              <svg className="steam hidden">
                <circle cx="10" cy="10" r="2" fill="white" opacity="0.6"/>
              </svg>
            </CardContent>
          </Card>

          {/* Right Panel - AI Services */}
          <Card className="card bg-parchment/90 hover:border-brass-dark transition-all duration-300 hover:scale-105 shadow-brass-drop relative overflow-hidden">
            {/* Holographic effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[slide-in-right_3s_ease-in-out_infinite] pointer-events-none"></div>
            
            {/* Brass rim effect */}
            <div className="absolute inset-0 rounded-lg border-4 border-brass/30 pointer-events-none"></div>
            
            <CardHeader className="relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-brass/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-brass animate-pulse" />
                </div>
                <div>
                  <CardTitle className="text-oxidized-teal text-3xl font-playfair drop-shadow-text-drop">AI Magic for Your Projects</CardTitle>
                  <CardDescription className="text-brass font-medium font-inter text-lg">Strategy · Custom GPTs · Workshops</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Cog className="w-5 h-5 text-brass mt-1 animate-spin" style={{ animationDuration: '4s' }} />
                  <div>
                    <h4 className="text-oxidized-teal font-semibold font-inter">AI Strategy & Policy</h4>
                    <p className="text-oxidized-teal/70 text-sm font-inter">Build ethical AI guidelines for your organization</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Cog className="w-5 h-5 text-brass mt-1 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
                  <div>
                    <h4 className="text-oxidized-teal font-semibold font-inter">Custom GPTs</h4>
                    <p className="text-oxidized-teal/70 text-sm font-inter">Child-safe storybots & specialized assistants</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Cog className="w-5 h-5 text-brass mt-1 animate-spin" style={{ animationDuration: '5s' }} />
                  <div>
                    <h4 className="text-oxidized-teal font-semibold font-inter">AI Workshops</h4>
                    <p className="text-oxidized-teal/70 text-sm font-inter">Interactive learning for teams & schools</p>
                  </div>
                </div>
              </div>
              <Button 
                variant="steam"
                className="w-full font-inter font-medium text-lg py-3"
                onClick={handleAIServices}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Explore AI Services
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
  );
};

export default SplitHeroSection;