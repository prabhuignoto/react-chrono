import React, { memo } from 'react';
import { IFrameVideo } from '../timeline-card-media.styles';

interface YoutubePlayerProps {
  url: string;
  active: boolean;
  name: string;
}

/**
 * Renders a YouTube player iframe
 */
export const YoutubePlayer = memo(
  ({ url, active, name }: YoutubePlayerProps) => (
    <IFrameVideo
      style={{ border: 'none' }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      src={`${url}${active ? '?autoplay=1&enablejsapi=1' : '?enablejsapi=1'}`}
      title={name}
      data-testid="timeline-card-content-video"
      loading="lazy"
    />
  ),
);
