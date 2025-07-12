
import React, { useState } from 'react';
import { Mail, ExternalLink, Facebook, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { t } from '@/lib/i18n';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const socialLinks = [
    {
      name: t('contact.youtube'),
      url: 'https://www.youtube.com/@NikaVereskova',
      icon: Youtube,
      description: t('contact.youtubeDesc')
    },
    {
      name: t('contact.instagram'),
      url: 'https://www.instagram.com/vereskovanika',
      icon: Instagram,
      description: t('contact.instagramDesc')
    },
    {
      name: t('contact.facebook'),
      url: 'https://www.facebook.com/profile.php?id=61577838015246',
      icon: Facebook,
      description: t('contact.facebookDesc')
    }
  ];

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const sendConfirmationEmail = async (email: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-newsletter-confirmation', {
        body: { email }
      });
      
      if (error) {
        console.error('Error sending confirmation email:', error);
        throw error;
      }
      
      console.log('Confirmation email sent successfully:', data);
      return data;
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      throw error;
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    if (!email) {
      toast({
        title: t('common.emailRequired'),
        description: t('common.emailRequiredDesc'),
        variant: "destructive"
      });
      return;
    }
    if (!validateEmail(email)) {
      toast({
        title: t('common.invalidEmail'),
        description: t('common.invalidEmailDesc'),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send confirmation email
      await sendConfirmationEmail(email);
      
      toast({
        title: t('common.subscribeSuccess'),
        description: t('common.subscribeSuccessDesc'),
        duration: 6000, // Show for 6 seconds since it's a longer message
      });
      setEmail('');
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast({
        title: 'Error',
        description: 'Failed to subscribe. Please try again.',
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern">
      <Navigation currentPage="contact" />

      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-oxidized-teal/80 max-w-2xl mx-auto font-inter">
              {t('contact.subtitle')}
            </p>
          </div>

          {/* Email Contact */}
          <div className="mb-12">
            <Card className="bg-parchment/90 border-2 border-brass shadow-brass-drop relative">
              {/* Ornate brass corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass"></div>
              
              <CardHeader>
                <CardTitle className="text-oxidized-teal text-2xl font-playfair drop-shadow-text-drop flex items-center">
                  <Mail className="mr-2 h-6 w-6" />
                  {t('contact.emailDirect')}
                </CardTitle>
                <CardDescription className="text-oxidized-teal/80 font-inter">
                  {t('contact.emailDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  size="lg" 
                  className="bg-brass hover:bg-brass-dark text-parchment px-8 py-3 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
                  onClick={() => window.location.href = 'mailto:nika.vereskova@gmail.com'}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  nika.vereskova@gmail.com
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Social Media Links */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-oxidized-teal mb-8 text-center font-playfair drop-shadow-text-drop">
              {t('contact.socialTitle')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <Card key={index} className="bg-parchment/90 border-2 border-brass hover:border-brass-dark transition-all duration-300 hover:scale-105 shadow-brass-drop relative">
                    {/* Ornate brass corners */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-brass"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-brass"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-brass"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-brass"></div>
                    
                    <CardHeader>
                      <CardTitle className="text-oxidized-teal text-xl font-playfair drop-shadow-text-drop flex items-center">
                        <IconComponent className="mr-2 h-6 w-6" />
                        {social.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-oxidized-teal/80 mb-4 font-inter text-sm">
                        {social.description}
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full border-2 border-brass text-brass hover:bg-brass hover:text-parchment transition-all duration-300 font-inter font-medium"
                        onClick={() => window.open(social.url, '_blank', 'noopener,noreferrer')}
                      >
                        {t('contact.visit')} {social.name}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="text-center p-8 bg-gradient-to-r from-brass/20 to-oxidized-teal/20 border-2 border-brass/30 shadow-brass-drop relative">
            {/* Ornate brass corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass"></div>
            
            <h2 className="text-3xl font-bold text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">
              {t('contact.newsletterTitle')}
            </h2>
            <p className="text-oxidized-teal/80 text-lg mb-6 font-inter">
              {t('contact.newsletterDesc')}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder={t('contact.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 bg-parchment border-2 border-brass focus:border-brass-dark focus:outline-none shadow-inner-glow font-inter"
              />
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="bg-brass hover:bg-brass-dark text-parchment px-8 py-3 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium disabled:opacity-50"
              >
                {isSubmitting ? 'Subscribing...' : t('contact.subscribe')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
