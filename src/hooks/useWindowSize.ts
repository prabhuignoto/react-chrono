import { useState, useEffect, useCallback, useRef } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

interface UseWindowSizeOptions {
  debounceMs?: number;
  enableThrottling?: boolean;
}

/**
 * Hook that returns the current window dimensions
 * Optimized for performance with better resize handling
 */
export const useWindowSize = (
  options: UseWindowSizeOptions = {},
): WindowSize => {
  const { debounceMs = 100, enableThrottling = true } = options;
  
  // Initialize with current window size or fallback
  const [windowSize, setWindowSize] = useState<WindowSize>(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  }));

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const frameRef = useRef<number | undefined>(undefined);
  const lastSize = useRef<WindowSize>(windowSize);

  const updateSize = useCallback(() => {
    const newSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Only update if size actually changed to prevent unnecessary re-renders
    if (
      newSize.width !== lastSize.current.width ||
      newSize.height !== lastSize.current.height
    ) {
      lastSize.current = newSize;
      setWindowSize(newSize);
    }
  }, []);

  const handleResize = useCallback(() => {
    // Clear existing timeouts and frames
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    if (!enableThrottling) {
      // Immediate update without throttling
      frameRef.current = requestAnimationFrame(updateSize);
      return;
    }

    // Use debounced approach for better performance
    timeoutRef.current = setTimeout(() => {
      frameRef.current = requestAnimationFrame(updateSize);
    }, debounceMs);
  }, [debounceMs, enableThrottling, updateSize]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Use passive listener for better scroll performance
    const options = { passive: true };
    window.addEventListener('resize', handleResize, options);

    // Initial measurement
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [handleResize]);

  return windowSize;
};
