import React from 'react';
import { Cog, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { t, getCurrentLocale } from '@/lib/i18n';
import { posthog } from '@/lib/posthog';
import { useNavigate } from 'react-router-dom';
import { useAnalytics } from './AnalyticsProvider';

const NewHeroSection = () => {
  const navigate = useNavigate();
  const locale = getCurrentLocale();
  const { trackAIServiceClick } = useAnalytics();

  const handleExploreServices = () => {
    posthog.capture('explore_services_clicked', {
      source: 'hero_section'
    });
    trackAIServiceClick('hero_explore_services');
    
    // Scroll to services section
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReadSample = () => {
    posthog.capture('read_sample_clicked', {
      source: 'hero_section'
    });
    trackAIServiceClick('hero_read_sample');
    navigate(`/${locale}/books`);
  };

  return (
    <section 
      className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gradient-to-br from-parchment via-parchment to-brass/20 pt-8 sm:pt-16 md:pt-0"
      itemScope 
      itemType="https://schema.org/Organization"
    >
      {/* Animated Clockwork Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
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

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Company Logo and Title */}
        <header className="animate-fade-in">
          {/* 3D Company Logo with WebP optimization */}
          <div className="flex justify-center mb-1 sm:mb-6">
            <img 
              src="/lovable-uploads/bcf14b88-6d61-4550-9571-43f8bfc56b1f.png" 
              alt="STEaM LOGIC Studio AB Logo - Intricate steampunk gear and quill design symbolizing the perfect fusion of mechanical precision and creative storytelling, representing AI consulting and custom GPT development services"
              className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 object-contain animate-spin"
              style={{ animationDuration: '12s', animationDirection: 'reverse' }}
              width="320"
              height="320"
              loading="eager"
              itemProp="logo"
              fetchPriority="high"
            />
          </div>
          
          <h1 
            className="hero-title font-playfair text-oxidized-teal mb-6 leading-tight"
            itemProp="name"
          >
            STEaM LOGIC Studio AB - AI Consulting & Custom GPT Development
          </h1>
          
          {/* Subtitle with structured data */}
          <p 
            className="hero-subtitle text-oxidized-teal/80 mb-8 sm:mb-12 font-inter font-light"
            itemProp="description"
          >
            Expert AI consultant Nika Vereskova offers custom GPT development, AI strategy, workshops, and automation solutions
          </p>

          {/* Key Services for SEO */}
          <div className="mb-8 text-oxidized-teal/70 font-inter">
            <span className="font-medium">Key Services:</span> AI Strategy & Implementation | Custom GPT Development | AI Workshops & Training | Process Automation Solutions
          </div>

          {/* Call-to-Action Buttons with enhanced accessibility */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              variant="steam"
              className="text-lg px-8 py-4 min-w-[200px] focus:ring-4 focus:ring-brass/50 focus:outline-none"
              onClick={handleExploreServices}
              itemProp="mainEntityOfPage"
              aria-label="Explore our comprehensive AI consulting services including custom GPT development and automation"
            >
              Explore AI Services
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 text-lg px-8 py-4 min-w-[200px] focus:ring-4 focus:ring-oxidized-teal/50 focus:outline-none"
              onClick={handleReadSample}
              aria-label="Read sample chapter from our published works and creative content"
            >
              Read the Sample Chapter
            </Button>
          </div>

          {/* Scroll Hint with accessibility */}
          <div 
            className="animate-bounce" 
            aria-label="Scroll down to explore more content"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div className="flex flex-col items-center text-oxidized-teal/60 cursor-pointer focus:ring-2 focus:ring-brass/50 rounded-lg p-2">
              <span className="text-sm font-inter mb-2">Scroll to explore</span>
              <ChevronDown className="w-6 h-6" aria-hidden="true" />
            </div>
          </div>
        </header>
      </div>
    </section>
  );
};

export default NewHeroSection;