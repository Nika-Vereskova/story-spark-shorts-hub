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
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
      </div>
      {imageUrl && (
        <img src={imageUrl} alt="" className="hero-image" />
      )}
    </section>
  );
};

export default HeroBanner;
