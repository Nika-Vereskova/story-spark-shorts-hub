import React from 'react';

interface HeroLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const HeroLogo = ({ className = '', size = 'lg' }: HeroLogoProps) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24', 
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  };

  return (
    <div className={`relative ${className}`}>
      {/* Glow effect backdrop */}
      <div className={`absolute inset-0 ${sizeClasses[size]} animate-pulse`}>
        <div className="w-full h-full bg-brass/20 rounded-full blur-xl"></div>
      </div>
      
      {/* Main logo */}
      <img
        src="/lovable-uploads/e3cfb4ba-d1c1-45ec-9d05-cbdd7e1bcacc.png"
        alt="STEaM LOGIC Studio AB - 3D Logo"
        className={`relative z-10 ${sizeClasses[size]} gear hover:scale-110 transition-transform duration-500 drop-shadow-xl`}
        loading="lazy"
      />
      
      {/* Inner glow ring */}
      <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-2 border-brass/30 animate-pulse z-0`}></div>
    </div>
  );
};

export default HeroLogo;