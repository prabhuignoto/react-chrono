import { useState, useEffect, useCallback } from 'react';

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

  const handleResize = useCallback(() => {
    let timeoutId: number | null = null;
    let frameId: number | null = null;

    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const debouncedUpdate = () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      timeoutId = window.setTimeout(() => {
        frameId = window.requestAnimationFrame(updateSize);
      }, debounceMs);
    };

    debouncedUpdate();

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [debounceMs]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return windowSize;
};
