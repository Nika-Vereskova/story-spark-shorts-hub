
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { t } from '@/lib/i18n';
import { supabase } from '@/integrations/supabase/client';
import { sanitizeInput, validateEmail } from '@/lib/security';

const NewsletterSignup = () => {
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



      // Send confirmation email using correct Supabase function call
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
      
      toast({
        title: t('newsletter.checkEmailTitle'),
        description: t('newsletter.checkEmailDesc'),
        duration: 8000,
      });
      setEmail('');
    } catch (error) {
      console.error('Newsletter signup error:', error);

      let errorMessage: string = String(t('newsletter.errorDesc'));
      if (error && typeof error === 'object') {
        const err = error as { message?: unknown; status?: number | string };
        if (typeof err.message === 'string' && err.message.trim().length > 0) {
          errorMessage = err.message;
        } else if (err.status !== undefined) {
          errorMessage = `Status: ${String(err.status)}`;
        }
      }

      toast({
        title: t('newsletter.errorTitle'),
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-center p-8 bg-gradient-to-r from-brass/20 to-oxidized-teal/20 border-2 border-brass/30 shadow-brass-drop relative">
      {/* Ornate brass corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass"></div>
      
      <h2 className="text-3xl text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">
        {t('contact.newsletterTitle')}
      </h2>
      <p className="text-oxidized-teal/80 text-lg mb-6 font-playfair">
        {t('contact.newsletterDesc')}
      </p>
      <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
        <Input 
          type="email" 
          placeholder={t('contact.emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          className="flex-1 px-4 py-3 bg-parchment border-2 border-brass focus:border-brass-dark focus:outline-none shadow-inner-glow font-playfair"
        />
        <Button 
          type="submit"
          disabled={isSubmitting}
          className="bg-brass hover:bg-brass-dark text-parchment px-8 py-3 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-playfair font-medium disabled:opacity-50"
        >
          {isSubmitting ? t('newsletter.subscribing') : t('contact.subscribe')}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
