import { useMemo, useState } from 'react';
import { Scroll } from '../../models/TimelineHorizontalModel';
import { TimelineMode } from '../../models/TimelineModel';

let useNewScrollPosition: (
  mode: TimelineMode,
  itemWidth?: number,
) => [number, (e: HTMLElement, s: Partial<Scroll>) => void];

useNewScrollPosition = function (mode: TimelineMode, itemWidth?: number) {
  const [newOffset, setOffset] = useState(0);

  const computeNewOffset = useMemo(
    () => (parent: HTMLElement, scroll: Partial<Scroll>) => {
      const { clientWidth, scrollLeft, scrollTop, clientHeight } = parent;
      const { pointOffset, pointWidth, contentHeight, contentOffset } = scroll;

      if (!pointOffset) {
        return;
      }

      if (mode === 'HORIZONTAL' && itemWidth && pointWidth) {
        let contrRight = scrollLeft + clientWidth;
        let circRight = pointOffset + pointWidth;
        let isVisible = pointOffset >= scrollLeft && circRight <= contrRight;

        let isPartiallyVisible =
          (pointOffset < scrollLeft && circRight > scrollLeft) ||
          (circRight > contrRight && pointOffset < contrRight);

        const leftGap = pointOffset - scrollLeft;
        const rightGap = contrRight - pointOffset;

        if (!(isVisible || isPartiallyVisible)) {
          setOffset(pointOffset - itemWidth);
        } else if (leftGap <= itemWidth && leftGap >= 0) {
          setOffset(pointOffset - itemWidth);
        } else if (rightGap <= itemWidth && rightGap >= 0) {
          setOffset(pointOffset - itemWidth);
        }
      } else if (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') {
        if (!contentOffset || !contentHeight) {
          return;
        }

        let contrBottom = scrollTop + clientHeight;
        let circBottom = contentOffset + contentHeight;
        let isVisible = contentOffset >= scrollTop && circBottom <= contrBottom;

        let isPartiallyVisible =
          (contentOffset < scrollTop && circBottom > scrollTop) ||
          (circBottom > contrBottom && contentOffset < contrBottom);

        const nOffset = contentOffset - contentHeight;
        const notVisible = !isVisible || isPartiallyVisible;

        if (notVisible && nOffset + contentHeight < contrBottom) {
          setOffset(nOffset + Math.round(contentHeight / 2));
        } else if (notVisible) {
          setOffset(nOffset);
        }
      }
    },
    [mode, itemWidth],
  );

  return [newOffset, computeNewOffset];
};

export default useNewScrollPosition;
