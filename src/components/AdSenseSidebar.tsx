import React from 'react';
import AdSenseUnit from './AdSenseUnit';

interface AdSenseSidebarProps {
  className?: string;
  position?: 'left' | 'right';
}

const AdSenseSidebar: React.FC<AdSenseSidebarProps> = ({ 
  className = '', 
  position = 'right' 
}) => {
  const getAdSlot = () => {
    // You'll need to replace these with actual ad slot IDs from your AdSense account
    return position === 'left' ? '7890123456' : '8901234567';
  };

  return (
    <div className={`hidden lg:block ${className}`}>
      <AdSenseUnit
        adSlot={getAdSlot()}
        adFormat="vertical"
        className="steampunk-ad-sidebar sticky top-24"
        style={{
          width: '160px',
          height: '600px',
          borderRadius: '12px',
          border: '3px solid hsl(var(--brass) / 0.5)',
          background: 'linear-gradient(180deg, hsl(var(--parchment) / 0.08), hsl(var(--brass) / 0.1))',
          boxShadow: '0 6px 12px hsl(var(--oxidized-teal) / 0.3)'
        }}
      />
    </div>
  );
};

export default AdSenseSidebar;