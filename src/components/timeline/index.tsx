import { nanoid } from "nanoid";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { TimelineModel } from "../models/TimelineModel";
import TimelineControl from "../timeline-control";
import TimelineItem from "../timeline-item";
import {
  Outline,
  TimelineCollection,
  TimelineContentRender,
  TimelineControlContainer,
  TimelineItemWrapper,
  TimelineMain,
  TimelineMainWrapper,
  Wrapper,
} from "./timeline.style";

const Timeline: React.FunctionComponent<TimelineModel> = ({
  items,
  itemWidth = 320,
}) => {
  const [timelineItems, setTimelineItems] = useState(
    items.map((item, index) => {
      let position = "top";
      if (index % 2 === 0) {
        position = "top";
      }
      return Object.assign({}, item, {
        position,
        id: nanoid(),
      });
    })
  );
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);
  const [disableLeftNav, setDisableLeftNav] = useState(true);
  const [disableRightNav, setDisableRightNav] = useState(false);

  const timelineMainRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (activeTimelineItem < timelineItems.length - 1) {
      setActiveTimelineItem(activeTimelineItem + 1);
    }
  };

  const handlePrevious = () => {
    if (activeTimelineItem > 0) {
      setActiveTimelineItem(activeTimelineItem - 1);
    }
  };

  const handleKeySelection = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.keyCode === 39) {
      handleNext();
    } else if (event.keyCode === 37) {
      handlePrevious();
    }
  };

  useEffect(() => {
    setTimelineItems((items) =>
      items.map((item, index) =>
        Object.assign({}, item, {
          active: index === activeTimelineItem,
        })
      )
    );
  }, [activeTimelineItem]);

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

  const scroll = useCallback(
    ({
      circleWidth,
      circleOffset: circleLeft,
    }: {
      circleWidth: number;
      circleOffset: number;
    }) => {
      const ref = timelineMainRef.current;

      if (ref) {
        const { clientWidth, scrollLeft, scrollWidth } = ref;
        let contrRight = scrollLeft + clientWidth;

        if (scrollLeft > 0) {
          setDisableLeftNav(false);
        }

        if (scrollLeft <= 0) {
          setDisableLeftNav(true);
        }

        if (scrollWidth === scrollLeft + clientWidth) {
          setDisableRightNav(true);
        } else if (scrollLeft + clientWidth < scrollWidth) {
          setDisableRightNav(false);
        }

        let circRight = circleLeft + circleWidth;

        let isVisible = circleLeft >= scrollLeft && circRight <= contrRight;
        let isPartiallyVisible =
          (circleLeft < scrollLeft && circRight > scrollLeft) ||
          (circRight > contrRight && circleLeft < contrRight);

        const leftGap = circleLeft - scrollLeft;
        const rightGap = contrRight - circleLeft;

        if (!(isVisible || isPartiallyVisible)) {
          ref.scrollLeft = circleLeft - itemWidth;
        } else if (leftGap <= itemWidth && leftGap >= 0) {
          ref.scrollLeft = circleLeft - 640;
        } else if (rightGap <= itemWidth && rightGap >= 0) {
          ref.scrollLeft = circleLeft - itemWidth;
        }
      }
    },
    [itemWidth]
  );

  return (
    <Wrapper tabIndex={0} onKeyDown={(evt) => handleKeySelection(evt)}>
      <TimelineMainWrapper
        ref={timelineMainRef}
      >
        <TimelineMain>
          <Outline />
          <TimelineCollection>
            {timelineItems.map((item) => (
              <TimelineItemWrapper key={item.id} width={itemWidth}>
                <TimelineItem
                  {...item}
                  onClick={handleTimelineItemClick}
                  scroll={scroll}
                />
              </TimelineItemWrapper>
            ))}
          </TimelineCollection>
        </TimelineMain>
      </TimelineMainWrapper>
      <TimelineControlContainer>
        <TimelineControl
          onNext={handleNext}
          onPrevious={handlePrevious}
          disableLeftNav={disableLeftNav}
          disableRightNav={disableRightNav}
        />
      </TimelineControlContainer>
      <TimelineContentRender id="content-render" />
    </Wrapper>
  );
};

export default Timeline;
