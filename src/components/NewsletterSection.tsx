
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { t } from '@/lib/i18n';
import { posthog } from '@/lib/posthog';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    
    // Track newsletter signup conversion
    posthog.capture('newsletter_signup', {
      email: email,
      source: 'homepage'
    });
    
    toast({
      title: t('common.subscribeSuccess'),
      description: t('common.subscribeSuccessDesc'),
    });
    setEmail('');
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-r from-brass/20 to-oxidized-teal/20">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold text-oxidized-teal mb-6 font-playfair drop-shadow-text-drop">{t('contact.newsletterTitle')}</h2>
        <p className="text-oxidized-teal/80 text-lg mb-8 font-inter">
          {t('contact.newsletterDesc')}
        </p>
        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Input 
            type="email" 
            placeholder={t('contact.emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 bg-parchment border-2 border-brass focus:border-brass-dark focus:outline-none shadow-inner-glow font-inter"
          />
          <Button 
            type="submit"
            className="bg-brass hover:bg-brass-dark text-parchment px-8 py-3 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium"
          >
            {t('contact.subscribe')}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
