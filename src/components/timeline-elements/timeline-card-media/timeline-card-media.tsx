import React, { useCallback, useEffect, useRef, useState } from "react";
import { CardMediaModel } from "../../../models/TimelineItemMedia";
import { MemoContentText, MemoTitle } from "../memoized";
import {
  CardImage,
  CardVideo,
  ErrorMessage,
  MediaDetailsWrapper,
  MediaWrapper,
} from "./timeline-card-media.styles";

/**
 * Component to render video or image
 *
 * @param {*} {
 *   active,
 *   id,
 *   mode,
 *   onMediaStateChange,
 *   theme,
 *   title,
 *   content,
 *   media,
 *   slideshowActive,
 * }
 * @returns
 */
const CardMedia: React.FunctionComponent<CardMediaModel> = ({
  active,
  id,
  mode,
  onMediaStateChange,
  theme,
  title,
  content,
  media,
  slideshowActive,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    if (!videoRef) {
      return;
    }

    if (active) {
      // play the video when active
      videoRef.current?.play();
    } else {
      // pause the video when not active
      videoRef.current?.pause();
    }
  }, [active]);

  const [mediaLoaded, setMediaLoaded] = useState(false);

  const handleMediaLoaded = useCallback(() => {
    setMediaLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setLoadFailed(true);
    onMediaStateChange({
      id,
      paused: false,
      playing: false,
    });
  }, [id, onMediaStateChange]);

  const ErrorMessageMem: React.FunctionComponent<{
    message: string;
  }> = React.memo(({ message }) => <ErrorMessage>{message}</ErrorMessage>);

  return (
    <MediaWrapper
      theme={theme}
      active={active}
      mode={mode}
      slideShowActive={slideshowActive}
    >
      {/* video */}
      {media.type === "VIDEO" &&
        (!loadFailed ? (
          <CardVideo
            controls
            autoPlay={active}
            ref={videoRef}
            onLoadedData={handleMediaLoaded}
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
          >
            <source src={media.source.url}></source>
          </CardVideo>
        ) : (
          <ErrorMessageMem message="Failed to load the video" />
        ))}

      {/* image */}
      {media.type === "IMAGE" &&
        (!loadFailed ? (
          <CardImage
            src={media.source.url}
            mode={mode}
            onLoad={handleMediaLoaded}
            onError={handleError}
            visible={mediaLoaded}
            active={active}
          />
        ) : (
          <ErrorMessageMem message="Failed to load the image." />
        ))}

      {/* details */}
      <MediaDetailsWrapper mode={mode}>
        <MemoTitle title={title} theme={theme} active={active} />
        <MemoContentText content={content} />
      </MediaDetailsWrapper>
    </MediaWrapper>
  );
};

export default CardMedia;
