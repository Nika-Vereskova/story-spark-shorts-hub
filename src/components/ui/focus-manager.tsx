import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FocusManagerProps {
  children: React.ReactNode;
  className?: string;
  autoFocus?: boolean;
  trapFocus?: boolean;
  restoreFocus?: boolean;
  onEscape?: () => void;
}

/**
 * Focus management component for accessibility
 * Handles focus trapping, restoration, and keyboard navigation
 */
export const FocusManager: React.FC<FocusManagerProps> = ({
  children,
  className,
  autoFocus = false,
  trapFocus = false,
  restoreFocus = false,
  onEscape,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  useEffect(() => {
    if (restoreFocus) {
      previousActiveElement.current = document.activeElement;
    }

    if (autoFocus && containerRef.current) {
      const firstFocusable = getFocusableElements(containerRef.current)[0];
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }

    return () => {
      if (restoreFocus && previousActiveElement.current) {
        (previousActiveElement.current as HTMLElement).focus();
      }
    };
  }, [autoFocus, restoreFocus]);

  useEffect(() => {
    if (!trapFocus) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onEscape) {
        onEscape();
        return;
      }

      if (event.key === 'Tab' && containerRef.current) {
        const focusableElements = getFocusableElements(containerRef.current);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [trapFocus, onEscape]);

  return (
    <div
      ref={containerRef}
      className={cn(className)}
      role={trapFocus ? 'dialog' : undefined}
      aria-modal={trapFocus}
    >
      {children}
    </div>
  );
};

/**
 * Get all focusable elements within a container
 */
const getFocusableElements = (container: Element): HTMLElement[] => {
  const focusableSelectors = [
    'button:not([disabled])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'select:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(', ');

  return Array.from(container.querySelectorAll(focusableSelectors)).filter(
    (element) => {
      const htmlElement = element as HTMLElement;
      return (
        htmlElement.offsetParent !== null && // Element is visible
        !htmlElement.hasAttribute('inert') &&
        window.getComputedStyle(htmlElement).visibility !== 'hidden'
      );
    }
  ) as HTMLElement[];
};

/**
 * Hook for managing focus within a component
 */
export const useFocusManagement = (enabled: boolean = true) => {
  const focusRef = useRef<HTMLElement>(null);

  const focusFirst = () => {
    if (!enabled || !focusRef.current) return;
    const focusableElements = getFocusableElements(focusRef.current);
    if (focusableElements[0]) {
      focusableElements[0].focus();
    }
  };

  const focusLast = () => {
    if (!enabled || !focusRef.current) return;
    const focusableElements = getFocusableElements(focusRef.current);
    const lastElement = focusableElements[focusableElements.length - 1];
    if (lastElement) {
      lastElement.focus();
    }
  };

  return {
    focusRef,
    focusFirst,
    focusLast,
  };
};

export default FocusManager;