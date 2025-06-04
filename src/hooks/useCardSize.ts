import { RefObject, useCallback, useEffect, useMemo, useState, useRef } from 'react';

interface UseCardSizeProps {
  containerRef: RefObject<HTMLElement | null>;
  detailsRef: RefObject<HTMLElement | null>;
  setStartWidth: (width: number) => void;
}

interface UseCardSizeReturn {
  cardActualHeight: number;
  detailsHeight: number;
  textContentLarge: boolean;
  updateCardSize: (node: HTMLElement | null) => void;
}

interface CardDimensions {
  cardHeight: number;
  detailsHeight: number;
  containerWidth: number;
}

// Memoized calculation function to prevent unnecessary recalculations
const calculateTextContentSize = (
  cardHeight: number,
  detailsHeight: number,
  containerHeight: number,
  scrollHeight: number,
  clientHeight: number,
  detailsOffsetTop: number,
): boolean => {
  // Use cached values instead of DOM queries
  const hasSignificantOverflow = scrollHeight > clientHeight + 20;
  return (
    cardHeight + detailsOffsetTop > containerHeight + 20 ||
    hasSignificantOverflow
  );
};

export const useCardSize = ({
  containerRef,
  detailsRef,
  setStartWidth,
}: UseCardSizeProps): UseCardSizeReturn => {
  const [dimensions, setDimensions] = useState<CardDimensions>({
    cardHeight: 0,
    detailsHeight: 0,
    containerWidth: 0,
  });
  
  // Cache DOM measurements to avoid repeated calculations
  const measurementsCache = useRef<{
    scrollHeight: number;
    clientHeight: number;
    offsetTop: number;
    containerHeight: number;
  }>({ scrollHeight: 0, clientHeight: 0, offsetTop: 0, containerHeight: 0 });

  // Throttled resize observer for better performance
  useEffect(() => {
    let rafId: number;
    
    const observer = new ResizeObserver((entries) => {
      // Use RAF to batch DOM updates
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        for (const entry of entries) {
          if (entry.target === containerRef.current) {
            setDimensions((prev) => ({
              ...prev,
              containerWidth: entry.contentRect.width,
            }));
          }
        }
      });
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [containerRef]);

  const updateCardSize = useCallback(
    (node: HTMLElement | null) => {
      if (!node || !detailsRef.current) return;

      const detailsEle = detailsRef.current;
      const { scrollHeight, offsetHeight, offsetTop } = detailsEle;
      const containerHeight = node.clientHeight;

      // Cache measurements
      measurementsCache.current = {
        scrollHeight,
        clientHeight: offsetHeight,
        offsetTop,
        containerHeight,
      };

      containerRef.current = node;
      setStartWidth(node.clientWidth);
      setDimensions({
        cardHeight: scrollHeight,
        detailsHeight: offsetHeight,
        containerWidth: node.clientWidth,
      });
    },
    [detailsRef, setStartWidth, containerRef],
  );

  // Optimized memoization with cached measurements
  const { cardActualHeight, detailsHeight, textContentLarge } = useMemo(
    () => {
      const cache = measurementsCache.current;
      return {
        cardActualHeight: dimensions.cardHeight,
        detailsHeight: dimensions.detailsHeight,
        textContentLarge: calculateTextContentSize(
          dimensions.cardHeight,
          dimensions.detailsHeight,
          cache.containerHeight,
          cache.scrollHeight,
          cache.clientHeight,
          cache.offsetTop,
        ),
      };
    },
    [dimensions],
  );

  return {
    cardActualHeight,
    detailsHeight,
    textContentLarge,
    updateCardSize,
  };
};
