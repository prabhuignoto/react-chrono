import { useCallback, useState } from 'react';
import { Scroll } from '../../models/TimelineCollnModel';

type Mode = "HORIZONTAL" | "VERTICAL" | "TREE";

let useNewScrollPosition: (mode: Mode, itemWidth?: number) => [number, (e: HTMLElement, s: Partial<Scroll>) => void]

useNewScrollPosition = function (mode: Mode, itemWidth?: number) {

  const [newOffset, setNewOffset] = useState(0);

  const computeNewOffset = useCallback((parent: HTMLElement, scroll: Partial<Scroll>) => {
    const { clientWidth, scrollLeft, scrollTop, clientHeight } = parent;
    const { timelinePointOffset, timelinePointWidth, timelineContentHeight, timelineContentOffset } = scroll;

    if (!timelinePointOffset) {
      return;
    }

    if (mode === "HORIZONTAL" && itemWidth && timelinePointWidth) {
      let contrRight = scrollLeft + clientWidth;
      let circRight = timelinePointOffset + timelinePointWidth;
      let isVisible = timelinePointOffset >= scrollLeft && circRight <= contrRight;
      let isPartiallyVisible =
        (timelinePointOffset < scrollLeft && circRight > scrollLeft) ||
        (circRight > contrRight && timelinePointOffset < contrRight);

      const leftGap = timelinePointOffset - scrollLeft;
      const rightGap = contrRight - timelinePointOffset;

      if (!(isVisible || isPartiallyVisible)) {
        setNewOffset(timelinePointOffset - itemWidth);
      } else if (leftGap <= itemWidth && leftGap >= 0) {
        setNewOffset(timelinePointOffset - itemWidth);
      } else if (rightGap <= itemWidth && rightGap >= 0) {
        setNewOffset(timelinePointOffset - itemWidth);
      }
    } else if (mode === "VERTICAL" || mode === "TREE") {
      if (!timelineContentOffset || !timelineContentHeight) {
        return;
      }
      let contrBottom = scrollTop + clientHeight;
      let circBottom = timelineContentOffset + timelineContentHeight;
      let isVisible =
        timelineContentOffset >= scrollTop && circBottom <= contrBottom;

      let isPartiallyVisible =
        (timelineContentOffset < scrollTop && circBottom > scrollTop) ||
        (circBottom > contrBottom && timelineContentOffset < contrBottom);

      const newOffset = timelineContentOffset - timelineContentHeight;
      const notVisible = !isVisible || isPartiallyVisible;

      if (notVisible && (newOffset + timelineContentHeight) < contrBottom) {
        setNewOffset(newOffset + Math.round(timelineContentHeight / 2));
      } else if (notVisible) {
        setNewOffset(newOffset);
      }
    }
  }, [mode, itemWidth]);

  return [newOffset, computeNewOffset];

}

export default useNewScrollPosition;