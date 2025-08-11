import { useCallback, useRef, useEffect, MutableRefObject } from 'react';

/**
 * Hook that provides a stable callback reference that always calls the latest version
 * @param callback - The callback function
 * @returns A stable callback reference
 */
export const useStableCallback = <T extends (...args: any[]) => any>(
  callback: T,
): T => {
  const ref = useRef(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  return useCallback((...args: Parameters<T>) => ref.current(...args), []) as T;
};

/**
 * Hook that provides a stable ref that updates without causing re-renders
 * @param value - The value to store in the ref
 * @returns A ref containing the latest value
 */
export const useLatestRef = <T>(value: T): MutableRefObject<T> => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref;
};

/**
 * Hook that runs a cleanup function on unmount
 * @param cleanup - The cleanup function to run
 */
export const useUnmount = (cleanup: () => void): void => {
  const cleanupRef = useRef(cleanup);

  useEffect(() => {
    cleanupRef.current = cleanup;
  }, [cleanup]);

  useEffect(() => {
    return () => {
      cleanupRef.current();
    };
  }, []);
};

/**
 * Hook that provides RAF-based throttling
 * @param callback - The callback to throttle
 * @returns Throttled callback
 */
export const useRAFThrottle = <T extends (...args: any[]) => void>(
  callback: T,
): T => {
  const frameRef = useRef<number | undefined>(undefined);
  const argsRef = useRef<any[] | undefined>(undefined);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const throttled = useCallback((...args: Parameters<T>) => {
    argsRef.current = args;

    if (frameRef.current) return;

    frameRef.current = requestAnimationFrame(() => {
      if (argsRef.current) {
        callbackRef.current(...argsRef.current);
      }
      frameRef.current = undefined;
    });
  }, []) as T;

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return throttled;
};

/**
 * Color format detection utilities
 */
export const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
export const RGB_COLOR_REGEX = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/;
export const RGBA_COLOR_REGEX =
  /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)$/;
export const HSL_COLOR_REGEX = /^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)$/;
export const HSLA_COLOR_REGEX =
  /^hsla\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([\d.]+)\s*\)$/;

export type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'unknown';

export const detectColorFormat = (color: string): ColorFormat => {
  if (HEX_COLOR_REGEX.test(color)) return 'hex';
  if (RGB_COLOR_REGEX.test(color)) return 'rgb';
  if (RGBA_COLOR_REGEX.test(color)) return 'rgba';
  if (HSL_COLOR_REGEX.test(color)) return 'hsl';
  if (HSLA_COLOR_REGEX.test(color)) return 'hsla';
  return 'unknown';
};

/**
 * Adjusts RGB color opacity
 */
export const adjustRGBOpacity = (color: string, opacity: number): string => {
  const match = RGB_COLOR_REGEX.exec(color) || RGBA_COLOR_REGEX.exec(color);
  if (!match) return '';

  const [, r, g, b] = match;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Adjusts HSL color opacity
 */
export const adjustHSLOpacity = (color: string, opacity: number): string => {
  const match = HSL_COLOR_REGEX.exec(color) || HSLA_COLOR_REGEX.exec(color);
  if (!match) return '';

  const [, h, s, l] = match;
  return `hsla(${h}, ${s}%, ${l}%, ${opacity})`;
};
