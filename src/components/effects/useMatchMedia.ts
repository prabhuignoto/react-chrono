/**
 * The useMatchMedia hook takes a media query string, a callback function, and an enabled boolean.
 * It returns a boolean indicating if the media query matches the current viewport and executes the callback if it does.
 *
 * @param {string} query - The media query string to match against.
 * @param {() => void} [cb] - Optional callback function to be executed if the media query matches.
 * @param {boolean} [enabled=true] - Whether the hook is enabled or not.
 * @returns {boolean} - Whether the media query matches the current viewport.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export const useMatchMedia = (
  query: string,
  cb?: () => void,
  enabled = true,
) => {
  const [matches, setMatches] = useState<boolean>(false);

  const media = useRef(window.matchMedia(query));

  const listener = useCallback(
    () => setMatches(media.current.matches),
    [media],
  );

  const onResize = useDebouncedCallback(() => {
    const curMatches = media.current.matches;

    if (curMatches !== matches) {
      setMatches(curMatches);
    }
  }, 100);

  useEffect(() => {
    const currentMedia = media.current;

    if (!enabled || !currentMedia) {
      return;
    }

    const curMacthes = currentMedia.matches;

    // Check initial match and update state if necessary
    if (curMacthes !== matches) {
      setMatches(curMacthes);
    }

    currentMedia.addEventListener('change', listener);

    window.addEventListener('resize', onResize);

    return () => {
      currentMedia.removeEventListener('change', listener);

      window.removeEventListener('resize', onResize);
    };
  }, [query, enabled, media]);

  useEffect(() => {
    if (matches && cb) {
      cb();
    }
  }, [matches, cb]);

  return matches;
};
