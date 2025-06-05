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
    (itemId: string) => {
      if (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') {
        // For vertical modes, directly search for the vertical-item-row
        // This is more reliable than using findTimelineElement and then looking for a parent
        const verticalItemRow = document.querySelector(`[data-testid="vertical-item-row"][data-item-id="${itemId}"]`);
        if (verticalItemRow) {
          return verticalItemRow as HTMLElement;
        }
        
        // Fallback: try to find the card content element and then get its parent row
        const cardContent = document.querySelector(`.timeline-card-content[data-item-id="${itemId}"]`);
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

  // Optimized scroll function - matches timeline card content behavior
  const scrollToElement = useCallback(
    (element: HTMLElement, mode: string) => {
      if (!element) return;
      
      // Ensure we handle the scroll in the next animation frame for smoother transitions
      requestAnimationFrame(() => {
        const isVerticalMode = mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING';
        
        // Check if scrollIntoView is available (it may not be in test environments like JSDOM)
        if (typeof element.scrollIntoView === 'function') {
          if (isVerticalMode) {
            // For vertical modes, ensure we fully center the element in the viewport
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'center', // Always center vertically
              inline: 'nearest' // Nearest horizontal positioning
            });
            
            // Add a second scroll with a slight delay to ensure proper centering
            // This addresses issues with complex layouts and varying element heights
            setTimeout(() => {
              if (typeof element.scrollIntoView === 'function') {
                element.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                  inline: 'nearest'
                });
              }
            }, 50);
          } else {
            // In horizontal mode, use horizontal centering
            element.scrollIntoView(SCROLL_OPTIONS.HORIZONTAL);
          }
        }
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

      // For vertical modes, directly find and scroll to the vertical item row
      if (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') {
        const targetElement = findTargetElement(itemId);
        if (targetElement) {
          scrollToElement(targetElement, mode);
        }
      } else {
        // For horizontal modes, use the original approach
        const timelinePointElement = document.getElementById(
          `timeline-${mode.toLowerCase()}-item-${itemId}`
        );
        
        if (timelinePointElement) {
          scrollToElement(timelinePointElement, mode);
        } else {
          const targetElement = findTargetElement(itemId);
          if (targetElement) scrollToElement(targetElement, mode);
        }
      }
    },
    [itemsMap, updateTimelinePosition, findTargetElement, mode, scrollToElement, slideShowRunning],
  );

  // Handler for item elapsed (used in slideshow)
  const handleTimelineItemElapsed = useCallback(
    (itemId?: string) => handleTimelineItemClick(itemId, true),
    [handleTimelineItemClick],
  );

  // Navigation handlers (optimized with bounds checking and focus behavior)
  const handleNext = useCallback(() => {
    if (!hasFocus) return;
    
    const newIndex = Math.min(activeItemIndex.current + 1, items.length - 1);
    if (newIndex !== activeItemIndex.current) {
      activeItemIndex.current = newIndex;
      callbacksRef.current.onNext?.();
      
      // Trigger the same focus behavior as clicking
      const targetItem = items[newIndex];
      if (targetItem?.id) {
        // Find and scroll to the target element
        const targetElement = findTargetElement(targetItem.id);
        if (targetElement) scrollToElement(targetElement, mode);
      }
    }
  }, [hasFocus, items, findTargetElement, mode, scrollToElement]);

  const handlePrevious = useCallback(() => {
    if (!hasFocus) return;
    
    const newIndex = Math.max(activeItemIndex.current - 1, 0);
    if (newIndex !== activeItemIndex.current) {
      activeItemIndex.current = newIndex;
      callbacksRef.current.onPrevious?.();
      
      // Trigger the same focus behavior as clicking
      const targetItem = items[newIndex];
      if (targetItem?.id) {
        // Find and scroll to the target element
        const targetElement = findTargetElement(targetItem.id);
        if (targetElement) scrollToElement(targetElement, mode);
      }
    }
  }, [hasFocus, items, findTargetElement, mode, scrollToElement]);

  const handleFirst = useCallback(() => {
    if (!hasFocus) return;
    if (activeItemIndex.current !== 0) {
      activeItemIndex.current = 0;
      callbacksRef.current.onFirst?.();
      
      // Trigger the same focus behavior as clicking
      const targetItem = items[0];
      if (targetItem?.id) {
        // Find and scroll to the target element
        const targetElement = findTargetElement(targetItem.id);
        if (targetElement) scrollToElement(targetElement, mode);
      }
    }
  }, [hasFocus, items, findTargetElement, mode, scrollToElement]);

  const handleLast = useCallback(() => {
    if (!hasFocus) return;
    const lastIndex = items.length - 1;
    if (activeItemIndex.current !== lastIndex) {
      activeItemIndex.current = lastIndex;
      callbacksRef.current.onLast?.();
      
      // Trigger the same focus behavior as clicking
      const targetItem = items[lastIndex];
      if (targetItem?.id) {
        // Find and scroll to the target element
        const targetElement = findTargetElement(targetItem.id);
        if (targetElement) scrollToElement(targetElement, mode);
      }
    }
  }, [hasFocus, items, findTargetElement, mode, scrollToElement]);

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
