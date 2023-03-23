import cls from 'classnames';
import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { VerticalItemModel } from '../../models/TimelineVerticalModel';
import { GlobalContext } from '../GlobalContext';
import TimelineCard from '../timeline-elements/timeline-card-content/timeline-card-content';
import TimelineItemTitle from '../timeline-elements/timeline-item-title/timeline-card-title';
import { TimelinePoint } from './timeline-point';
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
    cardDetailedText,
    cardSubtitle,
    cardTitle,
    url,
    className,
    contentDetailsChildren,
    iconChild,
    hasFocus,
    id,
    media,
    onActive,
    onClick,
    onElapsed,
    slideShowRunning,
    title,
    visible,
    timelineContent,
    items,
    isNested,
    nestedCardHeight,
  } = props;

  const handleOnActive = (offset: number) => {
    if (contentRef.current) {
      const { offsetTop, clientHeight } = contentRef.current;
      onActive(offsetTop + offset, offsetTop, clientHeight);
    }
  };

  const {
    cardHeight,
    mode,
    flipLayout,
    timelinePointDimension,
    lineWidth,
    disableClickOnCircle,
    cardLess,
    theme,
    classNames,
    textOverlay,
    mediaHeight,
  } = useContext(GlobalContext);

  // handler for read more
  const handleShowMore = useCallback(() => {
    setTimeout(() => {
      handleOnActive(0);
    }, 100);
  }, []);

  // timeline title
  const Title = useMemo(() => {
    return (
      <TimelineTitleWrapper
        className={className}
        alternateCards={alternateCards}
        mode={mode}
        hide={!title}
        flip={flipLayout}
      >
        <TimelineItemTitle
          title={title}
          active={active}
          theme={theme}
          align={flipLayout ? 'left' : 'right'}
          classString={classNames?.title}
        />
      </TimelineTitleWrapper>
    );
  }, [active]);

  const verticalItemClass = useMemo(
    () =>
      cls({ [className]: true }, 'vertical-item-row', visible ? 'visible' : ''),
    [],
  );

  const contentClass = cls('card-content-wrapper', visible ? 'visible' : '', {
    [className]: true,
  });

  // timeline circle
  const TimelinePointMemo = useMemo(
    () => (
      <TimelinePoint
        active={active}
        alternateCards={alternateCards}
        className={className}
        id={id}
        mode={mode}
        onActive={handleOnActive}
        onClick={onClick}
        slideShowRunning={slideShowRunning}
        iconChild={iconChild}
        timelinePointDimension={timelinePointDimension}
        lineWidth={lineWidth}
        disableClickOnCircle={disableClickOnCircle}
        cardLess={cardLess}
      />
    ),
    [slideShowRunning, active],
  );

  return (
    <VerticalItemWrapper
      alternateCards={alternateCards}
      cardHeight={isNested ? nestedCardHeight : cardHeight}
      className={verticalItemClass}
      data-testid="vertical-item-row"
      key={id}
      ref={contentRef}
      cardLess={cardLess}
      role="listitem"
      isNested={isNested}
      theme={theme}
    >
      {/* title */}
      {!isNested ? Title : null}

      {/* card section */}
      <TimelineCardContentWrapper
        className={contentClass}
        alternateCards={alternateCards}
        noTitle={!title}
        flip={flipLayout}
        height={textOverlay ? mediaHeight : cardHeight}
      >
        {!cardLess ? (
          // <span></span>
          <TimelineCard
            active={active}
            branchDir={className}
            content={cardSubtitle}
            customContent={contentDetailsChildren}
            detailedText={cardDetailedText}
            hasFocus={hasFocus}
            id={id}
            media={media}
            onClick={onClick}
            onElapsed={onElapsed}
            onShowMore={handleShowMore}
            slideShowActive={slideShowRunning}
            theme={theme}
            title={cardTitle}
            url={url}
            flip={flipLayout}
            timelineContent={timelineContent}
            items={items}
            isNested={isNested}
            nestedCardHeight={nestedCardHeight}
          />
        ) : null}
      </TimelineCardContentWrapper>
      {!isNested ? TimelinePointMemo : null}
    </VerticalItemWrapper>
  );
};

VerticalItem.displayName = 'VerticalItem';

export default VerticalItem;
