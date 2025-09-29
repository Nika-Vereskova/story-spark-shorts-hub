import { useState, useEffect } from 'react';
import { supportsWebP } from '@/lib/imageUtils';

interface UseImageOptimizationReturn {
  supportsWebP: boolean;
  isLoading: boolean;
}

/**
 * Hook to detect WebP support and manage image optimization state
 */
export const useImageOptimization = (): UseImageOptimizationReturn => {
  const [webPSupport, setWebPSupport] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkWebPSupport = async () => {
      try {
        const supported = await supportsWebP();
        setWebPSupport(supported);
      } catch (error) {
        console.warn('Error checking WebP support:', error);
        setWebPSupport(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkWebPSupport();
  }, []);

  return {
    supportsWebP: webPSupport,
    isLoading,
  };
};

/**
 * Hook for intersection observer based lazy loading
 */
export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, options, hasIntersected]);

  return { isIntersecting, hasIntersected };
};