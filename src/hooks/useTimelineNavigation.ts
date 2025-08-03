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
  } = useTimelineItemNavigation({
    items,
    mode,
    timelineId,
    slideShowRunning,
    onTimelineUpdated,
  });

  const { scrollToElement } = useTimelineScrolling();

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (!hasFocus) return;

    const newIndex = Math.min(activeItemIndex.current + 1, items.length - 1);
    if (newIndex !== activeItemIndex.current) {
      activeItemIndex.current = newIndex;
      stableOnNext();

      const targetItem = items[newIndex];
      if (targetItem?.id) {
        const targetElement = findTargetElement(targetItem.id);
        if (targetElement) scrollToElement(targetElement, mode);
      }
    }
  }, [hasFocus, items, findTargetElement, mode, scrollToElement, stableOnNext]);

  const handlePrevious = useCallback(() => {
    if (!hasFocus) return;

    const newIndex = Math.max(activeItemIndex.current - 1, 0);
    if (newIndex !== activeItemIndex.current) {
      activeItemIndex.current = newIndex;
      stableOnPrevious();

      const targetItem = items[newIndex];
      if (targetItem?.id) {
        const targetElement = findTargetElement(targetItem.id);
        if (targetElement) scrollToElement(targetElement, mode);
      }
    }
  }, [
    hasFocus,
    items,
    findTargetElement,
    mode,
    scrollToElement,
    stableOnPrevious,
  ]);

  const handleFirst = useCallback(() => {
    if (!hasFocus) return;
    if (activeItemIndex.current !== 0) {
      activeItemIndex.current = 0;
      stableOnFirst();

      const targetItem = items[0];
      if (targetItem?.id) {
        const targetElement = findTargetElement(targetItem.id);
        if (targetElement) scrollToElement(targetElement, mode);
      }
    }
  }, [
    hasFocus,
    items,
    findTargetElement,
    mode,
    scrollToElement,
    stableOnFirst,
  ]);

  const handleLast = useCallback(() => {
    if (!hasFocus) return;
    const lastIndex = items.length - 1;
    if (activeItemIndex.current !== lastIndex) {
      activeItemIndex.current = lastIndex;
      stableOnLast();

      const targetItem = items[lastIndex];
      if (targetItem?.id) {
        const targetElement = findTargetElement(targetItem.id);
        if (targetElement) scrollToElement(targetElement, mode);
      }
    }
  }, [hasFocus, items, findTargetElement, mode, scrollToElement, stableOnLast]);

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
  };
};
