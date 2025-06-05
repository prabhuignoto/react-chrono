import { useEffect, useCallback, useRef } from 'react';

interface UseEscapeKeyOptions {
  enabled?: boolean;
  key?: string;
  keyCode?: number;
  eventType?: 'keyup' | 'keydown' | 'keypress';
}

/**
 * Hook that triggers callback on escape key press
 * Optimized for performance with better event handling
 */
export default function useEscapeKey(
  callback: () => void,
  options: UseEscapeKeyOptions = {},
) {
  const {
    enabled = true,
    key = 'Escape',
    keyCode = 27,
    eventType = 'keyup',
  } = options;

  const savedCallback = useRef(callback);
  const lastEnabled = useRef(enabled);

  // Update callback reference without causing re-renders
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      // Early return for better performance
      if (!lastEnabled.current) return;
      
      // Prefer modern 'key' property over deprecated keyCode
      if (e.key === key || (e.key === undefined && e.keyCode === keyCode)) {
        e.preventDefault();
        savedCallback.current();
      }
    },
    [key, keyCode],
  );

  useEffect(() => {
    lastEnabled.current = enabled;
    
    if (!enabled) return;

    // Use passive listeners where possible for better scroll performance
    const options = eventType === 'keyup' ? { passive: false } : undefined;
    document.addEventListener(eventType, handleKey, options);
    
    return () => {
      document.removeEventListener(eventType, handleKey);
    };
  }, [eventType, handleKey, enabled]);
}
