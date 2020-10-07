import React from "react";
import { TimelineControlModel } from "../../../models/TimelineControl";
import ChevronLeft from "../../icons/chev-left";
import ChevronRightIcon from "../../icons/chev-right";
import ChevronsLeftIcon from "../../icons/chevs-left";
import ChevronsRightIcon from "../../icons/chevs-right";
import {
  TimelineControlButton,
  TimelineControlItem,
  TimelineControlWrapper,
} from "./timeline-control.styles";

const TimelineControl: React.FunctionComponent<TimelineControlModel> = ({
  onNext,
  onPrevious,
  onFirst,
  onLast,
  disableLeft,
  disableRight,
}) => {
  return (
    <TimelineControlWrapper>
      <TimelineControlItem disable={disableLeft}>
        <TimelineControlButton onClick={onFirst}>
          <ChevronsLeftIcon />
        </TimelineControlButton>
      </TimelineControlItem>
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
      <TimelineControlItem disable={disableRight}>
        <TimelineControlButton onClick={onLast}>
          <ChevronsRightIcon />
        </TimelineControlButton>
      </TimelineControlItem>
    </TimelineControlWrapper>
  );
};

export default TimelineControl;
