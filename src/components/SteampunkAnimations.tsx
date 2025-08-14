import React from 'react';
import { Cog } from 'lucide-react';

interface SteamEffectProps {
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

const SteamEffect: React.FC<SteamEffectProps> = ({ 
  intensity = 'medium', 
  className = '' 
}) => {
  const particleCount = intensity === 'low' ? 2 : intensity === 'medium' ? 4 : 6;
  
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      {Array.from({ length: particleCount }).map((_, index) => (
        <div
          key={index}
          className="absolute w-2 h-2 bg-cyan/60 rounded-full steam-particle"
          style={{
            left: `${index * 8}px`,
            animationDelay: `${index * 0.3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

interface MechanicalGearProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  speed?: 'slow' | 'medium' | 'fast';
  direction?: 'clockwise' | 'counter';
  variant?: 'standard' | 'wobble' | 'tick';
  className?: string;
}

const MechanicalGear: React.FC<MechanicalGearProps> = ({
  size = 'md',
  speed = 'medium',
  direction = 'clockwise',
  variant = 'standard',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const getAnimationClass = () => {
    if (variant === 'wobble') return 'gear-wobble';
    if (variant === 'tick') return 'clockwork-tick';
    
    const speedMap = {
      slow: '30s',
      medium: '15s', 
      fast: '8s'
    };
    
    const animationClass = direction === 'clockwise' ? 'gear-clockwise' : 'gear-counter';
    return animationClass;
  };

  return (
    <div className={`${sizeClasses[size]} ${getAnimationClass()} ${className}`}>
      <Cog className="w-full h-full text-brass opacity-60 hover:opacity-80 transition-opacity" />
    </div>
  );
};

interface SteampunkBackgroundProps {
  children: React.ReactNode;
  variant?: 'minimal' | 'moderate' | 'rich';
  className?: string;
}

const SteampunkBackground: React.FC<SteampunkBackgroundProps> = ({
  children,
  variant = 'moderate',
  className = ''
}) => {
  const renderElements = () => {
    switch (variant) {
      case 'minimal':
        return (
          <>
            <MechanicalGear 
              size="lg" 
              speed="slow" 
              className="absolute top-10 right-10 opacity-20" 
            />
            <SteamEffect 
              intensity="low" 
              className="top-20 left-10" 
            />
          </>
        );
      
      case 'moderate':
        return (
          <>
            <MechanicalGear 
              size="xl" 
              speed="slow" 
              direction="clockwise" 
              className="absolute top-8 right-8 opacity-15" 
            />
            <MechanicalGear 
              size="lg" 
              speed="medium" 
              direction="counter" 
              className="absolute bottom-12 left-12 opacity-20" 
            />
            <SteamEffect 
              intensity="medium" 
              className="top-16 left-8" 
            />
            <SteamEffect 
              intensity="low" 
              className="bottom-20 right-16" 
            />
          </>
        );
      
      case 'rich':
        return (
          <>
            <MechanicalGear 
              size="xl" 
              speed="slow" 
              direction="clockwise" 
              variant="wobble"
              className="absolute top-8 right-8 opacity-25" 
            />
            <MechanicalGear 
              size="lg" 
              speed="medium" 
              direction="counter" 
              className="absolute top-20 left-20 opacity-20" 
            />
            <MechanicalGear 
              size="md" 
              speed="fast" 
              direction="clockwise" 
              variant="tick"
              className="absolute bottom-16 right-20 opacity-30" 
            />
            <MechanicalGear 
              size="lg" 
              speed="slow" 
              direction="counter" 
              className="absolute bottom-8 left-8 opacity-15" 
            />
            <SteamEffect 
              intensity="high" 
              className="top-12 left-12" 
            />
            <SteamEffect 
              intensity="medium" 
              className="top-32 right-24" 
            />
            <SteamEffect 
              intensity="low" 
              className="bottom-24 left-32" 
            />
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {renderElements()}
      {children}
    </div>
  );
};

export { SteamEffect, MechanicalGear, SteampunkBackground };