import React from 'react';
import { Cog, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { t, getCurrentLocale } from '@/lib/i18n';
import { posthog } from '@/lib/posthog';
import { useNavigate } from 'react-router-dom';

const NewHeroSection = () => {
  const navigate = useNavigate();
  const locale = getCurrentLocale();

  const handleExploreServices = () => {
    posthog.capture('explore_services_clicked', {
      source: 'hero_section'
    });
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
    navigate(`/${locale}/books`);
  };

  return (
    <section 
      className="vintage-paper-light weathered-edges relative overflow-hidden min-h-screen flex items-center justify-center pt-8 sm:pt-16 md:pt-0"
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
          {/* 3D Company Logo */}
          <div className="flex justify-center mb-1 sm:mb-6">
            <img 
              src="/lovable-uploads/bcf14b88-6d61-4550-9571-43f8bfc56b1f.png" 
              alt="STEaM LOGIC Studio AB Logo - Gear and Quill featuring steampunk aesthetics symbolizing the fusion of creativity and technology"
              className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 object-contain animate-spin"
              style={{ animationDuration: '12s', animationDirection: 'reverse' }}
              width="320"
              height="320"
              loading="eager"
              itemProp="logo"
            />
          </div>
          
          <h1 
            className="hero-title font-playfair text-oxidized-teal mb-6 leading-tight"
            itemProp="name"
          >
            STEaM LOGIC Studio AB - AI Projects & Consulting
          </h1>
          
          {/* Subtitle with structured data */}
          <p 
            className="hero-subtitle text-oxidized-teal/80 mb-8 sm:mb-12 font-inter font-light"
            itemProp="description"
          >
            STEaM LOGIC Studio AB offers custom GPT development, AI education, workshops, and creative solutions
          </p>

          {/* Key Services for SEO */}
          <div className="mb-8 text-oxidized-teal/70 font-inter">
            <span className="font-medium">Key Services:</span> AI Solutions & Implementation | Custom GPT Development | AI Workshops & Training | Process Automation Solutions
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              variant="steam"
              className="text-lg px-8 py-4 min-w-[200px]"
              onClick={handleExploreServices}
              itemProp="mainEntityOfPage"
            >
              Explore AI Services
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 text-lg px-8 py-4 min-w-[200px]"
              onClick={handleReadSample}
            >
              Read the Sample Chapter
            </Button>
          </div>

          {/* Scroll Hint */}
          <div className="animate-bounce" aria-label="Scroll down to explore more content">
            <div className="flex flex-col items-center text-oxidized-teal/60">
              <span className="text-sm font-inter mb-2">Scroll to explore</span>
              <ChevronDown className="w-6 h-6" />
            </div>
          </div>
        </header>
      </div>
    </section>
  );
};

export default NewHeroSection;