import { useCallback } from 'react';
import { useTimelineKeyboardNavigation } from './useTimelineKeyboardNavigation';
import { useTimelineItemNavigation } from './useTimelineItemNavigation';
import { useTimelineScrolling } from './useTimelineScrolling';
import { useStableCallback } from './utils';
import { pickDefined } from '../utils/propUtils';

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
    ...pickDefined({ onTimelineUpdated }),
  });

  const { scrollToElement } = useTimelineScrolling();

  // Navigation handlers with predictive centering to avoid jumps
  const handleNext = useCallback(() => {
    // Remove hasFocus check as it can block navigation
    const currentIndex = activeItemIndex.current;

    // Handle case where no item is currently selected (-1)
    const nextIndex =
      currentIndex === -1 ? 0 : Math.min(currentIndex + 1, items.length - 1);

    // Always attempt navigation if there are items
    if (items.length > 0) {
      // If no selection (-1), start from first item (0)
      // If at last item, stay there (no navigation)
      if (currentIndex === -1 || currentIndex < items.length - 1) {
        const targetItem = items[nextIndex];

        if (targetItem?.id) {
          // Use the same pathway as slideshow: call handleTimelineItemClick
          // This ensures consistent state updates through the main component
          handleTimelineItemClick(targetItem.id, false);
        }

        // Also call the toolbar callback for any additional toolbar-specific logic
        stableOnNext();
      }
    }
  }, [items, handleTimelineItemClick, stableOnNext]);

  const handlePrevious = useCallback(() => {
    // Remove hasFocus check as it can block navigation
    const currentIndex = activeItemIndex.current;

    // Handle case where no item is currently selected (-1)
    const prevIndex =
      currentIndex === -1 ? items.length - 1 : Math.max(currentIndex - 1, 0);

    // Always attempt navigation if there are items
    if (items.length > 0) {
      // If no selection (-1), start from last item
      // If at first item, stay there (no navigation)
      if (currentIndex === -1 || currentIndex > 0) {
        const targetItem = items[prevIndex];

        if (targetItem?.id) {
          // Use the same pathway as slideshow: call handleTimelineItemClick
          // This ensures consistent state updates through the main component
          handleTimelineItemClick(targetItem.id, false);
        }

        // Also call the toolbar callback for any additional toolbar-specific logic
        stableOnPrevious();
      }
    }
  }, [items, handleTimelineItemClick, stableOnPrevious]);

  const handleFirst = useCallback(() => {
    // Always allow navigation to first item if we're not already there (including -1 no selection)
    if (items.length > 0 && activeItemIndex.current !== 0) {
      const targetItem = items[0];

      if (targetItem?.id) {
        // Use the same pathway as slideshow: call handleTimelineItemClick
        // This ensures consistent state updates through the main component
        handleTimelineItemClick(targetItem.id, false);
      }

      // Also call the toolbar callback for any additional toolbar-specific logic
      stableOnFirst();
    }
  }, [items, handleTimelineItemClick, stableOnFirst]);

  const handleLast = useCallback(() => {
    // Always allow navigation to last item if we're not already there (including -1 no selection)
    const lastIndex = items.length - 1;
    if (items.length > 0 && activeItemIndex.current !== lastIndex) {
      const targetItem = items[lastIndex];

      if (targetItem?.id) {
        // Use the same pathway as slideshow: call handleTimelineItemClick
        // This ensures consistent state updates through the main component
        handleTimelineItemClick(targetItem.id, false);
      }

      // Also call the toolbar callback for any additional toolbar-specific logic
      stableOnLast();
    }
  }, [items, handleTimelineItemClick, stableOnLast]);

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
