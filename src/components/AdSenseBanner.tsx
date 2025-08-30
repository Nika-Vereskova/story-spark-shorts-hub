import React, { useState } from 'react';
import AdSenseUnit from './AdSenseUnit';

interface AdSenseBannerProps {
  className?: string;
  position?: 'top' | 'bottom' | 'middle';
}

const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  className = '',
  position = 'middle'
}) => {
  const [loaded, setLoaded] = useState(false);

  const getAdSlot = () => {
    // Actual ad slot ID from our AdSense account
    switch (position) {
      case 'top':
      case 'bottom':
      default:
        return '9759787900';
    }
  };

  return (
    <div
      className={`w-full flex justify-center ${loaded ? 'my-8' : 'my-0'} ${className}`}
    >
      <div className="max-w-4xl w-full">
        <AdSenseUnit
          adSlot={getAdSlot()}
          adFormat="auto"
          className={`${
            loaded ? 'min-h-[50px] sm:min-h-[100px]' : 'min-h-0'
          } steampunk-ad-banner`}
          onLoad={() => setLoaded(true)}
          style={{
            borderRadius: '4px',
            border: '2px solid hsl(var(--brass) / 0.3)',
            background:
              'linear-gradient(45deg, hsl(var(--parchment) / 0.02), hsl(var(--brass) / 0.05))'
          }}
        />
      </div>
    </div>
  );
};

export default AdSenseBanner;

