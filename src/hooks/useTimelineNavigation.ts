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
  isKeyboardNavigation?: boolean;
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
  isKeyboardNavigation = false,
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
    if (!hasFocus) {
      return;
    }
    const newIndex = Math.min(activeItemIndex.current + 1, items.length - 1);
    if (newIndex !== activeItemIndex.current) {
      const targetItem = items[newIndex];

      // Predictive centering: Find and scroll to target BEFORE updating state
      if (targetItem?.id) {
        const targetElement = findTargetElement(targetItem.id);
        if (targetElement) {
          scrollToElement(targetElement, mode);
          if ((targetElement as any).focus) {
            try {
              (targetElement as any).focus({ preventScroll: true });
            } catch {}
          }
        }
      }

      // Update state immediately for test determinism
      activeItemIndex.current = newIndex;
      stableOnNext();
    }
  }, [
    items,
    findTargetElement,
    mode,
    scrollToElement,
    stableOnNext,
    hasFocus,
    isKeyboardNavigation,
  ]);

  const handlePrevious = useCallback(() => {
    if (!hasFocus) {
      return;
    }
    const newIndex = Math.max(activeItemIndex.current - 1, 0);
    if (newIndex !== activeItemIndex.current) {
      const targetItem = items[newIndex];

      if (targetItem?.id) {
        const targetElement = findTargetElement(targetItem.id);
        if (targetElement) {
          scrollToElement(targetElement, mode);
          if ((targetElement as any).focus) {
            try {
              (targetElement as any).focus({ preventScroll: true });
            } catch {}
          }
        }
      }

      activeItemIndex.current = newIndex;
      stableOnPrevious();
    }
  }, [
    items,
    findTargetElement,
    mode,
    scrollToElement,
    stableOnPrevious,
    hasFocus,
    isKeyboardNavigation,
  ]);

  const handleFirst = useCallback(() => {
    if (!hasFocus) {
      return;
    }
    if (activeItemIndex.current !== 0) {
      const targetItem = items[0];

      if (targetItem?.id) {
        const targetElement = findTargetElement(targetItem.id);
        if (targetElement) {
          scrollToElement(targetElement, mode);
          if ((targetElement as any).focus) {
            try {
              (targetElement as any).focus({ preventScroll: true });
            } catch {}
          }
        }
      }

      activeItemIndex.current = 0;
      stableOnFirst();
    }
  }, [
    items,
    findTargetElement,
    mode,
    scrollToElement,
    stableOnFirst,
    hasFocus,
    isKeyboardNavigation,
  ]);

  const handleLast = useCallback(() => {
    if (!hasFocus) {
      return;
    }
    const lastIndex = items.length - 1;
    if (activeItemIndex.current !== lastIndex) {
      const targetItem = items[lastIndex];

      if (targetItem?.id) {
        const targetElement = findTargetElement(targetItem.id);
        if (targetElement) {
          scrollToElement(targetElement, mode);
          if ((targetElement as any).focus) {
            try {
              (targetElement as any).focus({ preventScroll: true });
            } catch {}
          }
        }
      }

      activeItemIndex.current = lastIndex;
      stableOnLast();
    }
  }, [
    items,
    findTargetElement,
    mode,
    scrollToElement,
    stableOnLast,
    hasFocus,
    isKeyboardNavigation,
  ]);

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
