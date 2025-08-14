import React from 'react';
import { Users, Brain, Bot, Wrench, Cog, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { t, getCurrentLocale } from '@/lib/i18n';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { SteampunkBackground, SteamEffect, MechanicalGear } from '@/components/SteampunkAnimations';

const FeaturedServices = () => {
  const navigate = useNavigate();
  const locale = getCurrentLocale();
  const { elementRef, isVisible } = useScrollAnimation();
  const services = [
    {
      icon: Users,
      title: t('featuredServices.authorSpeaker.title'),
      description: t('featuredServices.authorSpeaker.description'),
      features: t('featuredServices.authorSpeaker.features') as string[],
      cta: t('featuredServices.authorSpeaker.cta'),
      action: () => window.open('#', '_blank')
    },
    {
      icon: Brain,
      title: t('featuredServices.aiConsulting.title'),
      description: t('featuredServices.aiConsulting.description'),
      features: t('featuredServices.aiConsulting.features') as string[],
      cta: t('featuredServices.aiConsulting.cta'),
      action: () => navigate(`/${locale}/ai-services`)
    },
    {
      icon: Bot,
      title: t('featuredServices.bespokeGpts.title'),
      description: t('featuredServices.bespokeGpts.description'),
      features: t('featuredServices.bespokeGpts.features') as string[],
      cta: t('featuredServices.bespokeGpts.cta'),
      action: () => navigate(`/${locale}/ai-services`)
    }
  ];

  return (
    <SteampunkBackground variant="moderate" className="py-16 px-6 vintage-paper-light parchment-scroll">
      <section className="relative overflow-hidden">
        {/* Enhanced background decorative elements */}
        <MechanicalGear 
          size="xl" 
          speed="slow" 
          direction="clockwise" 
          variant="wobble"
          className="absolute top-10 left-10 opacity-8" 
        />
        <MechanicalGear 
          size="lg" 
          speed="medium" 
          direction="counter" 
          className="absolute bottom-20 right-10 opacity-10" 
        />
        <SteamEffect intensity="medium" className="top-16 right-16" />
        <SteamEffect intensity="low" className="bottom-32 left-20" />
      
      <div 
        ref={elementRef}
        className={`container mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-12'
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="victorian-heading text-5xl text-oxidized-teal mb-6">
            Stories & Solutions
          </h2>
          <p className="text-oxidized-teal/80 text-xl max-w-3xl mx-auto font-inter leading-relaxed">
            Where imagination meets innovation - from children's books to cutting-edge AI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`transition-all duration-700 delay-${index * 100}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="steampunk-card vintage-paper-dark weathered-edges burnt-edges ink-stains group relative overflow-hidden min-h-[400px]">
                  {/* Enhanced animated gear background */}
                  <MechanicalGear 
                    size="xl" 
                    speed="slow" 
                    direction="clockwise" 
                    variant="tick"
                    className="absolute top-6 right-6 opacity-10 group-hover:opacity-30 transition-all duration-500" 
                  />
                  <MechanicalGear 
                    size="md" 
                    speed="fast" 
                    direction="counter" 
                    className="absolute bottom-6 left-6 opacity-5 group-hover:opacity-20 transition-all duration-700" 
                  />
                  
                  {/* Steam effects */}
                  <SteamEffect 
                    intensity="medium" 
                    className="top-3 left-3 opacity-0 group-hover:opacity-60 transition-all duration-500" 
                  />
                  <SteamEffect 
                    intensity="low" 
                    className="bottom-8 right-8 opacity-0 group-hover:opacity-40 transition-all duration-700 delay-300" 
                  />

                  <CardHeader className="relative text-center pb-6">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-brass/30 to-brass/10 rounded-full flex items-center justify-center group-hover:from-brass/50 group-hover:to-brass/20 transition-all duration-500 vintage-glow border-2 border-brass/40">
                      <Icon className="w-10 h-10 text-brass mechanical-tick group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="victorian-heading text-oxidized-teal text-2xl mb-3">
                      {service.title as string}
                    </CardTitle>
                    <CardDescription className="text-oxidized-teal/70 font-inter leading-relaxed">
                      {service.description as string}
                    </CardDescription>
                  </CardHeader>
              
                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-oxidized-teal/80 font-inter group/item">
                          <div className="w-5 h-5 mt-0.5 bg-brass/20 rounded-full flex items-center justify-center group-hover/item:bg-brass/40 transition-colors">
                            <Wrench className="w-3 h-3 text-brass group-hover/item:text-cyan transition-colors" />
                          </div>
                          <span className="group-hover/item:text-oxidized-teal transition-colors">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      onClick={service.action}
                      className="btn-steam w-full text-parchment font-inter font-medium hover:scale-105 transition-all duration-300"
                    >
                      {service.cta as string}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    </SteampunkBackground>
  );
};

export default FeaturedServices;
