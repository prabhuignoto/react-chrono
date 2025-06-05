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
 * Optimized for performance with better timeout management
 */
export const useSlideshowProgress = ({
  slideShowRunning,
  activeTimelineItem,
  totalItems,
  slideItemDuration,
}: UseSlideshowProgressProps): SlideshowProgressState => {
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActiveItem = useRef(activeTimelineItem);

  // Efficient cleanup function
  const clearTimeouts = useCallback(() => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
  }, []);

  // Clean up timeout when slideshow stops
  useEffect(() => {
    if (!slideShowRunning) {
      setIsPaused(false);
      clearTimeouts();
    }
  }, [slideShowRunning, clearTimeouts]);

  // Reset pause state when active item changes (optimized)
  useEffect(() => {
    if (slideShowRunning && lastActiveItem.current !== activeTimelineItem) {
      lastActiveItem.current = activeTimelineItem;
      if (isPaused) setIsPaused(false);
    }
  }, [activeTimelineItem, slideShowRunning, isPaused]);

  // Pause the progress
  const pauseProgress = useCallback(() => {
    if (slideShowRunning && !isPaused) {
      setIsPaused(true);
    }
  }, [slideShowRunning, isPaused]);

  // Resume the progress
  const resumeProgress = useCallback(() => {
    if (slideShowRunning && isPaused) {
      setIsPaused(false);
    }
  }, [slideShowRunning, isPaused]);

  // Cleanup on unmount
  useEffect(() => clearTimeouts, [clearTimeouts]);

  return {
    isPaused,
    pauseProgress,
    resumeProgress,
  };
};
