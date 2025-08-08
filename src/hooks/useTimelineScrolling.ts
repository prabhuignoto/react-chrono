import { useCallback, useRef } from 'react';

type ScrollOptions = {
  behavior: ScrollBehavior;
  block: ScrollLogicalPosition;
  inline: ScrollLogicalPosition;
};

const SCROLL_OPTIONS: Record<'HORIZONTAL' | 'VERTICAL', ScrollOptions> = {
  HORIZONTAL: {
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center',
  },
  VERTICAL: {
    behavior: 'smooth',
    block: 'center',
    inline: 'center',
  },
};

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
 */
const smoothScrollTo = (
  container: Element,
  targetPosition: number,
  duration: number,
  isHorizontal: boolean = false,
) => {
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
    }
  };

  requestAnimationFrame(animateScroll);
};

/**
 * Hook for handling timeline scrolling with smooth animation
 */
export const useTimelineScrolling = () => {
  const scrollTimeoutRef = useRef<number | null>(null);
  const lastScrollTarget = useRef<HTMLElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const scrollToElement = useCallback((element: HTMLElement, mode: string) => {
    if (!element) return;

    // Prevent scrolling to the same element repeatedly
    if (lastScrollTarget.current === element) {
      return;
    }

    // Clear any pending scroll or animation
    if (scrollTimeoutRef.current) {
      cancelAnimationFrame(scrollTimeoutRef.current);
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
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
              behavior: 'smooth',
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

          // Use much longer duration for smoother vertical scrolling
          smoothScrollTo(container, targetScrollTop, 1200, false);
        } else {
          // Center horizontally with improved positioning
          const targetScrollLeft =
            container.scrollLeft +
            (elementRect.left - containerRect.left) -
            containerRect.width / 2 +
            elementRect.width / 2;

          // Use much longer duration for smoother horizontal scrolling
          smoothScrollTo(container, targetScrollLeft, 1200, true);
        }

        lastScrollTarget.current = element;

        // Clear the target after scrolling completes
        setTimeout(() => {
          lastScrollTarget.current = null;
        }, 1300);

        scrollTimeoutRef.current = null;
    });
  }, []);

  return { scrollToElement };
};
