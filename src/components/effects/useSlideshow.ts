import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

type SlideshowHookReturn = {
  paused: boolean;
  remainInterval: number;
  setStartWidth: (width: number) => void;
  setupTimer: (interval: number) => void;
  startWidth: number;
  tryPause: () => void;
  tryResume: () => void;
};

/**
 * Custom hook to manage slideshow functionality with pause/resume capabilities
 * Uses requestAnimationFrame for smoother animation performance
 * @param ref - Reference to the HTML element containing the slideshow
 * @param active - Whether the current slide is active
 * @param slideShowActive - Whether the slideshow functionality is enabled
 * @param slideItemDuration - Duration in milliseconds for each slide
 * @param id - Unique identifier for the current slide
 * @param onElapsed - Callback function triggered when slide duration elapses
 * @returns Object containing slideshow control functions and state
 */
const useSlideshow = (
  ref: RefObject<HTMLElement>,
  active: boolean,
  slideShowActive: boolean,
  slideItemDuration: number,
  id: string,
  onElapsed?: (id: string) => void,
): SlideshowHookReturn => {
  const startTime = useRef<number | null>(null);
  const timerRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const [startWidth, setStartWidth] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  const slideShowElapsed = useRef<number>(0);
  const [remainInterval, setRemainInterval] = useState<number>(0);
  const isRunning = useRef<boolean>(false);

  /**
   * Cleans up timers and animation frames
   */
  const cleanupTimer = useCallback(() => {
    // Clear timeout if exists
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = 0;
    }

    // Cancel animation frame if exists
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }

    isRunning.current = false;
  }, []);

  /**
   * Sets up a new timer for the slideshow using requestAnimationFrame for smoother animations
   * @param interval - Duration in milliseconds for the timer
   */
  const setupTimer = useCallback(
    (interval: number) => {
      if (!slideItemDuration || interval <= 0 || !active || !slideShowActive) {
        return;
      }

      cleanupTimer();
      setRemainInterval(interval);
      startTime.current = performance.now();
      setPaused(false);
      isRunning.current = true;

      // For very short durations, use setTimeout as fallback
      if (interval < 50) {
        timerRef.current = window.setTimeout(() => {
          handleTimerComplete();
        }, interval);
        return;
      }

      // Use requestAnimationFrame for smoother animation
      const endTime = startTime.current + interval;

      const animationStep = (timestamp: number) => {
        if (!isRunning.current) return;

        if (timestamp >= endTime) {
          handleTimerComplete();
          return;
        }

        // Continue animation loop
        rafRef.current = window.requestAnimationFrame(animationStep);
      };

      rafRef.current = window.requestAnimationFrame(animationStep);
    },
    [slideItemDuration, active, slideShowActive],
  );

  /**
   * Handles timer completion
   */
  const handleTimerComplete = useCallback(() => {
    cleanupTimer();
    setPaused(true);
    setStartWidth(0);
    setRemainInterval(slideItemDuration);
    if (id && onElapsed) {
      onElapsed(id);
    }
  }, [id, onElapsed, slideItemDuration, cleanupTimer]);

  /**
   * Pauses the current slideshow if conditions are met
   */
  const tryPause = useCallback(() => {
    if (!active || !slideShowActive) {
      return;
    }

    cleanupTimer();
    setPaused(true);

    if (startTime.current !== null) {
      const elapsed = performance.now() - startTime.current;
      slideShowElapsed.current = elapsed;
    }

    if (ref.current) {
      setStartWidth(ref.current.clientWidth);
    }
  }, [active, slideShowActive, cleanupTimer]);

  /**
   * Resumes the slideshow if conditions are met
   */
  const tryResume = useCallback(() => {
    if (!active || !slideShowActive || !slideItemDuration) {
      return;
    }

    const remainingInterval = slideItemDuration - slideShowElapsed.current;
    if (remainingInterval > 0) {
      setPaused(false);
      setupTimer(remainingInterval);
    }
  }, [active, slideShowActive, slideItemDuration, setupTimer]);

  // Cleanup effect when slideShowActive changes or component unmounts
  useEffect(() => {
    if (!slideShowActive) {
      cleanupTimer();
    }
    return cleanupTimer;
  }, [slideShowActive, cleanupTimer]);

  // Cleanup effect when active state changes
  useEffect(() => {
    if (!active) {
      cleanupTimer();
    }
    return () => {
      // Cleanup when component unmounts or dependencies change
      cleanupTimer();
    };
  }, [active, cleanupTimer]);

  return {
    paused,
    remainInterval,
    setStartWidth,
    setupTimer,
    startWidth,
    tryPause,
    tryResume,
  };
};

export { useSlideshow };
