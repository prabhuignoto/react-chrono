import { MediaState } from '@models/TimelineMediaModel';
import { useState, useCallback } from 'react';

interface UseMediaLoadResult {
  loadFailed: boolean;
  mediaLoaded: boolean;
  handleMediaLoaded: () => void;
  handleError: () => void;
}

/**
 * Custom hook to handle media loading state and error handling
 *
 * @param id - The ID of the media element
 * @param onMediaStateChange - Callback to notify parent component of media state changes
 * @returns Object with loading state and handler functions
 */
export const useMediaLoad = (
  id: string,
  onMediaStateChange: (state: MediaState) => void,
): UseMediaLoadResult => {
  const [loadFailed, setLoadFailed] = useState(false);
  const [mediaLoaded, setMediaLoaded] = useState(false);

  // This function will be invoked when the user has finished loading media
  const handleMediaLoaded = useCallback(() => {
    setMediaLoaded(true);
  }, []);

  // This function handles errors when loading media
  const handleError = useCallback(() => {
    setLoadFailed(true);
    onMediaStateChange({
      id,
      paused: false,
      playing: false,
    });
  }, [onMediaStateChange, id]);

  return {
    loadFailed,
    mediaLoaded,
    handleMediaLoaded,
    handleError,
  };
};
