import { useCallback, useState } from 'react';
import { Scroll } from '../models/TimelineCollnModel';

type Mode = "HORIZONTAL" | "VERTICAL" | "TREE";

let useNewScrollPosition: (mode: Mode, itemWidth?: number) => [number, (e: HTMLElement, s: Partial<Scroll>) => void]

useNewScrollPosition = function (mode: Mode, itemWidth?: number) {

  const [newOffset, setNewOffset] = useState(0);

  const computeNewOffset = useCallback((parent: HTMLElement, scroll: Partial<Scroll>) => {
    const { clientWidth, scrollLeft, scrollTop, clientHeight } = parent;
    const { circleOffset, circleWidth, contentHeight, contentOffset } = scroll;

    if (!circleOffset) {
      return
    }

    if (mode === "HORIZONTAL" && itemWidth && circleWidth) {
      let contrRight = scrollLeft + clientWidth;
      let circRight = circleOffset + circleWidth;
      let isVisible = circleOffset >= scrollLeft && circRight <= contrRight;
      let isPartiallyVisible =
        (circleOffset < scrollLeft && circRight > scrollLeft) ||
        (circRight > contrRight && circleOffset < contrRight);

      const leftGap = circleOffset - scrollLeft;
      const rightGap = contrRight - circleOffset;

      if (!(isVisible || isPartiallyVisible)) {
        setNewOffset(circleOffset - itemWidth);
      } else if (leftGap <= itemWidth && leftGap >= 0) {
        setNewOffset(circleOffset - itemWidth);
      } else if (rightGap <= itemWidth && rightGap >= 0) {
        setNewOffset(circleOffset - itemWidth);
      }
    } else if (mode === "VERTICAL" || mode === "TREE") {
      if (!contentOffset || !contentHeight) {
        return;
      }
      let contrBottom = scrollTop + clientHeight;
      let circBottom = contentOffset + contentHeight;
      let isVisible =
        contentOffset >= scrollTop && circBottom <= contrBottom;

      let isPartiallyVisible =
        (contentOffset < scrollTop && circBottom > scrollTop) ||
        (circBottom > contrBottom && contentOffset < contrBottom);

      if (!isVisible || isPartiallyVisible) {
        setNewOffset(contentOffset - contentHeight);
      }
    }
  }, [mode, itemWidth]);

  return [newOffset, computeNewOffset];

}

export default useNewScrollPosition;