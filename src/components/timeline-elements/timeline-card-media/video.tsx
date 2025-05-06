import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  children: React.ReactNode;
}

const VideoElement = styled.video`
  width: 100%;
  height: auto;
  display: block;
`;

/**
 * Accessible Video component
 * Wraps the native video element with improved accessibility features
 */
const Video: React.FC<VideoProps> = ({
  children,
  autoPlay,
  muted,
  controls = true,
  onEnded,
  playsInline = true,
  ...rest
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure video is properly muted when needed
  useEffect(() => {
    if (videoRef.current && autoPlay) {
      videoRef.current.muted = true;
    }
  }, [autoPlay]);

  return (
    <VideoElement
      ref={videoRef}
      autoPlay={autoPlay}
      muted={muted}
      controls={controls}
      onEnded={onEnded}
      playsInline={playsInline}
      preload="metadata"
      aria-label="Timeline media"
      {...rest}
    >
      {children}
    </VideoElement>
  );
};

export default Video;
