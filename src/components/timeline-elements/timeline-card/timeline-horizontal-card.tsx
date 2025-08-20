import { TimelineCardModel } from '@models/TimelineItemModel';
import React from 'react';
import { useTimelineContext } from '../../contexts';
import TimelineItemTitle from '../timeline-item-title/timeline-card-title';
import {
  wrapper,
  timelineTitleContainer,
} from './timeline-horizontal-card.css';
import { useTimelineCard } from './hooks/useTimelineCard';
import { pickDefined } from '../../../utils/propUtils';
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
    cardLess,
    showAllCardsHorizontal,
    mode,
    position,
    iconChild,
    ...pickDefined({
      active,
      autoScroll,
      slideShowRunning,
      id,
      onClick,
    }),
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
      className={wrapper({ orientation: modeLower as 'vertical' | 'horizontal', size: 'md' })}
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
          cardSubtitle={
            typeof cardSubtitle === 'string'
              ? cardSubtitle
              : String(cardSubtitle ?? '')
          }
          cardTitle={
            typeof cardTitle === 'string' ? cardTitle : String(cardTitle ?? '')
          }
          wrapperId={wrapperId}
          {...pickDefined({
            cardWidth,
            url,
            slideShowRunning,
            media,
            onElapsed,
            customContent,
            hasFocus,
            onClick,
            timelineContent,
            isNested,
            nestedCardHeight,
            items,
          })}
          {...(formattedDetailedText ? { cardDetailedText: formattedDetailedText } : {})}
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
        disabled={disableInteraction}
        {...pickDefined({
          active,
          itemId: id,
        })}
      />

      <div
        className={`${timelineTitleContainer({ mode: modeLower as 'vertical' | 'horizontal' | 'horizontal_all', interactive: !disableInteraction })} ${titleClass}`}
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
