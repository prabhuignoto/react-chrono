import { useCallback, useRef } from 'react';
import { Scroll } from '@models/TimelineHorizontalModel';

interface UseTimelineScrollProps {
  mode: string;
  onScrollEnd?: () => void;
  setNewOffset: (element: HTMLDivElement, scroll: Partial<Scroll>) => void;
  scrollEndThrottleMs?: number;
}

export const useTimelineScroll = ({
  mode,
  onScrollEnd,
  setNewOffset,
  scrollEndThrottleMs = 100,
}: UseTimelineScrollProps) => {
  const timelineMainRef = useRef<HTMLDivElement>(null);
  const horizontalContentRef = useRef<HTMLDivElement | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const setNewOffsetRef = useRef(setNewOffset);
  const onScrollEndRef = useRef(onScrollEnd);

  // Keep refs updated without triggering re-renders
  setNewOffsetRef.current = setNewOffset;
  onScrollEndRef.current = onScrollEnd;

  // Handle scrolling (optimized with stable reference)
  const handleScroll = useCallback((scroll: Partial<Scroll>) => {
    const element = timelineMainRef.current;
    if (element && setNewOffsetRef.current) {
      setNewOffsetRef.current(element, scroll);
    }
  }, []);

  // Optimized scroll handler with throttling
  const handleMainScroll = useCallback(
    (ev: React.UIEvent<HTMLDivElement>) => {
      const target = ev.target as HTMLElement;

      // Throttle scroll end detection for better performance
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (!onScrollEndRef.current) return;

        const isVertical =
          mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING';

        if (isVertical) {
          const scrolled = target.scrollTop + target.clientHeight;
          const threshold = target.scrollHeight - 1;
          if (scrolled >= threshold) {
            onScrollEndRef.current();
          }
        } else {
          const scrolled = target.scrollLeft + target.offsetWidth;
          if (target.scrollWidth <= scrolled) {
            onScrollEndRef.current();
          }
        }
      }, scrollEndThrottleMs);
    },
    [mode, scrollEndThrottleMs],
  );

  return {
    timelineMainRef,
    horizontalContentRef,
    handleScroll,
    handleMainScroll,
  };
};
