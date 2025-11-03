import { useCallback, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './accessibility';

type ScrollOptions = {
  behavior: ScrollBehavior;
  block: ScrollLogicalPosition;
  inline: ScrollLogicalPosition;
};

// Default scroll duration that balances smoothness with responsiveness
const DEFAULT_SCROLL_DURATION = 300; // Further reduced for more responsive keyboard navigation

/**
 * Smooth scroll with improved easing function for more fluid motion
 */
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

/**
 * Even smoother easing function for gradual movement
 */
const easeInOutQuart = (t: number): number => {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * Math.pow(-t + 1, 4);
};

/**
 * Custom smooth scroll implementation for better control and smoother animation
 * Respects user's motion preferences for accessibility (WCAG 2.3.3)
 */
const smoothScrollTo = (
  container: Element,
  targetPosition: number,
  duration: number = DEFAULT_SCROLL_DURATION,
  isHorizontal: boolean = false,
  prefersReducedMotion: boolean = false,
  onComplete?: () => void,
) => {
  // Instant scroll when user prefers reduced motion
  if (prefersReducedMotion || duration === 0) {
    if (isHorizontal) {
      container.scrollLeft = targetPosition;
    } else {
      container.scrollTop = targetPosition;
    }
    if (onComplete) {
      onComplete();
    }
    return;
  }

  const startPosition = isHorizontal
    ? container.scrollLeft
    : container.scrollTop;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutQuart(progress);
    const newPosition = startPosition + distance * easedProgress;

    if (isHorizontal) {
      container.scrollLeft = newPosition;
    } else {
      container.scrollTop = newPosition;
    }

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    } else if (onComplete) {
      // Call completion callback when animation is done
      onComplete();
    }
  };

  requestAnimationFrame(animateScroll);
};

/**
 * Hook for handling timeline scrolling with smooth animation
 * Respects user's motion preferences for accessibility (WCAG 2.3.3)
 */
export const useTimelineScrolling = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const scrollTimeoutRef = useRef<number | null>(null);
  const lastScrollTarget = useRef<HTMLElement | null>(null);
  // Timeout to clear last target after animation ends
  const clearLastTargetTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  // Cleanup any pending clear-timeout on unmount
  useEffect(() => {
    return () => {
      if (clearLastTargetTimeoutRef.current) {
        clearTimeout(clearLastTargetTimeoutRef.current);
        clearLastTargetTimeoutRef.current = null;
      }
      if (scrollTimeoutRef.current) {
        cancelAnimationFrame(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };
  }, []);

  const scrollToElement = useCallback(
    (element: HTMLElement, mode: string, forceScroll?: boolean) => {
      if (!element) return;

      // Prevent scrolling to the same element repeatedly (unless forced for keyboard navigation)
      if (lastScrollTarget.current === element && !forceScroll) {
        return;
      }

      // Clear any pending scroll or animation
      if (scrollTimeoutRef.current) {
        cancelAnimationFrame(scrollTimeoutRef.current);
      }

      // Schedule the scroll for the next animation frame
      scrollTimeoutRef.current = requestAnimationFrame(() => {
        // Start scrolling immediately since we're now doing predictive centering
        const isVerticalMode =
          mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING';

        // Find the scrollable container - handle test environment gracefully
        let container: Element | null = null;

        if (typeof element.closest === 'function') {
          container = element.closest('[data-testid="timeline-main-wrapper"]');
        }

        if (!container) {
          container = element.parentElement?.parentElement || null;
        }

        if (!container) {
          // Fallback to native scrollIntoView if available
          if (typeof element.scrollIntoView === 'function') {
            element.scrollIntoView({
              behavior: prefersReducedMotion ? 'auto' : 'smooth',
              block: isVerticalMode ? 'center' : 'nearest',
              inline: isVerticalMode ? 'center' : 'center',
            });
          }
          return;
        }

        // Calculate target position to center the element
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();

        if (isVerticalMode) {
          // Center vertically with improved positioning
          const targetScrollTop =
            container.scrollTop +
            (elementRect.top - containerRect.top) -
            containerRect.height / 2 +
            elementRect.height / 2;

          // Use appropriate duration for smooth but responsive scrolling
          smoothScrollTo(
            container,
            targetScrollTop,
            DEFAULT_SCROLL_DURATION,
            false,
            prefersReducedMotion,
          );
        } else {
          // Center horizontally with improved positioning
          const targetScrollLeft =
            container.scrollLeft +
            (elementRect.left - containerRect.left) -
            containerRect.width / 2 +
            elementRect.width / 2;

          // Use appropriate duration for smooth but responsive scrolling
          smoothScrollTo(
            container,
            targetScrollLeft,
            DEFAULT_SCROLL_DURATION,
            true,
            prefersReducedMotion,
          );
        }

        lastScrollTarget.current = element;

        // Clear the target after scrolling completes
        if (clearLastTargetTimeoutRef.current) {
          clearTimeout(clearLastTargetTimeoutRef.current);
        }
        clearLastTargetTimeoutRef.current = setTimeout(() => {
          lastScrollTarget.current = null;
          clearLastTargetTimeoutRef.current = null;
        }, DEFAULT_SCROLL_DURATION + 100); // Add small buffer after scroll completes

        scrollTimeoutRef.current = null;
      });
    },
    [prefersReducedMotion],
  );

  return { scrollToElement };
};
