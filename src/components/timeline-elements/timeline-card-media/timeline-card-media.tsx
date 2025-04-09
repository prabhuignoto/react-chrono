import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  Suspense,
} from 'react';
import { CardMediaModel } from '@models/TimelineMediaModel';
import cls from 'classnames';
import { GlobalContext } from '../../GlobalContext';
import {
  SlideShowProgressBar,
  TriangleIconWrapper,
} from '../timeline-card-content/timeline-card-content.styles';
import { MediaWrapper } from './timeline-card-media.styles';
import { useMediaLoad } from './hooks/useMediaLoad';
import { useMediaState } from './hooks/useMediaState';
import VideoPlayer from './components/VideoPlayer';
import ImageDisplay from './components/ImageDisplay';
import MediaDetails from './components/MediaDetails';
import {
  getCardHeight,
  getGradientColor,
  shouldShowArrow,
  shouldShowText,
  shouldShowTextContent,
  shouldExpand,
  shouldShowGradient,
  shouldShowProgressBar,
} from './utils/mediaUtils';

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

    const {
      videoRef,
      expandDetails,
      showText,
      handlePlay,
      handlePause,
      handleEnded,
      toggleExpand,
      toggleText,
    } = useMediaState(id, onMediaStateChange);

    const { loadFailed, mediaLoaded, handleMediaLoaded, handleError } =
      useMediaLoad(id, onMediaStateChange);

    useEffect(() => {
      if (!videoRef.current) return;

      if (active) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Handle autoplay failure silently
          });
        }
      } else {
        videoRef.current.pause();
      }
    }, [active, videoRef]);

    const onDetailsTextRef = useCallback((height?: number) => {
      if (height) {
        // Do something with height
      }
    }, []);

    const gradientColor = getGradientColor(theme);
    const cardHeightValue = getCardHeight(textOverlay, cardHeight, mediaHeight);
    const canShowArrow = shouldShowArrow(mode, textOverlay);
    const canShowTextMemo = shouldShowText(showText, detailsText);
    const canShowTextContent = shouldShowTextContent(
      title?.toString() || '',
      content?.toString() || '',
      detailsText?.toString() || '',
    );
    const canExpand = shouldExpand(textOverlay, detailsText);
    const canShowGradient = shouldShowGradient(
      expandDetails,
      showText,
      textOverlay,
    );
    const canShowProgressBar = shouldShowProgressBar(
      showProgressBar,
      textOverlay,
    );

    return (
      <>
        <MediaWrapper
          theme={theme}
          $active={active}
          mode={mode}
          $slideShowActive={slideshowActive}
          className={cls('card-media-wrapper', classNames?.cardMedia)}
          $cardHeight={cardHeightValue}
          align={mediaSettings?.align}
          $textOverlay={textOverlay}
        >
          <Suspense fallback={<div>Loading media...</div>}>
            {media.type === 'VIDEO' && !loadFailed && (
              <VideoPlayer
                media={media}
                active={active}
                onPlay={handlePlay}
                onPause={handlePause}
                onEnded={handleEnded}
                onError={handleError}
                onLoadedData={handleMediaLoaded}
                videoRef={videoRef}
              />
            )}
            {media.type === 'IMAGE' && !loadFailed && (
              <ImageDisplay
                media={media}
                mode={mode}
                onLoad={handleMediaLoaded}
                onError={handleError}
                mediaLoaded={mediaLoaded}
                borderLessCards={borderLessCards}
                mediaSettings={mediaSettings}
                mediaHeight={mediaHeight}
              />
            )}
          </Suspense>

          {canShowProgressBar && (
            <SlideShowProgressBar
              color={theme?.primary}
              $duration={remainInterval}
              $paused={paused}
              ref={progressRef}
              $startWidth={startWidth}
              $resuming={resuming}
            />
          )}

          {canShowArrow && (
            <TriangleIconWrapper
              dir={triangleDir}
              theme={theme}
              offset={-15}
              role="img"
              data-testid="arrow-icon"
            />
          )}
        </MediaWrapper>
        {canShowTextContent && (
          <MediaDetails
            mode={mode}
            textOverlay={textOverlay}
            theme={theme}
            expandDetails={expandDetails}
            showText={showText}
            canExpand={canExpand}
            gradientColor={canShowGradient ? gradientColor : null}
            title={title}
            active={active}
            url={url}
            fontSizes={fontSizes}
            classNames={classNames}
            content={content}
            detailsText={detailsText}
            onDetailsTextRef={onDetailsTextRef}
            toggleText={toggleText}
            toggleExpand={toggleExpand}
          />
        )}
      </>
    );
  },
  (prevProps, nextProps) => {
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
