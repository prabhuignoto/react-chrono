import { useCallback, useEffect, useState, useRef } from 'react';

interface UseSlideshowProgressProps {
  /** Whether the slideshow is currently running */
  slideShowRunning: boolean;
  /** Current active timeline item index */
  activeTimelineItem: number;
  /** Total number of timeline items */
  totalItems: number;
  /** Duration of each slide in milliseconds */
  slideItemDuration: number;
}

interface SlideshowProgressState {
  /** Whether the slideshow progress is paused */
  isPaused: boolean;
  /** Pause the slideshow progress */
  pauseProgress: () => void;
  /** Resume the slideshow progress */
  resumeProgress: () => void;
}

/**
 * Custom hook to manage overall slideshow progress state
 * This hook tracks the global progress across all timeline items during slideshow mode
 *
 * @param props - Configuration object containing slideshow state
 * @returns Object with pause/resume controls and current state
 */
export const useSlideshowProgress = ({
  slideShowRunning,
  activeTimelineItem,
  totalItems,
  slideItemDuration,
}: UseSlideshowProgressProps): SlideshowProgressState => {
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timeout on unmount or when slideshow stops
  useEffect(() => {
    if (!slideShowRunning) {
      setIsPaused(false);
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
    }
  }, [slideShowRunning]);

  // Reset pause state when active item changes
  useEffect(() => {
    if (slideShowRunning) {
      setIsPaused(false);
    }
  }, [activeTimelineItem, slideShowRunning]);

  // Pause the progress
  const pauseProgress = useCallback(() => {
    if (slideShowRunning) {
      setIsPaused(true);
    }
  }, [slideShowRunning]);

  // Resume the progress
  const resumeProgress = useCallback(() => {
    if (slideShowRunning) {
      setIsPaused(false);
    }
  }, [slideShowRunning]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  return {
    isPaused,
    pauseProgress,
    resumeProgress,
  };
};
