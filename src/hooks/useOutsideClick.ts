import { RefObject, useEffect, useCallback, useRef } from 'react';

interface UseOutsideClickOptions {
  eventType?: 'click' | 'mousedown' | 'touchstart';
  enabled?: boolean;
}

/**
 * Hook that triggers callback when clicking outside a referenced element
 * Optimized for performance with better event handling
 */
export default function useOutsideClick(
  el: RefObject<HTMLElement | null>,
  callback: () => void,
  options: UseOutsideClickOptions = {},
) {
  const { eventType = 'click', enabled = true } = options;
  const savedCallback = useRef(callback);
  const lastEnabled = useRef(enabled);

  // Update callback reference without causing re-renders
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const handleClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      // Early return for better performance
      if (!lastEnabled.current) return;

      const element = el.current;
      if (element && !element.contains(e.target as Node)) {
        e.preventDefault();
        savedCallback.current();
      }
    },
    [el],
  );

  useEffect(() => {
    lastEnabled.current = enabled;

    if (!enabled) return;

    // Use passive listeners for touch events for better scroll performance
    const options = eventType === 'touchstart' ? { passive: false } : undefined;
    document.addEventListener(eventType, handleClick, options);

    return () => {
      document.removeEventListener(eventType, handleClick);
    };
  }, [eventType, handleClick, enabled]);
}
