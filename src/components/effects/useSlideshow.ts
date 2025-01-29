import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

/**
 * Custom hook that manages slideshow, pausing, and resuming logic.
 */
const useSlideshow = (
  ref: RefObject<HTMLElement>,
  active: boolean,
  slideShowActive: boolean,
  slideItemDuration: number,
  id: string,
  onElapsed?: (id: string) => void,
) => {
  const startTime = useRef<Date | null>(null);
  const timerRef = useRef(0);
  const [startWidth, setStartWidth] = useState(0);
  const [paused, setPaused] = useState(false);
  const slideShowElapsed = useRef(0);
  const [remainInterval, setRemainInterval] = useState(0);

  /**
   * Handles timer completion and triggers onElapsed.
   */
  const handleTimerCompletion = useCallback(() => {
    window.clearTimeout(timerRef.current);
    setPaused(true);
    setStartWidth(0);
    setRemainInterval(slideItemDuration);
    id && onElapsed?.(id);
  }, [id, onElapsed, slideItemDuration]);

  /**
   * Sets up the slideshow timer.
   */
  const setupTimer = useCallback(
    (interval: number) => {
      if (!slideItemDuration) {
        return;
      }

      setRemainInterval(interval);
      startTime.current = new Date();
      setPaused(false);

      timerRef.current = window.setTimeout(() => {
        handleTimerCompletion();
      }, interval);
    },
    [handleTimerCompletion, slideItemDuration],
  );

  /**
   * Pauses the slideshow.
   */
  const tryPause = useCallback(() => {
    if (active && slideShowActive) {
      window.clearTimeout(timerRef.current);
      setPaused(true);

      if (startTime.current) {
        const elapsed = +new Date() - +startTime.current;
        slideShowElapsed.current = elapsed;
      }

      if (ref.current) {
        setStartWidth(ref.current.clientWidth);
      }
    }
  }, [active, slideShowActive]);

  /**
   * Resumes the slideshow.
   */
  const tryResume = useCallback(() => {
    if (active && slideShowActive) {
      if (!slideItemDuration) {
        return;
      }

      const remainingInterval = slideItemDuration - slideShowElapsed.current;
      setPaused(false);

      if (remainingInterval > 0) {
        setupTimer(remainingInterval);
      }
    }
  }, [active, slideShowActive, slideItemDuration, setupTimer]);

  useEffect(() => {
    if (timerRef.current && !slideShowActive) {
      window.clearTimeout(timerRef.current);
    }
  }, [slideShowActive]);

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
