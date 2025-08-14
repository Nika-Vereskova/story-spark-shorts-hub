import React from 'react';
import { Cog, Wrench, Compass, Clock } from 'lucide-react';

interface SteamPuffProps {
  className?: string;
}

export const SteamPuff: React.FC<SteamPuffProps> = ({ className = "" }) => {
  return (
    <div className={`absolute animate-steam-puff opacity-0 ${className}`}>
      <div className="w-4 h-4 bg-cream-white rounded-full blur-sm"></div>
    </div>
  );
};

interface FloatingGearsProps {
  className?: string;
}

export const FloatingGears: React.FC<FloatingGearsProps> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <div className="absolute top-20 left-10 w-16 h-16 opacity-10">
        <Cog className="w-full h-full text-antique-gold gear-spin" />
      </div>
      <div className="absolute top-40 right-20 w-12 h-12 opacity-15">
        <Cog className="w-full h-full text-bronze gear-spin-reverse" />
      </div>
      <div className="absolute bottom-32 left-1/4 w-10 h-10 opacity-10">
        <Wrench className="w-full h-full text-deep-copper" style={{ transform: 'rotate(45deg)' }} />
      </div>
      <div className="absolute bottom-20 right-1/3 w-8 h-8 opacity-15">
        <Compass className="w-full h-full text-warm-amber gear-spin" />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-5">
        <Clock className="w-full h-full text-antique-gold gear-spin" style={{ animationDuration: '45s' }} />
      </div>
    </div>
  );
};

interface VintageFrameProps {
  children: React.ReactNode;
  className?: string;
}

export const VintageFrame: React.FC<VintageFrameProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative p-6 ${className}`}>
      {/* Ornate brass corners */}
      <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-antique-gold"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-antique-gold"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-antique-gold"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-antique-gold"></div>
      
      {/* Decorative side elements */}
      <div className="absolute top-6 left-0 w-1 h-8 bg-gradient-to-b from-antique-gold to-bronze"></div>
      <div className="absolute top-6 right-0 w-1 h-8 bg-gradient-to-b from-antique-gold to-bronze"></div>
      <div className="absolute bottom-6 left-0 w-1 h-8 bg-gradient-to-t from-antique-gold to-bronze"></div>
      <div className="absolute bottom-6 right-0 w-1 h-8 bg-gradient-to-t from-antique-gold to-bronze"></div>
      
      {children}
    </div>
  );
};

interface CopperDividerProps {
  className?: string;
  showGear?: boolean;
}

export const CopperDivider: React.FC<CopperDividerProps> = ({ 
  className = "", 
  showGear = true 
}) => {
  return (
    <div className={`relative my-8 ${className}`}>
      <div className="h-1 bg-copper-gradient rounded-full"></div>
      {showGear && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cream-white p-2 rounded-full">
          <Cog className="w-6 h-6 text-deep-copper gear-spin" />
        </div>
      )}
    </div>
  );
};

interface SteampunkButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'copper' | 'brass' | 'bronze';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SteampunkButton: React.FC<SteampunkButtonProps> = ({
  children,
  onClick,
  variant = 'copper',
  size = 'md',
  className = ""
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-lg border-2";
  
  const variantStyles = {
    copper: "bg-deep-copper text-cream-white border-bronze hover:bg-bronze",
    brass: "bg-warm-amber text-charcoal border-antique-gold hover:bg-antique-gold",
    bronze: "bg-bronze text-cream-white border-deep-copper hover:bg-deep-copper"
  };
  
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
      {/* Steam effect on hover */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 hover:opacity-100 transition-opacity duration-300">
        <SteamPuff />
      </div>
    </button>
  );
};

export default {
  SteamPuff,
  FloatingGears,
  VintageFrame,
  CopperDivider,
  SteampunkButton
};