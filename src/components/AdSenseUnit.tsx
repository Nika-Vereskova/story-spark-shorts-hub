import React, { useEffect, useRef } from 'react';

interface AdSenseUnitProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal' | 'autorelaxed';
  adLayout?: string;
  className?: string;
  style?: React.CSSProperties;
}

  declare global {
    interface Window {
      adsbygoogle: unknown[];
    }
  }

const AdSenseUnit: React.FC<AdSenseUnitProps> = ({
  adSlot,
  adFormat = 'auto',
  adLayout,
  className = '',
  style = {}
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.warn('AdSense error:', error);
    }
  }, []);

  return (
    <div 
      ref={adRef}
      className={`adsense-container ${className}`}
      style={style}
    >
      <ins
        className="adsbygoogle"
        style={{ 
          display: 'block',
          border: '1px solid hsl(var(--brass) / 0.2)',
          background: 'hsl(var(--parchment) / 0.05)',
          ...style 
        }}
        data-ad-client="ca-pub-4113128198241483"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSenseUnit;