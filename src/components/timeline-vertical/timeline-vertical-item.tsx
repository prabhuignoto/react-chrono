import cls from 'classnames';
import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { VerticalItemModel } from '../../models/TimelineVerticalModel';
import { GlobalContext } from '../GlobalContext';
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
    cardDetailedText,
    cardSubtitle,
    cardTitle,
    className,
    contentDetailsChildren,
    iconChild,
    hasFocus,
    id,
    index,
    media,
    onActive,
    onClick,
    onElapsed,
    slideShowRunning,
    theme,
    title,
    visible,
  } = props;

  const handleOnActive = (offset: number) => {
    if (contentRef.current) {
      const { offsetTop, clientHeight } = contentRef.current;
      onActive(offsetTop + offset, offsetTop, clientHeight);
    }
  };

  const { cardHeight, mode, flipLayout } = useContext(GlobalContext);

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
        />
      </TimelineTitleWrapper>
    );
  }, [active]);

  const verticalItemClass = useMemo(
    () =>
      cls({ [className]: true }, 'vertical-item-row', visible ? 'visible' : ''),
    [],
  );

  // timeline card content
  const Content = useMemo(() => {
    const contentClass = cls('card-content-wrapper', visible ? 'visible' : '', {
      [className]: true,
    });
    return (
      <TimelineCardContentWrapper
        className={contentClass}
        alternateCards={alternateCards}
        noTitle={!title}
        flip={flipLayout}
      >
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
        />
      </TimelineCardContentWrapper>
    );
  }, [hasFocus, slideShowRunning, active]);

  // timeline circle
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
        iconChild={iconChild}
        theme={theme}
      />
    );
  }, [slideShowRunning, active]);

  return (
    <VerticalItemWrapper
      alternateCards={alternateCards}
      cardHeight={cardHeight}
      className={verticalItemClass}
      data-testid="vertical-item-row"
      key={index}
      ref={contentRef}
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
