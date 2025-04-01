import { useEffect, useCallback, useRef } from 'react';

/**
 * Hook that triggers callback on escape key press
 */
export default function useEscapeKey(callback: () => void) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      savedCallback.current();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keyup', handleEscape);
    return () => {
      document.removeEventListener('keyup', handleEscape);
    };
  }, [handleEscape]);
}
