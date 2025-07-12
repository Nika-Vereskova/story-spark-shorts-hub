
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { t } from '@/lib/i18n';
import { posthog } from '@/lib/posthog';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    // Enhanced email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email) && email.length <= 254; // RFC 5321 limit
  };

  const sanitizeInput = (input: string) => {
    // Remove potentially harmful characters
    return input.trim().replace(/[<>]/g, '');
  };

  const hashEmail = (email: string) => {
    // Simple hash function for privacy
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      const char = email.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString();
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    const sanitizedEmail = sanitizeInput(email);
    
    if (!sanitizedEmail) {
      toast({
        title: t('common.emailRequired'),
        description: t('common.emailRequiredDesc'),
        variant: "destructive"
      });
      return;
    }
    
    if (!validateEmail(sanitizedEmail)) {
      toast({
        title: t('common.invalidEmail'),
        description: t('common.invalidEmailDesc'),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Track newsletter signup conversion with privacy-preserving hash
      posthog.capture('newsletter_signup', {
        email_hash: hashEmail(sanitizedEmail),
        source: 'homepage',
        timestamp: new Date().toISOString()
      });
      
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
            maxLength={254}
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 bg-parchment border-2 border-brass focus:border-brass-dark focus:outline-none shadow-inner-glow font-inter"
            aria-label="Email address for newsletter"
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
    </section>
  );
};

export default NewsletterSection;
