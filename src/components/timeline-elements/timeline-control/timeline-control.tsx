import React from "react";
import { TimelineControlModel } from "../../../models/TimelineControlModel";
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

const TimelineControl: React.FunctionComponent<TimelineControlModel> = React.memo(
  ({
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
    mode,
  }) => {
    return (
      <TimelineControlContainer slideShowActive={slideShowRunning}>
        <TimelineNavWrapper>
          {/* jump to first */}
          <TimelineNavItem disable={disableLeft}>
            <TimelineNavButton
              mode={mode}
              theme={theme}
              onClick={onFirst}
              title="Go to First"
              aria-label="first"
            >
              <ChevronsLeftIcon />
            </TimelineNavButton>
          </TimelineNavItem>

          {/* previous */}
          <TimelineNavItem disable={disableLeft}>
            <TimelineNavButton
              mode={mode}
              theme={theme}
              onClick={onPrevious}
              title="Previous"
              aria-label="previous"
            >
              <ChevronLeft />
            </TimelineNavButton>
          </TimelineNavItem>

          {/* next */}
          <TimelineNavItem disable={disableRight}>
            <TimelineNavButton
              mode={mode}
              theme={theme}
              onClick={onNext}
              title="Next"
              aria-label="next"
            >
              <ChevronRightIcon />
            </TimelineNavButton>
          </TimelineNavItem>

          {/* jump to last */}
          <TimelineNavItem disable={disableRight}>
            <TimelineNavButton
              mode={mode}
              theme={theme}
              onClick={onLast}
              title="Go to Last"
              aria-label="last"
            >
              <ChevronsRightIcon />
            </TimelineNavButton>
          </TimelineNavItem>

          {/* slideshow button */}
          <TimelineNavItem>
            {slideShowEnabled && (
              <ReplayWrapper
                theme={theme}
                onClick={onReplay}
                title="Play Slideshow"
              >
                <ReplayIcon />
              </ReplayWrapper>
            )}
          </TimelineNavItem>
        </TimelineNavWrapper>
      </TimelineControlContainer>
    );
  }
);

export default TimelineControl;
