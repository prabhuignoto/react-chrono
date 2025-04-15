import React, { memo, SyntheticEvent } from 'react';
import { CardVideo, IFrameVideo } from '../timeline-card-media.styles';
import { isYouTubeUrl, getYouTubeEmbedUrl } from '../utils/mediaUtils';
import { Media } from '@models/TimelineMediaModel';

interface VideoPlayerProps {
  media: Media;
  active: boolean;
  onPlay: () => void;
  onPause: () => void;
  onEnded: () => void;
  onError: (error: Error) => void;
  onLoadedData: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
}

const VideoPlayer: React.FC<VideoPlayerProps> = memo(
  ({
    media,
    active,
    onPlay,
    onPause,
    onEnded,
    onError,
    onLoadedData,
    videoRef,
  }) => {
    const isYouTube = isYouTubeUrl(media.source.url);

    if (isYouTube) {
      return (
        <IFrameVideo
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          src={getYouTubeEmbedUrl(media.source.url, active)}
          title={media.name ?? 'Video'}
          data-testid="timeline-card-content-video"
          loading="lazy"
        />
      );
    }

    return (
      <CardVideo
        controls
        autoPlay={active}
        ref={videoRef}
        onLoadedData={onLoadedData}
        data-testid="rc-video"
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
        onError={(e: SyntheticEvent<HTMLVideoElement, Event>) => {
          // Create an Error object from the event
          const error = new Error('Video playback error');
          onError(error);
        }}
        preload="metadata"
      >
        <source src={media.source.url}></source>
      </CardVideo>
    );
  },
);

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
