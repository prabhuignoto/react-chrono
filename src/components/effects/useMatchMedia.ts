/**
 * The useMatchMedia hook takes a media query string, a callback function, and an enabled boolean.
 * It returns a boolean indicating if the media query matches the current viewport and executes the callback if it does.
 *
 * @param {string} query - The media query string to match against.
 * @param {() => void} [cb] - Optional callback function to be executed if the media query matches.
 * @param {boolean} [enabled=true] - Whether the hook is enabled or not.
 * @returns {boolean} - Whether the media query matches the current viewport.
 */
import { useEffect, useState } from 'react';

export const useMatchMedia = (
  query: string,
  cb?: () => void,
  enabled = true,
) => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    // Check initial match and update state if necessary
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    media.addEventListener('change', listener);

    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query, enabled]);

  useEffect(() => {
    if (matches && cb) {
      cb();
    }
  }, [matches, cb]);

  return matches;
};
