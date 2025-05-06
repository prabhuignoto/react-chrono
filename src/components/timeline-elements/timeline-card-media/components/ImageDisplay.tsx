import React, { memo } from 'react';
import { CardImage, ImageWrapper } from '../timeline-card-media.styles';
import { TimelineMode } from '@models/TimelineModel';

interface ImageDisplayProps {
  url: string;
  name: string;
  mode: TimelineMode;
  mediaLoaded: boolean;
  borderLessCards: boolean;
  mediaHeight: number;
  imageFit?: string;
  handleMediaLoaded: () => void;
  handleError: () => void;
}

/**
 * Renders an image with appropriate loading and error handling
 */
export const ImageDisplay = memo(
  ({
    url,
    name,
    mode,
    mediaLoaded,
    borderLessCards,
    mediaHeight,
    imageFit,
    handleMediaLoaded,
    handleError,
  }: ImageDisplayProps) => (
    <ImageWrapper height={mediaHeight}>
      <CardImage
        src={url}
        mode={mode}
        onLoad={handleMediaLoaded}
        onError={handleError}
        $visible={mediaLoaded}
        alt={name}
        loading="lazy"
        $enableBorderRadius={borderLessCards}
        fit={imageFit}
        data-testid="timeline-card-content-image"
        width="100%"
        height="auto"
      />
    </ImageWrapper>
  ),
);
