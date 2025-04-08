import { useEffect, useCallback, useRef } from 'react';

interface UseEscapeKeyOptions {
  enabled?: boolean;
  key?: string;
  keyCode?: number;
  eventType?: 'keyup' | 'keydown' | 'keypress';
}

/**
 * Hook that triggers callback on escape key press
 */
export default function useEscapeKey(
  callback: () => void,
  options: UseEscapeKeyOptions = {},
) {
  const { 
    enabled = true,
    key = 'Escape',
    keyCode = 27,
    eventType = 'keyup'
  } = options;
  
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (!enabled) return;
    
    if (e.key === key || e.keyCode === keyCode) {
      savedCallback.current();
    }
  }, [enabled, key, keyCode]);

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener(eventType, handleKey);
    return () => {
      document.removeEventListener(eventType, handleKey);
    };
  }, [eventType, handleKey, enabled]);
}
