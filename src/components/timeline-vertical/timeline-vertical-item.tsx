import React, { useRef } from 'react';
import { VerticalItemModel } from '../../models/TimelineTreeModel';
import TimelineCard from '../timeline-elements/timeline-card-content/timeline-card-content';
import TimelineItemTitle from '../timeline-elements/timeline-item-title/timeline-card-title';
import VerticalCircle from './timeline-vertical-circle';
import {
  VerticalItemWrapper,
  TimelineCardContentWrapper,
  TimelineTitleWrapper,
} from './timeline-vertical.styles';

const VerticalItem: React.FunctionComponent<VerticalItemModel> = (
  props: VerticalItemModel,
) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    active,
    alternateCards,
    cardHeight,
    className,
    contentDetailedText,
    contentText,
    contentTitle,
    id,
    index,
    media,
    mode,
    onActive,
    onClick,
    slideItemDuration,
    slideShowRunning,
    theme,
    title,
    visible,
    onElapsed,
  } = props;

  const handleOnActive = (offset: number) => {
    if (contentRef.current) {
      const { offsetTop, clientHeight } = contentRef.current;
      onActive(offsetTop + offset, offsetTop, clientHeight);
    }
  };

  return (
    <VerticalItemWrapper
      className={`${className} ${visible ? 'visible' : ''} branch-main`}
      key={index}
      ref={contentRef}
      data-testid="branch-main"
      alternateCards={alternateCards}
      cardHeight={cardHeight}
      role="listitem"
    >
      {/* title */}
      <TimelineTitleWrapper
        className={className}
        alternateCards={alternateCards}
      >
        <TimelineItemTitle title={title} active={active} theme={theme} />
      </TimelineTitleWrapper>

      {/* content section */}
      <TimelineCardContentWrapper
        className={`${className} card-content-wrapper ${
          visible ? 'visible' : ''
        }`}
        alternateCards={alternateCards}
      >
        <TimelineCard
          active={active}
          cardHeight={cardHeight}
          content={contentText}
          detailedText={contentDetailedText}
          id={id}
          media={media}
          mode={mode}
          onClick={onClick}
          slideShowActive={slideShowRunning}
          theme={theme}
          title={contentTitle}
          onShowMore={() =>
            setTimeout(() => {
              handleOnActive(0);
            }, 200)
          }
          branchDir={className}
          slideItemDuration={slideItemDuration}
          onElapsed={onElapsed || function () {}}
        />
      </TimelineCardContentWrapper>

      {/* Circle */}
      <VerticalCircle
        className={className}
        id={id}
        active={active}
        onClick={onClick}
        onActive={handleOnActive}
        theme={theme}
        alternateCards={alternateCards}
        slideShowRunning={slideShowRunning}
      />
    </VerticalItemWrapper>
  );
};

export default VerticalItem;
