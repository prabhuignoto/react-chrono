import { RefObject, useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook that handles click outside and escape key events
 * @param el - Reference to the DOM element to watch for outside clicks
 * @param callback - Function to call when a click outside or escape key is detected
 */
export default function useCloseClickOutside(
  el: RefObject<HTMLElement | null>,
  callback: () => void,
) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const handleClick = useCallback((e: MouseEvent) => {
    const element = el.current;
    if (element && !element.contains(e.target as Node)) {
      savedCallback.current();
    }
  }, [el]);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      savedCallback.current();
    }
  }, []);

  useEffect(() => {
    const element = el.current;
    if (!element) return;

    document.addEventListener('click', handleClick);
    element.addEventListener('keyup', handleEscape);

    return () => {
      document.removeEventListener('click', handleClick);
      element.removeEventListener('keyup', handleEscape);
    };
  }, [el, handleClick, handleEscape]);
}
