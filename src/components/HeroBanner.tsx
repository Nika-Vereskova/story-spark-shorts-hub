import React from 'react';
import { Button } from '@/components/ui/button';

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  linkText?: string;
  linkUrl?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  subtitle,
  imageUrl,
  ctaText,
  ctaUrl,
  linkText,
  linkUrl,
}) => {
  return (
    <section className="hero-banner">
      <div>
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle max-w-[45ch]">{subtitle}</p>}
        {ctaText && ctaUrl && (
          <Button asChild className="w-full sm:w-auto mt-4">
            <a href={ctaUrl}>{ctaText}</a>
          </Button>
        )}
        {linkText && linkUrl && (
          <a href={linkUrl} className="mt-2 text-sm underline">
            {linkText}
          </a>
        )}
      </div>
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          className="hero-image"
          loading="lazy"
          srcSet={`${imageUrl}?width=480 480w, ${imageUrl}?width=768 768w, ${imageUrl} 1024w`}
          sizes="(max-width: 768px) 100vw, 768px"
        />
      )}
    </section>
  );
};

export default HeroBanner;
