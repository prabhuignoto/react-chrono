import { Scroll } from '@models/TimelineHorizontalModel';
import { TimelineMode } from '@models/TimelineModel';
import { useMemo, useState } from 'react';

/**
 * Hook to calculate the new scroll position based on the given mode and item width.
 *
 * @param {TimelineMode} mode - The mode of the timeline (HORIZONTAL, VERTICAL, or VERTICAL_ALTERNATING).
 * @param {number} [itemWidth] - Optional item width for horizontal mode.
 * @returns {[number, (e: HTMLElement, s: Partial<Scroll>) => void]} - The new offset and a function to compute the new offset.
 */
const useNewScrollPosition = (
  mode: TimelineMode,
  itemWidth?: number,
): [number, (e: HTMLElement, s: Partial<Scroll>) => void] => {
  const [newOffset, setNewOffset] = useState(0);

  /**
   * Computes the new offset value based on the mode and scroll properties.
   */
  const computeNewOffset = useMemo(
    () => (parent: HTMLElement, scroll: Partial<Scroll>) => {
      const { clientWidth, scrollLeft, scrollTop, clientHeight } = parent;
      const {
        pointOffset = 0,
        pointWidth = 0,
        contentHeight = 0,
        contentOffset = 0,
      } = scroll;

      if (mode === 'HORIZONTAL' && itemWidth) {
        const contrRight = scrollLeft + clientWidth;
        const circRight = pointOffset + pointWidth;
        const isVisible = pointOffset >= scrollLeft && circRight <= contrRight;
        const isPartiallyVisible =
          (pointOffset < scrollLeft && circRight > scrollLeft) ||
          (circRight > contrRight && pointOffset < contrRight);
        const leftGap = pointOffset - scrollLeft;
        const rightGap = contrRight - pointOffset;

        if (
          !(isVisible || isPartiallyVisible) ||
          (leftGap <= itemWidth && leftGap >= 0) ||
          (rightGap <= itemWidth && rightGap >= 0)
        ) {
          setNewOffset(pointOffset - itemWidth);
        }
      } else if (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') {
        const contrBottom = scrollTop + clientHeight;
        const circBottom = contentOffset + contentHeight;
        const isVisible =
          contentOffset >= scrollTop && circBottom <= contrBottom;
        const isPartiallyVisible =
          (contentOffset < scrollTop && circBottom > scrollTop) ||
          (circBottom > contrBottom && contentOffset < contrBottom);
        const nOffset = contentOffset - contentHeight;
        const notVisible = !isVisible || isPartiallyVisible;

        if (notVisible && nOffset + contentHeight < contrBottom) {
          setNewOffset(nOffset + Math.round(contentHeight / 2));
        } else if (notVisible) {
          setNewOffset(nOffset);
        }
      }
    },
    [mode, itemWidth],
  );

  return [newOffset, computeNewOffset];
};

export default useNewScrollPosition;
