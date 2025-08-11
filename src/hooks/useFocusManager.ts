import { useEffect, useRef } from 'react';

interface UseFocusManagerProps {
  shouldFocus: boolean;
  isActive: boolean;
  preventScroll?: boolean;
  restoreFocus?: boolean;
}

/**
 * Hook for managing focus with proper restoration and accessibility
 */
export const useFocusManager = ({
  shouldFocus,
  isActive,
  preventScroll = true,
  restoreFocus = true,
}: UseFocusManagerProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const hasRestoredRef = useRef(false);

  // Store previous focus when component becomes active
  useEffect(() => {
    if (isActive && shouldFocus && restoreFocus && !hasRestoredRef.current) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      hasRestoredRef.current = false;
    }
  }, [isActive, shouldFocus, restoreFocus]);

  // Manage focus based on state
  useEffect(() => {
    if (!elementRef.current) return;

    if (shouldFocus && isActive) {
      // Set focus with proper options
      const focusOptions: FocusOptions = { preventScroll };
      
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        if (elementRef.current && !elementRef.current.contains(document.activeElement)) {
          elementRef.current.focus(focusOptions);
          
          // Add focus-visible class for keyboard navigation
          if (!elementRef.current.matches(':focus-visible')) {
            elementRef.current.classList.add('focus-visible');
          }
        }
      });
    }

    // Cleanup function
    return () => {
      // Remove focus-visible class when focus is lost
      if (elementRef.current?.classList.contains('focus-visible')) {
        elementRef.current.classList.remove('focus-visible');
      }
    };
  }, [shouldFocus, isActive, preventScroll]);

  // Restore focus when component becomes inactive
  useEffect(() => {
    return () => {
      if (
        restoreFocus &&
        !isActive &&
        previousFocusRef.current &&
        !hasRestoredRef.current
      ) {
        // Restore focus to previous element
        requestAnimationFrame(() => {
          if (previousFocusRef.current && 
              typeof previousFocusRef.current.focus === 'function') {
            previousFocusRef.current.focus();
            hasRestoredRef.current = true;
          }
        });
      }
    };
  }, [isActive, restoreFocus]);

  // Reset restoration flag when component becomes active again
  useEffect(() => {
    if (isActive) {
      hasRestoredRef.current = false;
    }
  }, [isActive]);

  return elementRef;
};

/**
 * Hook for managing focus trap within a container
 */
export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive]);

  return containerRef;
};