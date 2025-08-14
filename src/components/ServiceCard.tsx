
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { t } from '@/lib/i18n';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { SteamEffect, MechanicalGear } from '@/components/SteampunkAnimations';
import { 
  ChevronRight,
  CreditCard,
  Mail,
  Calendar,
  Cog,
  Wrench,
  Settings
} from 'lucide-react';

interface ServiceCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  price?: string;
  serviceName?: string;
  isSubscription?: boolean;
  subscribed?: boolean;
  subscriptionTier?: string;
  loading?: string | null;
  onOneTimePayment: (serviceName: string) => void;
  onSubscription: (tier: 'monthly' | 'yearly') => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  features,
  price,
  serviceName,
  isSubscription,
  subscribed,
  subscriptionTier,
  loading,
  onOneTimePayment,
  onSubscription,
}) => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
      }`}
    >
      <Card className="steampunk-card vintage-paper weathered-edges group relative overflow-hidden">
        {/* Enhanced animated background elements */}
        <MechanicalGear 
          size="lg" 
          speed="slow" 
          direction="clockwise" 
          variant="wobble"
          className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity" 
        />
        <MechanicalGear 
          size="md" 
          speed="medium" 
          direction="counter" 
          className="absolute bottom-4 left-4 opacity-15 group-hover:opacity-30 transition-opacity" 
        />
        
        {/* Additional mechanical details */}
        <div className="absolute top-6 left-6 w-4 h-4 opacity-10 group-hover:opacity-25 transition-opacity">
          <Settings className="w-full h-full text-teal piston-move" />
        </div>
        
        {/* Enhanced steam effects */}
        <SteamEffect 
          intensity="low" 
          className="top-2 left-2 opacity-0 group-hover:opacity-60 transition-all duration-500" 
        />
        <SteamEffect 
          intensity="medium" 
          className="top-8 right-8 opacity-0 group-hover:opacity-40 transition-all duration-700 delay-200" 
        />
        
        {/* Ornate brass corners with enhanced effects */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:border-cyan group-hover:glow"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:border-cyan"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:border-cyan"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:border-cyan"></div>
      
        <CardHeader className="text-center pb-4 relative">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-brass/30 to-brass/10 rounded-full flex items-center justify-center group-hover:from-brass/50 group-hover:to-brass/20 transition-all duration-500 vintage-glow border-2 border-brass/40">
            <Icon className="w-10 h-10 text-brass mechanical-tick group-hover:scale-110 transition-transform duration-300" />
          </div>
          <CardTitle className="victorian-heading text-oxidized-teal text-2xl mb-2">
            {title}
          </CardTitle>
          <CardDescription className="text-oxidized-teal/80 font-inter leading-relaxed">
            {description}
          </CardDescription>
          {price && (
            <div className="text-brass font-bold text-2xl font-playfair mt-3 drop-shadow-lg">
              {price}
            </div>
          )}
        </CardHeader>
      
      <CardContent className="space-y-4">
          <ul className="space-y-3">
            {features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start text-oxidized-teal/90 font-inter text-sm group/item">
                <div className="w-5 h-5 mr-3 mt-0.5 bg-brass/20 rounded-full flex items-center justify-center group-hover/item:bg-brass/40 transition-colors">
                  <ChevronRight className="w-3 h-3 text-brass group-hover/item:text-cyan transition-colors" />
                </div>
                <span className="group-hover/item:text-oxidized-teal transition-colors">{feature}</span>
              </li>
            ))}
          </ul>
        
        {isSubscription ? (
          <div className="space-y-2">
            {subscribed && subscriptionTier ? (
              <div className="text-center p-4 bg-brass/20 rounded-lg">
                <div className="text-brass font-semibold">
                  {(t<string>('services.card.activePlan')).replace('{tier}', subscriptionTier)}
                </div>
              </div>
            ) : (
              <>
                <Button
                  className="btn-steam w-full text-parchment font-inter font-medium hover:scale-105 transition-all duration-300"
                  onClick={() => onSubscription('monthly')}
                  disabled={loading === 'subscription-monthly'}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {loading === 'subscription-monthly' ? t('services.card.loading') : t('services.card.monthlyPrice')}
                </Button>
                <Button
                  className="btn-steam w-full text-parchment font-inter font-medium hover:scale-105 transition-all duration-300"
                  onClick={() => onSubscription('yearly')}
                  disabled={loading === 'subscription-yearly'}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {loading === 'subscription-yearly' ? t('services.card.loading') : t('services.card.yearlyPrice')}
                </Button>
              </>
            )}
          </div>
        ) : price ? (
          <div className="space-y-2">
            <Button
              className="btn-steam w-full text-parchment font-inter font-medium hover:scale-105 transition-all duration-300"
              onClick={() => serviceName && onOneTimePayment(serviceName)}
              disabled={loading === serviceName}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              {loading === serviceName ? t<string>('services.card.loading') : (t<string>('services.card.buyNow')).replace('{price}', String(price))}
            </Button>
            <Button
              variant="outline"
              className="w-full border-2 border-brass text-brass hover:bg-brass/20 font-inter font-medium hover:scale-105 transition-all duration-300 vintage-glow"
              onClick={() => window.location.href = 'mailto:nika.vereskova@gmail.com?subject=' + encodeURIComponent((t<string>('services.card.inquirySubject')).replace('{title}', title))}
            >
              <Mail className="mr-2 h-4 w-4" />
              {t('services.card.contact')}
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full border-2 border-brass text-brass hover:bg-brass/20 font-inter font-medium hover:scale-105 transition-all duration-300 vintage-glow"
              onClick={() => window.location.href = 'mailto:nika.vereskova@gmail.com?subject=' + encodeURIComponent((t<string>('services.card.inquirySubject')).replace('{title}', title))}
            >
              <Mail className="mr-2 h-4 w-4" />
              {t('services.card.contact')}
            </Button>
          </div>
        )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceCard;
