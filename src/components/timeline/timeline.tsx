import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useRef } from "react";
import { Scroll } from "../../models/TimelineCollnModel";
import { TimelineItemViewModel } from "../../models/TimelineItemModel";
import { TimelineModel } from "../../models/TimelineModel";
import useNewScrollPosition from "../effects/useNewScrollPosition";
import TimelineCollection from "../timeline-horizontal/timeline-horizontal";
import TimelineControl from "../timeline-elements/timeline-control/timeline-control";
import TimelineTree from "../timeline-tree/timeline-tree";
import {
  Outline,
  TimelineContentRender,
  TimelineControlContainer,
  TimelineMain,
  TimelineMainWrapper,
  Wrapper,
} from "./timeline.style";

const Timeline: React.FunctionComponent<TimelineModel> = (props) => {
  // de-structure the props
  const {
    activeTimelineItem,
    disableNavOnKey,
    itemWidth = 200,
    items,
    mode = "HORIZONTAL",
    onNext,
    onPrevious,
    onTimelineUpdated,
    slideShowRunning,
    onLast,
    onFirst,
    theme,
    titlePosition = "TOP",
    onRestartSlideshow,
    cardHeight,
    onMediaStateChange,
    slideShowEnabled,
    slideItemDuration,
  } = props;

  const [newOffSet, setNewOffset] = useNewScrollPosition(mode, itemWidth);
  
  // reference to the timeline
  const timelineMainRef = useRef<HTMLDivElement>(null);

  // generate a unique id for the timeline content
  const id = useRef(nanoid());
  
  // handlers for navigation
  const handleNext = () => onNext();
  const handlePrevious = () => onPrevious();
  const handleFirst = () => onFirst();
  const handleLast = () => onLast();

  // handler for keyboard navigation
  const handleKeySelection = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { keyCode } = event;

    if (
      (mode === "HORIZONTAL" && keyCode === 39) ||
      ((mode === "VERTICAL" || mode === "TREE") && keyCode === 40)
    ) {
      handleNext();
    } else if (
      (mode === "HORIZONTAL" && keyCode === 37) ||
      ((mode === "VERTICAL" || mode === "TREE") && keyCode === 38)
    ) {
      handlePrevious();
    } else if (keyCode === 36) {
      handleFirst();
    } else if (keyCode === 35) {
      handleLast();
    }
  };

  const handleTimelineItemClick = (id?: string) => {
    if (id && !slideShowRunning) {
      for (let idx = 0; idx < items.length; idx++) {
        if (items[idx].id === id) {
          onTimelineUpdated && onTimelineUpdated(idx);
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
    [setNewOffset]
  );

  useEffect(() => {
    const ele = timelineMainRef.current;
    if (!ele) {
      return;
    }
    if (mode === "HORIZONTAL") {
      ele.scrollLeft = newOffSet;
    } else {
      ele.scrollTop = newOffSet;
    }
  }, [newOffSet, mode]);

  // setup observer to hide/show timeline cards aka load on demand
  const observer = new IntersectionObserver(
    (entries) => {
      // helper functions to hide image/videos
      const hide = (ele: HTMLImageElement | HTMLVideoElement) =>
        (ele.style.display = "none");
      const show = (ele: HTMLImageElement | HTMLVideoElement) =>
        (ele.style.display = "block");

      entries.forEach((entry) => {
        const element = entry.target as HTMLDivElement;
        if (entry.isIntersecting) {
          // show img and video when visible.
          element.querySelectorAll("img").forEach(show);
          element.querySelectorAll("video").forEach(show);
          element
            .querySelectorAll(":scope > div")
            .forEach(
              (ele) => ((ele as HTMLDivElement).style.visibility = "visible")
            );
        } else {
          // hide img and video when not visible.
          element.querySelectorAll("img").forEach(hide);
          element.querySelectorAll("video").forEach(hide);
          element
            .querySelectorAll(":scope > div")
            .forEach(
              (ele) => ((ele as HTMLDivElement).style.visibility = "hidden")
            );
        }
      });
    },
    {
      root: timelineMainRef.current,
      threshold: 0,
    }
  );

  useEffect(() => {
    // setup observer for the timeline elements
    setTimeout(() => {
      const element = timelineMainRef.current;

      if (element) {
        const childElements = element.querySelectorAll(".branch-main");
        Array.from(childElements).forEach((elem) => observer.observe(elem));
      }
    }, 0);
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper
      tabIndex={0}
      onKeyDown={(evt: React.KeyboardEvent<HTMLDivElement>) =>
        !disableNavOnKey && !slideShowRunning ? handleKeySelection(evt) : null
      }
      className={`${mode.toLowerCase()} ${titlePosition?.toLowerCase()}`}
    >
      <TimelineMainWrapper ref={timelineMainRef} className={mode.toLowerCase()}>
        {/* TREE */}
        {mode === "TREE" ? (
          <TimelineTree
            items={items as TimelineItemViewModel[]}
            onClick={handleTimelineItemClick}
            activeTimelineItem={activeTimelineItem}
            autoScroll={handleScroll}
            theme={theme}
            slideShowRunning={slideShowRunning}
            mode={mode}
            cardHeight={cardHeight}
            onMediaStateChange={onMediaStateChange}
            slideItemDuration={slideItemDuration}
          />
        ) : null}

        {/* HORIZONTAL */}
        {mode === "HORIZONTAL" ? (
          <TimelineMain className={mode.toLowerCase()}>
            <Outline color={theme?.primary} />
            <TimelineCollection
              items={items as TimelineItemViewModel[]}
              itemWidth={itemWidth}
              handleItemClick={handleTimelineItemClick}
              autoScroll={handleScroll}
              mode={mode}
              wrapperId={id.current}
              theme={theme}
              slideShowRunning={slideShowRunning}
              cardHeight={cardHeight}
              onMediaStateChange={onMediaStateChange}
              slideItemDuration={slideItemDuration}
            />
          </TimelineMain>
        ) : null}

        {/* VERTICAL */}
        {mode === "VERTICAL" ? (
          <TimelineTree
            items={items as TimelineItemViewModel[]}
            onClick={handleTimelineItemClick}
            activeTimelineItem={activeTimelineItem}
            autoScroll={handleScroll}
            theme={theme}
            alternateCards={false}
            slideShowRunning={slideShowRunning}
            mode={mode}
            cardHeight={cardHeight}
            onMediaStateChange={onMediaStateChange}
            slideItemDuration={slideItemDuration}
          />
        ) : null}
      </TimelineMainWrapper>

      {/* Timeline Controls */}
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
        />
      </TimelineControlContainer>

      {/* placeholder to render timeline content for horizontal mode */}
      <TimelineContentRender id={id.current} />
    </Wrapper>
  );
};

export default Timeline;
