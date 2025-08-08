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
  const activeItemIndex = useRef<number>(0);
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
          const row = cardContent.closest('[data-testid="vertical-item-row"]') as HTMLElement;
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
          const row = anyElement.closest('[data-testid="vertical-item-row"]') as HTMLElement;
          if (row) {
            if (!row.hasAttribute('tabindex')) {
              row.setAttribute('tabindex', '-1');
            }
            return row;
          }
        }
      } else {
        // For horizontal modes, try multiple selectors
        const timelinePointElement = document.getElementById(
          `timeline-${mode.toLowerCase()}-item-${itemId}`,
        ) as HTMLElement;
        if (timelinePointElement) {
          if (!timelinePointElement.hasAttribute('tabindex')) {
            timelinePointElement.setAttribute('tabindex', '-1');
          }
          return timelinePointElement;
        }

        // Try to find the card element
        const cardElement = document.getElementById(`timeline-card-${itemId}`) as HTMLElement;
        if (cardElement) {
          if (!cardElement.hasAttribute('tabindex')) {
            cardElement.setAttribute('tabindex', '-1');
          }
          return cardElement;
        }

        // Try to find any element with the item ID
        const anyElement = document.querySelector(`[data-item-id="${itemId}"]`) as HTMLElement;
        if (anyElement) {
          if (!anyElement.hasAttribute('tabindex')) {
            anyElement.setAttribute('tabindex', '-1');
          }
          return anyElement;
        }
      }

      // Default behavior: use the utility function
      const element = findTimelineElement(itemId, mode, timelineId);
      if (element && !element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1');
      }
      return element;
    },
    [mode, timelineId],
  );

  // Update timeline position
  const updateTimelinePosition = useCallback(
    (targetIndex: number, isSlideShow?: boolean) => {
      activeItemIndex.current = targetIndex;

      const updateIndex =
        isSlideShow && targetIndex < items.length - 1
          ? targetIndex + 1
          : targetIndex;

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

  // Handler for item elapsed (used in slideshow)
  const handleTimelineItemElapsed = useCallback(
    (itemId?: string) => handleTimelineItemClick(itemId, true),
    [handleTimelineItemClick],
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
