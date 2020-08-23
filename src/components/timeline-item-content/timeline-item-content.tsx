import React from "react";
import {
  TimelineContentText,
  TimelineContentTitle,
  TimelineItemContentWrapper,
} from "./timeline-item-content.styles";

const TimelineItemContent: React.FunctionComponent<{
  content: string;
  active?: boolean;
  title?: string;
}> = ({ content, active, title }) => {
  return (
    <TimelineItemContentWrapper className={active ? "active" : ""}>
      {title && <TimelineContentTitle>{title}</TimelineContentTitle>}
      <TimelineContentText>{content}</TimelineContentText>
    </TimelineItemContentWrapper>
  );
};

export default TimelineItemContent;
