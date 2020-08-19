import React from "react";
import {
  TimelineContentText,
  TimelineItemContentWrapper,
} from "./timeline-item-content.styles";

const TimelineItemContent: React.FunctionComponent<{
  content: string;
}> = ({ content }) => {
  return (
    <TimelineItemContentWrapper>
      <TimelineContentText>{content}</TimelineContentText>
    </TimelineItemContentWrapper>
  );
};

export default TimelineItemContent;
