import { TimelineCardModel } from '@models/TimelineItemModel';
import React from 'react';
import { useTimelineContext } from '../../contexts';
import TimelineItemTitle from '../timeline-item-title/timeline-card-title';
import {
  timelineTitleContainer,
  wrapper,
} from './timeline-horizontal-card.css';
import { timelineTitleContainer as veTitleContainer } from './timeline-horizontal-card.css';
import { useTimelineCard } from './hooks/useTimelineCard';
import TimelinePoint from './timeline-point/timeline-point';
import TimelineCardPortal from './timeline-card-portal/timeline-card-portal';

const TimelineCard: React.FunctionComponent<TimelineCardModel> = ({
  active,
  autoScroll,
  cardDetailedText,
  cardSubtitle,
  cardTitle,
  url,
  id,
  media,
  onClick,
  onElapsed,
  slideShowRunning,
  title,
  wrapperId,
  customContent,
  hasFocus,
  iconChild,
  timelineContent,
  cardWidth,
  isNested,
  nestedCardHeight,
  items,
}: TimelineCardModel) => {
  const {
    mode,
    cardPositionHorizontal: position,
    timelinePointDimension,
    cardLess,
    showAllCardsHorizontal,
    classNames,
    theme,
    timelinePointShape,
    disableInteraction,
  } = useTimelineContext();

  const {
    circleRef,
    wrapperRef,
    contentRef,
    handleClick,
    modeLower,
    containerClass,
    titleClass,
    circleClass,
    canShowTimelineContent,
  } = useTimelineCard({
    ...(active !== undefined ? { active } : {}),
    ...(autoScroll ? { autoScroll } : {}),
    ...(slideShowRunning !== undefined ? { slideShowRunning } : {}),
    cardLess,
    showAllCardsHorizontal,
    ...(id !== undefined ? { id } : {}),
    ...(onClick ? { onClick } : {}),
    mode,
    position,
    iconChild,
  });

  // Convert cardDetailedText to the expected string or string[] format
  const formatDetailedText = () => {
    if (Array.isArray(cardDetailedText)) {
      return cardDetailedText.map((text) =>
        typeof text === 'string' ? text : String(text ?? ''),
      );
    }

    if (typeof cardDetailedText === 'string') {
      return cardDetailedText;
    }

    return cardDetailedText ? String(cardDetailedText) : undefined;
  };

  const formattedDetailedText = formatDetailedText();

  return (
    <div
      ref={wrapperRef}
      className={`${wrapper} ${modeLower}`}
      data-testid="timeline-item"
    >
      {canShowTimelineContent && (
        <TimelineCardPortal
          containerClass={containerClass}
          contentRef={contentRef as React.RefObject<HTMLDivElement>}
          id={id || ''}
          theme={theme}
          active={active || false}
          disableInteraction={disableInteraction}
          showAllCardsHorizontal={showAllCardsHorizontal}
          {...(cardWidth ? { cardWidth } : {})}
          cardSubtitle={
            typeof cardSubtitle === 'string'
              ? cardSubtitle
              : String(cardSubtitle ?? '')
          }
          cardTitle={
            typeof cardTitle === 'string' ? cardTitle : String(cardTitle ?? '')
          }
          {...(url ? { url } : {})}
          {...(formattedDetailedText ? { cardDetailedText: formattedDetailedText } : {})}
          {...(slideShowRunning !== undefined ? { slideShowRunning } : {})}
          {...(media ? { media } : {})}
          {...(onElapsed ? { onElapsed } : {})}
          {...(customContent ? { customContent } : {})}
          {...(hasFocus !== undefined ? { hasFocus } : {})}
          {...(onClick ? { onClick } : {})}
          {...(timelineContent ? { timelineContent } : {})}
          {...(isNested !== undefined ? { isNested } : {})}
          {...(nestedCardHeight !== undefined ? { nestedCardHeight } : {})}
          {...(items ? { items } : {})}
          wrapperId={wrapperId}
        />
      )}

      <TimelinePoint
        circleClass={circleClass}
        handleClick={handleClick}
        circleRef={circleRef as React.RefObject<HTMLButtonElement>}
        title={typeof title === 'string' ? title : String(title ?? '')}
        theme={theme}
        timelinePointDimension={timelinePointDimension}
        timelinePointShape={timelinePointShape}
        iconChild={iconChild}
        {...(active !== undefined ? { active } : {})}
        disabled={disableInteraction}
        {...(id ? { itemId: id } : {})}
      />

      <div
        className={`${timelineTitleContainer} ${veTitleContainer} ${titleClass}`}
        data-testid="timeline-title"
      >
        <TimelineItemTitle
          title={title}
          active={(active || false) && !disableInteraction}
          theme={theme}
          classString={classNames?.title || ''}
        />
      </div>
    </div>
  );
};

export default TimelineCard;
