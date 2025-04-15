import React, { memo } from 'react';
import { CardImage, ImageWrapper } from '../timeline-card-media.styles';
import { Media } from '@models/TimelineMediaModel';
import { TimelineMode } from '@models/TimelineModel';

interface ImageDisplayProps {
  media: Media;
  mode: TimelineMode;
  onLoad: () => void;
  onError: (error: Error) => void;
  mediaLoaded: boolean;
  borderLessCards: boolean;
  mediaSettings?: {
    imageFit?: string;
  };
  mediaHeight: number;
}

const ImageDisplay: React.FC<ImageDisplayProps> = memo(
  ({
    media,
    mode,
    onLoad,
    onError,
    mediaLoaded,
    borderLessCards,
    mediaSettings,
    mediaHeight,
  }) => {
    return (
      <ImageWrapper height={mediaHeight}>
        <CardImage
          src={media.source.url}
          mode={mode}
          onLoad={onLoad}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            onError(new Error('Image failed to load'));
          }}
          $visible={mediaLoaded}
          alt={media.name ?? 'Image'}
          loading="lazy"
          $enableBorderRadius={borderLessCards}
          fit={mediaSettings?.imageFit}
          data-testid="timeline-card-content-image"
          width="100%"
          height="auto"
        />
      </ImageWrapper>
    );
  },
);

ImageDisplay.displayName = 'ImageDisplay';

export default ImageDisplay;
