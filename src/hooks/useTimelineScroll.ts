import { useCallback, useRef, useMemo } from 'react';
import { Scroll } from '@models/TimelineHorizontalModel';
import { throttle } from '@utils/throttle';

interface UseTimelineScrollProps {
  mode: string;
  onScrollEnd?: () => void;
  setNewOffset: (element: HTMLDivElement, scroll: Partial<Scroll>) => void;
  scrollEndThrottleMs?: number;
  onNextItem?: () => void;
  onPreviousItem?: () => void;
  activeItemIndex?: React.MutableRefObject<number>;
  totalItems?: number;
  isKeyboardNavigation?: boolean;
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
  isKeyboardNavigation = false,
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

  // Create throttled scroll handler for better performance
  const throttledScrollHandler = useMemo(
    () => throttle((target: HTMLElement) => {
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

          // Disabled auto-navigation feature to prevent unwanted timeline jumping
          // Users should navigate explicitly via keyboard/buttons only
          // Original auto-navigation caused issues with scrolling to bottom/top
          /* 
          if (onNextItemRef.current && onPreviousItemRef.current && activeItemIndex && totalItems && !isKeyboardNavigation) {
            // Auto-navigation logic removed to prevent unwanted jumps
          }
          */
        } else {
          // Horizontal mode - existing functionality
          const scrolled = target.scrollLeft + target.offsetWidth;
          if (target.scrollWidth <= scrolled && onScrollEndRef.current) {
            onScrollEndRef.current();
          }

          // Disabled horizontal auto-navigation to prevent unwanted timeline jumping
          // Users should navigate explicitly via keyboard/buttons only
          /*
          if (onNextItemRef.current && onPreviousItemRef.current && activeItemIndex && totalItems && !isKeyboardNavigation) {
            // Horizontal auto-navigation logic removed to prevent unwanted jumps
          }
          */
        }
      }, 16), // Throttle to 60fps for smooth scrolling
    [mode, totalItems, isKeyboardNavigation],
  );

  // Optimized scroll handler that uses throttling
  const handleMainScroll = useCallback(
    (ev: React.UIEvent<HTMLDivElement>) => {
      const target = ev.target as HTMLElement;
      throttledScrollHandler(target);
    },
    [throttledScrollHandler],
  );

  return {
    timelineMainRef,
    horizontalContentRef,
    handleScroll,
    handleMainScroll,
  };
};
