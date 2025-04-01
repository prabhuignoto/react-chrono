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
  // State to hold the new offset value
  const [newOffset, setNewOffset] = useState(0);

  const computeHorizontalOffset = (
    scrollLeft: number,
    clientWidth: number,
    pointOffset: number,
    pointWidth: number,
    itemWidth: number,
    setNewOffset: (offset: number) => void,
  ) => {
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
  };

  const computeVerticalOffset = (
    scrollTop: number,
    clientHeight: number,
    contentOffset: number,
    contentHeight: number,
    setNewOffset: (offset: number) => void,
  ) => {
    const contrBottom = scrollTop + clientHeight;
    const circBottom = contentOffset + contentHeight;

    const isVisible = contentOffset >= scrollTop && circBottom <= contrBottom;
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
  };

  // Memoized function to compute the new offset value
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
        computeHorizontalOffset(
          scrollLeft,
          clientWidth,
          pointOffset,
          pointWidth,
          itemWidth,
          setNewOffset,
        );
      } else if (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') {
        computeVerticalOffset(
          scrollTop,
          clientHeight,
          contentOffset,
          contentHeight,
          setNewOffset,
        );
      }
    },
    [mode, itemWidth], // Dependencies for useMemo
  );

  // Returning the new offset and the function to compute it
  return [newOffset, computeNewOffset];
};

export default useNewScrollPosition;
