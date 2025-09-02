import React from 'react';
import { cn } from '@/lib/utils';
import GearIcon from './GearIcon';

interface SteampunkGearClusterProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
}

const SteampunkGearCluster = ({ 
  className, 
  size = 'md', 
  position = 'center' 
}: SteampunkGearClusterProps) => {
  const sizeConfig = {
    sm: { main: 6, accent: 4, small: 3 },
    md: { main: 8, accent: 6, small: 4 },
    lg: { main: 12, accent: 8, small: 5 }
  };

  const positionConfig = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4', 
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  };

  const sizes = sizeConfig[size];

  return (
    <div className={cn(
      'absolute pointer-events-none opacity-20 hover:opacity-40 transition-opacity duration-500',
      positionConfig[position],
      className
    )}>
      {/* Main central gear */}
      <div className="relative">
        <GearIcon 
          size={sizes.main}
          direction="clockwise"
          color="text-brass"
          className="drop-shadow-lg"
        />
        
        {/* Overlapping accent gear */}
        <GearIcon 
          size={sizes.accent}
          direction="counter"
          color="text-oxidized-teal"
          className="absolute -top-2 -right-2 drop-shadow-md"
        />
        
        {/* Small connecting gears */}
        <GearIcon 
          size={sizes.small}
          direction="clockwise"
          color="text-brass/70"
          className="absolute -bottom-1 -left-1"
        />
        
        <GearIcon 
          size={sizes.small}
          direction="counter" 
          color="text-teal/70"
          className="absolute -top-1 -left-2"
        />
      </div>
    </div>
  );
};

export default SteampunkGearCluster;