/**
  The useMatchMedia hook takes a media query string, a callback function, and an enabled boolean.
  It returns a boolean indicating if the media query matches the current viewport and executes the callback if it does.
**/

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

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => {
      setMatches(media.matches);
    };

    media.addEventListener('change', listener);

    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query, matches, enabled]);

  useEffect(() => {
    if (matches) {
      cb?.();
    }
  }, [matches]);

  return matches;
};
