import { Scroll } from '@models/TimelineHorizontalModel';
import { TimelineCardModel } from '@models/TimelineItemModel';
import { TimelineModel } from '@models/TimelineModel';
import { getUniqueID } from '@utils/index';
import cls from 'classnames';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { GlobalContext } from '../GlobalContext';
import { useMatchMedia } from '../effects/useMatchMedia';
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
    mode = 'HORIZONTAL',
    enableOutline = false,
    hideControls = false,
    nestedCardHeight,
    isChild = false,
    onPaused,
    uniqueId,
    noUniqueId,
  } = props;

  const {
    cardPositionHorizontal,
    disableNavOnKey,
    flipLayout,
    itemWidth = 200,
    lineWidth,
    onScrollEnd,
    scrollable = true,
    showAllCardsHorizontal,
    theme,
    darkMode,
    toggleDarkMode,
    verticalBreakPoint = 768,
    enableBreakPoint,
  } = useContext(GlobalContext);

  const [newOffSet, setNewOffset] = useNewScrollPosition(mode, itemWidth);
  const observer = useRef<IntersectionObserver | null>(null);
  const [hasFocus, setHasFocus] = useState(false);
  const horizontalContentRef = useRef<HTMLDivElement | null>(null);
  const [timelineMode, setTimelineMode] = useState(mode);

  const activeItemIndex = useRef<number>(activeTimelineItem);

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

  const id = useRef(
    `react-chrono-timeline-${noUniqueId ? uniqueId : getUniqueID()}`,
  );

  useMatchMedia(
    `(min-width: 100px) and (max-width: ${verticalBreakPoint}px)`,
    () => {
      if (mode === 'VERTICAL_ALTERNATING') {
        setTimelineMode('VERTICAL');
      }
    },
    enableBreakPoint,
  );

  useMatchMedia(
    `(min-width: ${verticalBreakPoint + 1}px)`,
    () => {
      setTimelineMode(mode);
    },
    enableBreakPoint,
  );

  // handlers for navigation
  const handleNext = useCallback(() => {
    if (hasFocus) {
      activeItemIndex.current = Math.min(
        activeItemIndex.current + 1,
        items.length - 1,
      );
      onNext?.();
    }
  }, [hasFocus, onNext]);

  const handlePrevious = useCallback(() => {
    if (hasFocus) {
      activeItemIndex.current = Math.max(activeItemIndex.current - 1, 0);
      onPrevious?.();
    }
  }, [hasFocus, onPrevious]);

  const handleFirst = useCallback(() => {
    if (hasFocus) {
      activeItemIndex.current = 0;
      onFirst?.();
    }
  }, [hasFocus, onFirst]);

  const handleLast = useCallback(() => {
    if (hasFocus) {
      activeItemIndex.current = items.length - 1;
      onLast?.();
    }
  }, [hasFocus, onLast]);

  // handler for keyboard navigation
  const handleKeySelection = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const { key } = event;

      if (mode === 'HORIZONTAL' && key === 'ArrowRight') {
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
    },
    [handleNext, handlePrevious, handleLast],
  );

  const handleTimelineItemClick = (itemId?: string, isSlideShow?: boolean) => {
    if (itemId) {
      for (let idx = 0; idx < items.length; idx++) {
        if (items[idx].id === itemId) {
          activeItemIndex.current = idx;
          if (isSlideShow && idx < items.length - 1) {
            onTimelineUpdated?.(idx + 1);
          } else {
            onTimelineUpdated?.(idx);
          }
          break;
        }
      }

      // const selectedItem = items.find((item) => item.id === itemId);

      // if (selectedItem) {
      //   onItemSelected?.(selectedItem);
      // }
    }
  };

  useEffect(() => {
    const activeItem = items[activeTimelineItem || 0];

    if (slideShowRunning) {
      activeItemIndex.current = activeTimelineItem;
    }

    if (items.length && activeItem) {
      // const item = items[activeItem];
      const { title, cardTitle, cardSubtitle, cardDetailedText } = activeItem;
      onItemSelected?.({
        cardDetailedText,
        cardSubtitle,
        cardTitle,
        index: activeItemIndex.current,
        title,
      });

      if (mode === 'HORIZONTAL') {
        const card = horizontalContentRef.current?.querySelector(
          `#timeline-card-${activeItem.id}`,
        );

        const cardRect = card?.getBoundingClientRect();
        const contentRect =
          horizontalContentRef.current?.getBoundingClientRect();

        if (cardRect && contentRect) {
          const { width: cardWidth, left: cardLeft } = cardRect;
          const { width: contentWidth, left: contentLeft } = contentRect;
          setTimeout(() => {
            const ele = horizontalContentRef.current as HTMLElement;
            ele.style.scrollBehavior = 'smooth';
            ele.scrollLeft +=
              cardLeft - contentLeft + cardWidth / 2 - contentWidth / 2;
          }, 100);
        }
      }
    }
  }, [activeTimelineItem, items.length, slideShowRunning]);

  const handleScroll = (scroll: Partial<Scroll>) => {
    const element = timelineMainRef.current;
    if (element) {
      setNewOffset(element, scroll);
    }
  };

  useEffect(() => {
    const ele = timelineMainRef.current;
    if (!ele) {
      return;
    }
    if (mode === 'HORIZONTAL') {
      ele.scrollLeft = Math.max(newOffSet, 0);
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

  const handleKeyDown = useCallback(
    (evt: React.KeyboardEvent<HTMLDivElement>) => {
      if (!disableNavOnKey && !slideShowRunning) {
        setHasFocus(true);
        handleKeySelection(evt);
      }
    },
    [disableNavOnKey, slideShowRunning, handleKeySelection],
  );

  const wrapperClass = useMemo(() => {
    return cls(mode.toLocaleLowerCase(), {
      'focus-visible': !isChild,
      'js-focus-visible': !isChild,
    });
  }, [mode, isChild]);

  return (
    <Wrapper
      onKeyDown={handleKeyDown}
      className={wrapperClass}
      cardPositionHorizontal={cardPositionHorizontal}
      onMouseDown={() => {
        setHasFocus(true);
      }}
      $hideControls={hideControls}
      onKeyUp={(evt) => {
        if (evt.key === 'Escape') {
          onPaused?.();
        }
      }}
    >
      <TimelineMainWrapper
        ref={timelineMainRef}
        $scrollable={canScrollTimeline}
        className={`${mode.toLowerCase()} timeline-main-wrapper`}
        id="timeline-main-wrapper"
        data-testid="timeline-main-wrapper"
        theme={theme}
        mode={mode}
        onScroll={(ev) => {
          const target = ev.target as HTMLElement;
          let scrolled = 0;

          if (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') {
            scrolled = target.scrollTop + target.clientHeight;

            if (target.scrollHeight - scrolled < 1) {
              onScrollEnd?.();
            }
          } else {
            scrolled = target.scrollLeft + target.offsetWidth;

            if (target.scrollWidth === scrolled) {
              onScrollEnd?.();
            }
          }
        }}
      >
        {/* VERTICAL ALTERNATING */}
        {timelineMode === 'VERTICAL_ALTERNATING' ? (
          <TimelineVertical
            activeTimelineItem={activeTimelineItem}
            autoScroll={handleScroll}
            contentDetailsChildren={contentDetailsChildren}
            hasFocus={hasFocus}
            iconChildren={iconChildren}
            items={items as TimelineCardModel[]}
            mode={timelineMode}
            onClick={handleTimelineItemClick}
            onElapsed={(itemId?: string) =>
              handleTimelineItemClick(itemId, true)
            }
            onOutlineSelection={onOutlineSelection}
            slideShowRunning={slideShowRunning}
            theme={theme}
            enableOutline={enableOutline}
            nestedCardHeight={nestedCardHeight}
          />
        ) : null}

        {/* HORIZONTAL */}
        {timelineMode === 'HORIZONTAL' ? (
          <TimelineMain className={mode.toLowerCase()}>
            <Outline color={theme && theme.primary} height={lineWidth} />
            <TimelineHorizontal
              autoScroll={handleScroll}
              contentDetailsChildren={contentDetailsChildren}
              handleItemClick={handleTimelineItemClick}
              hasFocus={hasFocus}
              iconChildren={iconChildren}
              items={items as TimelineCardModel[]}
              mode={timelineMode}
              onElapsed={(itemId?: string) =>
                handleTimelineItemClick(itemId, true)
              }
              slideShowRunning={slideShowRunning}
              wrapperId={id.current}
              nestedCardHeight={nestedCardHeight}
            />
          </TimelineMain>
        ) : null}

        {/* VERTICAL */}
        {timelineMode === 'VERTICAL' ? (
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
            onElapsed={(itemId?: string) =>
              handleTimelineItemClick(itemId, true)
            }
            onOutlineSelection={onOutlineSelection}
            slideShowRunning={slideShowRunning}
            theme={theme}
            enableOutline={enableOutline}
            nestedCardHeight={nestedCardHeight}
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
            isDark={darkMode}
            onToggleDarkMode={toggleDarkMode}
            onPaused={onPaused}
          />
        </TimelineControlContainer>
      )}

      {/* placeholder to render timeline content for horizontal mode */}
      <TimelineContentRender
        id={id.current}
        $showAllCards={showAllCardsHorizontal}
        ref={horizontalContentRef}
      />
    </Wrapper>
  );
};

Timeline.displayName = 'Timeline';

export default Timeline;
