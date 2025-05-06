import { useCallback, useRef } from 'react';
import { findTimelineElement } from '../utils/timelineUtils';
import { TimelineMode } from '@models/TimelineModel';

type ExtendedTimelineMode = TimelineMode | 'HORIZONTAL_ALL';

interface UseTimelineNavigationProps {
  items: any[]; // Use any to avoid type conflicts
  mode: string;
  timelineId: string;
  hasFocus: boolean;
  flipLayout?: boolean;
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
  onTimelineUpdated,
  onNext,
  onPrevious,
  onFirst,
  onLast,
}: UseTimelineNavigationProps) => {
  const activeItemIndex = useRef<number>(0);

  // Find target element in the DOM
  const findTargetElement = useCallback(
    (itemId: string) => {
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

      onTimelineUpdated?.(updateIndex);
    },
    [items.length, onTimelineUpdated],
  );

  // Handle timeline item click
  const handleTimelineItemClick = useCallback(
    (itemId?: string, isSlideShow?: boolean) => {
      if (!itemId) return;

      const targetIndex = items.findIndex((item) => item.id === itemId);
      if (targetIndex === -1) return;

      // Update timeline position
      updateTimelinePosition(targetIndex, isSlideShow);

      // Find and scroll to target element
      const targetElement = findTargetElement(itemId);
      targetElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    },
    [items, updateTimelinePosition, findTargetElement],
  );

  // Handler for item elapsed (used in slideshow)
  const handleTimelineItemElapsed = useCallback(
    (itemId?: string) => handleTimelineItemClick(itemId, true),
    [handleTimelineItemClick],
  );

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (hasFocus) {
      activeItemIndex.current = Math.min(
        activeItemIndex.current + 1,
        items.length - 1,
      );
      onNext?.();
    }
  }, [hasFocus, items.length, onNext]);

  const handlePrevious = useCallback(() => {
    if (hasFocus) {
      activeItemIndex.current = Math.max(activeItemIndex.current - 1, 0);
      onPrevious?.();
    }
  }, [hasFocus, onPrevious]);

  const handleFirst = useCallback(() => {
    if (hasFocus) {
      activeItemIndex.current = 0;
      onFirst?.();
    }
  }, [hasFocus, onFirst]);

  const handleLast = useCallback(() => {
    if (hasFocus) {
      activeItemIndex.current = items.length - 1;
      onLast?.();
    }
  }, [hasFocus, items.length, onLast]);

  // Keyboard navigation
  const handleKeySelection = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const { key } = event;

      // Common handlers
      if (key === 'Home') {
        handleFirst();
        return;
      }
      if (key === 'End') {
        handleLast();
        return;
      }

      // Mode-specific handlers
      switch (mode) {
        case 'HORIZONTAL':
          if (key === 'ArrowRight') {
            flipLayout ? handlePrevious() : handleNext();
          } else if (key === 'ArrowLeft') {
            flipLayout ? handleNext() : handlePrevious();
          }
          break;

        case 'VERTICAL':
        case 'VERTICAL_ALTERNATING':
          if (key === 'ArrowDown') {
            handleNext();
          } else if (key === 'ArrowUp') {
            handlePrevious();
          }
          break;
      }
    },
    [mode, flipLayout, handleNext, handlePrevious, handleFirst, handleLast],
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
