import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

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

  const setupTimer = useCallback((interval: number) => {
    if (!slideItemDuration) {
      return;
    }

    setRemainInterval(interval);

    startTime.current = new Date();

    setPaused(false);

    timerRef.current = window.setTimeout(() => {
      // clear the timer and move to the next card
      window.clearTimeout(timerRef.current);
      setPaused(true);
      setStartWidth(0);
      setRemainInterval(slideItemDuration);
      id && onElapsed?.(id);
    }, interval);
  }, []);

  const tryPause = useCallback(() => {
    if (active && slideShowActive) {
      window.clearTimeout(timerRef.current);
      setPaused(true);

      if (startTime.current) {
        const elapsed: any = +new Date() - +startTime.current;
        slideShowElapsed.current = elapsed;
      }

      if (ref.current) {
        setStartWidth(ref.current.clientWidth);
      }
    }
  }, [active, slideShowActive]);

  // resumes the slide show
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
  }, [active, slideShowActive, slideItemDuration]);

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
