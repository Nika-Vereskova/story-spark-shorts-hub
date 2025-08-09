import React from 'react';

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ title, subtitle, imageUrl }) => {
  return (
    <section className="hero-banner relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-0 pointer-events-none" />
      <div className="relative z-10">
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
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
