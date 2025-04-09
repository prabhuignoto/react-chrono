import { useCallback, useRef, useState } from 'react';
import { MediaState } from '@models/TimelineMediaModel';

export const useMediaState = (
  id: string,
  onMediaStateChange: (state: MediaState) => void,
) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [expandDetails, setExpandDetails] = useState(false);
  const [showText, setShowText] = useState(true);

  const handlePlay = useCallback(() => {
    onMediaStateChange({
      id,
      paused: false,
      playing: true,
    });
  }, [id, onMediaStateChange]);

  const handlePause = useCallback(() => {
    onMediaStateChange({
      id,
      paused: true,
      playing: false,
    });
  }, [id, onMediaStateChange]);

  const handleEnded = useCallback(() => {
    onMediaStateChange({
      id,
      paused: false,
      playing: false,
    });
  }, [id, onMediaStateChange]);

  const toggleExpand = useCallback(() => {
    setExpandDetails((prev) => !prev);
    setShowText(true);
  }, []);

  const toggleText = useCallback(() => {
    setExpandDetails(false);
    setShowText((prev) => !prev);
  }, []);

  return {
    videoRef,
    expandDetails,
    showText,
    handlePlay,
    handlePause,
    handleEnded,
    toggleExpand,
    toggleText,
  };
};
