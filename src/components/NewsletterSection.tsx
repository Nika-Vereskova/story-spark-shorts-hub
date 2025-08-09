
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { t } from '@/lib/i18n';
import { posthog } from '@/lib/posthog';
import { supabase } from '@/integrations/supabase/client';
import { sanitizeInput, validateEmail, hashString } from '@/lib/security';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();


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
      if (process.env.NODE_ENV === 'development') {
        console.log('Attempting to subscribe email:', sanitizedEmail);
      }
      
      // Save subscriber to database (not confirmed yet)
      const { error: subscribeError } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email: sanitizedEmail }]);

      if (subscribeError) {
        console.error('Database insert error:', subscribeError);
        if (subscribeError.code === '23505') { // Unique constraint violation
          toast({
            title: t('newsletter.alreadySubscribedTitle'),
            description: t('newsletter.alreadySubscribedDesc'),
            variant: "destructive"
          });
          return;
        }
        throw subscribeError;
      }



      // Send confirmation email using the correct Supabase function call
      if (process.env.NODE_ENV === 'development') {
        console.log('Calling send-newsletter-confirmation function...');
      }
      const { data: emailData, error: emailError } = await supabase.functions.invoke('send-newsletter-confirmation', {
        body: {
          email: sanitizedEmail
        }
      });
      
      if (emailError) {
        console.error('Error sending confirmation email:', emailError);
        throw emailError;
      }
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Email function response:', emailData);
      }
      
      // Track newsletter signup attempt with privacy-preserving hash
      posthog.capture('newsletter_signup_initiated', {
        email_hash: hashString(sanitizedEmail),
        source: 'homepage',
        timestamp: new Date().toISOString()
      });
      
      toast({
        title: t('newsletter.checkEmailTitle'),
        description: t('newsletter.checkEmailDesc'),
        duration: 8000,
      });
      setEmail('');
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast({
        title: t('newsletter.errorTitle'),
        description: t('newsletter.errorDesc'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-r from-brass/20 to-oxidized-teal/20">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-4xl text-oxidized-teal mb-6 font-playfair drop-shadow-text-drop">{t('newsletter.title')}</h2>
        <p className="text-oxidized-teal/80 text-lg mb-8 font-inter">
          {t('newsletter.description')}
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
            {isSubmitting ? t('newsletter.subscribing') : t('contact.subscribe')}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
