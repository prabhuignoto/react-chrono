import { useCallback, useRef, useMemo } from 'react';
import { findTimelineElement } from '../utils/timelineUtils';
import { useTimelineScrolling } from './useTimelineScrolling';
import { useStableCallback } from './utils';

interface UseTimelineItemNavigationProps {
  items: any[];
  mode: string;
  timelineId: string;
  slideShowRunning?: boolean;
  onTimelineUpdated?: (index: number) => void;
}

/**
 * Hook for handling timeline item navigation
 */
export const useTimelineItemNavigation = ({
  items,
  mode,
  timelineId,
  slideShowRunning = false,
  onTimelineUpdated,
}: UseTimelineItemNavigationProps) => {
  const activeItemIndex = useRef<number>(-1); // -1 indicates no selection initially
  const { scrollToElement } = useTimelineScrolling();
  const stableOnTimelineUpdated = useStableCallback(
    onTimelineUpdated || (() => {}),
  );

  // Memoize items lookup map for O(1) access
  const itemsMap = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach((item, index) => {
      if (item?.id) {
        map.set(item.id, index);
      }
    });
    return map;
  }, [items]);

  // Find target element in the DOM with focus capability
  const findTargetElement = useCallback(
    (itemId: string) => {
      if (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') {
        // For vertical modes, directly search for the vertical-item-row
        const verticalItemRow = document.querySelector(
          `[data-testid="vertical-item-row"][data-item-id="${itemId}"]`,
        ) as HTMLElement;
        if (verticalItemRow) {
          // Ensure the element can receive focus
          if (!verticalItemRow.hasAttribute('tabindex')) {
            verticalItemRow.setAttribute('tabindex', '-1');
          }
          return verticalItemRow;
        }

        // Fallback: try to find the card content element and then get its parent row
        const cardContent = document.querySelector(
          `.timeline-card-content[data-item-id="${itemId}"]`,
        );
        if (cardContent) {
          const row = cardContent.closest(
            '[data-testid="vertical-item-row"]',
          ) as HTMLElement;
          if (row) {
            if (!row.hasAttribute('tabindex')) {
              row.setAttribute('tabindex', '-1');
            }
            return row;
          }
        }

        // Additional fallback: try to find any element with the item ID
        const anyElement = document.querySelector(`[data-item-id="${itemId}"]`);
        if (anyElement) {
          const row = anyElement.closest(
            '[data-testid="vertical-item-row"]',
          ) as HTMLElement;
          if (row) {
            if (!row.hasAttribute('tabindex')) {
              row.setAttribute('tabindex', '-1');
            }
            return row;
          }
        }
      } else {
        // For horizontal modes, prefer focusing the card container first
        const cardElement = document.getElementById(
          `timeline-card-${itemId}`,
        ) as any;
        if (cardElement) {
          try {
            if (cardElement.hasAttribute && cardElement.setAttribute) {
              if (!cardElement.hasAttribute('tabindex')) {
                cardElement.setAttribute('tabindex', '-1');
              }
            }
          } catch {}
          return cardElement as unknown as HTMLElement;
        }

        // Fallback to the timeline point wrapper element
        const timelinePointElement = document.getElementById(
          `timeline-${mode.toLowerCase()}-item-${itemId}`,
        ) as any;
        if (timelinePointElement) {
          try {
            if (
              !timelinePointElement.hasAttribute ||
              !timelinePointElement.setAttribute
            ) {
              // Not a full HTMLElement (test mock). Return as-is.
              return timelinePointElement as unknown as HTMLElement;
            }
            if (!timelinePointElement.hasAttribute('tabindex')) {
              timelinePointElement.setAttribute('tabindex', '-1');
            }
          } catch {
            // Ignore attribute errors in test environment
          }
          return timelinePointElement as unknown as HTMLElement;
        }

        // Try to find any element with the item ID
        const anyElement = document.querySelector(
          `[data-item-id="${itemId}"]`,
        ) as any;
        if (anyElement) {
          try {
            if (anyElement.hasAttribute && anyElement.setAttribute) {
              if (!anyElement.hasAttribute('tabindex')) {
                anyElement.setAttribute('tabindex', '-1');
              }
            }
          } catch {}
          return anyElement as unknown as HTMLElement;
        }
      }

      // Default behavior: use the utility function
      const element = findTimelineElement(itemId, mode, timelineId) as any;
      if (element) {
        try {
          if (element.hasAttribute && element.setAttribute) {
            if (!element.hasAttribute('tabindex')) {
              element.setAttribute('tabindex', '-1');
            }
          }
        } catch {}
      }
      return element as unknown as HTMLElement;
    },
    [mode, timelineId],
  );

  // Update timeline position
  const updateTimelinePosition = useCallback(
    (targetIndex: number, isSlideShow?: boolean) => {
      activeItemIndex.current = targetIndex;

      // Fixed: Don't add +1 here since handleTimelineItemElapsed already calculated the correct next index
      const updateIndex = targetIndex;

      stableOnTimelineUpdated(updateIndex);
    },
    [items.length, stableOnTimelineUpdated],
  );

  // Sync activeItemIndex with external updates
  const syncActiveItemIndex = useCallback((newIndex: number) => {
    activeItemIndex.current = newIndex;
  }, []);

  // Handle timeline item click
  const handleTimelineItemClick = useCallback(
    (itemId?: string, isSlideShow?: boolean) => {
      if (!itemId) return;

      // Use memoized map for O(1) lookup
      const targetIndex = itemsMap.get(itemId);
      if (targetIndex === undefined) return;

      // Update timeline position
      updateTimelinePosition(targetIndex, isSlideShow);

      // Skip scrolling when slideshow is running - let timeline.tsx handle slideshow scrolling
      if (slideShowRunning) return;

      // Find target element using improved element finding and start scrolling immediately
      const targetElement = findTargetElement(itemId);
      if (targetElement) {
        // Start scrolling immediately for predictive centering
        scrollToElement(targetElement, mode);

        // After initiating scroll, move focus to the target element
        // Use requestAnimationFrame to avoid fighting with scrollIntoView
        requestAnimationFrame(() => {
          try {
            if (typeof (targetElement as HTMLElement).focus === 'function') {
              (targetElement as HTMLElement).focus({ preventScroll: true });
              // Ensure the wrapper maintains keyboard focus capability
              const wrapper = targetElement.closest(
                '.timeline-wrapper',
              ) as HTMLElement;
              if (wrapper && !wrapper.contains(document.activeElement)) {
                wrapper.focus();
              }
            }
          } catch {
            /* no-op */
          }
        });
      }
    },
    [
      itemsMap,
      updateTimelinePosition,
      findTargetElement,
      mode,
      scrollToElement,
      slideShowRunning,
    ],
  );

  // Handler for item elapsed (used in slideshow) - advances to NEXT item
  const handleTimelineItemElapsed = useCallback(
    (itemId?: string) => {
      if (!itemId) return;

      const currentIndex = itemsMap.get(itemId);
      if (currentIndex === undefined) return;

      const nextIndex = currentIndex + 1;

      // If there's a next item, advance to it
      if (nextIndex < items.length) {
        const nextItemId = Array.from(itemsMap.entries()).find(
          ([_, index]) => index === nextIndex,
        )?.[0];
        if (nextItemId) {
          handleTimelineItemClick(nextItemId, true);
        }
      } else {
        // If we're at the last item, restart from beginning
        const firstItemId = Array.from(itemsMap.entries()).find(
          ([_, index]) => index === 0,
        )?.[0];
        if (firstItemId) {
          handleTimelineItemClick(firstItemId, true);
        }
      }
    },
    [handleTimelineItemClick, itemsMap, items.length],
  );

  return {
    activeItemIndex,
    handleTimelineItemClick,
    handleTimelineItemElapsed,
    findTargetElement,
    itemsMap,
    syncActiveItemIndex,
  };
};
