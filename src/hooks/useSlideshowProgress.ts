import { useCallback, useEffect, useState, useRef } from 'react';

interface UseSlideshowProgressProps {
  /** Whether the slideshow is currently running */
  slideShowRunning: boolean;
  /** Current active timeline item index */
  activeTimelineItem: number;
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
}: UseSlideshowProgressProps): SlideshowProgressState => {
  const [isPaused, setIsPaused] = useState(false);
  const lastActiveItem = useRef(activeTimelineItem);

  // Clean up when slideshow stops
  useEffect(() => {
    if (!slideShowRunning) {
      setIsPaused(false);
    }
  }, [slideShowRunning]);

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


  return {
    isPaused,
    pauseProgress,
    resumeProgress,
  };
};
