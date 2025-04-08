import { RefObject, useEffect, useCallback, useRef } from 'react';

interface UseOutsideClickOptions {
  eventType?: 'click' | 'mousedown' | 'touchstart';
  enabled?: boolean;
}

/**
 * Hook that triggers callback when clicking outside a referenced element
 */
export default function useOutsideClick(
  el: RefObject<HTMLElement | null>,
  callback: () => void,
  options: UseOutsideClickOptions = {},
) {
  const { eventType = 'click', enabled = true } = options;
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const handleClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!enabled) return;
      
      const element = el.current;
      if (element && !element.contains(e.target as Node)) {
        savedCallback.current();
      }
    },
    [el, enabled],
  );

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener(eventType, handleClick);
    return () => {
      document.removeEventListener(eventType, handleClick);
    };
  }, [eventType, handleClick, enabled]);
}
