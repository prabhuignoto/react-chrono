import 'focus-visible';
import { nanoid } from 'nanoid';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Scroll } from '../../models/TimelineHorizontalModel';
import { TimelineCardModel } from '../../models/TimelineItemModel';
import { TimelineModel } from '../../models/TimelineModel';
import useNewScrollPosition from '../effects/useNewScrollPosition';
import TimelineControl from '../timeline-elements/timeline-control/timeline-control';
import TimelineHorizontal from '../timeline-horizontal/timeline-horizontal';
import TimelineVertical from '../timeline-vertical/timeline-vertical';
import {
  Outline,
  TimelineContentRender,
  TimelineControlContainer,
  TimelineMain,
  TimelineMainWrapper,
  Wrapper,
} from './timeline.style';

const Timeline: React.FunctionComponent<TimelineModel> = (
  props: TimelineModel,
) => {
  // de-structure the props
  const {
    activeTimelineItem,
    disableNavOnKey,
    itemWidth = 200,
    items = [],
    mode = 'HORIZONTAL',
    onNext,
    onPrevious,
    onTimelineUpdated,
    slideShowRunning,
    onLast,
    onFirst,
    theme,
    onRestartSlideshow,
    cardHeight,
    slideShowEnabled,
    slideItemDuration,
    hideControls,
    scrollable,
    cardPositionHorizontal,
    contentDetailsChildren,
  } = props;

  const [newOffSet, setNewOffset] = useNewScrollPosition(mode, itemWidth);
  const observer = useRef<IntersectionObserver | null>(null);

  // reference to the timeline
  const timelineMainRef = useRef<HTMLDivElement>(null);

  const canScrollTimeline = useMemo(() => {
    if (!slideShowRunning) {
      return scrollable;
    }
  }, [slideShowRunning, scrollable]);

  // generate a unique id for the timeline content
  const id = useRef(nanoid());

  // handlers for navigation
  const handleNext = () => onNext();
  const handlePrevious = () => onPrevious();
  const handleFirst = () => onFirst();
  const handleLast = () => onLast();

  // handler for keyboard navigation
  const handleKeySelection = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;

    if (
      (mode === 'HORIZONTAL' && keyCode === 39) ||
      ((mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') &&
        keyCode === 40)
    ) {
      handleNext();
    } else if (
      (mode === 'HORIZONTAL' && keyCode === 37) ||
      ((mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') &&
        keyCode === 38)
    ) {
      handlePrevious();
    } else if (keyCode === 36) {
      handleFirst();
    } else if (keyCode === 35) {
      handleLast();
    }
  };

  const handleTimelineItemClick = (id?: string, isSlideShow?: boolean) => {
    if (id) {
      for (let idx = 0; idx < items.length; idx++) {
        if (items[idx].id === id) {
          if (isSlideShow && idx < items.length - 1) {
            onTimelineUpdated(idx + 1);
          } else {
            onTimelineUpdated(idx);
          }
          break;
        }
      }
    }
  };

  const handleScroll = useCallback(
    (scroll: Partial<Scroll>) => {
      const element = timelineMainRef.current;
      if (element) {
        setNewOffset(element, scroll);
      }
    },
    [setNewOffset],
  );

  useEffect(() => {
    const ele = timelineMainRef.current;
    if (!ele) {
      return;
    }
    if (mode === 'HORIZONTAL') {
      ele.scrollLeft = newOffSet;
    } else {
      ele.scrollTop = newOffSet;
    }
  }, [newOffSet, mode]);

  useEffect(() => {
    // setup observer for the timeline elements
    setTimeout(() => {
      const element = timelineMainRef.current;

      if (element) {
        const childElements = element.querySelectorAll('.vertical-item-row');
        Array.from(childElements).forEach((elem) => {
          if (observer.current) {
            observer.current.observe(elem);
          }
        });
      }
    }, 0);

    if (mode !== 'HORIZONTAL') {
      observer.current = new IntersectionObserver(
        (entries) => {
          // helper functions to hide image/videos
          const hide = (ele: HTMLImageElement | HTMLVideoElement) =>
            (ele.style.visibility = 'hidden');
          const show = (ele: HTMLImageElement | HTMLVideoElement) =>
            (ele.style.visibility = 'visible');

          entries.forEach((entry) => {
            const element = entry.target as HTMLDivElement;
            if (entry.isIntersecting) {
              // show img and video when visible.
              element.querySelectorAll('img').forEach(show);
              element.querySelectorAll('video').forEach(show);
              // element
              //   .querySelectorAll(':scope > div')
              //   .forEach(
              //     (ele) =>
              //       ((ele as HTMLDivElement).style.visibility = 'visible'),
              //   );
            } else {
              // hide img and video when not visible.
              element.querySelectorAll('img').forEach(hide);
              element.querySelectorAll('video').forEach(hide);
              // element
              //   .querySelectorAll(':scope > div')
              //   .forEach(
              //     (ele) =>
              //       ((ele as HTMLDivElement).style.visibility = 'hidden'),
              //   );
            }
          });
        },
        {
          root: timelineMainRef.current,
          threshold: 0,
        },
      );
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper
      onKeyDown={(evt: React.KeyboardEvent<HTMLDivElement>) =>
        !disableNavOnKey && !slideShowRunning ? handleKeySelection(evt) : null
      }
      className={`${mode.toLowerCase()} js-focus-visible focus-visible`}
      cardPositionHorizontal={cardPositionHorizontal}
    >
      <TimelineMainWrapper
        ref={timelineMainRef}
        scrollable={canScrollTimeline}
        className={`${mode.toLowerCase()} timeline-main-wrapper`}
        id="timeline-main-wrapper"
        theme={theme}
      >
        {/* VERTICAL ALTERNATING */}
        {mode === 'VERTICAL_ALTERNATING' ? (
          <TimelineVertical
            items={items as TimelineCardModel[]}
            onClick={handleTimelineItemClick}
            activeTimelineItem={activeTimelineItem}
            autoScroll={handleScroll}
            theme={theme}
            slideShowRunning={slideShowRunning}
            mode={mode}
            cardHeight={cardHeight}
            slideItemDuration={slideItemDuration}
            contentDetailsChildren={contentDetailsChildren}
            onElapsed={(id?: string) => handleTimelineItemClick(id, true)}
          />
        ) : null}

        {/* HORIZONTAL */}
        {mode === 'HORIZONTAL' ? (
          <TimelineMain className={mode.toLowerCase()}>
            <Outline color={theme && theme.primary} />
            <TimelineHorizontal
              items={items as TimelineCardModel[]}
              itemWidth={itemWidth}
              handleItemClick={handleTimelineItemClick}
              autoScroll={handleScroll}
              mode={mode}
              wrapperId={id.current}
              theme={theme}
              slideShowRunning={slideShowRunning}
              cardHeight={cardHeight}
              slideItemDuration={slideItemDuration}
              onElapsed={(id?: string) => handleTimelineItemClick(id, true)}
              contentDetailsChildren={contentDetailsChildren}
            />
          </TimelineMain>
        ) : null}

        {/* VERTICAL */}
        {mode === 'VERTICAL' ? (
          <TimelineVertical
            items={items as TimelineCardModel[]}
            onClick={handleTimelineItemClick}
            activeTimelineItem={activeTimelineItem}
            autoScroll={handleScroll}
            theme={theme}
            alternateCards={false}
            slideShowRunning={slideShowRunning}
            mode={mode}
            cardHeight={cardHeight}
            slideItemDuration={slideItemDuration}
            contentDetailsChildren={contentDetailsChildren}
            onElapsed={(id?: string) => handleTimelineItemClick(id, true)}
          />
        ) : null}
      </TimelineMainWrapper>

      {/* placeholder to render timeline content for horizontal mode */}
      <TimelineContentRender id={id.current} />

      {/* Timeline Controls */}
      {!hideControls && (
        <TimelineControlContainer mode={mode}>
          <TimelineControl
            onNext={handleNext}
            onPrevious={handlePrevious}
            onFirst={handleFirst}
            onLast={handleLast}
            disableLeft={activeTimelineItem === 0}
            disableRight={activeTimelineItem === items.length - 1}
            mode={mode}
            theme={theme}
            onReplay={onRestartSlideshow}
            slideShowRunning={slideShowRunning}
            slideShowEnabled={slideShowEnabled}
            id={id.current}
          />
        </TimelineControlContainer>
      )}
    </Wrapper>
  );
};

export default Timeline;
