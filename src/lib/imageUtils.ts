/**
 * Utility functions for image optimization and WebP conversion
 */

export interface ImageSources {
  webp?: string;
  fallback: string;
  alt: string;
  width?: number;
  height?: number;
}

/**
 * Convert PNG filename to WebP equivalent if it exists
 */
export const getWebPSource = (pngSrc: string): string => {
  return pngSrc.replace('.png', '.webp');
};

/**
 * Generate responsive image sources with WebP support
 */
export const generateImageSources = (src: string, alt: string, dimensions?: { width: number; height: number }): ImageSources => {
  const webpSrc = getWebPSource(src);
  
  return {
    webp: webpSrc,
    fallback: src,
    alt,
    width: dimensions?.width,
    height: dimensions?.height,
  };
};

/**
 * Check if WebP is supported by the browser
 */
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Generate srcSet for responsive images
 */
export const generateSrcSet = (baseSrc: string, sizes: number[] = [320, 640, 1024]): string => {
  return sizes
    .map(size => {
      const webpSrc = baseSrc.replace('.png', `-${size}.webp`);
      return `${webpSrc} ${size}w`;
    })
    .join(', ');
};

/**
 * Generate sizes attribute for responsive images
 */
export const generateSizes = (breakpoints: string[] = ['(max-width: 640px) 320px', '(max-width: 1024px) 640px', '320px']): string => {
  return breakpoints.join(', ');
};