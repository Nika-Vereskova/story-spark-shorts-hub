import React from 'react';
import { Github, Instagram, Youtube, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { getCurrentLocale } from '@/lib/i18n';
import { posthog } from '@/lib/posthog';

const ContactCTA = () => {
  const navigate = useNavigate();
  const locale = getCurrentLocale();

  const handleContact = () => {
    posthog.capture('contact_cta_clicked', {
      source: 'contact_cta'
    });
    navigate(`/${locale}/contact`);
  };

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Nika-Vereskova",
      label: "GitHub"
    },
    {
      icon: Instagram,
      href: "https://instagram.com/nikavereskova",
      label: "Instagram"
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/@NikaVereskova/videos",
      label: "YouTube"
    }
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-parchment to-brass/10 relative">
      {/* Clockwork Gear Decoration */}
      <Settings className="absolute top-8 left-8 w-12 h-12 text-brass/20 animate-gear-rotation" style={{animationDelay: '1.5s'}} />
      <Settings className="absolute bottom-8 right-8 w-8 h-8 text-brass/15 animate-gear-rotation" style={{animationDelay: '0.5s'}} />
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 shadow-brass-drop">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-playfair text-oxidized-teal mb-4">
              Let's Bring Your Ideas to Life!
            </h2>
            <p className="text-oxidized-teal/80 text-lg font-inter mb-8 max-w-2xl mx-auto">
              Ready to explore the intersection of creativity and technology? 
              Whether you need storytelling magic, AI solutions, or innovative design, 
              I'm here to help transform your vision into reality.
            </p>
            
            <div className="flex justify-center mb-8">
              <Button 
                size="lg"
                variant="steam"
                className="text-lg px-8 py-3"
                onClick={handleContact}
              >
                Get In Touch
              </Button>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center gap-6">
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-brass/20 hover:bg-brass/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={link.label}
                  >
                    <IconComponent className="w-6 h-6 text-brass" />
                  </a>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactCTA;