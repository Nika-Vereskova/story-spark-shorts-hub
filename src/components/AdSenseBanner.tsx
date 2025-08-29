import React from 'react';
import AdSenseUnit from './AdSenseUnit';

interface AdSenseBannerProps {
  className?: string;
  position?: 'top' | 'bottom' | 'middle';
}

const AdSenseBanner: React.FC<AdSenseBannerProps> = ({ 
  className = '', 
  position = 'middle' 
}) => {
  const getAdSlot = () => {
    // You'll need to replace these with actual ad slot IDs from your AdSense account
    switch (position) {
      case 'top': return '1234567890';
      case 'bottom': return '2345678901';
      default: return '3456789012';
    }
  };

  return (
    <div className={`w-full flex justify-center my-8 ${className}`}>
      <div className="max-w-4xl w-full">
        <AdSenseUnit
          adSlot={getAdSlot()}
          adFormat="auto"
          className="steampunk-ad-banner"
          style={{
            minHeight: '100px',
            borderRadius: '4px',
            border: '2px solid hsl(var(--brass) / 0.3)',
            background: 'linear-gradient(45deg, hsl(var(--parchment) / 0.02), hsl(var(--brass) / 0.05))'
          }}
        />
      </div>
    </div>
  );
};

export default AdSenseBanner;