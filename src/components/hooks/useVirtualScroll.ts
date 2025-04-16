import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { debounce } from '../utils/debounce'; // Assuming a debounce utility exists

interface UseVirtualScrollOptions {
  itemCount: number;
  estimatedItemHeight: number;
  containerRef: React.RefObject<HTMLElement>;
  measuredHeightsRef?: React.RefObject<Record<number, number>>; // Optional ref for measured heights
  buffer?: number;
  scrollDebounceMs?: number; // Optional debounce time for scroll handler
  fixedContainerHeight?: number; // New option for fixed container height
  extraBufferBelow?: number; // Additional buffer for items below viewport
  useIntersectionObserver?: boolean; // Use IntersectionObserver instead of scroll events
  dynamicBuffering?: boolean; // Adjust buffer size based on scroll velocity
}

interface UseVirtualScrollResult {
  startIndex: number;
  endIndex: number;
  paddingTop: number;
  totalHeight: number;
  visibleIndices: Set<number>; // Track indices currently rendered
  scrollDirection: 'up' | 'down' | null; // Track scroll direction
  scrollVelocity: number; // Scroll velocity for animations
  registerSentinelElement?: (
    index: number,
    element: HTMLElement | null,
  ) => void; // For IntersectionObserver usage
}

// Helper to get height, falling back to estimate
const getItemHeight = (
  index: number,
  measuredHeights: Record<number, number> | undefined,
  estimatedHeight: number,
): number => {
  return measuredHeights?.[index] ?? estimatedHeight;
};

// Use a very large default height (10M pixels) if fixedContainerHeight is true
const DEFAULT_FIXED_HEIGHT = 10000000; // 10 million pixels

/**
 * A hook to implement virtual scrolling for a list of items.
 *
 * @param {UseVirtualScrollOptions} options - Configuration options.
 * @param {number} options.itemCount - Total number of items in the list.
 * @param {number} options.estimatedItemHeight - Estimated height of a single item in pixels.
 * @param {React.RefObject<HTMLElement>} options.containerRef - Ref to the scrollable container element.
 * @param {React.RefObject<Record<number, number>>} [options.measuredHeightsRef] - Optional ref for measured heights.
 * @param {number} [options.buffer=5] - Number of items to render outside the visible viewport for smoother scrolling.
 * @param {number} [options.scrollDebounceMs=50] - Optional debounce time for scroll handler.
 * @param {number} [options.fixedContainerHeight] - Optional fixed container height.
 * @param {number} [options.extraBufferBelow=10] - Additional buffer for items below viewport.
 * @param {boolean} [options.useIntersectionObserver=false] - Use IntersectionObserver instead of scroll events
 * @param {boolean} [options.dynamicBuffering=true] - Adjust buffer size based on scroll velocity
 * @returns {UseVirtualScrollResult} - Object containing the calculated start/end indices, padding, and total height.
 */
export const useVirtualScroll = ({
  itemCount,
  estimatedItemHeight,
  containerRef,
  measuredHeightsRef, // Accept the ref
  buffer = 5,
  scrollDebounceMs = 50, // Default debounce to 50ms
  fixedContainerHeight = DEFAULT_FIXED_HEIGHT, // Default to 10M px if not specified
  extraBufferBelow = 10, // Preload more items below the viewport to prevent jitter
  useIntersectionObserver = false,
  dynamicBuffering = true,
}: UseVirtualScrollOptions): UseVirtualScrollResult => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  // State to track the actual indices being rendered (useful for animations)
  const [visibleIndices, setVisibleIndices] = useState(new Set<number>());
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(
    null,
  );
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollTopRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const scrollTimestampsRef = useRef<Array<{ time: number; position: number }>>(
    [],
  );
  const positionCacheRef = useRef<number[]>([]);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const sentinelElementsRef = useRef<Map<number, HTMLElement>>(new Map());

  // Track scroll velocity for smoother animations and dynamic buffering
  const updateScrollVelocity = useCallback((newScrollTop: number) => {
    const now = Date.now();
    const elapsed = now - lastScrollTimeRef.current;

    if (elapsed > 0) {
      // Calculate pixels per millisecond
      const newVelocity =
        Math.abs(newScrollTop - lastScrollTopRef.current) / elapsed;

      // Update history for more stable velocity calculation
      scrollTimestampsRef.current.push({ time: now, position: newScrollTop });
      // Keep only recent history (last 200ms)
      while (
        scrollTimestampsRef.current.length > 0 &&
        now - scrollTimestampsRef.current[0].time > 200
      ) {
        scrollTimestampsRef.current.shift();
      }

      // Calculate average velocity from recent history (more stable)
      if (scrollTimestampsRef.current.length >= 2) {
        const oldest = scrollTimestampsRef.current[0];
        const totalTime = now - oldest.time;
        if (totalTime > 0) {
          const totalDistance = Math.abs(newScrollTop - oldest.position);
          setScrollVelocity(totalDistance / totalTime);
        }
      } else {
        setScrollVelocity(newVelocity);
      }
    }

    lastScrollTimeRef.current = now;
  }, []);

  // Build and maintain a position cache for all items to stabilize scrolling
  const getItemPositions = useCallback(() => {
    const positions: number[] = [];
    const measured = measuredHeightsRef?.current || {};
    let accumulatedHeight = 0;

    if (positionCacheRef.current.length === itemCount) {
      // Only do a full recalculation periodically to prevent constant jumps
      return positionCacheRef.current;
    }

    for (let i = 0; i < itemCount; i++) {
      positions[i] = accumulatedHeight;
      const height = getItemHeight(i, measured, estimatedItemHeight);
      accumulatedHeight += height;
    }

    positionCacheRef.current = positions;
    return positions;
  }, [itemCount, measuredHeightsRef, estimatedItemHeight]);

  // Get dynamic buffer size based on scroll velocity
  const getDynamicBufferSize = useCallback(
    (direction: 'up' | 'down' | null, baseBuffer: number) => {
      if (!dynamicBuffering) return baseBuffer;

      // Exponentially increase buffer as velocity increases
      // This helps preload more content during fast scrolls
      const velocityFactor = Math.min(
        10, // Cap at 10x the base buffer
        1 + Math.pow(scrollVelocity * 20, 2),
      );

      return Math.round(baseBuffer * velocityFactor);
    },
    [scrollVelocity, dynamicBuffering],
  );

  // Calculate visible range with asymmetric buffering and velocity awareness
  const { startIndex, endIndex, paddingTop } = useMemo(() => {
    const positions = getItemPositions();
    const measured = measuredHeightsRef?.current;
    let firstVisibleIndex = 0;
    let lastVisibleIndex = itemCount - 1;

    // Find the first item that starts below the current scroll position
    for (let i = 0; i < itemCount; i++) {
      const itemTop = positions[i];
      const itemHeight = getItemHeight(i, measured, estimatedItemHeight);
      const itemBottom = itemTop + itemHeight;

      // Item is above viewport
      if (itemBottom < scrollTop) {
        continue;
      }

      // Found first visible item
      firstVisibleIndex = i;
      break;
    }

    // Find the last item that starts before the bottom of the viewport
    for (let i = firstVisibleIndex; i < itemCount; i++) {
      const itemTop = positions[i];

      // Item is below viewport
      if (itemTop > scrollTop + containerHeight) {
        lastVisibleIndex = i - 1;
        break;
      }
    }

    // Get dynamic buffer sizes based on scroll velocity and direction
    const upBuffer = getDynamicBufferSize(
      scrollDirection === 'up' ? 'up' : null,
      buffer,
    );

    const downBuffer = getDynamicBufferSize(
      scrollDirection === 'down' ? 'down' : null,
      buffer + extraBufferBelow,
    );

    // Apply asymmetric buffering with velocity-based adjustments
    let bufferStart = Math.max(0, firstVisibleIndex - upBuffer);
    let bufferEnd = Math.min(itemCount - 1, lastVisibleIndex + downBuffer);

    return {
      startIndex: bufferStart,
      endIndex: bufferEnd,
      paddingTop: positions[bufferStart] || 0,
    };
  }, [
    scrollTop,
    containerHeight,
    itemCount,
    estimatedItemHeight,
    measuredHeightsRef,
    buffer,
    extraBufferBelow,
    scrollDirection,
    getItemPositions,
    getDynamicBufferSize,
  ]);

  // Use the fixed container height directly instead of calculating total height
  const totalHeight = fixedContainerHeight;

  // Update visible indices state when startIndex/endIndex change
  useEffect(() => {
    const newVisibleIndices = new Set<number>();
    for (let i = startIndex; i <= endIndex; i++) {
      newVisibleIndices.add(i);
    }
    setVisibleIndices(newVisibleIndices);
  }, [startIndex, endIndex]);

  // Intersection Observer-based virtualization (more efficient than scroll events)
  const setupIntersectionObserver = useCallback(() => {
    if (!useIntersectionObserver || !containerRef.current) return;

    // Clean up any existing observer
    if (intersectionObserverRef.current) {
      intersectionObserverRef.current.disconnect();
    }

    // Create a new observer to track sentinel elements
    intersectionObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(
            entry.target.getAttribute('data-index') || '0',
            10,
          );

          // If sentinel element enters viewport, expand visible range in that direction
          if (entry.isIntersecting) {
            // Top sentinel - need to render more items above
            if (index === startIndex && startIndex > 0) {
              const newStart = Math.max(0, startIndex - buffer);
              const newVisibleIndices = new Set(visibleIndices);
              for (let i = newStart; i < startIndex; i++) {
                newVisibleIndices.add(i);
              }
              setVisibleIndices(newVisibleIndices);
            }

            // Bottom sentinel - need to render more items below
            if (index === endIndex && endIndex < itemCount - 1) {
              const newEnd = Math.min(itemCount - 1, endIndex + buffer);
              const newVisibleIndices = new Set(visibleIndices);
              for (let i = endIndex + 1; i <= newEnd; i++) {
                newVisibleIndices.add(i);
              }
              setVisibleIndices(newVisibleIndices);
            }
          }
        });
      },
      {
        root: containerRef.current,
        rootMargin: `${100 * buffer}px 0px ${100 * buffer}px 0px`,
        threshold: 0.1,
      },
    );

    // Observe sentinel elements if they exist
    sentinelElementsRef.current.forEach((element) => {
      intersectionObserverRef.current?.observe(element);
    });

    return () => {
      intersectionObserverRef.current?.disconnect();
    };
  }, [
    containerRef,
    startIndex,
    endIndex,
    itemCount,
    buffer,
    visibleIndices,
    useIntersectionObserver,
  ]);

  // Register sentinel elements with the intersection observer
  const registerSentinelElement = useCallback(
    (index: number, element: HTMLElement | null) => {
      if (!element || !useIntersectionObserver) return;

      // Store the element in our ref
      sentinelElementsRef.current.set(index, element);

      // If we already have an observer, observe this element
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.observe(element);
      }
    },
    [useIntersectionObserver],
  );

  // Setup intersection observer if enabled
  useEffect(() => {
    if (useIntersectionObserver) {
      return setupIntersectionObserver();
    }
  }, [setupIntersectionObserver, useIntersectionObserver]);

  // Use RAF for smoother scrolling instead of pure debounce
  const scrollHandler = useCallback(() => {
    if (!containerRef.current) return;

    const newScrollTop = containerRef.current.scrollTop;

    // Determine scroll direction
    if (newScrollTop > lastScrollTopRef.current) {
      setScrollDirection('down');
    } else if (newScrollTop < lastScrollTopRef.current) {
      setScrollDirection('up');
    }

    // Update velocity tracking
    updateScrollVelocity(newScrollTop);

    lastScrollTopRef.current = newScrollTop;
    setScrollTop(newScrollTop);
  }, [containerRef, updateScrollVelocity]);

  // Debounced version for non-critical updates
  const debouncedScrollHandler = useCallback(
    debounce(scrollHandler, scrollDebounceMs),
    [scrollHandler, scrollDebounceMs],
  );

  // More responsive scroll handler using RAF
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;
    let ticking = false;
    let lastAnimationFrame = 0;

    const handleScroll = () => {
      // Throttle RAF to ~16ms (60fps) for smoother rendering
      const now = Date.now();
      if (!ticking && now - lastAnimationFrame > 16) {
        rafId = requestAnimationFrame(() => {
          scrollHandler();
          ticking = false;
          lastAnimationFrame = now;
        });
        ticking = true;
      }

      // Still call the debounced version for non-critical calculations
      debouncedScrollHandler();
    };

    // Initialize scroll position
    if (container.scrollTop > 0) {
      lastScrollTopRef.current = container.scrollTop;
      setScrollTop(container.scrollTop);
    }

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      debouncedScrollHandler.cancel?.();
    };
  }, [containerRef, scrollHandler, debouncedScrollHandler]);

  const updateContainerHeight = useCallback(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
  }, [containerRef]);

  useEffect(() => {
    updateContainerHeight();
    const container = containerRef.current;
    if (!container) return;
    const resizeObserver = new ResizeObserver(updateContainerHeight);
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [updateContainerHeight]);

  return {
    startIndex,
    endIndex,
    paddingTop,
    totalHeight,
    visibleIndices, // Return the set of visible indices
    scrollDirection,
    scrollVelocity,
    registerSentinelElement, // Not included in the interface but added for use by the component
  };
};
