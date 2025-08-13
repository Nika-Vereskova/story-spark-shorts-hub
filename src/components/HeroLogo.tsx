import React from 'react';
import logo3D from '@/assets/logo-3d.png';

interface HeroLogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const HeroLogo = ({ size = 'large', className = '' }: HeroLogoProps) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24', 
    large: 'w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48'
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Background glow effect */}
      <div className={`absolute inset-0 ${sizeClasses[size]} bg-gradient-radial from-accent/20 via-secondary/10 to-transparent blur-xl animate-pulse`} />
      
      {/* Main logo */}
      <img
        src={logo3D}
        alt="STEaM LOGIC Studio AB - 3D Brass Gear and Teal Feather"
        className={`relative z-10 ${sizeClasses[size]} gear transition-all duration-500 hover:scale-110 drop-shadow-2xl filter brightness-110 contrast-110`}
        loading="eager"
      />
      
      {/* Subtle shadow ring */}
      <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-gradient-conic from-secondary/30 via-primary/20 to-secondary/30 blur-md opacity-60`} 
           style={{ transform: 'scale(1.1)' }} />
    </div>
  );
};

export default HeroLogo;