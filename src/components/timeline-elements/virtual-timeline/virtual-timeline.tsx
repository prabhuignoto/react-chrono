import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { TimelineItemModel } from '@models/TimelineItemModel';

interface VirtualTimelineProps {
  items: TimelineItemModel[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: TimelineItemModel, index: number) => React.ReactNode;
  onScroll?: (scrollTop: number) => void;
  overscan?: number; // Number of items to render outside visible area
  className?: string;
}

interface VirtualItem {
  index: number;
  item: TimelineItemModel;
  offsetTop: number;
  height: number;
}

/**
 * Optimized virtual scrolling component for timeline items
 * Only renders visible items for better performance with large datasets
 */
export const VirtualTimeline: React.FC<VirtualTimelineProps> = ({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  onScroll,
  overscan = 3,
  className = '',
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Calculate total height
  const totalHeight = useMemo(
    () => items.length * itemHeight,
    [items.length, itemHeight],
  );

  // Calculate visible range
  const { startIndex, endIndex, visibleItems } = useMemo(() => {
    if (!items.length) {
      return { startIndex: 0, endIndex: 0, visibleItems: [] };
    }

    const start = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(containerHeight / itemHeight);

    // Add overscan items
    const startWithOverscan = Math.max(0, start - overscan);
    const endWithOverscan = Math.min(
      items.length - 1,
      start + visibleCount + overscan,
    );

    const visible: VirtualItem[] = [];
    for (let i = startWithOverscan; i <= endWithOverscan; i++) {
      visible.push({
        index: i,
        item: items[i],
        offsetTop: i * itemHeight,
        height: itemHeight,
      });
    }

    return {
      startIndex: startWithOverscan,
      endIndex: endWithOverscan,
      visibleItems: visible,
    };
  }, [scrollTop, items, itemHeight, containerHeight, overscan]);

  // Handle scroll with throttling
  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const scrollTop = event.currentTarget.scrollTop;
      setScrollTop(scrollTop);
      onScroll?.(scrollTop);

      // Track scrolling state for optimization
      isScrolling.current = true;

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout to detect scroll end
      scrollTimeoutRef.current = setTimeout(() => {
        isScrolling.current = false;
      }, 150);
    },
    [onScroll],
  );

  // Scroll to specific index
  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      if (!scrollElementRef.current) return;

      const targetScrollTop = index * itemHeight;
      scrollElementRef.current.scrollTo({
        top: targetScrollTop,
        behavior,
      });
    },
    [itemHeight],
  );

  // Scroll to specific item by ID
  const scrollToItem = useCallback(
    (itemId: string, behavior: ScrollBehavior = 'smooth') => {
      const index = items.findIndex((item) => item.id === itemId);
      if (index !== -1) {
        scrollToIndex(index, behavior);
      }
    },
    [items, scrollToIndex],
  );

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Calculate the offset for the spacer before visible items
  const offsetY = startIndex * itemHeight;

  return (
    <div
      ref={scrollElementRef}
      className={`virtual-timeline ${className}`}
      style={{
        height: containerHeight,
        overflow: 'auto',
        position: 'relative',
      }}
      onScroll={handleScroll}
      data-testid="virtual-timeline"
    >
      {/* Total height spacer */}
      <div style={{ height: totalHeight, position: 'relative' }}>
        {/* Spacer before visible items */}
        {offsetY > 0 && (
          <div style={{ height: offsetY }} data-testid="virtual-spacer-top" />
        )}

        {/* Render visible items */}
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map(({ item, index }) => (
            <div
              key={item.id || index}
              style={{ height: itemHeight }}
              data-index={index}
              data-testid={`virtual-item-${index}`}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Export additional utilities
export const useVirtualScrolling = (
  itemCount: number,
  itemHeight: number,
  containerHeight: number,
  overscan = 3,
) => {
  const [scrollTop, setScrollTop] = useState(0);

  const getVisibleRange = useCallback(() => {
    if (!itemCount) {
      return { start: 0, end: 0, total: 0 };
    }

    const start = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const end = Math.min(itemCount - 1, start + visibleCount);

    return {
      start: Math.max(0, start - overscan),
      end: Math.min(itemCount - 1, end + overscan),
      total: itemCount,
    };
  }, [scrollTop, itemHeight, containerHeight, itemCount, overscan]);

  return {
    scrollTop,
    setScrollTop,
    visibleRange: getVisibleRange(),
    totalHeight: itemCount * itemHeight,
  };
};

export default VirtualTimeline;
