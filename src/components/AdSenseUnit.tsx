import React, { useEffect, useRef, useState } from 'react';

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

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // Ensure the adsbygoogle queue exists and push a request
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      }
    } catch (error) {
      console.warn('AdSense error:', error);
    }

    // Observe size changes without forcing a layout
    let ro: ResizeObserver | null = null;
    const target = insRef.current as unknown as Element | null;
    if (typeof window !== 'undefined' && target && 'ResizeObserver' in window) {
      ro = new ResizeObserver((entries) => {
        const entry = entries[0];
        const height = entry?.contentRect?.height ?? 0;
        setHasAd(height > 0);
      });
      ro.observe(target);
    } else {
      // Fallback: check later without tight loops
      const fallbackTimer = setTimeout(() => {
        const el = insRef.current as unknown as HTMLElement | null;
        const height = el?.offsetHeight ?? 0;
        setHasAd(height > 0);
      }, 4000);
      return () => clearTimeout(fallbackTimer);
    }

    return () => {
      ro?.disconnect();
    };
  }, []);

  const handleLoad = () => {
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
