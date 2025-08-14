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
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-navy-gradient vintage-paper pt-8 sm:pt-16 md:pt-0">
      {/* Enhanced Steampunk Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Blueprint Grid Overlay */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-30"></div>
        
        {/* Floating Gears */}
        <div className="absolute top-20 left-10 w-32 h-32 opacity-20 steampunk-float">
          <Cog className="w-full h-full text-antique-gold gear-spin" />
        </div>
        <div className="absolute top-40 right-20 w-24 h-24 opacity-25">
          <Cog className="w-full h-full text-bronze gear-spin-reverse" />
        </div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 opacity-20">
          <Cog className="w-full h-full text-warm-amber gear-spin" />
        </div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 opacity-25 steampunk-float">
          <Cog className="w-full h-full text-deep-copper gear-spin-reverse" />
        </div>
        
        {/* Additional atmospheric elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5">
          <Cog className="w-full h-full text-antique-gold gear-spin" style={{ animationDuration: '30s' }} />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Company Logo and Title */}
        <div className="animate-fade-in">
          {/* Enhanced 3D Company Logo with Steampunk Frame */}
          <div className="flex justify-center mb-8 sm:mb-12 relative">
            <div className="relative brass-corner">
              <img 
                src="/lovable-uploads/bcf14b88-6d61-4550-9571-43f8bfc56b1f.png" 
                alt="STEaM LOGIC Studio AB Logo - Gear and Quill"
                className="w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 object-contain gear-spin-reverse drop-shadow-2xl"
              />
              {/* Decorative glow effect */}
              <div className="absolute inset-0 bg-antique-gold opacity-20 rounded-full blur-3xl scale-75"></div>
            </div>
          </div>
          
          {/* Dramatic Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-playfair text-antique-gold mb-4 leading-tight drop-shadow-lg">
            STEaM LOGIC
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-montserrat text-bronze mb-8 tracking-wider">
            Studio AB
          </h2>
          
          {/* Victorian-style Subtitle with Typewriter Effect */}
          <div className="relative mb-12 sm:mb-16">
            <div className="copper-divider mb-8"></div>
            <p className="text-xl sm:text-2xl md:text-3xl text-cream-white mb-4 font-source-sans font-light tracking-wide">
              Inventive Storytelling × Intelligent Technology
            </p>
            <p className="text-lg sm:text-xl text-cream-white/80 max-w-3xl mx-auto font-source-sans leading-relaxed">
              Where Victorian ingenuity meets artificial intelligence, crafting tomorrow's stories with today's innovation
            </p>
            <div className="copper-divider mt-8"></div>
          </div>

          {/* Enhanced Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="xl" 
              variant="amber"
              className="text-lg px-10 py-4 min-w-[240px] uppercase tracking-widest"
              onClick={handleExploreServices}
            >
              <Cog className="mr-3 h-5 w-5" />
              Explore My Services
            </Button>
            <Button 
              size="xl" 
              variant="vintage" 
              className="text-lg px-10 py-4 min-w-[240px] uppercase tracking-widest"
              onClick={handleReadSample}
            >
              Read the Sample Chapter
            </Button>
          </div>

          {/* Enhanced Scroll Hint */}
          <div className="animate-bounce">
            <div className="flex flex-col items-center text-antique-gold/80">
              <span className="text-sm font-montserrat mb-2 uppercase tracking-wider">Discover More</span>
              <ChevronDown className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;