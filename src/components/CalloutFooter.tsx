import React from 'react';
import { Sparkles, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { posthog } from '@/lib/posthog';

const CalloutFooter = () => {
  const handleWorkshopClick = () => {
    posthog.capture('workshop_hire_clicked', {
      source: 'callout_footer'
    });
    // Open Calendly or contact form
    window.open('#', '_blank');
  };

  const handleDownloadClick = () => {
    posthog.capture('free_story_download_clicked', {
      source: 'callout_footer'
    });
    // Trigger download or navigate to download page
    window.open('#', '_blank');
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-brass/20 via-oxidized-teal/20 to-brass/20 relative overflow-hidden">
      {/* Parchment texture overlay */}
      <div className="absolute inset-0 bg-parchment opacity-90"></div>
      
      {/* Decorative gears */}
      <div className="absolute top-10 left-10 w-16 h-16 opacity-10">
        <Sparkles className="w-full h-full text-brass animate-pulse" />
      </div>
      <div className="absolute bottom-10 right-10 w-20 h-20 opacity-10">
        <Sparkles className="w-full h-full text-oxidized-teal animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-oxidized-teal mb-8 font-playfair drop-shadow-text-drop leading-tight">
            Let's build worlds—
            <br />
            <span className="text-brass">on the page and in code.</span>
          </h2>
          
          <p className="text-xl text-oxidized-teal/80 mb-12 max-w-2xl mx-auto font-inter leading-relaxed">
            Whether you need a storytelling workshop that sparks imagination or AI solutions that transform your business, 
            let's create something extraordinary together.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg"
              className="bg-brass hover:bg-brass-dark text-parchment px-8 py-4 text-lg border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
              onClick={handleWorkshopClick}
            >
              <Calendar className="mr-3 h-6 w-6" />
              Hire Me for a Workshop
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 px-8 py-4 text-lg shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
              onClick={handleDownloadClick}
            >
              <Download className="mr-3 h-6 w-6" />
              Download a Free Story
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-oxidized-teal/60 font-inter">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brass rounded-full"></div>
              School-approved content
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brass rounded-full"></div>
              GDPR-compliant AI solutions
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brass rounded-full"></div>
              Award-winning storyteller
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalloutFooter;