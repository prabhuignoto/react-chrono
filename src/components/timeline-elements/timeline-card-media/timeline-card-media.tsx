import { CardMediaModel } from '@models/TimelineMediaModel';
import cls from 'classnames';
import React, { memo, useCallback, useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';
import { MediaWrapper } from './timeline-card-media.styles';
import { useMediaLoad } from './hooks/useMediaLoad';
import { useYouTubeDetection } from './hooks/useYouTubeDetection';
import { useToggleControls } from './hooks/useToggleControls';
import { useViewOptions } from './hooks/useViewOptions';
import { MediaContent } from './components/MediaContent';
import { ContentDisplay } from './components/ContentDisplay';

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
  }: CardMediaModel) => {
    // Custom hooks for state management
    const { loadFailed, mediaLoaded, handleMediaLoaded, handleError } =
      useMediaLoad(id, onMediaStateChange);
    const isYouTube = useYouTubeDetection(media.source.url);
    const { expandDetails, showText, toggleExpand, toggleText } =
      useToggleControls();

    // Get context
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

    // Use view options hook for calculated values
    const {
      canShowTextMemo,
      canShowTextContent,
      canExpand,
      gradientColor,
      canShowGradient,
      getCardHeight,
    } = useViewOptions({
      showText,
      expandDetails,
      textOverlay,
      detailsText,
      title,
      content,
      theme,
      cardHeight,
      mediaHeight,
    });

    // Cast mode to TimelineMode
    const timelineMode = mode;

    // Details text callback
    const onDetailsTextRef = useCallback((height?: number) => {
      if (height) {
        // Do something with height if needed
      }
    }, []);

    return (
      <>
        <MediaWrapper
          theme={theme}
          $active={active}
          mode={timelineMode}
          $slideShowActive={slideshowActive}
          className={cls('card-media-wrapper', classNames?.cardMedia)}
          $cardHeight={getCardHeight}
          align={mediaSettings?.align}
          $textOverlay={textOverlay}
        >
          <MediaContent
            media={media}
            isYouTube={isYouTube}
            loadFailed={loadFailed}
            mediaLoaded={mediaLoaded}
            active={active}
            id={id}
            mediaHeight={mediaHeight}
            mode={timelineMode}
            borderLessCards={borderLessCards}
            mediaSettings={mediaSettings}
            handleMediaLoaded={handleMediaLoaded}
            handleError={handleError}
            onMediaStateChange={onMediaStateChange}
          />
        </MediaWrapper>

        {canShowTextContent && (
          <ContentDisplay
            mode={timelineMode}
            textOverlay={textOverlay}
            theme={theme}
            expandDetails={expandDetails}
            showText={showText}
            canExpand={canExpand}
            canShowGradient={canShowGradient}
            gradientColor={gradientColor}
            title={title}
            active={active}
            url={url}
            fontSizes={fontSizes}
            classNames={classNames}
            toggleText={toggleText}
            toggleExpand={toggleExpand}
            content={content}
            canShowTextMemo={canShowTextMemo}
            detailsText={detailsText}
            onDetailsTextRef={onDetailsTextRef}
          />
        )}
      </>
    ) as React.ReactElement;
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
