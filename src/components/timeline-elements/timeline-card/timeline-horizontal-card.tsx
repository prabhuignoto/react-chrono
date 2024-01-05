import { TimelineCardModel } from '@models/TimelineItemModel';
import cls from 'classnames';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import ReactDOM from 'react-dom';
import { GlobalContext } from '../../GlobalContext';
import TimelineCardContent from '../timeline-card-content/timeline-card-content';
import TimelineItemTitle from '../timeline-item-title/timeline-card-title';
import {
  Shape,
  ShapeWrapper,
  TimelineContentContainer,
  TimelineTitleContainer,
  Wrapper,
} from './timeline-horizontal-card.styles';

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
  const circleRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    mode,
    cardPositionHorizontal: position,
    timelinePointDimension,
    disableClickOnCircle,
    cardLess,
    showAllCardsHorizontal,
    classNames,
    theme,
    timelinePointShape,
    disableInteraction,
  } = useContext(GlobalContext);

  const handleClick = () => {
    if (!disableClickOnCircle && onClick && !slideShowRunning) {
      onClick(id);
    }
  };

  useEffect(() => {
    if (active) {
      const circle = circleRef.current;
      const wrapper = wrapperRef.current;

      if (circle && wrapper) {
        const circleOffsetLeft = circle.offsetLeft;
        const wrapperOffsetLeft = wrapper.offsetLeft;

        autoScroll?.({
          pointOffset: circleOffsetLeft + wrapperOffsetLeft,
          pointWidth: circle.clientWidth,
        });
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
        position === 'TOP' ? 'bottom' : 'top',
        showAllCardsHorizontal ? 'show-all' : '',
      ),
    [mode, position],
  );

  const titleClass = useMemo(() => cls(modeLower, position), []);

  const circleClass = useMemo(
    () =>
      cls(
        'timeline-circle',
        { 'using-icon': !!iconChild },
        modeLower,
        active ? 'active' : 'in-active',
      ),
    [active],
  );

  const Content = useMemo(() => {
    return (
      <TimelineContentContainer
        className={containerClass}
        ref={contentRef}
        id={`timeline-card-${id}`}
        theme={theme}
        $active={active && !disableInteraction}
        $highlight={showAllCardsHorizontal}
        tabIndex={0}
        $cardWidth={cardWidth}
      >
        <TimelineCardContent
          content={cardSubtitle}
          active={active}
          title={cardTitle}
          url={url}
          detailedText={cardDetailedText}
          onShowMore={handleOnShowMore}
          theme={theme}
          slideShowActive={slideShowRunning}
          media={media}
          onElapsed={onElapsed}
          id={id}
          customContent={customContent}
          hasFocus={hasFocus}
          onClick={onClick}
          timelineContent={timelineContent}
          isNested={isNested}
          nestedCardHeight={nestedCardHeight}
          items={items}
        />
      </TimelineContentContainer>
    );
  }, [active, slideShowRunning, JSON.stringify(theme)]);

  const showTimelineContent = () => {
    const ele = document.getElementById(wrapperId);

    if (ele) {
      return ReactDOM.createPortal(Content, ele);
    }
  };

  const canShowTimelineContent = useMemo(
    () => (active && !cardLess) || showAllCardsHorizontal,
    [active, cardLess, showAllCardsHorizontal],
  );

  return (
    <Wrapper ref={wrapperRef} className={modeLower} data-testid="timeline-item">
      {canShowTimelineContent && showTimelineContent()}

      <ShapeWrapper>
        <Shape
          className={circleClass}
          onClick={handleClick}
          ref={circleRef}
          data-testid="timeline-circle"
          theme={theme}
          aria-label={title}
          dimension={timelinePointDimension}
          $timelinePointShape={timelinePointShape}
        >
          {iconChild ? iconChild : null}
        </Shape>
      </ShapeWrapper>

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
