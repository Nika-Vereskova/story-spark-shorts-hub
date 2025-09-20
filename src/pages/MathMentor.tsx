import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import AdSenseBanner from '@/components/AdSenseBanner';
import AdSenseSquare from '@/components/AdSenseSquare';
import { t, getCurrentLocale } from '@/lib/i18n';
import { Calculator, ExternalLink, Play } from 'lucide-react';
import GearIcon from '@/components/GearIcon';
import SteampunkGearCluster from '@/components/SteampunkGearCluster';
import MechanicalDivider from '@/components/MechanicalDivider';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const MathMentor = () => {
  const locale = getCurrentLocale();
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  });

  const mathMentorUrl = 'https://math-mentor-renatakhakimova.replit.app/';

  return (
    <div className="min-h-screen vintage-paper-light parchment-scroll relative overflow-hidden">
      <SEO 
        title={`${t('projects.mathMentor.title')} | STEaM LOGIC Studio AB`}
        description={t('projects.mathMentor.description')}
        keywords="math mentor, grade 4-6, mathematics, education, learning tool, STEaM LOGIC Studio AB"
      />
      
      {/* Floating decorative gears */}
      <SteampunkGearCluster 
        position="top-left" 
        size="lg" 
        className="animate-pulse opacity-10" 
      />
      <SteampunkGearCluster 
        position="top-right" 
        size="md" 
        className="animate-pulse opacity-15 delay-1000" 
      />
      
      <Navigation currentPage="projects" />
      
      <AdSenseBanner position="top" />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-8 max-w-6xl relative">
          {/* Header */}
          <div 
            ref={headerRef}
            className={cn(
              'text-center mb-16 relative transform transition-all duration-1000',
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <div className="relative inline-block mb-8">
              <div className={cn(
                'w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6',
                'bg-gradient-to-br from-brass/20 to-brass/30 border-2 border-brass/40',
                'shadow-xl'
              )}>
                <Calculator className="w-10 h-10 text-brass" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-playfair text-oxidized-teal mb-4 leading-tight drop-shadow-2xl">
                {t('projects.mathMentor.title')}
              </h1>
              
              <p className="text-xl md:text-2xl text-oxidized-teal/80 max-w-3xl mx-auto leading-relaxed font-light">
                {t('projects.mathMentor.subtitle')}
              </p>
            </div>
            
            <MechanicalDivider className="max-w-xl mx-auto" />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Description Section */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-teal/10 to-brass/10 rounded-2xl p-8 border-2 border-brass/30 backdrop-blur-sm">
                <h2 className="text-3xl font-playfair text-oxidized-teal mb-6">
                  {t('projects.mathMentor.aboutTitle')}
                </h2>
                <p className="text-lg text-oxidized-teal/80 leading-relaxed mb-6">
                  {t('projects.mathMentor.description')}
                </p>
                
                {/* Features */}
                <div className="space-y-4">
                  <h3 className="text-xl font-playfair text-oxidized-teal mb-4">
                    {t('projects.mathMentor.featuresTitle')}
                  </h3>
                  <ul className="space-y-3">
                    {t<string[]>('projects.mathMentor.features').map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <GearIcon size={3} direction="clockwise" color="text-brass" />
                        <span className="text-oxidized-teal/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={mathMentorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex-1 inline-flex items-center justify-center gap-3 px-8 py-4',
                    'bg-gradient-to-r from-teal to-oxidized-teal text-muted-oxidized-teal rounded-xl',
                    'hover:from-teal/90 hover:to-oxidized-teal/90 transition-all duration-300',
                    'font-semibold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1',
                    'border border-teal/30'
                  )}
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>{t('projects.mathMentor.launchApp')}</span>
                </a>
                
                <button
                  onClick={() => {
                    const embedSection = document.getElementById('embed-section');
                    embedSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={cn(
                    'flex-1 inline-flex items-center justify-center gap-3 px-8 py-4',
                    'bg-gradient-to-r from-brass/20 to-teal/20 text-muted-oxidized-teal rounded-xl',
                    'hover:from-brass/30 hover:to-teal/30 border-2 border-brass/40',
                    'hover:border-brass/60 transition-all duration-300',
                    'font-semibold text-lg hover:shadow-lg'
                  )}
                >
                  <Play className="w-5 h-5" />
                  <span>{t('projects.mathMentor.tryHere')}</span>
                </button>
              </div>
            </div>

            {/* Educational Benefits */}
            <div className="bg-gradient-to-br from-brass/10 to-oxidized-teal/10 rounded-2xl p-8 border-2 border-brass/30 backdrop-blur-sm">
              <h2 className="text-3xl font-playfair text-oxidized-teal mb-6">
                {t('projects.mathMentor.benefitsTitle')}
              </h2>
              
              <div className="space-y-6">
                {t<Array<{title: string, description: string}>>('projects.mathMentor.benefits').map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-brass/20 border border-brass/40 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-brass font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-playfair text-oxidized-teal mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-oxidized-teal/80 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <MechanicalDivider className="my-12" />
          
          <AdSenseSquare size="medium" />

          {/* Embedded App Section */}
          <div id="embed-section" className="bg-gradient-to-br from-teal/10 to-brass/10 rounded-2xl p-8 border-2 border-brass/30 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-playfair text-oxidized-teal mb-4">
                {t('projects.mathMentor.tryEmbedded')}
              </h2>
              <p className="text-oxidized-teal/80 leading-relaxed max-w-2xl mx-auto">
                {t('projects.mathMentor.embedDescription')}
              </p>
            </div>

            {/* Iframe Container */}
            <div className="relative w-full bg-white rounded-xl overflow-hidden shadow-2xl border-4 border-brass/20">
              <div className="aspect-[4/3] w-full">
                <iframe
                  src={mathMentorUrl}
                  title={t('projects.mathMentor.title')}
                  className="w-full h-full border-0"
                  allow="fullscreen"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Note */}
            <div className="mt-6 text-center">
              <p className="text-sm text-oxidized-teal/60">
                {t('projects.mathMentor.embedNote')}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <AdSenseBanner position="bottom" />

      <Footer />
    </div>
  );
};

export default MathMentor;