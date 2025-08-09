
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { t } from '@/lib/i18n';
import { 
  ChevronRight,
  CreditCard,
  Mail,
  Calendar
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
  return (
    <Card className="bg-parchment/90 border-2 border-brass shadow-brass-drop hover:shadow-brass-glow transition-all duration-300 hover:scale-105 relative group">
      {/* Ornate brass corners */}
      <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-brass opacity-60 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-brass opacity-60 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-brass opacity-60 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-brass opacity-60 group-hover:opacity-100 transition-opacity"></div>
      
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 mx-auto mb-4 bg-brass/20 rounded-full flex items-center justify-center group-hover:bg-brass/30 transition-colors">
          <Icon className="w-8 h-8 text-brass" />
        </div>
        <CardTitle className="text-oxidized-teal text-2xl font-playfair drop-shadow-text-drop">
          {title}
        </CardTitle>
        <CardDescription className="text-oxidized-teal/80 font-playfair">
          {description}
        </CardDescription>
        {price && (
          <div className="text-brass font-bold text-xl font-playfair">
            {price}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start text-oxidized-teal/90 font-playfair text-sm">
              <ChevronRight className="w-4 h-4 text-brass mt-0.5 mr-2 flex-shrink-0" />
              {feature}
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
                  className="w-full bg-brass hover:bg-brass-dark text-parchment border-2 border-brass-dark shadow-inner-glow transition-all duration-300 font-playfair font-medium"
                  onClick={() => onSubscription('monthly')}
                  disabled={loading === 'subscription-monthly'}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {loading === 'subscription-monthly' ? t('services.card.loading') : t('services.card.monthlyPrice')}
                </Button>
                <Button
                  className="w-full bg-brass hover:bg-brass-dark text-parchment border-2 border-brass-dark shadow-inner-glow transition-all duration-300 font-playfair font-medium"
                  onClick={() => onSubscription('yearly')}
                  disabled={loading === 'subscription-yearly'}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {loading === 'subscription-yearly' ? t('services.card.loading') : t('services.card.yearlyPrice')}
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <Button
              className="w-full bg-brass hover:bg-brass-dark text-parchment border-2 border-brass-dark shadow-inner-glow transition-all duration-300 font-playfair font-medium"
              onClick={() => serviceName && onOneTimePayment(serviceName)}
              disabled={loading === serviceName}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              {loading === serviceName ? t<string>('services.card.loading') : (t<string>('services.card.buyNow')).replace('{price}', String(price))}
            </Button>
            <Button
              variant="outline"
              className="w-full border-2 border-brass text-brass hover:bg-brass/10 font-playfair font-medium"
              onClick={() => window.location.href = 'mailto:nika.vereskova@gmail.com?subject=' + encodeURIComponent((t<string>('services.card.inquirySubject')).replace('{title}', title))}
            >
              <Mail className="mr-2 h-4 w-4" />
              {t('services.card.contact')}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
