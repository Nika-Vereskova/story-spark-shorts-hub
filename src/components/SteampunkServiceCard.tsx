import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VintageFrame } from './SteampunkElements';

interface SteampunkServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  price?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

const SteampunkServiceCard: React.FC<SteampunkServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  features,
  price,
  buttonText = "Learn More",
  onButtonClick,
  className = ""
}) => {
  return (
    <div className={`group relative ${className}`}>
      <VintageFrame className="h-full">
        <div className="bg-cream-white/95 backdrop-blur-sm border-2 border-deep-copper rounded-lg p-6 h-full transition-all duration-300 hover:shadow-vintage hover:-translate-y-2 vintage-paper">
          
          {/* Icon with decorative background */}
          <div className="relative mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-antique-gold opacity-20 rounded-full blur-xl scale-150"></div>
              <div className="relative bg-copper-gradient p-4 rounded-full border-2 border-bronze shadow-bronze">
                <Icon className="w-8 h-8 text-cream-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-playfair text-deep-copper mb-4 text-center font-bold tracking-wide">
            {title}
          </h3>

          {/* Description */}
          <p className="text-charcoal mb-6 font-source-sans leading-relaxed text-center">
            {description}
          </p>

          {/* Features List */}
          <ul className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-antique-gold rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-charcoal font-source-sans text-sm leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* Price (if provided) */}
          {price && (
            <div className="text-center mb-6">
              <div className="inline-block bg-navy-gradient text-cream-white px-4 py-2 rounded-lg">
                <span className="text-lg font-montserrat font-semibold">{price}</span>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="text-center">
            <Button
              variant="amber"
              size="lg"
              onClick={onButtonClick}
              className="w-full uppercase tracking-wider font-montserrat hover:scale-105 transition-transform duration-300"
            >
              {buttonText}
            </Button>
          </div>

          {/* Hover effect gears */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
            <Icon className="w-6 h-6 text-antique-gold gear-spin" />
          </div>
          
        </div>
      </VintageFrame>
    </div>
  );
};

export default SteampunkServiceCard;