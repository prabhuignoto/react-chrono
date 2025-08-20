import React, { memo } from 'react';
import {
  cardImage,
  imageHidden,
  imageRounded,
  imageVisible,
  imageWrapper,
} from '../timeline-card-media.css';
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
    <div className={imageWrapper} style={{ height: mediaHeight }}>
      <img
        className={[
          cardImage,
          mediaLoaded ? imageVisible : imageHidden,
          borderLessCards ? imageRounded : undefined,
        ]
          .filter(Boolean)
          .join(' ')}
        src={url}
        onLoad={handleMediaLoaded}
        onError={handleError}
        alt={name}
        loading="lazy"
        data-testid="timeline-card-content-image"
        width="100%"
        height="auto"
        style={{
          objectFit: (imageFit as React.CSSProperties['objectFit']) ?? 'cover',
        }}
      />
    </div>
  ),
);
