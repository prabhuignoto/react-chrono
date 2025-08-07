import { useCallback } from 'react';
import { useTimelineKeyboardNavigation } from './useTimelineKeyboardNavigation';
import { useTimelineItemNavigation } from './useTimelineItemNavigation';
import { useTimelineScrolling } from './useTimelineScrolling';
import { useStableCallback } from './utils';

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
  // Stable callbacks
  const stableOnNext = useStableCallback(onNext || (() => {}));
  const stableOnPrevious = useStableCallback(onPrevious || (() => {}));
  const stableOnFirst = useStableCallback(onFirst || (() => {}));
  const stableOnLast = useStableCallback(onLast || (() => {}));

  // Use smaller hooks
  const {
    activeItemIndex,
    handleTimelineItemClick,
    handleTimelineItemElapsed,
    findTargetElement,
    syncActiveItemIndex,
  } = useTimelineItemNavigation({
    items,
    mode,
    timelineId,
    slideShowRunning,
    onTimelineUpdated,
  });

  const { scrollToElement } = useTimelineScrolling();

  // Navigation handlers with predictive centering to avoid jumps
  const handleNext = useCallback(() => {
    const newIndex = Math.min(activeItemIndex.current + 1, items.length - 1);
    if (newIndex !== activeItemIndex.current) {
      const targetItem = items[newIndex];
      
      // Predictive centering: Find and scroll to target BEFORE updating state
      if (targetItem?.id) {
        const targetElement = findTargetElement(targetItem.id);
        if (targetElement) {
          // Start scrolling immediately to avoid jump
          scrollToElement(targetElement, mode);
          
          // Ensure target element gets focus for keyboard navigation
          setTimeout(() => {
            if (hasFocus && targetElement.focus) {
              targetElement.focus({ preventScroll: true });
            }
          }, 100);
        }
      }
      
      // Update state after scrolling starts
      setTimeout(() => {
        activeItemIndex.current = newIndex;
        stableOnNext();
      }, 50); // Small delay to let scrolling start first
    }
  }, [items, findTargetElement, mode, scrollToElement, stableOnNext, hasFocus]);

  const handlePrevious = useCallback(() => {
    const newIndex = Math.max(activeItemIndex.current - 1, 0);
    if (newIndex !== activeItemIndex.current) {
      const targetItem = items[newIndex];
      
      // Predictive centering: Find and scroll to target BEFORE updating state
      if (targetItem?.id) {
        const targetElement = findTargetElement(targetItem.id);
        if (targetElement) {
          // Start scrolling immediately to avoid jump
          scrollToElement(targetElement, mode);
          
          // Ensure target element gets focus for keyboard navigation
          setTimeout(() => {
            if (hasFocus && targetElement.focus) {
              targetElement.focus({ preventScroll: true });
            }
          }, 100);
        }
      }
      
      // Update state after scrolling starts
      setTimeout(() => {
        activeItemIndex.current = newIndex;
        stableOnPrevious();
      }, 50); // Small delay to let scrolling start first
    }
  }, [
    items,
    findTargetElement,
    mode,
    scrollToElement,
    stableOnPrevious,
    hasFocus,
  ]);

  const handleFirst = useCallback(() => {
    if (activeItemIndex.current !== 0) {
      const targetItem = items[0];
      
      // Predictive centering: Find and scroll to target BEFORE updating state
      if (targetItem?.id) {
        const targetElement = findTargetElement(targetItem.id);
        if (targetElement) {
          // Start scrolling immediately to avoid jump
          scrollToElement(targetElement, mode);
          
          // Ensure target element gets focus for keyboard navigation
          setTimeout(() => {
            if (hasFocus && targetElement.focus) {
              targetElement.focus({ preventScroll: true });
            }
          }, 100);
        }
      }
      
      // Update state after scrolling starts
      setTimeout(() => {
        activeItemIndex.current = 0;
        stableOnFirst();
      }, 50); // Small delay to let scrolling start first
    }
  }, [
    items,
    findTargetElement,
    mode,
    scrollToElement,
    stableOnFirst,
    hasFocus,
  ]);

  const handleLast = useCallback(() => {
    const lastIndex = items.length - 1;
    if (activeItemIndex.current !== lastIndex) {
      const targetItem = items[lastIndex];
      
      // Predictive centering: Find and scroll to target BEFORE updating state
      if (targetItem?.id) {
        const targetElement = findTargetElement(targetItem.id);
        if (targetElement) {
          // Start scrolling immediately to avoid jump
          scrollToElement(targetElement, mode);
          
          // Ensure target element gets focus for keyboard navigation
          setTimeout(() => {
            if (hasFocus && targetElement.focus) {
              targetElement.focus({ preventScroll: true });
            }
          }, 100);
        }
      }
      
      // Update state after scrolling starts
      setTimeout(() => {
        activeItemIndex.current = lastIndex;
        stableOnLast();
      }, 50); // Small delay to let scrolling start first
    }
  }, [items, findTargetElement, mode, scrollToElement, stableOnLast, hasFocus]);

  // Use keyboard navigation hook
  const { handleKeySelection } = useTimelineKeyboardNavigation({
    mode,
    hasFocus,
    flipLayout,
    onNext: handleNext,
    onPrevious: handlePrevious,
    onFirst: handleFirst,
    onLast: handleLast,
  });

  return {
    activeItemIndex,
    handleTimelineItemClick,
    handleTimelineItemElapsed,
    handleNext,
    handlePrevious,
    handleFirst,
    handleLast,
    handleKeySelection,
    syncActiveItemIndex,
  };
};
