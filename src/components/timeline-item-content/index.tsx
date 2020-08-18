import React from "react";
import { TimelineItemContentWrapper } from "./timeline-item-content.styles";

const TimelineItemContent: React.FunctionComponent<{
  content: string;
}> = ({ content }) => {
  return <TimelineItemContentWrapper>{content}</TimelineItemContentWrapper>;
};

export default TimelineItemContent;
