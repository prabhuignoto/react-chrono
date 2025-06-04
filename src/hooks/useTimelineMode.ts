import { useState, useCallback, useRef } from 'react';
import { TimelineMode } from '@models/TimelineModel';

type ExtendedTimelineMode = TimelineMode | 'HORIZONTAL_ALL';

interface UseTimelineModeProps {
  initialMode: TimelineMode;
  showAllCardsHorizontal?: boolean;
  updateHorizontalAllCards?: (showAll: boolean) => void;
}

// Optimized mode mapping for better performance
const MODE_MAPPINGS: Record<string, ExtendedTimelineMode> = {
  'VERTICAL': 'VERTICAL',
  'HORIZONTAL': 'HORIZONTAL',
  'VERTICAL_ALTERNATING': 'VERTICAL_ALTERNATING',
  'HORIZONTAL_ALL': 'HORIZONTAL_ALL',
} as const;

export const useTimelineMode = ({
  initialMode,
  showAllCardsHorizontal = false,
  updateHorizontalAllCards,
}: UseTimelineModeProps) => {
  const [timelineMode, setTimelineMode] = useState<ExtendedTimelineMode>(
    initialMode === 'HORIZONTAL' && showAllCardsHorizontal
      ? 'HORIZONTAL_ALL'
      : initialMode,
  );
  
  const updateHorizontalAllCardsRef = useRef(updateHorizontalAllCards);

  // Keep callback ref updated without triggering re-renders
  updateHorizontalAllCardsRef.current = updateHorizontalAllCards;

  const handleTimelineUpdate = useCallback(
    (newMode: string) => {
      const mappedMode = MODE_MAPPINGS[newMode];
      if (!mappedMode || mappedMode === timelineMode) return;

      setTimelineMode(mappedMode);

      // Handle horizontal cards update with stable reference
      if (updateHorizontalAllCardsRef.current) {
        const shouldShowAll = mappedMode === 'HORIZONTAL_ALL';
        updateHorizontalAllCardsRef.current(shouldShowAll);
      }
    },
    [timelineMode],
  );

  return {
    timelineMode,
    handleTimelineUpdate,
  };
};
