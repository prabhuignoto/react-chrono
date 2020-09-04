import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useRef } from "react";
import { Scroll } from "../../models/TimelineCollnModel";
import { TimelineItemViewModel } from "../../models/TimelineItemModel";
import { TimelineModel } from "../../models/TimelineModel";
import useNewScrollPosition from "../effects/useNewScrollPosition";
import TimelineCollection from "../timeline-collection/timeline-collection";
import TimelineControl from "../timeline-control/timeline-control";
import TimelineTree from "../timeline-tree/timeline-tree";
import {
  Outline,
  TimelineContentRender,
  TimelineControlContainer,
  TimelineMain,
  TimelineMainWrapper,
  Wrapper,
} from "./timeline.style";

const Timeline: React.FunctionComponent<TimelineModel> = ({
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
  titlePosition,
}) => {
  const [newOffSet, setNewOffset] = useNewScrollPosition(mode, itemWidth);

  const timelineMainRef = useRef<HTMLDivElement>(null);
  const id = useRef(nanoid());

  const handleNext = () => {
    onNext();
  };

  const handlePrevious = () => {
    onPrevious();
  };

  const handleFirst = () => {
    onFirst();
  };

  const handleLast = () => {
    onLast();
  };

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

  return (
    <Wrapper
      tabIndex={0}
      onKeyDown={(evt) => (!disableNavOnKey ? handleKeySelection(evt) : null)}
      className={`${mode.toLowerCase()} ${titlePosition?.toLowerCase()}`}
    >
      <TimelineMainWrapper ref={timelineMainRef} className={mode.toLowerCase()}>
        {mode === "TREE" ? (
          <TimelineTree
            items={items as TimelineItemViewModel[]}
            onClick={handleTimelineItemClick}
            activeTimelineItem={activeTimelineItem}
            autoScroll={handleScroll}
            theme={theme}
            slideShowRunning={slideShowRunning}
          />
        ) : null}
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
            />
          </TimelineMain>
        ) : null}
        {mode === "VERTICAL" ? (
          <TimelineTree
            items={items as TimelineItemViewModel[]}
            onClick={handleTimelineItemClick}
            activeTimelineItem={activeTimelineItem}
            autoScroll={handleScroll}
            theme={theme}
            alternateCards={false}
            slideShowRunning={slideShowRunning}
          />
        ) : null}
      </TimelineMainWrapper>
      <TimelineControlContainer className={slideShowRunning ? "hide" : "show"}>
        <TimelineControl
          onNext={handleNext}
          onPrevious={handlePrevious}
          disableLeft={activeTimelineItem === 0}
          disableRight={activeTimelineItem === items.length - 1}
        />
      </TimelineControlContainer>
      <TimelineContentRender id={id.current} />
    </Wrapper>
  );
};

export default Timeline;
