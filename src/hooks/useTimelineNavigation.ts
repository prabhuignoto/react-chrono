import { useCallback, useRef, useMemo } from 'react';
import { findTimelineElement } from '../utils/timelineUtils';
import { TimelineMode } from '@models/TimelineModel';

type ExtendedTimelineMode = TimelineMode | 'HORIZONTAL_ALL';

interface UseTimelineNavigationProps {
  items: any[]; // Use any to avoid type conflicts
  mode: string;
  timelineId: string;
  hasFocus: boolean;
  flipLayout?: boolean;
  slideShowRunning?: boolean;
  onTimelineUpdated?: (index: number) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onFirst?: () => void;
  onLast?: () => void;
}

// Optimized scroll options for different modes
const SCROLL_OPTIONS = {
  HORIZONTAL: {
    behavior: 'smooth' as ScrollBehavior,
    block: 'nearest' as ScrollLogicalPosition,
    inline: 'center' as ScrollLogicalPosition,
  },
  VERTICAL: {
    behavior: 'smooth' as ScrollBehavior,
    block: 'center' as ScrollLogicalPosition,
    inline: 'center' as ScrollLogicalPosition,
  },
} as const;

export const useTimelineNavigation = ({
  items,
  mode,
  timelineId,
  hasFocus,
  flipLayout = false,
  slideShowRunning = false,
  onTimelineUpdated,
  onNext,
  onPrevious,
  onFirst,
  onLast,
}: UseTimelineNavigationProps) => {
  const activeItemIndex = useRef<number>(0);
  const callbacksRef = useRef({
    onTimelineUpdated,
    onNext,
    onPrevious,
    onFirst,
    onLast,
  });

  // Keep callbacks ref updated without triggering re-renders
  callbacksRef.current = {
    onTimelineUpdated,
    onNext,
    onPrevious,
    onFirst,
    onLast,
  };

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

  // Find target element in the DOM (memoized)
  const findTargetElement = useCallback(
    (itemId: string) => findTimelineElement(itemId, mode, timelineId),
    [mode, timelineId],
  );

  // Optimized scroll function
  const scrollToElement = useCallback(
    (element: HTMLElement, mode: string) => {
      const options = mode === 'HORIZONTAL' ? SCROLL_OPTIONS.HORIZONTAL : SCROLL_OPTIONS.VERTICAL;
      
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        element.scrollIntoView(options);
      });
    },
    [],
  );

  // Update timeline position (optimized)
  const updateTimelinePosition = useCallback(
    (targetIndex: number, isSlideShow?: boolean) => {
      activeItemIndex.current = targetIndex;

      const updateIndex =
        isSlideShow && targetIndex < items.length - 1
          ? targetIndex + 1
          : targetIndex;

      callbacksRef.current.onTimelineUpdated?.(updateIndex);
    },
    [items.length],
  );

  // Handle timeline item click (significantly optimized)
  const handleTimelineItemClick = useCallback(
    (itemId?: string, isSlideShow?: boolean) => {
      if (!itemId) return;

      // Use memoized map for O(1) lookup
      const targetIndex = itemsMap.get(itemId);
      if (targetIndex === undefined) return;

      // Update timeline position
      updateTimelinePosition(targetIndex, isSlideShow);

      // Skip scrolling in horizontal mode when slideshow is running to prevent toolbar hiding
      if (mode === 'HORIZONTAL' && slideShowRunning) return;

      // Optimized element finding and scrolling
      if (mode === 'HORIZONTAL') {
        // Try timeline point first for horizontal mode
        const timelinePointElement = document.getElementById(
          `timeline-${mode.toLowerCase()}-item-${itemId}`
        );
        
        if (timelinePointElement) {
          scrollToElement(timelinePointElement, mode);
        } else {
          const targetElement = findTargetElement(itemId);
          if (targetElement) scrollToElement(targetElement, mode);
        }
      } else {
        // For vertical modes
        const targetElement = findTargetElement(itemId);
        if (targetElement) scrollToElement(targetElement, mode);
      }
    },
    [itemsMap, updateTimelinePosition, findTargetElement, mode, scrollToElement, slideShowRunning],
  );

  // Handler for item elapsed (used in slideshow)
  const handleTimelineItemElapsed = useCallback(
    (itemId?: string) => handleTimelineItemClick(itemId, true),
    [handleTimelineItemClick],
  );

  // Navigation handlers (optimized with bounds checking)
  const handleNext = useCallback(() => {
    if (!hasFocus) return;
    
    const newIndex = Math.min(activeItemIndex.current + 1, items.length - 1);
    if (newIndex !== activeItemIndex.current) {
      activeItemIndex.current = newIndex;
      callbacksRef.current.onNext?.();
    }
  }, [hasFocus, items.length]);

  const handlePrevious = useCallback(() => {
    if (!hasFocus) return;
    
    const newIndex = Math.max(activeItemIndex.current - 1, 0);
    if (newIndex !== activeItemIndex.current) {
      activeItemIndex.current = newIndex;
      callbacksRef.current.onPrevious?.();
    }
  }, [hasFocus]);

  const handleFirst = useCallback(() => {
    if (!hasFocus) return;
    if (activeItemIndex.current !== 0) {
      activeItemIndex.current = 0;
      callbacksRef.current.onFirst?.();
    }
  }, [hasFocus]);

  const handleLast = useCallback(() => {
    if (!hasFocus) return;
    const lastIndex = items.length - 1;
    if (activeItemIndex.current !== lastIndex) {
      activeItemIndex.current = lastIndex;
      callbacksRef.current.onLast?.();
    }
  }, [hasFocus, items.length]);

  // Keyboard navigation (optimized with key mapping)
  const handleKeySelection = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!hasFocus) return; // Add hasFocus check here
      
      const { key } = event;

      // Common handlers
      switch (key) {
        case 'Home':
          event.preventDefault();
          handleFirst();
          return;
        case 'End':
          event.preventDefault();
          handleLast();
          return;
      }

      // Mode-specific handlers
      if (mode === 'HORIZONTAL') {
        if (key === 'ArrowRight') {
          event.preventDefault();
          flipLayout ? handlePrevious() : handleNext();
        } else if (key === 'ArrowLeft') {
          event.preventDefault();
          flipLayout ? handleNext() : handlePrevious();
        }
      } else if (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') {
        if (key === 'ArrowDown') {
          event.preventDefault();
          handleNext();
        } else if (key === 'ArrowUp') {
          event.preventDefault();
          handlePrevious();
        }
      }
    },
    [mode, flipLayout, hasFocus, handleNext, handlePrevious, handleFirst, handleLast],
  );

  return {
    activeItemIndex,
    handleTimelineItemClick,
    handleTimelineItemElapsed,
    handleNext,
    handlePrevious,
    handleFirst,
    handleLast,
    handleKeySelection,
  };
};
