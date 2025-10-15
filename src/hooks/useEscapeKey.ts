import { useEffect, useCallback, useRef } from 'react';
import { useStableCallback } from './utils';

interface UseKeyHandlerOptions {
  enabled?: boolean;
  keys?: string | string[];
  keyCodes?: number | number[];
  eventType?: 'keyup' | 'keydown' | 'keypress';
  preventDefault?: boolean;
  stopPropagation?: boolean;
  metaKey?: boolean;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
}

/**
 * Hook that triggers callback on specific key press(es)
 * Supports multiple keys and key combinations
 * @param callback - Function to call when key(s) are pressed
 * @param options - Configuration options
 */
export function useKeyHandler(
  callback: (event: KeyboardEvent) => void,
  options: UseKeyHandlerOptions = {},
) {
  const {
    enabled = true,
    keys = 'Escape',
    keyCodes = 27,
    eventType = 'keyup',
    preventDefault = true,
    stopPropagation = false,
    metaKey = false,
    ctrlKey = false,
    altKey = false,
    shiftKey = false,
  } = options;

  const stableCallback = useStableCallback(callback);
  const lastEnabled = useRef(enabled);

  // Normalize keys and keyCodes to arrays
  const keyArray = Array.isArray(keys) ? keys : [keys];
  const keyCodeArray = Array.isArray(keyCodes) ? keyCodes : [keyCodes];

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      // Early return for better performance
      if (!lastEnabled.current) return;

      // Check modifier keys
      if (metaKey && !e.metaKey) return;
      if (ctrlKey && !e.ctrlKey) return;
      if (altKey && !e.altKey) return;
      if (shiftKey && !e.shiftKey) return;

      // Check if the pressed key matches any of the target keys
      const keyMatch = keyArray.includes(e.key);
      const keyCodeMatch =
        e.key === undefined && keyCodeArray.includes(e.keyCode);

      if (keyMatch || keyCodeMatch) {
        if (preventDefault) e.preventDefault();
        if (stopPropagation) e.stopPropagation();
        stableCallback(e);
      }
    },
    [
      keyArray,
      keyCodeArray,
      preventDefault,
      stopPropagation,
      metaKey,
      ctrlKey,
      altKey,
      shiftKey,
      stableCallback,
    ],
  );

  useEffect(() => {
    lastEnabled.current = enabled;

    if (!enabled) return;

    // Use passive listeners where possible for better scroll performance
    const listenerOptions =
      preventDefault || stopPropagation
        ? { passive: false }
        : { passive: true };

    document.addEventListener(eventType, handleKey, listenerOptions);

    return () => {
      document.removeEventListener(eventType, handleKey);
    };
  }, [eventType, handleKey, enabled, preventDefault, stopPropagation]);
}

/**
 * Legacy hook for backward compatibility
 * @deprecated Use useKeyHandler instead
 */
export default function useEscapeKey(
  callback: () => void,
  options: UseKeyHandlerOptions = {},
) {
  useKeyHandler(() => callback(), options);
}
