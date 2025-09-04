import { TimelineCardModel } from '@models/TimelineItemModel';
import React, { useMemo } from 'react';
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
    mode: mode as 'HORIZONTAL' | 'VERTICAL' | 'VERTICAL_ALTERNATING' | 'HORIZONTAL_ALL',
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

  // Memoized timeline point props similar to vertical timeline implementation
  const timelinePointProps = useMemo(
    () => ({
      circleClass,
      handleClick,
      circleRef: circleRef as React.RefObject<HTMLButtonElement>,
      title: typeof title === 'string' ? title : String(title ?? ''),
      theme,
      timelinePointDimension,
      timelinePointShape,
      iconChild,
      disabled: disableInteraction,
      ...pickDefined({
        active,
        itemId: id,
      }),
    }),
    [
      circleClass,
      handleClick,
      circleRef,
      title,
      theme,
      timelinePointDimension,
      timelinePointShape,
      iconChild,
      disableInteraction,
      active,
      id,
    ],
  );

  return (
    <div
      ref={wrapperRef}
      className="timeline-horizontal-item"
      data-testid="timeline-item"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        position: 'relative',
        gap: '1rem',
      }}
    >
      {/* Timeline Point - Always at top */}
      <div
        className="timeline-point-section"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0.5rem',
          zIndex: 10,
          position: 'relative',
        }}
      >
        <TimelinePoint {...timelinePointProps} />
      </div>

      {/* Card Content - Only show if conditions are met */}
      {canShowTimelineContent && (
        <div
          className="timeline-card-section"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            flexGrow: 1,
          }}
        >
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
              typeof cardTitle === 'string'
                ? cardTitle
                : String(cardTitle ?? '')
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
            {...(formattedDetailedText
              ? { cardDetailedText: formattedDetailedText }
              : {})}
          />
        </div>
      )}

      {/* Title - Always at bottom */}
      <div
        className="timeline-title-section"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0.5rem',
          minHeight: '3rem', // Ensure consistent spacing
          position: 'relative',
          zIndex: 5, // Above the line
        }}
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
