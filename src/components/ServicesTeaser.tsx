import React from 'react';
import { BookOpen, Brain, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { getCurrentLocale } from '@/lib/i18n';
import { posthog } from '@/lib/posthog';

const ServicesTeaser = () => {
  const navigate = useNavigate();
  const locale = getCurrentLocale();

  const handleViewAllServices = () => {
    posthog.capture('view_all_services_clicked', {
      source: 'services_teaser'
    });
    navigate(`/${locale}/services`);
  };

  const services = [
    {
      icon: BookOpen,
      title: "Storytelling & Publishing",
      description: "From children's books to narrative experiences, bringing stories to life through words and visuals."
    },
    {
      icon: Brain,
      title: "AI Consulting & Workshops",
      description: "Custom GPT development, AI strategy consulting, and hands-on workshops for businesses and individuals."
    },
    {
      icon: Palette,
      title: "Creative Web & Design",
      description: "Innovative web solutions, branding, and digital experiences that merge creativity with functionality."
    }
  ];

  return (
    <section id="services-section" className="py-16 px-6 bg-gradient-to-br from-brass/5 to-oxidized-teal/5">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair text-oxidized-teal mb-4">My Services</h2>
          <p className="text-oxidized-teal/70 text-lg font-inter max-w-2xl mx-auto">
            Comprehensive solutions that blend creativity, technology, and storytelling to bring your vision to life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 hover:scale-105 shadow-brass-drop">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-brass/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-brass" />
                  </div>
                  <CardTitle className="text-oxidized-teal text-xl font-playfair">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-oxidized-teal/70 font-inter text-center">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            variant="steam"
            size="lg"
            className="text-lg px-8 py-3"
            onClick={handleViewAllServices}
          >
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesTeaser;