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
  const startTime = useRef<Date | null>(null);
  const timerRef = useRef<number>(0);
  const [startWidth, setStartWidth] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  const slideShowElapsed = useRef<number>(0);
  const [remainInterval, setRemainInterval] = useState<number>(0);

  /**
   * Cleans up the current timer
   */
  const cleanupTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = 0;
    }
  }, []);

  /**
   * Sets up a new timer for the slideshow
   * @param interval - Duration in milliseconds for the timer
   */
  const setupTimer = useCallback((interval: number) => {
    if (!slideItemDuration || interval <= 0) {
      return;
    }

    cleanupTimer();
    setRemainInterval(interval);
    startTime.current = new Date();
    setPaused(false);

    timerRef.current = window.setTimeout(() => {
      cleanupTimer();
      setPaused(true);
      setStartWidth(0);
      setRemainInterval(slideItemDuration);
      if (id && onElapsed) {
        onElapsed(id);
      }
    }, interval);
  }, [slideItemDuration, id, onElapsed, cleanupTimer]);

  /**
   * Pauses the current slideshow if conditions are met
   */
  const tryPause = useCallback(() => {
    if (!active || !slideShowActive) {
      return;
    }

    cleanupTimer();
    setPaused(true);

    if (startTime.current) {
      const elapsed = Date.now() - startTime.current.getTime();
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

  // Cleanup effect
  useEffect(() => {
    if (!slideShowActive) {
      cleanupTimer();
    }
    return cleanupTimer;
  }, [slideShowActive, cleanupTimer]);

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
