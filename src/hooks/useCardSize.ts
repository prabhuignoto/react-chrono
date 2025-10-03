import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import { useTimelineContext } from '../components/contexts';

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
  scrollHeight: number,
  clientHeight: number,
  contentDetailsHeight: number = 150,
): boolean => {
  // Content is considered "large" if it exceeds the configured height limit
  // This provides a more predictable behavior than comparing with container
  return scrollHeight > contentDetailsHeight;
};

export const useCardSize = ({
  containerRef,
  detailsRef,
  setStartWidth,
}: UseCardSizeProps): UseCardSizeReturn => {
  // Safely get contentDetailsHeight from context with fallback
  let contentDetailsHeight = 150; // Default fallback
  try {
    const context = useTimelineContext();
    contentDetailsHeight = context.contentDetailsHeight;
  } catch {
    // Context not available, use fallback
  }
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
    let rafId: number | undefined;
    let isUnmounted = false;

    const observer = new ResizeObserver((entries) => {
      // Use RAF to batch DOM updates
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        if (isUnmounted) return; // Prevent updates after unmount

        for (const entry of entries) {
          if (containerRef.current && detailsRef.current) {
            const detailsEle = detailsRef.current;
            const container = containerRef.current;

            // Update measurements
            measurementsCache.current = {
              scrollHeight: detailsEle.scrollHeight,
              clientHeight: detailsEle.offsetHeight,
              offsetTop: detailsEle.offsetTop,
              containerHeight: container.clientHeight,
            };

            // Update dimensions
            setDimensions({
              cardHeight: detailsEle.scrollHeight,
              detailsHeight: detailsEle.offsetHeight,
              containerWidth: container.clientWidth,
            });
          }
        }
        rafId = undefined;
      });
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Also observe the details element for size changes
    if (detailsRef.current) {
      observer.observe(detailsRef.current);
    }

    // Force initial measurement when detailsRef becomes available
    // This handles the case when textDensity changes from LOW to HIGH
    if (containerRef.current && detailsRef.current) {
      const detailsEle = detailsRef.current;
      const container = containerRef.current;

      measurementsCache.current = {
        scrollHeight: detailsEle.scrollHeight,
        clientHeight: detailsEle.offsetHeight,
        offsetTop: detailsEle.offsetTop,
        containerHeight: container.clientHeight,
      };

      setDimensions({
        cardHeight: detailsEle.scrollHeight,
        detailsHeight: detailsEle.offsetHeight,
        containerWidth: container.clientWidth,
      });
    }

    return () => {
      isUnmounted = true;
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [containerRef, detailsRef]);

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
  const { cardActualHeight, detailsHeight, textContentLarge } = useMemo(() => {
    const cache = measurementsCache.current;
    return {
      cardActualHeight: dimensions.cardHeight,
      detailsHeight: dimensions.detailsHeight,
      textContentLarge: calculateTextContentSize(
        cache.scrollHeight,
        cache.clientHeight,
        contentDetailsHeight, // Use context value instead of hardcoded 150
      ),
    };
  }, [dimensions, contentDetailsHeight]);

  return {
    cardActualHeight,
    detailsHeight,
    textContentLarge,
    updateCardSize,
  };
};
