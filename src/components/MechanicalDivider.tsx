import React from 'react';
import { cn } from '@/lib/utils';
import GearIcon from './GearIcon';

interface MechanicalDividerProps {
  className?: string;
  showGears?: boolean;
}

const MechanicalDivider = ({ className, showGears = true }: MechanicalDividerProps) => {
  return (
    <div className={cn(
      'relative flex items-center justify-center my-8 px-6',
      className
    )}>
      {/* Central decorative pipe */}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brass/40 to-transparent" />
      
      {showGears && (
        <div className="relative mx-6 flex items-center gap-2">
          {/* Left gear */}
          <GearIcon 
            size={4}
            direction="counter"
            color="text-brass/60"
            className="drop-shadow-sm"
          />
          
          {/* Center ornament */}
          <div className="w-3 h-3 rounded-full bg-brass/30 border border-brass/50 shadow-inner" />
          
          {/* Right gear */}
          <GearIcon 
            size={4}
            direction="clockwise" 
            color="text-oxidized-teal/60"
            className="drop-shadow-sm"
          />
        </div>
      )}
      
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-brass/40 to-transparent" />
    </div>
  );
};

export default MechanicalDivider;