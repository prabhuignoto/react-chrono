import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

interface WindowSize {
  width: number;
  height: number;
  innerWidth: number;
  innerHeight: number;
  outerWidth: number;
  outerHeight: number;
  scrollBarWidth: number;
  scrollBarHeight: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: 'portrait' | 'landscape';
}

interface UseWindowSizeOptions {
  debounceMs?: number;
  enableThrottling?: boolean;
  includeScrollBar?: boolean;
  breakpoints?: {
    mobile?: number;
    tablet?: number;
  };
}

/**
 * Hook that returns the current window dimensions
 * Optimized for performance with better resize handling
 */
export const useWindowSize = (
  options: UseWindowSizeOptions = {},
): WindowSize => {
  const {
    debounceMs = 100,
    enableThrottling = true,
    includeScrollBar = false,
    breakpoints = { mobile: 768, tablet: 1024 },
  } = options;

  // Helper to get full window info
  const getWindowInfo = (): WindowSize => {
    if (typeof window === 'undefined') {
      return {
        width: 0,
        height: 0,
        innerWidth: 0,
        innerHeight: 0,
        outerWidth: 0,
        outerHeight: 0,
        scrollBarWidth: 0,
        scrollBarHeight: 0,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        orientation: 'landscape',
      };
    }

    const width = includeScrollBar
      ? window.innerWidth
      : document.documentElement.clientWidth;
    const height = includeScrollBar
      ? window.innerHeight
      : document.documentElement.clientHeight;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const scrollBarHeight =
      window.innerHeight - document.documentElement.clientHeight;

    const mobileBp = breakpoints?.mobile ?? 768;
    const tabletBp = breakpoints?.tablet ?? 1024;
    const isMobile = width < mobileBp;
    const isTablet = width >= mobileBp && width < tabletBp;
    const isDesktop = width >= tabletBp;
    const orientation = width > height ? 'landscape' : 'portrait';

    return {
      width,
      height,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
      scrollBarWidth,
      scrollBarHeight,
      isMobile,
      isTablet,
      isDesktop,
      orientation,
    };
  };

  // Initialize with current window size
  const [windowSize, setWindowSize] = useState<WindowSize>(getWindowInfo);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const frameRef = useRef<number | undefined>(undefined);
  const lastSize = useRef<WindowSize>(windowSize);

  const stableBreakpoints = useMemo(
    () => ({
      mobile: breakpoints?.mobile ?? 768,
      tablet: breakpoints?.tablet ?? 1024,
    }),
    [breakpoints?.mobile, breakpoints?.tablet],
  );

  const updateSize = useCallback(() => {
    const newSize = getWindowInfo();

    // Only update if size actually changed to prevent unnecessary re-renders
    if (
      newSize.width !== lastSize.current.width ||
      newSize.height !== lastSize.current.height ||
      newSize.orientation !== lastSize.current.orientation
    ) {
      lastSize.current = newSize;
      setWindowSize(newSize);
    }
  }, [includeScrollBar, stableBreakpoints.mobile, stableBreakpoints.tablet]);

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
