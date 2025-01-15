import { RefObject, useCallback, useEffect, useRef } from 'react';

export default function useCloseClickOutside(
  el: RefObject<HTMLDivElement>,
  callback: () => void,
) {
  const htmlElement = useRef<HTMLElement>(null);

  const handleClick = useCallback((e: MouseEvent) => {
    const element = htmlElement.current;

    if (element) {
      if (!element.contains(e.target as Node)) {
        callback();
      }
    }
  }, []);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      callback();
    }
  }, []);

  useEffect(() => {
    const element = el.current;

    if (element) {
      htmlElement.current = element;

      element.addEventListener('keyup', handleEscape);
    }
  }, [el, callback]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      const element = htmlElement.current;
      if (element) {
        element.removeEventListener('keyup', handleEscape);
      }
      document.removeEventListener('click', handleClick);
    };
  }, []);
}
