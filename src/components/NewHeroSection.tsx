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
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gradient-to-br from-parchment via-parchment to-brass/20 pt-8 sm:pt-16 md:pt-0">
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

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Company Logo and Title */}
        <div className="animate-fade-in">
          {/* 3D Company Logo */}
          <div className="flex justify-center mb-1 sm:mb-6">
            <img 
              src="/lovable-uploads/bcf14b88-6d61-4550-9571-43f8bfc56b1f.png" 
              alt="STEaM LOGIC Studio AB Logo - Gear and Quill"
              className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 object-contain animate-spin"
              style={{ animationDuration: '8s' }}
            />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair text-oxidized-teal mb-6 leading-tight">
            STEaM LOGIC Studio AB
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl md:text-3xl text-oxidized-teal/80 mb-8 sm:mb-12 font-inter font-light">
            Inventive Storytelling × Intelligent Technology
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              variant="steam"
              className="text-lg px-8 py-4 min-w-[200px]"
              onClick={handleExploreServices}
            >
              Explore My Services
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
          <div className="animate-bounce">
            <div className="flex flex-col items-center text-oxidized-teal/60">
              <span className="text-sm font-inter mb-2">Scroll to explore</span>
              <ChevronDown className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;