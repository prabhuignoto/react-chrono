import { useCallback, useRef } from 'react';
import { Scroll } from '@models/TimelineHorizontalModel';

interface UseTimelineScrollProps {
  mode: string;
  onScrollEnd?: () => void;
  setNewOffset: (element: HTMLDivElement, scroll: Partial<Scroll>) => void;
}

export const useTimelineScroll = ({
  mode,
  onScrollEnd,
  setNewOffset,
}: UseTimelineScrollProps) => {
  const timelineMainRef = useRef<HTMLDivElement>(null);
  const horizontalContentRef = useRef<HTMLDivElement | null>(null);

  // Handle scrolling
  const handleScroll = useCallback(
    (scroll: Partial<Scroll>) => {
      const element = timelineMainRef.current;
      if (element) {
        setNewOffset(element, scroll);
      }
    },
    [setNewOffset],
  );

  // Scroll handler for detecting end
  const handleMainScroll = useCallback(
    (ev: React.UIEvent<HTMLDivElement>) => {
      const target = ev.target as HTMLElement;

      if (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') {
        const scrolled = target.scrollTop + target.clientHeight;
        if (target.scrollHeight - scrolled < 1) {
          onScrollEnd?.();
        }
      } else {
        const scrolled = target.scrollLeft + target.offsetWidth;
        if (target.scrollWidth === scrolled) {
          onScrollEnd?.();
        }
      }
    },
    [mode, onScrollEnd],
  );

  return {
    timelineMainRef,
    horizontalContentRef,
    handleScroll,
    handleMainScroll,
  };
};
