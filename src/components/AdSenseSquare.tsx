import React from 'react';
import AdSenseUnit from './AdSenseUnit';

interface AdSenseSquareProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const AdSenseSquare: React.FC<AdSenseSquareProps> = ({ 
  className = '', 
  size = 'medium' 
}) => {
  const getAdSlot = () => {
    // Actual ad slot ID from our AdSense account
    return '9759787900';
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-full max-w-[200px] h-auto';
      case 'large':
        return 'w-full max-w-[336px] h-auto';
      default:
        return 'w-full max-w-[300px] h-auto';
    }
  };

  return (
    <div className={`w-full flex justify-center my-6 ${className}`}>
      <AdSenseUnit
        adSlot={getAdSlot()}
        adFormat="rectangle"
        className={`steampunk-ad-square ${getSizeClasses()}`}
        style={{
          borderRadius: '8px',
          border: '2px solid hsl(var(--brass) / 0.4)',
          background: 'linear-gradient(135deg, hsl(var(--parchment) / 0.03), hsl(var(--oxidized-teal) / 0.05))',
          boxShadow: '0 4px 8px hsl(var(--brass) / 0.2)'
        }}
      />
    </div>
  );
};

export default AdSenseSquare;
