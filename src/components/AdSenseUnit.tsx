import React, { useCallback, useEffect, useRef, useState } from 'react';

interface AdSenseUnitProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal' | 'autorelaxed';
  adLayout?: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
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
  style = {},
  onLoad
}) => {
  const insRef = useRef<HTMLModElement>(null);
  const [hasAd, setHasAd] = useState(false);

  const checkAd = useCallback(() => {
    const height = insRef.current?.getBoundingClientRect().height ?? 0;
    setHasAd(height > 0);
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.warn('AdSense error:', error);
    }

    const timer = setTimeout(checkAd, 5000);
    return () => clearTimeout(timer);
  }, [checkAd]);

  const handleLoad = () => {
    checkAd();
    onLoad?.();
  };

  const wrapperStyle: React.CSSProperties = {
    overflow: 'hidden',
    minHeight: hasAd ? undefined : 0,
    height: hasAd ? undefined : 0,
    ...style
  };

  if (hasAd) {
    wrapperStyle.border = style?.border ?? '1px solid hsl(var(--brass) / 0.2)';
    wrapperStyle.background =
      style?.background ?? 'hsl(var(--parchment) / 0.05)';
  }

  return (
    <div
      className={`adsense-container ${className}`}
      style={wrapperStyle}
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{
          display: 'block'
        }}
        data-ad-client="ca-pub-4113128198241483"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-full-width-responsive="true"
        onLoad={handleLoad}
      />
    </div>
  );
};

export default AdSenseUnit;
