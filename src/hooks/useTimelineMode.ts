import { useState, useCallback, useRef } from 'react';
import { TimelineMode } from '@models/TimelineModel';
import { useStableCallback } from './utils';

enum ExtendedTimelineModeEnum {
  VERTICAL = 'VERTICAL',
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL_ALTERNATING = 'VERTICAL_ALTERNATING',
  HORIZONTAL_ALL = 'HORIZONTAL_ALL',
}

type ExtendedTimelineMode = keyof typeof ExtendedTimelineModeEnum;

interface UseTimelineModeProps {
  initialMode: TimelineMode;
  showAllCardsHorizontal?: boolean;
  updateHorizontalAllCards?: (showAll: boolean) => void;
}

interface UseTimelineModeReturn {
  timelineMode: ExtendedTimelineMode;
  handleTimelineUpdate: (newMode: string) => void;
}

// Optimized mode mapping with type safety
const MODE_MAPPINGS = new Map<string, ExtendedTimelineMode>([
  ['VERTICAL', ExtendedTimelineModeEnum.VERTICAL],
  ['HORIZONTAL', ExtendedTimelineModeEnum.HORIZONTAL],
  ['VERTICAL_ALTERNATING', ExtendedTimelineModeEnum.VERTICAL_ALTERNATING],
  ['HORIZONTAL_ALL', ExtendedTimelineModeEnum.HORIZONTAL_ALL],
]);

export const useTimelineMode = ({
  initialMode,
  showAllCardsHorizontal = false,
  updateHorizontalAllCards,
}: UseTimelineModeProps): UseTimelineModeReturn => {
  const [timelineMode, setTimelineMode] = useState<ExtendedTimelineMode>(
    initialMode === 'HORIZONTAL' && showAllCardsHorizontal
      ? 'HORIZONTAL_ALL'
      : initialMode,
  );

  const stableUpdateHorizontalAllCards = useStableCallback(
    updateHorizontalAllCards || (() => {}),
  );

  const handleTimelineUpdate = useCallback(
    (newMode: string) => {
      const mappedMode = MODE_MAPPINGS.get(newMode);
      if (!mappedMode || mappedMode === timelineMode) return;

      setTimelineMode(mappedMode);

      // Handle horizontal cards update with stable reference
      if (updateHorizontalAllCards) {
        const shouldShowAll =
          mappedMode === ExtendedTimelineModeEnum.HORIZONTAL_ALL;
        stableUpdateHorizontalAllCards(shouldShowAll);
      }
    },
    [timelineMode, updateHorizontalAllCards, stableUpdateHorizontalAllCards],
  );

  return {
    timelineMode,
    handleTimelineUpdate,
  };
};
