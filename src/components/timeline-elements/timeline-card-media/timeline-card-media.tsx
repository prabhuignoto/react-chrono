import { CardMediaModel } from '@models/TimelineMediaModel';
import { hexToRGBA } from '@utils/index';
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
  Suspense,
} from 'react';
import { GlobalContext } from '../../GlobalContext';
import { DetailsTextMemo } from '../memoized/details-text-memo';
import { ExpandButtonMemo } from '../memoized/expand-button-memo';
import { ShowOrHideTextButtonMemo } from '../memoized/show-hide-button';
import { SubTitleMemo } from '../memoized/subtitle-memo';
import { TitleMemo } from '../memoized/title-memo';
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
  ImageWrapper,
  MediaDetailsWrapper,
  MediaWrapper,
} from './timeline-card-media.styles';
import { useMediaLoad } from './hooks/useMediaLoad';

interface ErrorMessageModel {
  message: string;
}

// Lazy load components that might not always be needed
const LazyErrorMessage: FunctionComponent<ErrorMessageModel> = memo(
  ({ message }: ErrorMessageModel) => <ErrorMessage>{message}</ErrorMessage>,
);

// Optimize YouTube detection with a custom hook
const useYouTubeDetection = (url: string) => {
  return useMemo(
    () => /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/.test(url),
    [url],
  );
};

/**
 * CardMedia component - A highly optimized component for media rendering in timeline cards
 */
const CardMedia: React.FunctionComponent<CardMediaModel> = memo(
  ({
    active,
    id,
    onMediaStateChange,
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
    resuming,
    progressRef,
  }: CardMediaModel) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const moreRef = useRef(null);
    const [expandDetails, setExpandDetails] = useState(false);
    const [showText, setShowText] = useState(true);

    // Use custom hooks to extract loading logic
    const { loadFailed, mediaLoaded, handleMediaLoaded, handleError } =
      useMediaLoad(id, onMediaStateChange);

    const {
      mode,
      fontSizes,
      classNames,
      mediaHeight,
      borderLessCards,
      textOverlay,
      theme,
      cardHeight,
      mediaSettings,
    } = useContext(GlobalContext);

    // Optimize video playback with an effect that only runs when active state changes
    useEffect(() => {
      if (!videoRef.current) return;

      if (active) {
        videoRef.current.play().catch(() => {
          // Handle autoplay failure silently
        });
      } else {
        videoRef.current.pause();
      }
    }, [active]);

    const isYouTube = useYouTubeDetection(media.source.url);

    // Toggle functions
    const toggleExpand = useCallback(() => {
      setExpandDetails((prev) => !prev);
      setShowText(true);
    }, []);

    const toggleText = useCallback(() => {
      setExpandDetails(false);
      setShowText((prev) => !prev);
    }, []);

    // Memoize all computed values
    const canShowArrow = useMemo(
      () =>
        (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') && textOverlay,
      [mode, textOverlay],
    );

    const canShowTextMemo = useMemo(
      () => showText && !!detailsText,
      [showText, detailsText],
    );

    const canShowTextContent = useMemo(
      () => title || content || detailsText,
      [title, content, detailsText],
    );

    const canExpand = useMemo(
      () => textOverlay && !!detailsText,
      [textOverlay, detailsText],
    );

    const gradientColor = useMemo(
      () => hexToRGBA(theme?.cardDetailsBackGround || '', 0.8),
      [theme?.cardDetailsBackGround],
    );

    const canShowGradient = useMemo(
      () => !expandDetails && showText && textOverlay,
      [expandDetails, showText, textOverlay],
    );

    const getCardHeight = useMemo(
      () => (textOverlay ? cardHeight : mediaHeight),
      [textOverlay, cardHeight, mediaHeight],
    );

    const canShowProgressBar = useMemo(
      () => showProgressBar && textOverlay,
      [showProgressBar, textOverlay],
    );

    // Memoize detailed components
    const IFrameYouTube = useMemo(
      () => (
        <IFrameVideo
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          src={`${media.source.url}${
            active ? '?autoplay=1&enablejsapi=1' : '?enablejsapi=1'
          }`}
          title={media.name}
          data-testid="timeline-card-content-video"
          loading="lazy"
        />
      ),
      [active, media.source.url, media.name],
    );

    const Video = useMemo(
      () => (
        <CardVideo
          controls
          autoPlay={active}
          ref={videoRef}
          onLoadedData={handleMediaLoaded}
          data-testid="rc-video"
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
          preload="metadata"
        >
          <source src={media.source.url}></source>
        </CardVideo>
      ),
      [
        active,
        id,
        handleMediaLoaded,
        handleError,
        onMediaStateChange,
        media.source.url,
      ],
    );

    const Image = useMemo(
      () => (
        <CardImage
          src={media.source.url}
          mode={mode}
          onLoad={handleMediaLoaded}
          onError={handleError}
          $visible={mediaLoaded}
          alt={media.name}
          loading="lazy"
          $enableBorderRadius={borderLessCards}
          fit={mediaSettings?.imageFit}
          data-testid="timeline-card-content-image"
          width="100%"
          height="auto"
        />
      ),
      [
        mediaLoaded,
        borderLessCards,
        media.source.url,
        mode,
        handleMediaLoaded,
        handleError,
        media.name,
        mediaSettings?.imageFit,
      ],
    );

    // Use callback for details text height
    const onDetailsTextRef = useCallback((height?: number) => {
      if (height) {
        // Do something with height
      }
    }, []);

    // Memoize the text content
    const TextContent = useMemo(
      () => (
        <MediaDetailsWrapper
          mode={mode}
          $absolutePosition={textOverlay}
          $textInMedia={textOverlay}
          ref={moreRef}
          theme={theme}
          $expandFull={expandDetails}
          $showText={showText}
          $expandable={canExpand}
          $gradientColor={canShowGradient ? gradientColor : null}
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
            {canExpand && (
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
            )}
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
          {canShowTextMemo && (
            <DetailsTextMemo
              theme={theme}
              show={showText}
              expand={expandDetails}
              text={detailsText}
              onRender={onDetailsTextRef}
              textOverlay={textOverlay}
            />
          )}
        </MediaDetailsWrapper>
      ),
      [
        mode,
        textOverlay,
        theme,
        expandDetails,
        showText,
        canExpand,
        canShowGradient,
        gradientColor,
        title,
        active,
        url,
        fontSizes?.cardTitle,
        fontSizes?.cardSubtitle,
        classNames?.cardTitle,
        classNames?.cardSubTitle,
        toggleText,
        toggleExpand,
        content,
        canShowTextMemo,
        detailsText,
        onDetailsTextRef,
      ],
    );

    return (
      <>
        <MediaWrapper
          theme={theme}
          $active={active}
          mode={mode}
          $slideShowActive={slideshowActive}
          className={cls('card-media-wrapper', classNames?.cardMedia)}
          $cardHeight={getCardHeight}
          align={mediaSettings?.align}
          $textOverlay={textOverlay}
        >
          <Suspense fallback={<div>Loading media...</div>}>
            {media.type === 'VIDEO' &&
              !isYouTube &&
              (!loadFailed ? (
                Video
              ) : (
                <LazyErrorMessage message="Failed to load the video" />
              ))}
            {media.type === 'VIDEO' && isYouTube && IFrameYouTube}
            {media.type === 'IMAGE' &&
              (!loadFailed ? (
                <ImageWrapper height={mediaHeight}>{Image}</ImageWrapper>
              ) : (
                <LazyErrorMessage message="Failed to load the image." />
              ))}
          </Suspense>

          {canShowProgressBar && (
            <SlideShowProgressBar
              color={theme?.primary}
              $duration={remainInterval}
              $paused={paused}
              ref={progressRef}
              $startWidth={startWidth}
              $resuming={resuming}
            ></SlideShowProgressBar>
          )}

          {canShowArrow && (
            <TriangleIconWrapper
              dir={triangleDir}
              theme={theme}
              offset={-15}
              role="img"
              data-testid="arrow-icon"
            ></TriangleIconWrapper>
          )}
        </MediaWrapper>
        {canShowTextContent && TextContent}
      </>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function to avoid unnecessary re-renders
    return (
      prevProps.active === nextProps.active &&
      prevProps.slideshowActive === nextProps.slideshowActive &&
      prevProps.paused === nextProps.paused &&
      prevProps.startWidth === nextProps.startWidth &&
      prevProps.remainInterval === nextProps.remainInterval &&
      JSON.stringify(prevProps.theme) === JSON.stringify(nextProps.theme)
    );
  },
);

CardMedia.displayName = 'Card Media';

export default CardMedia;
