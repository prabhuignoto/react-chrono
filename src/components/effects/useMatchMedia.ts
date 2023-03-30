// generate  a effect for useMatchMedia

import { useEffect, useState } from 'react';

export const useMatchMedia = (query: string, cb: () => void) => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
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
  }, [query, matches]);

  useEffect(() => {
    if (matches) {
      cb?.();
    }
  }, [matches]);

  return matches;
};
