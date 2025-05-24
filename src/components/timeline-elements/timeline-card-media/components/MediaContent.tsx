import { MediaState } from '@models/TimelineMediaModel';
import { TimelineMode } from '@models/TimelineModel';
import React, { memo } from 'react';
import { LazyErrorMessage } from './ErrorMessage';
import { VideoPlayer } from './VideoPlayer';
import { YoutubePlayer } from './YoutubePlayer';
import { ImageDisplay } from './ImageDisplay';

interface MediaContentProps {
  media: {
    type: string;
    source: {
      url: string;
    };
    name?: string;
  };
  isYouTube: boolean;
  loadFailed: boolean;
  mediaLoaded: boolean;
  active: boolean;
  id: string;
  mediaHeight: number;
  mode: TimelineMode;
  borderLessCards: boolean;
  mediaSettings: any;
  handleMediaLoaded: () => void;
  handleError: () => void;
  onMediaStateChange: (state: MediaState) => void;
}

/**
 * Renders the appropriate media content based on type (video, YouTube, image)
 */
export const MediaContent = memo(
  ({
    media,
    isYouTube,
    loadFailed,
    mediaLoaded,
    active,
    id,
    mediaHeight,
    mode,
    borderLessCards,
    mediaSettings,
    handleMediaLoaded,
    handleError,
    onMediaStateChange,
  }: MediaContentProps) => {
    if (media.type === 'VIDEO') {
      if (isYouTube) {
        return (
          <YoutubePlayer
            url={media.source.url}
            active={active}
            name={media.name || ''}
          />
        );
      }

      return loadFailed ? (
        <LazyErrorMessage message="Failed to load the video" />
      ) : (
        <VideoPlayer
          url={media.source.url}
          active={active}
          id={id}
          name={media.name || ''}
          onMediaStateChange={onMediaStateChange}
          handleMediaLoaded={handleMediaLoaded}
          handleError={handleError}
        />
      );
    }

    if (media.type === 'IMAGE') {
      return loadFailed ? (
        <LazyErrorMessage message="Failed to load the image." />
      ) : (
        <ImageDisplay
          url={media.source.url}
          name={media.name || ''}
          mode={mode}
          mediaLoaded={mediaLoaded}
          borderLessCards={borderLessCards}
          mediaHeight={mediaHeight}
          imageFit={mediaSettings?.fit}
          handleMediaLoaded={handleMediaLoaded}
          handleError={handleError}
        />
      );
    }

    return null;
  },
);
