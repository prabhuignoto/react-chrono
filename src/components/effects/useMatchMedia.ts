import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

/**
 * Configuration options for the useMatchMedia hook
 */
interface MatchMediaOptions {
  /** Callback function to execute when media query matches */
  onMatch?: () => void;
  /** Whether the hook is enabled */
  enabled?: boolean;
  /** Debounce delay in milliseconds */
  debounceDelay?: number;
}

/**
 * Custom hook that tracks if a media query matches and executes a callback on matches
 * 
 * @param query - The media query string to match against
 * @param options - Configuration options
 * @returns Boolean indicating if the media query currently matches
 * 
 * @example
 * ```tsx
 * const isMobile = useMatchMedia('(max-width: 768px)', {
 *   onMatch: () => console.log('Mobile view detected'),
 *   debounceDelay: 200
 * });
 * ```
 */
export const useMatchMedia = (
  query: string,
  {
    onMatch,
    enabled = true,
    debounceDelay = 100
  }: MatchMediaOptions = {}
): boolean => {
  const [matches, setMatches] = useState<boolean>(false);
  const mediaQuery = useRef<MediaQueryList | null>(null);

  /**
   * Creates and returns a MediaQueryList object
   */
  const createMediaQuery = useCallback((): MediaQueryList | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      return window.matchMedia(query);
    } catch (error) {
      console.error('Error creating media query:', error);
      return null;
    }
  }, [query]);

  const handleMediaChange = useCallback(
    (event: MediaQueryListEvent | MediaQueryList) => {
      setMatches(event.matches);
    },
    []
  );

  const handleResize = useDebouncedCallback(() => {
    if (!mediaQuery.current) return;
    
    const currentMatches = mediaQuery.current.matches;
    if (currentMatches !== matches) {
      setMatches(currentMatches);
    }
  }, debounceDelay, { maxWait: 1000 }); // Add maxWait for better performance

  // Setup media query listener
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      return;
    }

    // Cleanup previous mediaQuery if it exists
    if (mediaQuery.current) {
      mediaQuery.current.removeEventListener('change', handleMediaChange);
    }

    mediaQuery.current = createMediaQuery();
    const currentMedia = mediaQuery.current;

    if (!currentMedia) {
      return;
    }

    // Initial check
    handleMediaChange(currentMedia);

    // Add event listeners
    currentMedia.addEventListener('change', handleMediaChange);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (currentMedia) {
        currentMedia.removeEventListener('change', handleMediaChange);
      }
      window.removeEventListener('resize', handleResize);
      handleResize.cancel(); // Cancel any pending debounced calls
      mediaQuery.current = null; // Clear the ref
    };
  }, [query, enabled, createMediaQuery, handleMediaChange, handleResize]); // Added query dependency

  // Execute callback when matches changes
  useEffect(() => {
    if (matches && onMatch) {
      onMatch();
    }
  }, [matches, onMatch]);

  return matches;
};
