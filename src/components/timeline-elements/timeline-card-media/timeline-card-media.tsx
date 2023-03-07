import cls from 'classnames';
import React, {
  FunctionComponent,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CardMediaModel } from '../../../models/TimelineMediaModel';
import { hexToRGBA } from '../../../utils';
import { GlobalContext } from '../../GlobalContext';
import {
  DetailsTextMemo,
  ExpandButtonMemo,
  ShowOrHideTextButtonMemo,
  SubTitleMemo,
  TitleMemo,
} from '../memoized';
import {
  SlideShowProgressBar,
  TriangleIconWrapper,
} from '../timeline-card-content/timeline-card-content.styles';
import { ButtonWrapper } from './timeline-card-media-buttons';
import {
  CardImage,
  CardMediaHeader,
  CardVideo,
  ErrorMessage,
  IFrameVideo,
  MediaDetailsWrapper,
  MediaWrapper,
} from './timeline-card-media.styles';

interface ErrorMessageModel {
  message: string;
}

const CardMedia: React.FunctionComponent<CardMediaModel> = ({
  active,
  id,
  onMediaStateChange,
  theme,
  title,
  content,
  media,
  slideshowActive,
  url,
  detailsText,
  showProgressBar,
  remainInterval,
  startWidth,
  paused,
  triangleDir,
}: CardMediaModel) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const moreRef = useRef(null);
  const [detailsHeight, setDetailsHeight] = useState(0);
  const [expandDetails, setExpandDetails] = useState(false);
  const [showText, setShowText] = useState(true);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const {
    mode,
    fontSizes,
    classNames,
    mediaHeight,
    alignMedia,
    borderLessCards,
    textOverlay,
  } = useContext(GlobalContext);

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

  // This function will be invoked when the user has finished loading media
  const handleMediaLoaded = useCallback(() => {
    setMediaLoaded(true);
  }, []);

  // This code creates a function to handle errors when loading the video.
  const handleError = useCallback(() => {
    // create a function to handle errors
    setLoadFailed(true); // set the loadFailed variable to true
    onMediaStateChange({
      // call the onMediaStateChange function
      id,
      paused: false,
      playing: false,
    });
  }, [onMediaStateChange, id]); // add the onMediaStateChange and id variables as dependencies to the function

  const ErrorMessageMem: FunctionComponent<ErrorMessageModel> = memo(
    ({ message }: ErrorMessageModel) => <ErrorMessage>{message}</ErrorMessage>,
  );

  // Checks if the media source url is a YouTube video.
  // Returns a boolean.
  const isYouTube = useMemo(
    () =>
      /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/.test(
        media.source.url,
      ),
    [],
  );

  /**
   * @function IFrameVideo
   * @description
   * The IFrameVideo component is used to display an iframe with a YouTube video.
   * @returns {IFrameVideo} - Returns the iframe with the YouTube video.
   */
  const IFrameYouTube = useMemo(() => {
    // Create an iframe with the YouTube video
    const iframe = (
      <IFrameVideo
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        src={`${media.source.url}${
          active ? '?autoplay=1&enablejsapi=1' : '?enablejsapi=1'
        }`}
      />
    );

    // When the YouTube video is active, return the iframe
    return iframe;
  }, [active]);

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
        loading={'lazy'}
        enableBorderRadius={borderLessCards}
      />
    );
  }, [active, mediaLoaded, borderLessCards]);

  ErrorMessageMem.displayName = 'Error Message';

  // This code calculates the height of the Details component and passes it to
  // the setDetailsHeight function.
  const onDetailsTextRef = useCallback((height?: number) => {
    if (height) {
      setDetailsHeight(height);
    }
  }, []);

  /* Toggle the expand details state on pointer or keyboard event */
  const toggleExpand = useCallback(
    (ev: React.PointerEvent | React.KeyboardEvent) => {
      ev.preventDefault();
      ev.stopPropagation();
      setExpandDetails((prev) => !prev);
      setShowText(true);
    },
    [],
  );

  // This function is used to toggle the text between hidden and visible.
  // It is used to show the text of the article excerpt when the user
  // clicks on the "show more" button.
  const toggleText = useCallback(
    (ev: React.PointerEvent | React.KeyboardEvent) => {
      ev.preventDefault();
      ev.stopPropagation();
      setExpandDetails(false);
      setShowText((prev) => !prev);
    },
    [],
  );

  // checks if the arrow should be shown
  const canShowArrow = useMemo(
    () =>
      (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') && textOverlay,
    [],
  );

  // checks if we can display the detailed text
  const canShowTextMemo = useMemo(
    () => showText && !!detailsText,
    [showText, detailsText],
  );

  // checks if the text content should be shown
  const canShowTextContent = useMemo(
    () => title || content || detailsText,
    [title, content, detailsText],
  );

  const canExpand = useMemo(
    () => textOverlay && !!detailsText,
    [content, detailsText],
  );

  const gradientColor = useMemo(
    () => hexToRGBA(theme?.cardDetailsBackGround || '', 0.8),
    [theme?.cardDetailsBackGround],
  );

  const canShowGradient = useMemo(
    () => !expandDetails && showText && textOverlay,
    [expandDetails, showText],
  );

  const TextContent = useMemo(() => {
    return (
      <MediaDetailsWrapper
        mode={mode}
        absolutePosition={textOverlay}
        textInMedia={textOverlay}
        ref={moreRef}
        theme={theme}
        expandFull={expandDetails}
        showText={showText}
        expandable={canExpand}
        gradientColor={canShowGradient ? gradientColor : null}
      >
        <CardMediaHeader>
          <TitleMemo
            title={title}
            theme={theme}
            active={active}
            url={url}
            fontSize={fontSizes?.cardTitle}
            classString={classNames?.cardTitle}
          />
          {canExpand ? (
            <ButtonWrapper>
              <ShowOrHideTextButtonMemo
                onToggle={toggleText}
                show={showText}
                textOverlay
                theme={theme}
              />
              <ExpandButtonMemo
                theme={theme}
                expanded={expandDetails}
                onExpand={toggleExpand}
                textOverlay
              />
            </ButtonWrapper>
          ) : null}
        </CardMediaHeader>
        {showText && (
          <SubTitleMemo
            content={content}
            fontSize={fontSizes?.cardSubtitle}
            classString={classNames?.cardSubTitle}
            padding
            theme={theme}
          />
        )}
        {canShowTextMemo ? (
          <DetailsTextMemo
            theme={theme}
            show={showText}
            expand={expandDetails}
            text={detailsText}
            onRender={onDetailsTextRef}
            textOverlay={textOverlay}
          />
        ) : null}
      </MediaDetailsWrapper>
    );
  }, [showText, expandDetails, canShowTextMemo, gradientColor]);

  return (
    <>
      <MediaWrapper
        theme={theme}
        active={active}
        mode={mode}
        slideShowActive={slideshowActive}
        className={cls('card-media-wrapper', classNames?.cardMedia)}
        cardHeight={mediaHeight}
        align={alignMedia}
        textOverlay={textOverlay}
      >
        {media.type === 'VIDEO' &&
          !isYouTube &&
          (!loadFailed ? (
            Video
          ) : (
            <ErrorMessageMem message="Failed to load the video" />
          ))}
        {media.type === 'VIDEO' && isYouTube && IFrameYouTube}
        {media.type === 'IMAGE' &&
          (!loadFailed ? (
            Image
          ) : (
            <ErrorMessageMem message="Failed to load the image." />
          ))}

        {showProgressBar && textOverlay && (
          <SlideShowProgressBar
            color={theme?.primary}
            duration={remainInterval}
            paused={paused}
            ref={progressRef}
            startWidth={startWidth}
          ></SlideShowProgressBar>
        )}
        {canShowArrow ? (
          <TriangleIconWrapper
            dir={triangleDir}
            theme={theme}
            offset={-15}
          ></TriangleIconWrapper>
        ) : null}
      </MediaWrapper>
      {canShowTextContent ? TextContent : null}
    </>
  );
};

CardMedia.displayName = 'Card Media';

export default CardMedia;
