import { RefObject, useEffect, useRef } from 'react';

export default function useCloseClickOutside(
  el: RefObject<HTMLDivElement>,
  callback: () => void,
) {
  const htmlElement = useRef<HTMLElement>();

  const handleClick = (e: MouseEvent) => {
    const element = htmlElement.current;

    if (element) {
      if (!element.contains(e.target as Node)) {
        callback();
      }
    }
  };

  useEffect(() => {
    const element = el.current;

    if (element) {
      htmlElement.current = element;
    }
  }, [el, callback]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}
