import React from 'react';
import { Mail, Github, Linkedin, Youtube } from 'lucide-react';
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
      href: "https://github.com/nikavereskova",
      label: "GitHub"
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/nikavereskova",
      label: "LinkedIn"
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/@NikaVereskova/videos",
      label: "YouTube"
    }
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-parchment to-brass/10">
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
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                size="lg"
                variant="steam"
                className="text-lg px-8 py-3"
                onClick={handleContact}
              >
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-oxidized-teal text-oxidized-teal hover:bg-oxidized-teal/10 text-lg px-8 py-3"
                onClick={() => window.open('mailto:nika@steamlogic.studio', '_blank')}
              >
                nika@steamlogic.studio
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