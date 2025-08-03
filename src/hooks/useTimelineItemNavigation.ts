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

  // Find target element in the DOM
  const findTargetElement = useCallback(
    (itemId: string) => {
      if (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') {
        // For vertical modes, directly search for the vertical-item-row
        const verticalItemRow = document.querySelector(
          `[data-testid="vertical-item-row"][data-item-id="${itemId}"]`,
        );
        if (verticalItemRow) {
          return verticalItemRow as HTMLElement;
        }

        // Fallback: try to find the card content element and then get its parent row
        const cardContent = document.querySelector(
          `.timeline-card-content[data-item-id="${itemId}"]`,
        );
        if (cardContent) {
          const row = cardContent.closest('[data-testid="vertical-item-row"]');
          if (row) {
            return row as HTMLElement;
          }
        }
      }

      // Default behavior for horizontal modes or fallback
      return findTimelineElement(itemId, mode, timelineId);
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

      // For vertical modes, directly find and scroll to the vertical item row
      if (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') {
        const targetElement = findTargetElement(itemId);
        if (targetElement) {
          scrollToElement(targetElement, mode);
        }
      } else {
        // For horizontal modes, use the original approach
        const timelinePointElement = document.getElementById(
          `timeline-${mode.toLowerCase()}-item-${itemId}`,
        );

        if (timelinePointElement) {
          scrollToElement(timelinePointElement, mode);
        } else {
          const targetElement = findTargetElement(itemId);
          if (targetElement) scrollToElement(targetElement, mode);
        }
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
  };
};
