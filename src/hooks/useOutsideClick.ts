import { RefObject, useEffect, useCallback, useRef } from 'react';

/**
 * Hook that triggers callback when clicking outside a referenced element
 */
export default function useOutsideClick(
  el: RefObject<HTMLElement | null>,
  callback: () => void,
) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const element = el.current;
      if (element && !element.contains(e.target as Node)) {
        savedCallback.current();
      }
    },
    [el],
  );

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);
}
