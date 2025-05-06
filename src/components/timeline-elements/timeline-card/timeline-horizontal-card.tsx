import { TimelineCardModel } from '@models/TimelineItemModel';
import React, { useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';
import TimelineItemTitle from '../timeline-item-title/timeline-card-title';
import {
  TimelineTitleContainer,
  Wrapper,
} from './timeline-horizontal-card.styles';
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
  } = useContext(GlobalContext);

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
    active,
    autoScroll,
    slideShowRunning,
    cardLess,
    showAllCardsHorizontal,
    id,
    onClick,
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

  return (
    <Wrapper ref={wrapperRef} className={modeLower} data-testid="timeline-item">
      {canShowTimelineContent && (
        <TimelineCardPortal
          containerClass={containerClass}
          contentRef={contentRef}
          id={id}
          theme={theme}
          active={active}
          disableInteraction={disableInteraction}
          showAllCardsHorizontal={showAllCardsHorizontal}
          cardWidth={cardWidth}
          cardSubtitle={
            typeof cardSubtitle === 'string'
              ? cardSubtitle
              : String(cardSubtitle ?? '')
          }
          cardTitle={
            typeof cardTitle === 'string' ? cardTitle : String(cardTitle ?? '')
          }
          url={url}
          cardDetailedText={formatDetailedText()}
          slideShowRunning={slideShowRunning}
          media={media}
          onElapsed={onElapsed}
          customContent={customContent}
          hasFocus={hasFocus}
          onClick={onClick}
          timelineContent={timelineContent}
          isNested={isNested}
          nestedCardHeight={nestedCardHeight}
          items={items}
          wrapperId={wrapperId}
        />
      )}

      <TimelinePoint
        circleClass={circleClass}
        handleClick={handleClick}
        circleRef={circleRef}
        title={typeof title === 'string' ? title : String(title ?? '')}
        theme={theme}
        timelinePointDimension={timelinePointDimension}
        timelinePointShape={timelinePointShape}
        iconChild={iconChild}
      />

      <TimelineTitleContainer
        className={titleClass}
        data-testid="timeline-title"
      >
        <TimelineItemTitle
          title={title}
          active={active && !disableInteraction}
          theme={theme}
          classString={classNames?.title}
        />
      </TimelineTitleContainer>
    </Wrapper>
  );
};

export default TimelineCard;
