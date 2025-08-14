
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';
import ServiceCard from './ServiceCard';
import { getServicesData } from '@/data/servicesData';
import { usePaymentHandlers } from '@/hooks/usePaymentHandlers';
import { useSmoothScroll } from '@/hooks/useScrollAnimation';

const ServicesGrid = () => {
  const { subscribed, subscriptionTier } = useAuth();
  const {
    loading,
    authModalOpen,
    setAuthModalOpen,
    handleOneTimePayment,
    handleSubscription,
  } = usePaymentHandlers();
  
  useSmoothScroll();

  const services = getServicesData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          icon={service.icon}
          title={service.title}
          description={service.description}
          features={service.features}
          price={service.price}
          serviceName={service.serviceName}
          isSubscription={service.isSubscription}
          subscribed={subscribed}
          subscriptionTier={subscriptionTier}
          loading={loading}
          onOneTimePayment={handleOneTimePayment}
          onSubscription={handleSubscription}
        />
      ))}
      
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
};

export default ServicesGrid;
