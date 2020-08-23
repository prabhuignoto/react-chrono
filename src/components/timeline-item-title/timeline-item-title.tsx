import React from "react";
import { TitleWrapper } from "./timeline-item-title.styles";

const TimelineItemTitle: React.FunctionComponent<{
  title?: string;
  active?: boolean;
}> = ({ title, active }) => (
  <TitleWrapper className={active ? "active" : ""} title={title}>
    {title}
  </TitleWrapper>
);

export default TimelineItemTitle;
