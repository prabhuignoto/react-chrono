import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { TimelineItemViewModel } from "../models/TimelineItemModel";
import TimelineItemContent from "../timeline-item-content";
import TimelineItemTitle from "../timeline-item-title";
import {
  Circle,
  TimelineContentContainer,
  TimelineTitleContainer,
  Wrapper,
} from "./timeline-item.styles";

const TimelineItem: React.FunctionComponent<TimelineItemViewModel> = ({
  contentText,
  position,
  title,
  active,
  onClick,
  id,
  scroll,
}) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    onClick && onClick(id);
  };

  useEffect(() => {
    if (active) {
      const circle = circleRef.current;
      const wrapper = wrapperRef.current;

      if (circle && wrapper) {
        const circleOffset = circle.offsetLeft;
        const wrapperOffset = wrapper.offsetLeft;

        scroll({
          circleOffset: circleOffset + wrapperOffset,
          circleWidth: circle.clientWidth,
        });
      }
    }
  }, [active, scroll]);

  const showTimelineContent = () => {
    const ele = document.getElementById("content-render");

    if (ele) {
      return ReactDOM.createPortal(
        <TimelineContentContainer
          className={position === "top" ? "bottom" : "top"}
        >
          <TimelineItemContent content={contentText} />
        </TimelineContentContainer>,
        ele
      );
    }
  };

  return (
    <Wrapper ref={wrapperRef}>
      {active && showTimelineContent()}
      <Circle
        className={active ? "active" : "in-active"}
        onClick={handleClick}
        ref={circleRef}
      />
      <TimelineTitleContainer position={position} className={position}>
        <TimelineItemTitle title={title} active={active} />
      </TimelineTitleContainer>
    </Wrapper>
  );
};

export default TimelineItem;
