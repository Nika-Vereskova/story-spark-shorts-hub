import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import GearIcon from './GearIcon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface SteampunkProjectCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  gradient: string;
  index: number;
}

const SteampunkProjectCard = ({ 
  title, 
  description, 
  icon: Icon, 
  link, 
  gradient,
  index 
}: SteampunkProjectCardProps) => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  return (
    <div
      ref={elementRef}
      className={cn(
        'transform transition-all duration-700 delay-100',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <Link to={link} className="group block">
        <div className={cn(
          'relative bg-gradient-to-br border-2 border-brass/30 backdrop-blur-sm',
          'rounded-2xl p-8 overflow-hidden',
          'hover:border-brass/60 hover:shadow-2xl hover:shadow-brass/20',
          'transition-all duration-500 hover:-translate-y-2',
          'before:absolute before:inset-0 before:bg-gradient-to-br before:from-brass/5 before:to-transparent before:opacity-0',
          'hover:before:opacity-100 before:transition-opacity before:duration-300',
          gradient
        )}>
          {/* Corner rivets */}
          <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-brass/40 border border-brass/60" />
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-brass/40 border border-brass/60" />
          <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-brass/40 border border-brass/60" />
          <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-brass/40 border border-brass/60" />

          {/* Decorative gears */}
          <div className="absolute -top-2 -right-2 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
            <GearIcon size={6} direction="clockwise" color="text-brass" />
          </div>
          
          <div className="absolute -bottom-1 -left-1 opacity-15 group-hover:opacity-30 transition-opacity duration-300">
            <GearIcon size={4} direction="counter" color="text-oxidized-teal" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-start gap-6 mb-6">
              <div className={cn(
                'w-16 h-16 rounded-xl flex items-center justify-center',
                'bg-gradient-to-br from-brass/20 to-brass/30 border border-brass/40',
                'group-hover:from-brass/30 group-hover:to-brass/40 group-hover:scale-110',
                'transition-all duration-300 shadow-lg'
              )}>
                <Icon className="w-8 h-8 text-brass group-hover:text-parchment transition-colors duration-300" />
              </div>
              
              <div className="flex-1">
                <h3 className={cn(
                  'text-2xl font-playfair text-oxidized-teal mb-3 leading-tight',
                  'group-hover:text-brass transition-colors duration-300',
                  'drop-shadow-sm'
                )}>
                  {title}
                </h3>
                
                <p className={cn(
                  'text-oxidized-teal/80 leading-relaxed text-base',
                  'group-hover:text-brass transition-colors duration-300'
                )}>
                  {description}
                </p>
              </div>
            </div>

            {/* Interactive element */}
            <div className="mt-auto">
              <div className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-lg',
                'bg-gradient-to-r from-teal/20 to-brass/20 border border-brass/30',
                'group-hover:from-teal/30 group-hover:to-brass/30 group-hover:border-brass/50',
                'transition-all duration-300 text-sm font-medium text-oxidized-teal',
                'group-hover:text-brass group-hover:shadow-lg'
              )}>
                <span>Explore Project</span>
                <GearIcon size={3} direction="clockwise" color="text-brass" />
              </div>
            </div>
          </div>

          {/* Hover steam effect */}
          <div className={cn(
            'absolute inset-0 pointer-events-none opacity-0',
            'group-hover:opacity-100 transition-opacity duration-500',
            'bg-gradient-to-t from-transparent via-parchment/5 to-transparent'
          )} />
        </div>
      </Link>
    </div>
  );
};

export default SteampunkProjectCard;