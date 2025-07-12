import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Video, 
  Globe, 
  BookOpen, 
  Smartphone, 
  Brain,
  Mail,
  ChevronRight,
  CreditCard,
  Calendar
} from 'lucide-react';
import { t } from '@/lib/i18n';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AuthModal from './AuthModal';

const ServicesGrid = () => {
  const { user, subscribed, subscriptionTier } = useAuth();
  const { toast } = useToast();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

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
    } catch (error) {
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
    } catch (error) {
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

  const services = [
    {
      icon: Video,
      title: t('services.webinars.title'),
      description: t('services.webinars.description'),
      features: [
        t('services.webinars.feature1'),
        t('services.webinars.feature2'),
        t('services.webinars.feature3')
      ],
      cta: t('services.webinars.cta'),
      price: "100 SEK",
      serviceName: "Webinars"
    },
    {
      icon: Globe,
      title: t('services.websites.title'),
      description: t('services.websites.description'),
      features: [
        t('services.websites.feature1'),
        t('services.websites.feature2'),
        t('services.websites.feature3')
      ],
      cta: t('services.websites.cta'),
      price: "1,000 SEK",
      serviceName: "Website Building"
    },
    {
      icon: BookOpen,
      title: t('services.chapters.title'),
      description: t('services.chapters.description'),
      features: [
        t('services.chapters.feature1'),
        t('services.chapters.feature2'),
        t('services.chapters.feature3')
      ],
      cta: t('services.chapters.cta'),
      price: "10 SEK",
      serviceName: "Book Chapters"
    },
    {
      icon: Smartphone,
      title: t('services.apps.title'),
      description: t('services.apps.description'),
      features: [
        t('services.apps.feature1'),
        t('services.apps.feature2'),
        t('services.apps.feature3')
      ],
      cta: t('services.apps.cta'),
      price: "1,000 SEK",
      serviceName: "App Development"
    },
    {
      icon: Brain,
      title: t('services.ai.title'),
      description: t('services.ai.description'),
      features: [
        t('services.ai.feature1'),
        t('services.ai.feature2'),
        t('services.ai.feature3')
      ],
      cta: t('services.ai.cta'),
      isSubscription: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <Card key={index} className="bg-parchment/90 border-2 border-brass shadow-brass-drop hover:shadow-brass-glow transition-all duration-300 hover:scale-105 relative group">
          {/* Ornate brass corners */}
          <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-brass opacity-60 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-brass opacity-60 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-brass opacity-60 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-brass opacity-60 group-hover:opacity-100 transition-opacity"></div>
          
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-brass/20 rounded-full flex items-center justify-center group-hover:bg-brass/30 transition-colors">
              <service.icon className="w-8 h-8 text-brass" />
            </div>
            <CardTitle className="text-oxidized-teal text-2xl font-playfair drop-shadow-text-drop">
              {service.title}
            </CardTitle>
            <CardDescription className="text-oxidized-teal/80 font-inter">
              {service.description}
            </CardDescription>
            {service.price && (
              <div className="text-brass font-bold text-xl font-inter">
                {service.price}
              </div>
            )}
          </CardHeader>
          
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {service.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start text-oxidized-teal/90 font-inter text-sm">
                  <ChevronRight className="w-4 h-4 text-brass mt-0.5 mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            
            {service.isSubscription ? (
              <div className="space-y-2">
                {subscribed && subscriptionTier ? (
                  <div className="text-center p-4 bg-brass/20 rounded-lg">
                    <div className="text-brass font-semibold">
                      Active: {subscriptionTier} plan
                    </div>
                  </div>
                ) : (
                  <>
                    <Button 
                      className="w-full bg-brass hover:bg-brass-dark text-parchment border-2 border-brass-dark shadow-inner-glow transition-all duration-300 font-inter font-medium"
                      onClick={() => handleSubscription('monthly')}
                      disabled={loading === 'subscription-monthly'}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {loading === 'subscription-monthly' ? 'Loading...' : 'Monthly - 100 SEK'}
                    </Button>
                    <Button 
                      className="w-full bg-brass hover:bg-brass-dark text-parchment border-2 border-brass-dark shadow-inner-glow transition-all duration-300 font-inter font-medium"
                      onClick={() => handleSubscription('yearly')}
                      disabled={loading === 'subscription-yearly'}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {loading === 'subscription-yearly' ? 'Loading...' : 'Yearly - 1,000 SEK'}
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <Button 
                  className="w-full bg-brass hover:bg-brass-dark text-parchment border-2 border-brass-dark shadow-inner-glow transition-all duration-300 font-inter font-medium"
                  onClick={() => handleOneTimePayment(service.serviceName!)}
                  disabled={loading === service.serviceName}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  {loading === service.serviceName ? 'Loading...' : `Buy Now - ${service.price}`}
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-2 border-brass text-brass hover:bg-brass/10 font-inter font-medium"
                  onClick={() => window.location.href = 'mailto:nika.vereskova@gmail.com?subject=' + encodeURIComponent(`Inquiry about ${service.title}`)}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact for Details
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
};

export default ServicesGrid;
