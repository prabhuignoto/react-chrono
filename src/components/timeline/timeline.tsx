import 'focus-visible';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Scroll } from '../../models/TimelineHorizontalModel';
import { TimelineCardModel } from '../../models/TimelineItemModel';
import { TimelineModel } from '../../models/TimelineModel';
import useNewScrollPosition from '../effects/useNewScrollPosition';
import { GlobalContext } from '../GlobalContext';
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
    contentDetailsChildren,
    iconChildren,
    items = [],
    onFirst,
    onLast,
    onNext,
    onPrevious,
    onRestartSlideshow,
    onTimelineUpdated,
    onItemSelected,
    onOutlineSelection,
    slideShowEnabled,
    slideShowRunning,
    theme,
  } = props;

  const {
    scrollable = true,
    mode = 'HORIZONTAL',
    hideControls,
    itemWidth = 200,
    disableNavOnKey,
    cardPositionHorizontal,
    onScrollEnd,
    enableOutline,
    lineWidth,
    flipLayout,
  } = useContext(GlobalContext);
  const [newOffSet, setNewOffset] = useNewScrollPosition(mode, itemWidth);
  const observer = useRef<IntersectionObserver | null>(null);
  const [hasFocus, setHasFocus] = useState(false);

  // reference to the timeline
  const timelineMainRef = useRef<HTMLDivElement>(null);

  const canScrollTimeline = useMemo(() => {
    if (!slideShowRunning) {
      if (typeof scrollable === 'boolean') {
        return scrollable;
      }

      if (typeof scrollable === 'object' && scrollable.scrollbar) {
        return scrollable.scrollbar;
      }
    }
  }, [slideShowRunning, scrollable]);

  const id = useRef('react-chrono-timeline');

  // handlers for navigation
  const handleNext = useCallback(
    () => hasFocus && onNext(),
    [hasFocus, onNext],
  );
  const handlePrevious = useCallback(
    () => hasFocus && onPrevious(),
    [hasFocus, onPrevious],
  );
  const handleFirst = useCallback(
    () => hasFocus && onFirst(),
    [hasFocus, onFirst],
  );
  const handleLast = useCallback(
    () => hasFocus && onLast(),
    [hasFocus, onLast],
  );

  // handler for keyboard navigation
  const handleKeySelection = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;

    if (mode === 'HORIZONTAL' && key === 'ArrowRight') {
      debugger;
      flipLayout ? handlePrevious() : handleNext();
    } else if (mode === 'HORIZONTAL' && key === 'ArrowLeft') {
      flipLayout ? handleNext() : handlePrevious();
    } else if (
      (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') &&
      key === 'ArrowDown'
    ) {
      handleNext();
    } else if (
      (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') &&
      key === 'ArrowUp'
    ) {
      handlePrevious();
    } else if (key === 'Home') {
      handleFirst();
    } else if (key === 'End') {
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

      const selectedItem = items.find((item) => item.id === id);

      if (selectedItem) {
        onItemSelected && onItemSelected(selectedItem);
      }
    }
  };

  useEffect(() => {
    if (items.length && items[activeTimelineItem]) {
      onItemSelected && onItemSelected(items[activeTimelineItem]);
    }
  }, [activeTimelineItem]);

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
  }, [newOffSet]);

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

    const toggleMedia = (elem: HTMLElement, state: string) => {
      elem
        .querySelectorAll('img,video')
        .forEach(
          (ele) =>
            ((ele as HTMLElement).style.visibility =
              state === 'hide' ? 'hidden' : 'visible'),
        );
    };

    if (mode !== 'HORIZONTAL') {
      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const element = entry.target as HTMLDivElement;
            if (entry.isIntersecting) {
              // show img and video when visible.
              toggleMedia(element, 'show');
            } else {
              // hide img and video when not visible.
              toggleMedia(element, 'hide');
              // pause YouTube embeds
              element.querySelectorAll('iframe').forEach((element) => {
                element.contentWindow?.postMessage(
                  '{"event":"command","func":"stopVideo","args":""}',
                  '*',
                );
              });
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
      tabIndex={0}
      onKeyDown={(evt: React.KeyboardEvent<HTMLDivElement>) => {
        !disableNavOnKey && !slideShowRunning ? handleKeySelection(evt) : null;
      }}
      className={`${mode.toLowerCase()} js-focus-visible focus-visible`}
      cardPositionHorizontal={cardPositionHorizontal}
      onMouseDownCapture={() => {
        setHasFocus(true);
      }}
    >
      <TimelineMainWrapper
        ref={timelineMainRef}
        scrollable={canScrollTimeline}
        className={`${mode.toLowerCase()} timeline-main-wrapper`}
        id="timeline-main-wrapper"
        theme={theme}
        mode={mode}
        onScroll={(ev) => {
          const target = ev.target as HTMLElement;
          let scrolled = 0;

          if (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') {
            scrolled = target.scrollTop + target.clientHeight;

            if (target.scrollHeight - scrolled < 1) {
              onScrollEnd && onScrollEnd();
            }
          } else {
            scrolled = target.scrollLeft + target.offsetWidth;

            if (target.scrollWidth === scrolled) {
              onScrollEnd && onScrollEnd();
            }
          }
        }}
      >
        {/* VERTICAL ALTERNATING */}
        {mode === 'VERTICAL_ALTERNATING' ? (
          <TimelineVertical
            activeTimelineItem={activeTimelineItem}
            autoScroll={handleScroll}
            contentDetailsChildren={contentDetailsChildren}
            hasFocus={hasFocus}
            iconChildren={iconChildren}
            items={items as TimelineCardModel[]}
            mode={mode}
            onClick={handleTimelineItemClick}
            onElapsed={(id?: string) => handleTimelineItemClick(id, true)}
            onOutlineSelection={onOutlineSelection}
            slideShowRunning={slideShowRunning}
            theme={theme}
            enableOutline={enableOutline}
          />
        ) : null}

        {/* HORIZONTAL */}
        {mode === 'HORIZONTAL' ? (
          <TimelineMain className={mode.toLowerCase()}>
            <Outline color={theme && theme.primary} height={lineWidth} />
            <TimelineHorizontal
              autoScroll={handleScroll}
              contentDetailsChildren={contentDetailsChildren}
              handleItemClick={handleTimelineItemClick}
              hasFocus={hasFocus}
              iconChildren={iconChildren}
              items={items as TimelineCardModel[]}
              mode={mode}
              onElapsed={(id?: string) => handleTimelineItemClick(id, true)}
              slideShowRunning={slideShowRunning}
              theme={theme}
              wrapperId={id.current}
            />
          </TimelineMain>
        ) : null}

        {/* VERTICAL */}
        {mode === 'VERTICAL' ? (
          <TimelineVertical
            activeTimelineItem={activeTimelineItem}
            alternateCards={false}
            autoScroll={handleScroll}
            contentDetailsChildren={contentDetailsChildren}
            hasFocus={hasFocus}
            iconChildren={iconChildren}
            items={items as TimelineCardModel[]}
            mode={mode}
            onClick={handleTimelineItemClick}
            onElapsed={(id?: string) => handleTimelineItemClick(id, true)}
            onOutlineSelection={onOutlineSelection}
            slideShowRunning={slideShowRunning}
            theme={theme}
            enableOutline={enableOutline}
          />
        ) : null}
      </TimelineMainWrapper>

      {/* Timeline Controls */}
      {!hideControls && (
        <TimelineControlContainer mode={mode}>
          <TimelineControl
            disableLeft={
              flipLayout
                ? activeTimelineItem === items.length - 1
                : activeTimelineItem === 0
            }
            disableRight={
              flipLayout
                ? activeTimelineItem === 0
                : activeTimelineItem === items.length - 1
            }
            id={id.current}
            onFirst={handleFirst}
            onLast={handleLast}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onReplay={onRestartSlideshow}
            slideShowEnabled={slideShowEnabled}
            slideShowRunning={slideShowRunning}
            theme={theme}
          />
        </TimelineControlContainer>
      )}

      {/* placeholder to render timeline content for horizontal mode */}
      <TimelineContentRender id={id.current} />
    </Wrapper>
  );
};

export default Timeline;
