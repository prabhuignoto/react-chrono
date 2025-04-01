/**
 * Creates and returns a MediaQueryList object
 */
export function createMediaQuery(query: string): MediaQueryList | null {
  if (typeof window === 'undefined') return null;

  try {
    return window.matchMedia(query);
  } catch (error) {
    console.error('Error creating media query:', error);
    return null;
  }
}

/**
 * Adds change and resize listeners for the provided media query
 */
export function addMediaListeners(
  currentMedia: MediaQueryList,
  handleMediaChange: (event: MediaQueryListEvent | MediaQueryList) => void,
  handleResize: () => void,
) {
  currentMedia.addEventListener('change', handleMediaChange);
  window.addEventListener('resize', handleResize);
}

/**
 * Removes change and resize listeners
 */
export function removeMediaListeners(
  currentMedia: MediaQueryList | null,
  handleMediaChange: (event: MediaQueryListEvent | MediaQueryList) => void,
  handleResize: () => void,
) {
  if (currentMedia) {
    currentMedia.removeEventListener('change', handleMediaChange);
  }
  window.removeEventListener('resize', handleResize);
}
