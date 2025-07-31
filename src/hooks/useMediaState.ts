import { useCallback, useEffect, useState, useRef } from 'react';
import { MediaState } from '../models/TimelineMediaModel';

interface UseMediaStateProps {
  slideShowActive: boolean;
  paused: boolean;
  id?: string;
  onElapsed?: (id: string) => void;
}

interface UseMediaStateReturn {
  isPlaying: boolean;
  handleMediaState: (state: MediaState) => void;
  cleanup: () => void;
}

export const useMediaState = ({
  slideShowActive,
  paused,
  id,
  onElapsed,
}: UseMediaStateProps): UseMediaStateReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const onElapsedRef = useRef(onElapsed);

  // Keep callback ref updated without triggering re-renders
  useEffect(() => {
    onElapsedRef.current = onElapsed;
  }, [onElapsed]);

  const handleMediaState = useCallback(
    (state: MediaState) => {
      // Early return for inactive slideshow
      if (!slideShowActive) {
        setIsPlaying((prevIsPlaying) => {
          if (prevIsPlaying) return false;
          return prevIsPlaying;
        });
        return;
      }

      // Batch state updates when possible
      const shouldSetPlaying = state.playing ?? false;
      setIsPlaying((prevIsPlaying) => {
        if (prevIsPlaying !== shouldSetPlaying) {
          return shouldSetPlaying;
        }
        return prevIsPlaying;
      });

      // Handle elapsed callback with stable reference
      if (state.paused && paused && id && onElapsedRef.current) {
        onElapsedRef.current(id);
      }
    },
    [slideShowActive, paused, id],
  );

  const cleanup = useCallback(() => {
    setIsPlaying(false);
  }, []);

  // Clean up on unmount
  useEffect(() => cleanup, [cleanup]);

  return {
    isPlaying,
    handleMediaState,
    cleanup,
  };
};
