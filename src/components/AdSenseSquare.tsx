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

  const getSizeStyle = () => {
    switch (size) {
      case 'small': return { width: '200px', height: '200px' };
      case 'large': return { width: '336px', height: '280px' };
      default: return { width: '300px', height: '250px' };
    }
  };

  return (
    <div className={`flex justify-center my-6 ${className}`}>
      <AdSenseUnit
        adSlot={getAdSlot()}
        adFormat="rectangle"
        className="steampunk-ad-square"
        style={{
          ...getSizeStyle(),
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
