import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useImageOptimization, useIntersectionObserver } from '@/hooks/useImageOptimization';
import { generateImageSources, generateSrcSet, generateSizes } from '@/lib/imageUtils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean; // For above-the-fold images
  lazy?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
  // Additional HTML img attributes
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
  style?: React.CSSProperties;
  role?: string;
  tabIndex?: number;
}

/**
 * Optimized image component with WebP support, lazy loading, and accessibility
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  lazy = true,
  sizes,
  onLoad,
  onError,
  loading,
  decoding = 'async',
  fetchPriority,
  style,
  role,
  tabIndex,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const { supportsWebP } = useImageOptimization();
  const { hasIntersected } = useIntersectionObserver(imageRef, {
    threshold: 0.1,
    rootMargin: '50px',
  });

  // Simplified loading logic - priority images always load
  const shouldLoad = priority || !lazy || hasIntersected;
  
  const handleLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  // For priority images, show them immediately
  if (priority) {
    return (
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="eager"
        decoding={decoding}
        fetchPriority="high"
        className={className}
        style={style}
        onLoad={handleLoad}
        onError={handleError}
        role={role}
        tabIndex={tabIndex}
        aria-hidden={alt === '' ? 'true' : undefined}
      />
    );
  }

  return shouldLoad ? (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading || 'lazy'}
      decoding={decoding}
      fetchPriority={fetchPriority || 'auto'}
      className={cn(
        'transition-opacity duration-300',
        imageLoaded ? 'opacity-100' : 'opacity-0',
        imageError && 'opacity-50',
        className
      )}
      style={style}
      onLoad={handleLoad}
      onError={handleError}
      role={role}
      tabIndex={tabIndex}
      aria-hidden={alt === '' ? 'true' : undefined}
    />
  ) : (
    <div
      ref={imageRef}
      className={cn(
        'bg-muted animate-pulse',
        width && height ? '' : 'aspect-square'
      )}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
};

export default OptimizedImage;