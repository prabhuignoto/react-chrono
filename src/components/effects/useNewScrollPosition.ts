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

  // Memoized function to compute the new offset value
  const computeNewOffset = useMemo(
    () => (parent: HTMLElement, scroll: Partial<Scroll>) => {
      // Destructuring relevant properties from parent and scroll
      const { clientWidth, scrollLeft, scrollTop, clientHeight } = parent;
      const { pointOffset, pointWidth, contentHeight, contentOffset } = scroll;

      // Handling horizontal mode
      if (mode === 'HORIZONTAL' && itemWidth && pointWidth && pointOffset) {
        // Calculating right boundaries for container and circular element
        const contrRight = scrollLeft + clientWidth;
        const circRight = pointOffset + pointWidth;

        // Checking if the element is fully visible
        const isVisible = pointOffset >= scrollLeft && circRight <= contrRight;

        // Checking if the element is partially visible
        const isPartiallyVisible =
          (pointOffset < scrollLeft && circRight > scrollLeft) ||
          (circRight > contrRight && pointOffset < contrRight);

        // Calculating gaps from left and right
        const leftGap = pointOffset - scrollLeft;
        const rightGap = contrRight - pointOffset;

        // Setting offset based on visibility and gap conditions
        if (
          !(isVisible || isPartiallyVisible) ||
          (leftGap <= itemWidth && leftGap >= 0) ||
          (rightGap <= itemWidth && rightGap >= 0)
        ) {
          setNewOffset(pointOffset - itemWidth);
        }
      } else if (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') {
        // Handling vertical modes
        if (contentOffset && contentHeight) {
          // Calculating bottom boundaries for container and circular element
          const contrBottom = scrollTop + clientHeight;
          const circBottom = contentOffset + contentHeight;

          // Checking if the element is fully visible
          const isVisible =
            contentOffset >= scrollTop && circBottom <= contrBottom;

          // Checking if the element is partially visible
          const isPartiallyVisible =
            (contentOffset < scrollTop && circBottom > scrollTop) ||
            (circBottom > contrBottom && contentOffset < contrBottom);

          // Calculating new offset
          const nOffset = contentOffset - contentHeight;
          const notVisible = !isVisible || isPartiallyVisible;

          // Setting offset based on visibility conditions
          if (notVisible && nOffset + contentHeight < contrBottom) {
            setNewOffset(nOffset + Math.round(contentHeight / 2));
          } else if (notVisible) {
            setNewOffset(nOffset);
          }
        }
      }
    },
    [mode, itemWidth], // Dependencies for useMemo
  );

  // Returning the new offset and the function to compute it
  return [newOffset, computeNewOffset];
};

export default useNewScrollPosition;
