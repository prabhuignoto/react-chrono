import { VerticalItemModel } from '@models/TimelineVerticalModel';
import cls from 'classnames';
import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { GlobalContext } from '../GlobalContext';
import TimelineCard from '../timeline-elements/timeline-card-content/timeline-card-content';
import TimelineItemTitle from '../timeline-elements/timeline-item-title/timeline-card-title';
import { TimelinePoint } from './timeline-point';
import {
  TimelineCardContentWrapper,
  TimelineTitleWrapper,
  VerticalItemWrapper,
} from './timeline-vertical.styles';

/**
 * VerticalItem
 * @property {boolean} active - Whether the vertical item is active.
 * @property {boolean} alternateCards - Whether to alternate cards.
 * @property {string} cardDetailedText - The detailed text of the card.
 * @property {string} cardSubtitle - The subtitle of the card.
 * @property {string} cardTitle - The title of the card.
 * @property {string} url - The URL of the card.
 * @property {string} urlClassName - Class applied to title, if title is url
 * @property {string} className - The class name for the component.
 * @property {React.ReactNode} contentDetailsChildren - The content details children nodes.
 * @property {React.ReactNode} iconChild - The icon child nodes.
 * @property {boolean} hasFocus - Whether the vertical item has focus.
 * @property {string} id - The id of the vertical item.
 * @property {React.ReactNode} media - The media nodes.
 * @property {() => void} onActive - Function to handle active event.
 * @property {() => void} onClick - Function to handle click event.
 * @property {() => void} onElapsed - Function to handle elapsed event.
 * @property {boolean} slideShowRunning - Whether the slideshow is running.
 * @property {string} title - The title of the vertical item.
 * @property {boolean} visible - Whether the vertical item is visible.
 * @property {React.ReactNode} timelineContent - The timeline content nodes.
 * @property {Array} items - The items of the vertical item.
 * @property {boolean} isNested - Whether the vertical item is nested.
 * @property {number} nestedCardHeight - The height of the nested card.
 * @returns {JSX.Element} The VerticalItem component.
 */
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
    urlClassName,
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

  // handler for onActive
  const handleOnActive = useCallback(
    (offset: number) => {
      if (contentRef.current) {
        const { offsetTop, clientHeight } = contentRef.current;
        onActive(offsetTop + offset, offsetTop, clientHeight);
      }
    },
    [onActive],
  );

  // handler for read more
  const handleShowMore = useCallback(() => {
    setTimeout(() => {
      handleOnActive(0);
    }, 100);
  }, [handleOnActive]);

  // timeline title
  const Title = useMemo(() => {
    return (
      <TimelineTitleWrapper
        className={className}
        $alternateCards={alternateCards}
        mode={mode}
        $hide={!title}
        $flip={flipLayout}
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
  }, [
    active,
    title,
    className,
    alternateCards,
    mode,
    flipLayout,
    theme,
    classNames,
  ]);

  const verticalItemClass = useMemo(
    () =>
      cls({ [className]: true }, 'vertical-item-row', visible ? 'visible' : ''),
    [className, visible],
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
    [
      slideShowRunning,
      active,
      alternateCards,
      className,
      id,
      mode,
      handleOnActive,
      onClick,
      iconChild,
      timelinePointDimension,
      lineWidth,
      disableClickOnCircle,
      cardLess,
    ],
  );

  return (
    <VerticalItemWrapper
      $alternateCards={alternateCards}
      $cardHeight={isNested ? nestedCardHeight : cardHeight}
      className={verticalItemClass}
      data-testid="vertical-item-row"
      key={id}
      ref={contentRef}
      $cardLess={cardLess}
      role="listitem"
      $isNested={isNested}
      theme={theme}
    >
      {/* title */}
      {!isNested ? Title : null}

      {/* card section */}
      <TimelineCardContentWrapper
        className={contentClass}
        $alternateCards={alternateCards}
        $noTitle={!title}
        $flip={flipLayout}
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
            urlClassName={urlClassName}
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
