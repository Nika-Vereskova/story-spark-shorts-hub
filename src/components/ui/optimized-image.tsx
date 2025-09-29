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

  const shouldLoad = priority || !lazy || hasIntersected;
  const imageSources = generateImageSources(src, alt, width && height ? { width, height } : undefined);

  const handleLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  // Generate responsive srcSet if the image supports it
  const responsiveSrcSet = src.includes('lovable-uploads') ? generateSrcSet(src) : undefined;
  const responsiveSizes = sizes || generateSizes();

  return (
    <div ref={imageRef} className={cn('relative', className)}>
      {shouldLoad && (
        <>
          {/* WebP version with fallback */}
          <picture>
            {supportsWebP && imageSources.webp && (
              <source
                type="image/webp"
                srcSet={responsiveSrcSet || imageSources.webp}
                sizes={responsiveSizes}
              />
            )}
            <img
              src={imageSources.fallback}
              alt={alt}
              width={width}
              height={height}
              loading={loading || (priority ? 'eager' : 'lazy')}
              decoding={decoding}
              fetchPriority={fetchPriority || (priority ? 'high' : 'auto')}
              className={cn(
                'transition-opacity duration-300',
                imageLoaded ? 'opacity-100' : 'opacity-0',
                imageError && 'opacity-50'
              )}
              style={style}
              onLoad={handleLoad}
              onError={handleError}
              role={role}
              tabIndex={tabIndex}
              // Accessibility improvements
              aria-hidden={alt === '' ? 'true' : undefined}
            />
          </picture>

          {/* Loading placeholder */}
          {!imageLoaded && !imageError && (
            <div
              className={cn(
                'absolute inset-0 bg-muted animate-pulse rounded',
                'flex items-center justify-center text-muted-foreground text-sm'
              )}
              aria-hidden="true"
            >
              Loading...
            </div>
          )}

          {/* Error fallback */}
          {imageError && (
            <div
              className={cn(
                'absolute inset-0 bg-muted border-2 border-dashed border-muted-foreground',
                'flex items-center justify-center text-muted-foreground text-sm'
              )}
              role="img"
              aria-label={`Failed to load image: ${alt}`}
            >
              Image unavailable
            </div>
          )}
        </>
      )}

      {/* Lazy loading placeholder */}
      {!shouldLoad && (
        <div
          className={cn(
            'bg-muted animate-pulse',
            width && height ? '' : 'aspect-square'
          )}
          style={{ width, height }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default OptimizedImage;