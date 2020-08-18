import React from "react";
import ChevronLeft from "../icons/chev-left";
import ChevronRightIcon from "../icons/chev-right";
import { TimelineControlModel } from "../models/TimelineControl";
import {
  TimelineControlButton,
  TimelineControlItem,
  TimelineControlWrapper,
} from "./timeline-control.styles";

const TimelineControl: React.FunctionComponent<TimelineControlModel> = ({
  onNext,
  onPrevious,
  disableLeftNav,
  disableRightNav
}) => {
  return (
    <TimelineControlWrapper>
      <TimelineControlItem disable={disableLeftNav}>
        <TimelineControlButton onClick={onPrevious}>
          <ChevronLeft />
        </TimelineControlButton>
      </TimelineControlItem>
      <TimelineControlItem disable={disableRightNav}>
        <TimelineControlButton onClick={onNext}>
          <ChevronRightIcon />
        </TimelineControlButton>
      </TimelineControlItem>
    </TimelineControlWrapper>
  );
};

export default TimelineControl;
