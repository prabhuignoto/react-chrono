import React from "react";
import {
  TimelineContentText,
  TimelineItemContentWrapper,
} from "./timeline-item-content.styles";

const TimelineItemContent: React.FunctionComponent<{
  content: string;
  active?: boolean;
}> = ({ content, active }) => {
  return (
    <TimelineItemContentWrapper className={active ? "active" : ""}>
      <TimelineContentText>{content}</TimelineContentText>
    </TimelineItemContentWrapper>
  );
};

export default TimelineItemContent;
