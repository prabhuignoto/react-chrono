import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CardMediaModel } from '../../../models/TimelineMediaModel';
import { MemoSubTitle, MemoTitle } from '../memoized';
import {
  CardImage,
  CardVideo,
  ErrorMessage,
  MediaDetailsWrapper,
  MediaWrapper,
} from './timeline-card-media.styles';

interface ErrorMessageModel {
  message: string;
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
  slideshowActive,
  hideMedia = false,
  cardHeight,
}: CardMediaModel) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    if (!videoRef) {
      return;
    }

    if (active) {
      // play the video when active
      videoRef.current && videoRef.current.play();
    } else {
      // pause the video when not active
      videoRef.current && videoRef.current.pause();
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
  }, []);

  const ErrorMessageMem: React.FunctionComponent<ErrorMessageModel> = React.memo(
    ({ message }: ErrorMessageModel) => <ErrorMessage>{message}</ErrorMessage>,
  );

  const Video = useMemo(() => {
    return (
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
    );
  }, [active]);

  const Image = useMemo(() => {
    return (
      <CardImage
        src={media.source.url}
        mode={mode}
        onLoad={handleMediaLoaded}
        onError={handleError}
        visible={mediaLoaded}
        active={active}
        alt={media.name}
      />
    );
  }, [active]);

  ErrorMessageMem.displayName = 'Error Message';

  return (
    <>
      <MediaWrapper
        theme={theme}
        active={active}
        mode={mode}
        slideShowActive={slideshowActive}
        className="card-media-wrapper"
        cardHeight={cardHeight}
      >
        {media.type === 'VIDEO' &&
          (!loadFailed ? (
            Video
          ) : (
            <ErrorMessageMem message="Failed to load the video" />
          ))}
        {media.type === 'IMAGE' &&
          (!loadFailed ? (
            Image
          ) : (
            <ErrorMessageMem message="Failed to load the image." />
          ))}
      </MediaWrapper>
      <MediaDetailsWrapper mode={mode}>
        <MemoTitle title={title} theme={theme} active={active} />
        <MemoSubTitle content={content} />
      </MediaDetailsWrapper>
    </>
  );
};

export default CardMedia;
