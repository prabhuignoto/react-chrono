import { MediaState } from '@models/TimelineMediaModel';
import React, { memo, useEffect, useRef } from 'react';
import { CardVideo } from '../timeline-card-media.styles';

interface VideoPlayerProps {
  url: string;
  active: boolean;
  id: string;
  name: string;
  onMediaStateChange: (state: MediaState) => void;
  handleMediaLoaded: () => void;
  handleError: () => void;
}

/**
 * Renders a standard video player
 */
export const VideoPlayer = memo(
  ({
    url,
    active,
    id,
    name,
    onMediaStateChange,
    handleMediaLoaded,
    handleError,
  }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      if (!videoRef.current) return;

      if (active) {
        videoRef.current.play().catch(() => {
          // Handle autoplay failure silently
        });
      } else {
        videoRef.current.pause();
      }
    }, [active]);

    return (
      <CardVideo
        controls
        autoPlay={active}
        ref={videoRef}
        onLoadedData={handleMediaLoaded}
        data-testid="rc-video"
        onPlay={() =>
          onMediaStateChange({
            id,
            paused: false,
            playing: true,
          })
        }
        onPause={() =>
          onMediaStateChange({
            id,
            paused: true,
            playing: false,
          })
        }
        onEnded={() =>
          onMediaStateChange({
            id,
            paused: false,
            playing: false,
          })
        }
        onError={handleError}
        preload="metadata"
      >
        <source src={url}></source>
      </CardVideo>
    );
  },
);
