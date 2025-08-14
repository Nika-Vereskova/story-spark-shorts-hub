import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface MobileOptimizedCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

const MobileOptimizedCard = ({ 
  icon: Icon, 
  title, 
  description, 
  className = "" 
}: MobileOptimizedCardProps) => {
  return (
    <Card className={`
      bg-parchment/90 
      border-2 border-brass 
      hover:border-brass-dark 
      transition-all duration-300 
      hover:scale-105 
      shadow-brass-drop
      touch-target
      ${className}
    `}>
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 bg-brass/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-brass animate-icon-spin" />
        </div>
        <CardTitle className="text-oxidized-teal text-xl font-playfair leading-tight">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-oxidized-teal/70 font-inter text-center leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default MobileOptimizedCard;