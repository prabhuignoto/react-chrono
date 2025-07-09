import { useRef, useEffect, useCallback } from 'react';
import {
  toggleMediaVisibility,
  pauseVideoEmbeds,
} from '../utils/timelineUtils';

interface UseTimelineMediaProps {
  mode: string;
  timelineMainRef: React.RefObject<HTMLDivElement>;
}

export const useTimelineMedia = ({
  mode,
  timelineMainRef,
}: UseTimelineMediaProps) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const observedElements = useRef<Set<Element>>(new Set());

  // Optimized intersection callback with batched operations
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      // Use requestAnimationFrame to batch DOM operations
      requestAnimationFrame(() => {
        entries.forEach(entry => {
          const element = entry.target as HTMLDivElement;
          if (entry.isIntersecting) {
            toggleMediaVisibility(element, true);
          } else {
            toggleMediaVisibility(element, false);
            pauseVideoEmbeds(element);
          }
        });
      });
    },
    [],
  );

  // Memoized observer creation
  const createObserver = useCallback(() => {
    if (observer.current) {
      observer.current.disconnect();
      observedElements.current.clear();
    }

    observer.current = new IntersectionObserver(handleIntersection, {
      root: timelineMainRef.current,
      threshold: 0.1, // Slightly higher threshold for better performance
      rootMargin: '50px', // Preload content slightly before it becomes visible
    });

    return observer.current;
  }, [handleIntersection, timelineMainRef]);

  // Setup IntersectionObserver for efficient media handling
  useEffect(() => {
    // Skip horizontal mode as before
    if (mode === 'HORIZONTAL') return;

    const observerInstance = createObserver();

    // Use requestIdleCallback for better performance if available
    const scheduleObservation = (callback: () => void) => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(callback, { timeout: 100 });
      } else {
        requestAnimationFrame(callback);
      }
    };

    scheduleObservation(() => {
      const element = timelineMainRef.current;
      if (!element || !observerInstance) return;

      const childElements = element.querySelectorAll('.vertical-item-row');
      childElements.forEach(elem => {
        if (!observedElements.current.has(elem)) {
          observerInstance.observe(elem);
          observedElements.current.add(elem);
        }
      });
    });

    return () => {
      observerInstance?.disconnect();
      observedElements.current.clear();
    };
  }, [mode, createObserver, timelineMainRef]);

  // Cleanup function for external use
  const cleanup = useCallback(() => {
    observer.current?.disconnect();
    observedElements.current.clear();
  }, []);

  return {
    observer,
    cleanup,
  };
};
