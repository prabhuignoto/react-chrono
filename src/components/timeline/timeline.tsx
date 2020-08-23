import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import useNewScrollPosition from "../effects/useNewScrollPosition";
import { Scroll } from "../models/TimelineCollnModel";
import { TimelineItemViewModel } from "../models/TimelineItemModel";
import { TimelineModel } from "../models/TimelineModel";
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
  items,
  itemWidth = 320,
  titlePosition = "TOP",
  mode = "HORIZONTAL",
  onTimelineUpdated,
}) => {
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);
  const [debActvTimelineItem] = useDebounce(activeTimelineItem, 50);
  const [newOffSet, setNewOffset] = useNewScrollPosition(mode, itemWidth);

  const timelineMainRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (debActvTimelineItem < items.length - 1) {
      setActiveTimelineItem(debActvTimelineItem + 1);
    }
  };

  const handlePrevious = () => {
    if (debActvTimelineItem > 0) {
      setActiveTimelineItem(debActvTimelineItem - 1);
    }
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
    }
  };

  const handleMouseWheel = (evt: React.WheelEvent) => {
    if (evt.deltaY > 0) {
      handleNext();
    } else if (evt.deltaY < 0) {
      handlePrevious();
    }
  };

  useEffect(() => {
    onTimelineUpdated && onTimelineUpdated(debActvTimelineItem);
  }, [debActvTimelineItem]);

  const handleTimelineItemClick = (id?: string) => {
    if (id) {
      for (let idx = 0; idx < items.length; idx++) {
        if (items[idx].id === id) {
          setActiveTimelineItem(idx);
          break;
        }
      }
    }
  };

  const handleScroll = useCallback((scroll: Partial<Scroll>) => {
    const element = timelineMainRef.current;
    if (element) {
      setNewOffset(element, scroll);
    }
  }, []);

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
      onKeyDown={(evt) => handleKeySelection(evt)}
      onWheel={(evt) => handleMouseWheel(evt)}
      className={mode.toLowerCase()}
    >
      <TimelineMainWrapper ref={timelineMainRef} className={mode.toLowerCase()}>
        {mode !== "TREE" ? (
          <TimelineMain className={mode.toLowerCase()}>
            {mode === "HORIZONTAL" && <Outline />}
            <TimelineCollection
              items={items as TimelineItemViewModel[]}
              itemWidth={itemWidth}
              handleItemClick={handleTimelineItemClick}
              autoScroll={handleScroll}
              mode={mode}
            />
          </TimelineMain>
        ) : (
          <TimelineTree
            items={items as TimelineItemViewModel[]}
            onClick={handleTimelineItemClick}
            activeTimelineItem={debActvTimelineItem}
            autoScroll={handleScroll}
          />
        )}
      </TimelineMainWrapper>
      <TimelineControlContainer>
        <TimelineControl
          onNext={handleNext}
          onPrevious={handlePrevious}
          disableLeft={debActvTimelineItem === 0}
          disableRight={debActvTimelineItem === items.length - 1}
        />
      </TimelineControlContainer>
      <TimelineContentRender id="content-render" />
    </Wrapper>
  );
};

export default Timeline;
