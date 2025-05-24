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
    keyCode,
    eventType = 'keyup',
  } = options;

  // Track if key was explicitly provided
  const keyExplicitlyProvided = 'key' in options;

  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      // Prefer e.key if available, otherwise use e.code (less specific but better than keyCode)
      const pressedKey = e.key || e.code;

      const keyMatches = pressedKey === key;
      const keyCodeMatches = keyCode !== undefined && e.keyCode === keyCode; // Keep for legacy keyCode prop if provided

      // Determine if we should trigger based on what options are provided
      let shouldTrigger = false;

      if (keyCode !== undefined && !keyExplicitlyProvided) {
        // Only keyCode provided (legacy), use keyCode match
        shouldTrigger = keyCodeMatches;
      } else if (keyCode !== undefined && keyExplicitlyProvided) {
        // Both key and keyCode provided, key takes precedence, keyCode as fallback
        shouldTrigger = keyMatches || keyCodeMatches;
      } else {
        // Only key provided (or default), use key match
        shouldTrigger = keyMatches;
      }

      if (shouldTrigger) {
        savedCallback.current();
      }
    },
    [enabled, key, keyCode, keyExplicitlyProvided],
  );

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener(eventType, handleKey);
    return () => {
      document.removeEventListener(eventType, handleKey);
    };
  }, [eventType, handleKey, enabled]);
}
