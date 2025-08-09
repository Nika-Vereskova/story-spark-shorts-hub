import React from 'react';
import { Users, Brain, Bot, Wrench } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { t } from '@/lib/i18n';

const FeaturedServices = () => {
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
      action: () => (window.location.href = '/ai-services')
    },
    {
      icon: Bot,
      title: t('featuredServices.bespokeGpts.title'),
      description: t('featuredServices.bespokeGpts.description'),
      features: t('featuredServices.bespokeGpts.features') as string[],
      cta: t('featuredServices.bespokeGpts.cta'),
      action: () => (window.location.href = '/ai-services')
    }
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-r from-oxidized-teal/5 to-brass/5">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">
            Stories & Solutions
          </h2>
          <p className="text-oxidized-teal/80 text-lg max-w-2xl mx-auto font-inter">
            Where imagination meets innovation - from children's books to cutting-edge AI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 hover:scale-105 group relative overflow-hidden"
              >
              {/* Animated gear background */}
              <div className="absolute top-4 right-4 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon className="w-full h-full text-brass animate-spin" style={{ animationDuration: '8s' }} />
              </div>

              <CardHeader className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-brass/20 rounded-full flex items-center justify-center group-hover:bg-brass/30 transition-colors">
                    <Icon className="w-6 h-6 text-brass" />
                  </div>
                   <CardTitle className="text-oxidized-teal text-xl font-playfair">{service.title as string}</CardTitle>
                 </div>
                 <CardDescription className="text-oxidized-teal/70 font-inter">
                   {service.description as string}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-oxidized-teal/80 font-inter">
                      <Wrench className="w-4 h-4 text-brass mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={service.action}
                  className="w-full bg-oxidized-teal hover:bg-oxidized-teal-light text-parchment border-2 border-oxidized-teal-light shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                >
                  {service.cta as string}
                </Button>
              </CardContent>
            </Card>
          );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
