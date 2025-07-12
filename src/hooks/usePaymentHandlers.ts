
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const usePaymentHandlers = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleOneTimePayment = async (serviceName: string) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    setLoading(serviceName);
    try {
      console.log('Creating payment for:', serviceName);
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { serviceName }
      });

      if (error) {
        console.error('Payment error:', error);
        throw error;
      }

      console.log('Payment response:', data);
      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No payment URL received');
      }
    } catch (error: any) {
      console.error('Payment creation failed:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create payment session",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const handleSubscription = async (tier: 'monthly' | 'yearly') => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    setLoading(`subscription-${tier}`);
    try {
      console.log('Creating subscription for tier:', tier);
      const { data, error } = await supabase.functions.invoke('create-subscription', {
        body: { subscriptionTier: tier }
      });

      if (error) {
        console.error('Subscription error:', error);
        throw error;
      }

      console.log('Subscription response:', data);
      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No subscription URL received');
      }
    } catch (error: any) {
      console.error('Subscription creation failed:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create subscription session",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return {
    loading,
    authModalOpen,
    setAuthModalOpen,
    handleOneTimePayment,
    handleSubscription,
  };
};
