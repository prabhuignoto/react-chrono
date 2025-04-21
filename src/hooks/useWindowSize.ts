import { useState, useEffect, useCallback, useRef } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

interface UseWindowSizeOptions {
  debounceMs?: number;
}

/**
 * Hook that returns the current window dimensions
 * Useful for responsive calculations and virtualization
 */
export const useWindowSize = (
  options: UseWindowSizeOptions = {},
): WindowSize => {
  const { debounceMs = 100 } = options;
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const timeoutRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  const handleResize = useCallback(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const debouncedUpdate = () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        frameRef.current = window.requestAnimationFrame(updateSize);
      }, debounceMs);
    };

    debouncedUpdate();
  }, [debounceMs]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [handleResize]);

  return windowSize;
};
