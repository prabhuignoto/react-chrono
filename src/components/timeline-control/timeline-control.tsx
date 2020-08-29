import React from "react";
import ChevronLeft from "../icons/chev-left";
import ChevronRightIcon from "../icons/chev-right";
import { TimelineControlModel } from "../../models/TimelineControl";
import {
  TimelineControlButton,
  TimelineControlItem,
  TimelineControlWrapper,
} from "./timeline-control.styles";

const TimelineControl: React.FunctionComponent<TimelineControlModel> = ({
  onNext,
  onPrevious,
  disableLeft,
  disableRight,
}) => {
  return (
    <TimelineControlWrapper>
      <TimelineControlItem disable={disableLeft}>
        <TimelineControlButton onClick={onPrevious}>
          <ChevronLeft />
        </TimelineControlButton>
      </TimelineControlItem>
      <TimelineControlItem disable={disableRight}>
        <TimelineControlButton onClick={onNext}>
          <ChevronRightIcon />
        </TimelineControlButton>
      </TimelineControlItem>
    </TimelineControlWrapper>
  );
};

export default TimelineControl;
