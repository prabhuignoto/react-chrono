import { useMemo } from 'react';
import { TimelineMode } from '@models/TimelineModel';
import { OutlinePosition } from '../timeline-outline.model';

/**
 * Custom hook to determine the outline position based on timeline mode
 *
 * @param mode - The current timeline mode
 * @returns The position of the outline
 */
export const useOutlinePosition = (mode?: TimelineMode): OutlinePosition => {
  return useMemo(
    () =>
      mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING'
        ? OutlinePosition.right
        : OutlinePosition.left,
    [mode],
  );
};
