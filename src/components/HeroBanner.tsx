import React from 'react';
import { Button } from '@/components/ui/button';

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  subtitle,
  imageUrl,
  ctaText,
  ctaUrl,
}) => {
  return (
    <section className="hero-banner relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-0 pointer-events-none" />
      <div className="hero-text-group relative z-10 w-fit">
        <h1 className="hero-title md:max-w-[20ch]">{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        {ctaText && ctaUrl && (
          <Button asChild className="w-full sm:w-auto mt-4">
            <a href={ctaUrl}>{ctaText}</a>
          </Button>
        )}
      </div>
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          className="hero-image relative z-10"
          loading="lazy"
          srcSet={`${imageUrl}?width=480 480w, ${imageUrl}?width=768 768w, ${imageUrl} 1024w`}
          sizes="(max-width: 768px) 100vw, 768px"
        />
      )}
    </section>
  );
};

export default HeroBanner;
