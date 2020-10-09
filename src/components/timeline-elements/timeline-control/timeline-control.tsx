import React from "react";
import { TimelineControlModel } from "../../../models/TimelineControl";
import ChevronLeft from "../../icons/chev-left";
import ChevronRightIcon from "../../icons/chev-right";
import ChevronsLeftIcon from "../../icons/chevs-left";
import ChevronsRightIcon from "../../icons/chevs-right";
import ReplayIcon from "../../icons/replay-icon";
import {
  ReplayWrapper,
  TimelineControlContainer,
  TimelineNavButton,
  TimelineNavItem,
  TimelineNavWrapper,
} from "./timeline-control.styles";

const TimelineControl: React.FunctionComponent<TimelineControlModel> = ({
  onNext,
  onPrevious,
  onFirst,
  onLast,
  disableLeft,
  disableRight,
  theme,
  slideShowRunning,
  onReplay,
  slideShowEnabled,
}) => {
  return (
    <TimelineControlContainer>
      {slideShowEnabled && !slideShowRunning && (
        <ReplayWrapper theme={theme} onClick={onReplay}>
          <ReplayIcon />
        </ReplayWrapper>
      )}

      {!slideShowRunning && (
        <TimelineNavWrapper theme={theme}>
          <TimelineNavItem disable={disableLeft}>
            <TimelineNavButton
              onClick={onFirst}
              title="first"
              aria-label="first"
            >
              <ChevronsLeftIcon />
            </TimelineNavButton>
          </TimelineNavItem>
          <TimelineNavItem disable={disableLeft}>
            <TimelineNavButton
              onClick={onPrevious}
              title="previous"
              aria-label="previous"
            >
              <ChevronLeft />
            </TimelineNavButton>
          </TimelineNavItem>
          <TimelineNavItem disable={disableRight}>
            <TimelineNavButton onClick={onNext} title="next" aria-label="next">
              <ChevronRightIcon />
            </TimelineNavButton>
          </TimelineNavItem>
          <TimelineNavItem disable={disableRight}>
            <TimelineNavButton onClick={onLast} title="last" aria-label="last">
              <ChevronsRightIcon />
            </TimelineNavButton>
          </TimelineNavItem>
        </TimelineNavWrapper>
      )}
    </TimelineControlContainer>
  );
};

export default TimelineControl;
