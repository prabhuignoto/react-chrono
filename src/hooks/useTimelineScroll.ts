import { useCallback, useRef } from 'react';
import { Scroll } from '@models/TimelineHorizontalModel';

interface UseTimelineScrollProps {
  mode: string;
  onScrollEnd?: () => void;
  setNewOffset: (element: HTMLDivElement, scroll: Partial<Scroll>) => void;
  scrollEndThrottleMs?: number;
  onNextItem?: () => void;
  onPreviousItem?: () => void;
  activeItemIndex?: React.MutableRefObject<number>;
  totalItems?: number;
}

export const useTimelineScroll = ({
  mode,
  onScrollEnd,
  setNewOffset,
  scrollEndThrottleMs = 100,
  onNextItem,
  onPreviousItem,
  activeItemIndex,
  totalItems,
}: UseTimelineScrollProps) => {
  const timelineMainRef = useRef<HTMLDivElement>(null!);
  const horizontalContentRef = useRef<HTMLDivElement | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const setNewOffsetRef = useRef(setNewOffset);
  const onScrollEndRef = useRef(onScrollEnd);

  // Keep refs updated without triggering re-renders
  setNewOffsetRef.current = setNewOffset;
  onScrollEndRef.current = onScrollEnd;
  
  const onNextItemRef = useRef(onNextItem);
  const onPreviousItemRef = useRef(onPreviousItem);
  onNextItemRef.current = onNextItem;
  onPreviousItemRef.current = onPreviousItem;

  // Handle scrolling (optimized with stable reference)
  const handleScroll = useCallback((scroll: Partial<Scroll>) => {
    const element = timelineMainRef.current;
    if (element && setNewOffsetRef.current) {
      setNewOffsetRef.current(element, scroll);
    }
  }, []);

  // Optimized scroll handler with throttling and timeline navigation
  const handleMainScroll = useCallback(
    (ev: React.UIEvent<HTMLDivElement>) => {
      const target = ev.target as HTMLElement;

      // Throttle scroll end detection for better performance
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        const isVertical = mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING';
        
        if (isVertical) {
          const scrolled = target.scrollTop + target.clientHeight;
          const threshold = target.scrollHeight - 1;
          const isAtBottom = scrolled >= threshold;
          const isAtTop = target.scrollTop <= 1;

          // Handle dynamic loading (existing functionality)
          if (isAtBottom && onScrollEndRef.current) {
            onScrollEndRef.current();
          }

          // Handle timeline navigation for tall cards
          if (onNextItemRef.current && onPreviousItemRef.current && activeItemIndex && totalItems) {
            const currentIndex = activeItemIndex.current;
            // Navigate to next item when scrolled to bottom (if not last item)
            if (isAtBottom && currentIndex < totalItems - 1) {
              // Only navigate if the content actually overflows (indicating tall content)
              if (target.scrollHeight > target.clientHeight + 10) { // 10px threshold
                onNextItemRef.current();
              }
            }
            
            // Navigate to previous item when scrolled to top (if not first item)  
            if (isAtTop && currentIndex > 0) {
              // Only navigate if the content actually overflows and we're not at the natural top
              if (target.scrollHeight > target.clientHeight + 10 && target.scrollTop === 0) {
                onPreviousItemRef.current();
              }
            }
          }
        } else {
          // Horizontal mode - existing functionality
          const scrolled = target.scrollLeft + target.offsetWidth;
          if (target.scrollWidth <= scrolled && onScrollEndRef.current) {
            onScrollEndRef.current();
          }

          // Handle horizontal timeline navigation for wide cards
          if (onNextItemRef.current && onPreviousItemRef.current && activeItemIndex && totalItems) {
            const currentIndex = activeItemIndex.current;
            const isAtRight = target.scrollLeft + target.offsetWidth >= target.scrollWidth - 1;
            const isAtLeft = target.scrollLeft <= 1;

            if (isAtRight && currentIndex < totalItems - 1) {
              if (target.scrollWidth > target.offsetWidth + 10) {
                onNextItemRef.current();
              }
            }
            
            if (isAtLeft && currentIndex > 0) {
              if (target.scrollWidth > target.offsetWidth + 10 && target.scrollLeft === 0) {
                onPreviousItemRef.current();
              }
            }
          }
        }
      }, scrollEndThrottleMs);
    },
    [mode, scrollEndThrottleMs, totalItems],
  );

  return {
    timelineMainRef,
    horizontalContentRef,
    handleScroll,
    handleMainScroll,
  };
};
