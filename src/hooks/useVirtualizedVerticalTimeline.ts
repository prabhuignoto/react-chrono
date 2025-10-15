import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type VirtualizedConfig = {
  itemCount: number;
  estimatedItemHeight: number; // px
  overscan?: number; // number of items to render above/below
};

export type VirtualizedResult = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  startIndex: number;
  endIndex: number;
  offsetTop: number; // spacer height before first rendered item
  afterHeight: number; // spacer height after last rendered item
  handleScroll: () => void;
  setHeights: (index: number, height: number) => void;
};

export function useVirtualizedVerticalTimeline(
  config: VirtualizedConfig,
): VirtualizedResult {
  const { itemCount, estimatedItemHeight, overscan = 3 } = config;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  // Track measured heights; fallback to estimate when unknown
  const heightsRef = useRef<Map<number, number>>(new Map());

  const totalHeight = useMemo(() => {
    let known = 0;
    let unknownCount = 0;
    for (let i = 0; i < itemCount; i++) {
      const h = heightsRef.current.get(i);
      if (typeof h === 'number') known += h;
      else unknownCount++;
    }
    return known + unknownCount * estimatedItemHeight;
  }, [itemCount, estimatedItemHeight]);

  const setHeights = useCallback((index: number, height: number) => {
    const prev = heightsRef.current.get(index);
    if (prev !== height) {
      heightsRef.current.set(index, height);
      // trigger layout recompute by updating scrollTop (no-op assignment forces memo recompute)
      setScrollTop((v) => v);
    }
  }, []);

  const handleScroll = useCallback(() => {
    const node = containerRef.current;
    if (!node) return;
    setScrollTop(node.scrollTop);
    setViewportHeight(node.clientHeight);
  }, []);

  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

  // Compute visible range
  const { startIndex, endIndex, offsetTop } = useMemo(() => {
    const startApprox = Math.max(
      0,
      Math.floor(scrollTop / Math.max(1, estimatedItemHeight)) - overscan,
    );

    // Walk down from startApprox accumulating real heights if known
    let y = 0;
    for (let i = 0; i < startApprox; i++) {
      y += heightsRef.current.get(i) ?? estimatedItemHeight;
    }

    let i = startApprox;
    let currY = y;
    const maxY = scrollTop + viewportHeight + overscan * estimatedItemHeight;
    for (; i < itemCount && currY < maxY; i++) {
      currY += heightsRef.current.get(i) ?? estimatedItemHeight;
    }

    return {
      startIndex: startApprox,
      endIndex: Math.min(itemCount - 1, Math.max(startApprox, i)),
      offsetTop: y,
    };
  }, [scrollTop, viewportHeight, itemCount, estimatedItemHeight, overscan]);

  const afterHeight = useMemo(() => {
    let y = 0;
    for (let i = endIndex + 1; i < itemCount; i++) {
      y += heightsRef.current.get(i) ?? estimatedItemHeight;
    }
    return y;
  }, [endIndex, itemCount, estimatedItemHeight]);

  return {
    containerRef,
    startIndex,
    endIndex,
    offsetTop,
    afterHeight,
    handleScroll,
    setHeights,
  };
}
