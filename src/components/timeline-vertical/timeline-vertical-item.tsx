import React, { useMemo, useRef } from 'react';
import { VerticalItemModel } from '../../models/TimelineVerticalModel';
import TimelineCard from '../timeline-elements/timeline-card-content/timeline-card-content';
import TimelineItemTitle from '../timeline-elements/timeline-item-title/timeline-card-title';
import VerticalCircle from './timeline-vertical-circle';
import {
  TimelineCardContentWrapper,
  TimelineTitleWrapper,
  VerticalItemWrapper,
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
    cardDetailedText,
    cardSubtitle,
    cardTitle,
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
    contentDetailsChildren,
    hasFocus,
  } = props;

  const handleOnActive = (offset: number) => {
    if (contentRef.current) {
      const { offsetTop, clientHeight } = contentRef.current;
      onActive(offsetTop + offset, offsetTop, clientHeight);
    }
  };

  const Title = useMemo(() => {
    return (
      <TimelineTitleWrapper
        className={className}
        alternateCards={alternateCards}
        mode={mode}
        hide={!title}
      >
        <TimelineItemTitle title={title} active={active} theme={theme} />
      </TimelineTitleWrapper>
    );
  }, [active]);

  const Content = useMemo(() => {
    return (
      <TimelineCardContentWrapper
        className={`${className} card-content-wrapper ${
          visible ? 'visible' : ''
        }`}
        alternateCards={alternateCards}
        noTitle={!title}
      >
        <TimelineCard
          active={active}
          branchDir={className}
          cardHeight={cardHeight}
          content={cardSubtitle}
          customContent={contentDetailsChildren}
          detailedText={cardDetailedText}
          id={id}
          media={media}
          mode={mode}
          onClick={onClick}
          onElapsed={onElapsed || function () {}}
          slideItemDuration={slideItemDuration}
          slideShowActive={slideShowRunning}
          theme={theme}
          title={cardTitle}
          hasFocus={hasFocus}
          onShowMore={() =>
            setTimeout(() => {
              handleOnActive(0);
            }, 100)
          }
        />
      </TimelineCardContentWrapper>
    );
  }, [hasFocus, slideShowRunning, active]);

  const Circle = useMemo(() => {
    return (
      <VerticalCircle
        active={active}
        alternateCards={alternateCards}
        className={className}
        id={id}
        mode={mode}
        onActive={handleOnActive}
        onClick={onClick}
        slideShowRunning={slideShowRunning}
        theme={theme}
      />
    );
  }, [slideShowRunning, active]);

  return (
    <VerticalItemWrapper
      className={`${className} ${visible ? 'visible' : ''} vertical-item-row`}
      key={index}
      ref={contentRef}
      data-testid="vertical-item-row"
      alternateCards={alternateCards}
      cardHeight={cardHeight}
      role="listitem"
    >
      {/* title */}
      {Title}

      {/* card section */}
      {Content}

      {/* Circle */}
      {Circle}
    </VerticalItemWrapper>
  );
};

export default VerticalItem;
