import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { getCurrentLocale } from '@/lib/i18n';
import { posthog } from '@/lib/posthog';

const AboutPreview = () => {
  const navigate = useNavigate();
  const locale = getCurrentLocale();

  const handleReadMore = () => {
    posthog.capture('about_read_more_clicked', {
      source: 'about_preview'
    });
    navigate(`/${locale}/about`);
  };

  return (
    <section className="py-16 px-6 bg-parchment relative">
      {/* Clockwork Gear Decoration */}
      <Settings className="absolute top-12 left-8 w-8 h-8 text-brass/20 animate-gear-rotation" style={{animationDelay: '1s'}} />
      <Settings className="absolute bottom-12 right-8 w-10 h-10 text-brass/15 animate-gear-rotation" style={{animationDelay: '3s'}} />
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 shadow-brass-drop">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Portrait */}
              <div className="flex justify-center">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-brass shadow-lg">
                  <img
                    src="/lovable-uploads/7eff3f10-f21e-4ffc-848e-a08813692928.png"
                    alt="Nika Vereskova - Storyteller and AI Enthusiast"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* About Text */}
              <div className="md:col-span-2 text-center md:text-left">
                <h2 className="text-3xl font-playfair text-oxidized-teal mb-4">About Me</h2>
                <p className="text-oxidized-teal/80 text-lg font-inter leading-relaxed mb-6">
                  I'm Nika Vereskova, a storyteller, AI enthusiast, and designer merging art and technology to create innovative solutions. 
                  With a passion for bringing imagination to life through both traditional narratives and cutting-edge AI tools, 
                  I help businesses and individuals harness the power of creative technology.
                </p>
                <Button 
                  variant="outline" 
                  className="border-2 border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10"
                  onClick={handleReadMore}
                >
                  Read More About Me
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutPreview;