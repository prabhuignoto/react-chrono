import { CardMediaModel } from '@models/TimelineMediaModel';
import cls from 'classnames';
import React, { memo, useCallback } from 'react';
import { mediaEqual } from '@utils/comparison';
import { useTimelineContext } from '../../contexts';
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

    // Use unified timeline context
    const {
      theme,
      mode,
      cardHeight,
      borderLessCards,
      mediaHeight,
      textOverlay,
      mediaSettings,
      // consume from context rather than placeholders
      fontSizes,
      classNames,
    } = useTimelineContext();

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
    // Only compare props that this component actually uses/render depends on
    return (
      prevProps.active === nextProps.active &&
      prevProps.slideshowActive === nextProps.slideshowActive &&
      prevProps.id === nextProps.id &&
      prevProps.title === nextProps.title &&
      prevProps.url === nextProps.url &&
      prevProps.content === nextProps.content &&
      prevProps.detailsText === nextProps.detailsText &&
      mediaEqual(prevProps.media, nextProps.media)
    );
  },
);

CardMedia.displayName = 'Card Media';

export default CardMedia;
