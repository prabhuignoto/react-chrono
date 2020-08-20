import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { Scroll } from "../models/TimelineCollnModel";
import { TimelineItemViewModel } from "../models/TimelineItemModel";
import { TimelineModel } from "../models/TimelineModel";
import TimelineCollection from "../timeline-collection";
import TimelineControl from "../timeline-control";
import TimelineTree from "../timeline-tree";
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
}) => {
  const [timelineItems, setTimelineItems] = useState(
    items.map((item, index) => {
      return Object.assign({}, item, {
        position: titlePosition.toLowerCase(),
        id: nanoid(),
      });
    })
  );
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);
  const [debActvTimelineItem] = useDebounce(activeTimelineItem, 150);

  const timelineMainRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (debActvTimelineItem < timelineItems.length - 1) {
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

  const handleWheel = (evt: React.WheelEvent) => {
    if (evt.deltaY > 0) {
      handleNext();
    } else if (evt.deltaY < 0) {
      handlePrevious();
    }
  };

  useEffect(() => {
    setTimelineItems((items) =>
      items.map((item, index) =>
        Object.assign({}, item, {
          active: index === debActvTimelineItem,
        })
      )
    );
  }, [debActvTimelineItem]);

  const handleTimelineItemClick = (id?: string) => {
    if (id) {
      for (let idx = 0; idx < timelineItems.length; idx++) {
        if (timelineItems[idx].id === id) {
          setActiveTimelineItem(idx);
          break;
        }
      }
    }
  };

  const handleScroll = useCallback(
    ({
      circleWidth = 0,
      circleHeight = 0,
      circleOffset = 0,
      contentHeight = 0,
      contentOffset = 0,
    }: Partial<Scroll>) => {
      const ref = timelineMainRef.current;

      if (ref) {
        const { clientWidth, scrollLeft, scrollTop, clientHeight } = ref;

        if (mode === "HORIZONTAL") {
          let contrRight = scrollLeft + clientWidth;
          let circRight = circleOffset + circleWidth;
          let isVisible = circleOffset >= scrollLeft && circRight <= contrRight;
          let isPartiallyVisible =
            (circleOffset < scrollLeft && circRight > scrollLeft) ||
            (circRight > contrRight && circleOffset < contrRight);

          const leftGap = circleOffset - scrollLeft;
          const rightGap = contrRight - circleOffset;

          if (!(isVisible || isPartiallyVisible)) {
            ref.scrollLeft = circleOffset - itemWidth;
          } else if (leftGap <= itemWidth && leftGap >= 0) {
            ref.scrollLeft = circleOffset - itemWidth;
          } else if (rightGap <= itemWidth && rightGap >= 0) {
            ref.scrollLeft = circleOffset - itemWidth;
          }
        } else if (mode === "VERTICAL" || mode === "TREE") {
          let contrBottom = scrollTop + clientHeight;
          let circBottom = contentOffset + contentHeight;
          let isVisible =
            contentOffset >= scrollTop && circBottom <= contrBottom;
          
            debugger;
          let isPartiallyVisible =
            (contentOffset < scrollTop && circBottom > scrollTop) ||
            (circBottom > contrBottom && contentOffset < contrBottom);

          if (!isVisible || isPartiallyVisible) {
            ref.scrollTop = contentOffset - contentHeight;
          }
        }
      }
    },
    [itemWidth, mode]
  );

  return (
    <Wrapper
      tabIndex={0}
      onKeyDown={(evt) => handleKeySelection(evt)}
      onWheel={(evt) => handleWheel(evt)}
      className={mode.toLowerCase()}
    >
      <TimelineMainWrapper ref={timelineMainRef} className={mode.toLowerCase()}>
        {mode !== "TREE" ? (
          <TimelineMain className={mode.toLowerCase()}>
            {mode === "HORIZONTAL" && <Outline />}
            <TimelineCollection
              items={timelineItems as TimelineItemViewModel[]}
              itemWidth={itemWidth}
              handleItemClick={handleTimelineItemClick}
              onScroll={handleScroll}
              mode={mode}
            />
          </TimelineMain>
        ) : (
          <TimelineTree
            items={timelineItems as TimelineItemViewModel[]}
            onClick={handleTimelineItemClick}
            activeTimelineItem={debActvTimelineItem}
            onScroll={handleScroll}
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
