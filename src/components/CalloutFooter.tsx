import React from 'react';
import { Sparkles, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { posthog } from '@/lib/posthog';
import { t } from '@/lib/i18n';

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
          <h2 className="text-5xl md:text-6xl text-oxidized-teal mb-8 font-playfair drop-shadow-text-drop leading-tight">
            {t('callout.heading1')}
            <br />
            <span className="text-brass">{t('callout.heading2')}</span>
          </h2>
          
          <p className="text-xl text-oxidized-teal/80 mb-12 max-w-2xl mx-auto font-playfair leading-relaxed">
            {t('callout.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg"
              className="bg-brass hover:bg-brass-dark text-parchment px-8 py-4 text-lg border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-playfair font-medium"
              onClick={handleWorkshopClick}
            >
              <Calendar className="mr-3 h-6 w-6" />
              {t('callout.hireWorkshop')}
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 px-8 py-4 text-lg shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-playfair font-medium"
              onClick={handleDownloadClick}
            >
              <Download className="mr-3 h-6 w-6" />
              {t('callout.downloadStory')}
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-oxidized-teal/60 font-playfair">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brass rounded-full"></div>
              {t('callout.trustSchool')}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brass rounded-full"></div>
              {t('callout.trustGdpr')}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brass rounded-full"></div>
              {t('callout.trustAward')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalloutFooter;