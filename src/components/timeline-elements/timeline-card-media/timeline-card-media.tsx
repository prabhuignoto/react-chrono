import React, { useCallback, useEffect, useRef, useState } from "react";
import { Media, MediaState } from "../../../models/TimelineItemMedia";
import { TimelineMode } from "../../../models/TimelineModel";
import { Theme } from "../../../models/TimelineTreeModel";
import { MemoContentText, MemoTitle } from "../memoized";
import {
  CardImage,
  CardVideo,
  ErrorMessage,
  MediaDetailsWrapper,
  MediaWrapper,
} from "./timeline-card-media.styles";

interface CardMediaModel {
  active?: boolean;
  media: Media;
  id?: string;
  mode?: TimelineMode;
  onMediaStateChange: (state: MediaState) => void;
  theme?: Theme;
  title?: string;
  content: string;
}

const CardMedia: React.FunctionComponent<CardMediaModel> = ({
  active,
  id,
  mode,
  onMediaStateChange,
  theme,
  title,
  content,
  media,
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
  }, [onMediaStateChange, id]);

  const ErrorMessageMem: React.FunctionComponent<{
    message: string;
  }> = React.memo(({ message }) => <ErrorMessage>{message}</ErrorMessage>);

  return (
    <MediaWrapper theme={theme} active={active} mode={mode}>
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
      <MediaDetailsWrapper mode={mode}>
        <MemoTitle title={title} theme={theme} active={active} />
        <MemoContentText content={content} />
      </MediaDetailsWrapper>
    </MediaWrapper>
  );
};

export default CardMedia;
