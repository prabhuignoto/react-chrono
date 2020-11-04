import cls from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import { TimelineCardModel } from '../../../models/TimelineItemModel';
import TimelineCardContent from '../timeline-card-content/timeline-card-content';
import TimelineItemTitle from '../timeline-item-title/timeline-card-title';
import {
  Circle,
  CircleWrapper,
  TimelineContentContainer,
  TimelineTitleContainer,
  Wrapper,
} from './timeline-card.styles';

const TimelineCard: React.FunctionComponent<TimelineCardModel> = ({
  active,
  autoScroll,
  cardHeight,
  cardDetailedText,
  cardSubtitle,
  cardTitle,
  id,
  media,
  mode,
  onClick,
  onElapsed,
  position,
  slideItemDuration,
  slideShowRunning,
  theme,
  title,
  wrapperId,
  customContent,
}: TimelineCardModel) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (onClick && !slideShowRunning) {
      onClick(id);
    }
  };

  useEffect(() => {
    if (active) {
      const circle = circleRef.current;
      const wrapper = wrapperRef.current;
      const content = contentRef.current;

      if (circle && wrapper) {
        const circleOffsetLeft = circle.offsetLeft;
        const wrapperOffsetLeft = wrapper.offsetLeft;
        const circleOffsetTop = circle.offsetLeft;
        const wrapperOffsetTop = wrapper.offsetTop;

        if (mode === 'HORIZONTAL') {
          autoScroll({
            timelinePointOffset: circleOffsetLeft + wrapperOffsetLeft,
            timelinePointWidth: circle.clientWidth,
          });
        } else {
          autoScroll({
            timelinePointOffset: circleOffsetTop + wrapperOffsetTop,
            timelinePointHeight: circle.clientHeight,
            timelineContentHeight: content ? content.clientHeight : 0,
            timelineContentOffset: wrapperOffsetTop,
          });
        }
      }
    }
  }, [active, autoScroll, mode]);

  const handleOnShowMore = useCallback(() => {}, []);

  const modeLower = useMemo(() => mode?.toLowerCase(), [mode]);

  const containerClass = useMemo(
    () =>
      cls(
        'timeline-horz-card-wrapper',
        modeLower,
        position === 'top' ? 'bottom' : 'top',
      ),
    [mode, position],
  );

  const titleClass = useMemo(() => cls(modeLower, position), []);

  const circleClass = useMemo(
    () => cls('timeline-circle', modeLower, active ? 'active' : 'in-active'),
    [active],
  );

  const timelineContent = () => {
    return (
      <TimelineContentContainer className={containerClass} ref={contentRef}>
        <TimelineCardContent
          content={cardSubtitle}
          active={active}
          title={cardTitle}
          detailedText={cardDetailedText}
          onShowMore={handleOnShowMore}
          theme={theme}
          slideShowActive={slideShowRunning}
          media={media}
          mode={mode}
          cardHeight={cardHeight}
          slideItemDuration={slideItemDuration}
          onElapsed={onElapsed}
          id={id}
          customContent={customContent}
        />
      </TimelineContentContainer>
    );
  };

  const showTimelineContent = () => {
    const ele = document.getElementById(wrapperId);

    if (ele) {
      return ReactDOM.createPortal(timelineContent(), ele);
    }
  };

  return (
    <Wrapper ref={wrapperRef} className={modeLower} data-testid="timeline-item">
      {active ? showTimelineContent() : null}

      <CircleWrapper>
        <Circle
          className={circleClass}
          onClick={handleClick}
          ref={circleRef}
          data-testid="timeline-circle"
          theme={theme}
          aria-label={title}
        ></Circle>
      </CircleWrapper>

      <TimelineTitleContainer
        className={titleClass}
        data-testid="timeline-title"
      >
        <TimelineItemTitle title={title} active={active} theme={theme} />
      </TimelineTitleContainer>
    </Wrapper>
  );
};

export default TimelineCard;
