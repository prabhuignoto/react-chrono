/**
 * Media query utility functions for handling responsive behaviors
 */

/**
 * Creates and returns a MediaQueryList object
 * @param query - CSS media query string (e.g. '(max-width: 768px)')
 * @returns MediaQueryList object or null if browser doesn't support matchMedia
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
 * @param currentMedia - MediaQueryList object to attach listeners to
 * @param handleMediaChange - Callback function for media query changes
 * @param handleResize - Callback function for window resize events
 */
export function addMediaListeners(
  currentMedia: MediaQueryList | null,
  handleMediaChange: (event: MediaQueryListEvent | MediaQueryList) => void,
  handleResize: () => void,
): void {
  if (!currentMedia || typeof window === 'undefined') return;

  try {
    currentMedia.addEventListener('change', handleMediaChange);
    window.addEventListener('resize', handleResize);
  } catch (error) {
    console.error('Error adding media listeners:', error);
  }
}

/**
 * Removes change and resize listeners to prevent memory leaks
 * @param currentMedia - MediaQueryList object to detach listeners from
 * @param handleMediaChange - Callback function to remove from media query changes
 * @param handleResize - Callback function to remove from window resize events
 */
export function removeMediaListeners(
  currentMedia: MediaQueryList | null,
  handleMediaChange: (event: MediaQueryListEvent | MediaQueryList) => void,
  handleResize: () => void,
): void {
  if (typeof window === 'undefined') return;

  try {
    if (currentMedia) {
      currentMedia.removeEventListener('change', handleMediaChange);
    }
    window.removeEventListener('resize', handleResize);
  } catch (error) {
    console.error('Error removing media listeners:', error);
  }
}
