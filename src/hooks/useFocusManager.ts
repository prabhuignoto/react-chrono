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
        if (
          elementRef.current &&
          !elementRef.current.contains(document.activeElement)
        ) {
          elementRef.current.focus(focusOptions);

          // Add focus-visible class for keyboard navigation (avoid selector)
          if (!elementRef.current.classList.contains('focus-visible')) {
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
          if (
            previousFocusRef.current &&
            typeof previousFocusRef.current.focus === 'function'
          ) {
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

export interface UseFocusTrapOptions {
  /** Whether the focus trap is active */
  isActive: boolean;
  /** Initial focus target: 'first', 'last', or specific element ref */
  initialFocus?: 'first' | 'last' | React.RefObject<HTMLElement>;
  /** Whether to restore focus when trap is deactivated */
  returnFocus?: boolean;
  /** Callback when user tries to escape trap (e.g., Tab from last element) */
  onEscapeAttempt?: () => void;
}

/**
 * Hook for managing focus trap within a container
 *
 * Enhanced version with support for:
 * - Initial focus management
 * - Focus restoration on unmount
 * - Dynamic content updates (via MutationObserver)
 * - Escape attempt callbacks
 *
 * @param options - Configuration options or boolean for backward compatibility
 */
export const useFocusTrap = (
  options: boolean | UseFocusTrapOptions,
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Support backward compatibility with boolean parameter
  const {
    isActive,
    initialFocus = 'first',
    returnFocus = true,
    onEscapeAttempt,
  } = typeof options === 'boolean'
    ? { isActive: options, initialFocus: 'first' as const, returnFocus: true }
    : options;

  // Store previous focus when trap activates
  useEffect(() => {
    if (isActive && returnFocus) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [isActive, returnFocus]);

  // Restore focus when trap deactivates
  useEffect(() => {
    return () => {
      if (!isActive && returnFocus && previousFocusRef.current) {
        requestAnimationFrame(() => {
          previousFocusRef.current?.focus();
          previousFocusRef.current = null;
        });
      }
    };
  }, [isActive, returnFocus]);

  // Set initial focus when trap activates
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]',
    );

    if (focusableElements.length === 0) return;

    requestAnimationFrame(() => {
      if (typeof initialFocus === 'object' && 'current' in initialFocus) {
        // Focus specific element
        initialFocus.current?.focus();
      } else if (initialFocus === 'first') {
        focusableElements[0]?.focus();
      } else if (initialFocus === 'last') {
        focusableElements[focusableElements.length - 1]?.focus();
      }
    });
  }, [isActive, initialFocus]);

  // Handle Tab key to trap focus
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      // Query focusable elements each time to handle dynamic content
      const focusableElements = container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]',
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
          onEscapeAttempt?.();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
          onEscapeAttempt?.();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, onEscapeAttempt]);

  return containerRef;
};
