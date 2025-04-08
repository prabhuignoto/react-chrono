import { useCallback, useEffect, useState } from 'react';
import { MediaState } from '../models/TimelineMediaModel';

interface UseMediaStateProps {
  slideShowActive: boolean;
  paused: boolean;
  id?: string;
  onElapsed?: (id: string) => void;
}

export const useMediaState = ({
  slideShowActive,
  paused,
  id,
  onElapsed,
}: UseMediaStateProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMediaState = useCallback(
    (state: MediaState) => {
      if (!slideShowActive) return;

      setIsPlaying(state.playing ?? false);

      if (state.paused && paused && id && onElapsed) {
        onElapsed(id);
      }
    },
    [slideShowActive, paused, id, onElapsed],
  );

  useEffect(() => {
    return () => setIsPlaying(false);
  }, []);

  return {
    isPlaying,
    handleMediaState,
  };
};
