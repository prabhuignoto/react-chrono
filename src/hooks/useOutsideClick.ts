import { RefObject, useEffect, useCallback, useRef } from 'react';
import { useStableCallback } from './utils';

interface UseOutsideClickOptions {
  eventType?: 'click' | 'mousedown' | 'touchstart';
  enabled?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  excludeRefs?: RefObject<HTMLElement | null>[];
}

/**
 * Hook that triggers callback when clicking outside referenced element(s)
 * @param el - The element ref(s) to check clicks outside of
 * @param callback - Function to call when clicking outside
 * @param options - Configuration options
 */
export default function useOutsideClick(
  el: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  callback: () => void,
  options: UseOutsideClickOptions = {},
) {
  const { 
    eventType = 'click', 
    enabled = true,
    preventDefault = false,
    stopPropagation = false,
    excludeRefs = []
  } = options;
  
  const stableCallback = useStableCallback(callback);
  const lastEnabled = useRef(enabled);

  // Normalize refs to array
  const refs = Array.isArray(el) ? el : [el];
  const allRefs = [...refs, ...excludeRefs];

  const handleClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      // Early return for better performance
      if (!lastEnabled.current) return;

      const target = e.target as Node;
      
      // Check if click is inside any of the refs
      const isInsideAnyRef = allRefs.some(ref => {
        const element = ref.current;
        return element && element.contains(target);
      });

      if (!isInsideAnyRef) {
        if (preventDefault) e.preventDefault();
        if (stopPropagation) e.stopPropagation();
        stableCallback();
      }
    },
    [allRefs, preventDefault, stopPropagation, stableCallback],
  );

  useEffect(() => {
    lastEnabled.current = enabled;

    if (!enabled) return;

    // Use passive listeners where possible for better scroll performance
    const listenerOptions = 
      preventDefault || stopPropagation || eventType === 'touchstart'
        ? { passive: false } 
        : { passive: true };
    
    document.addEventListener(eventType, handleClick, listenerOptions);

    return () => {
      document.removeEventListener(eventType, handleClick);
    };
  }, [eventType, handleClick, enabled, preventDefault, stopPropagation]);
}
