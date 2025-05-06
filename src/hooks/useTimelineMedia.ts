import { useRef, useEffect } from 'react';
import { toggleMediaVisibility, pauseVideoEmbeds } from '../utils/timelineUtils';

interface UseTimelineMediaProps {
  mode: string;
  timelineMainRef: React.RefObject<HTMLDivElement>;
}

export const useTimelineMedia = ({
  mode,
  timelineMainRef,
}: UseTimelineMediaProps) => {
  const observer = useRef<IntersectionObserver | null>(null);

  // Setup IntersectionObserver for efficient media handling
  useEffect(() => {
    if (mode === 'HORIZONTAL') return;

    // Create observer first for better performance
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLDivElement;
          if (entry.isIntersecting) {
            toggleMediaVisibility(element, true);
          } else {
            toggleMediaVisibility(element, false);
            pauseVideoEmbeds(element);
          }
        });
      },
      {
        root: timelineMainRef.current,
        threshold: 0,
      },
    );

    // Use requestAnimationFrame to defer DOM operations
    requestAnimationFrame(() => {
      const element = timelineMainRef.current;
      if (!element) return;

      const childElements = element.querySelectorAll('.vertical-item-row');
      childElements.forEach((elem) => {
        observer.current?.observe(elem);
      });
    });

    return () => {
      observer.current?.disconnect();
    };
  }, [mode, timelineMainRef]);

  return {
    observer,
  };
};
