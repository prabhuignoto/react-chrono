import { useState, useCallback } from 'react';
import { TimelineMode } from '@models/TimelineModel';

type ExtendedTimelineMode = TimelineMode | 'HORIZONTAL_ALL';

interface UseTimelineModeProps {
  initialMode: TimelineMode;
  showAllCardsHorizontal?: boolean;
  updateHorizontalAllCards?: (showAll: boolean) => void;
}

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

  const handleTimelineUpdate = useCallback(
    (newMode: string) => {
      switch (newMode) {
        case 'VERTICAL':
          setTimelineMode('VERTICAL');
          break;
        case 'HORIZONTAL':
          setTimelineMode('HORIZONTAL');
          updateHorizontalAllCards?.(false);
          break;
        case 'VERTICAL_ALTERNATING':
          setTimelineMode('VERTICAL_ALTERNATING');
          break;
        case 'HORIZONTAL_ALL':
          setTimelineMode('HORIZONTAL_ALL' as ExtendedTimelineMode);
          updateHorizontalAllCards?.(true);
          break;
      }
    },
    [updateHorizontalAllCards],
  );

  return {
    timelineMode,
    handleTimelineUpdate,
  };
};
