import { useCallback } from 'react';

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
 * Hook for handling timeline scrolling
 */
export const useTimelineScrolling = () => {
  const scrollToElement = useCallback((element: HTMLElement, mode: string) => {
    if (!element) return;

    // Ensure we handle the scroll in the next animation frame for smoother transitions
    requestAnimationFrame(() => {
      const isVerticalMode =
        mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING';

      // Check if scrollIntoView is available (it may not be in test environments like JSDOM)
      if (typeof element.scrollIntoView === 'function') {
        if (isVerticalMode) {
          // For vertical modes, ensure we fully center the element in the viewport
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest',
          });

          // Add a second scroll with a slight delay to ensure proper centering
          setTimeout(() => {
            if (typeof element.scrollIntoView === 'function') {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest',
              });
            }
          }, 50);
        } else {
          // In horizontal mode, use horizontal centering
          element.scrollIntoView(SCROLL_OPTIONS.HORIZONTAL);
        }
      }
    });
  }, []);

  return { scrollToElement };
};