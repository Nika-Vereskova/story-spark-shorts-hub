import React from 'react';

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ title, subtitle, imageUrl }) => {
  return (
    <section className="hero-banner">
      <div>
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle max-w-[45ch]">{subtitle}</p>}
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
