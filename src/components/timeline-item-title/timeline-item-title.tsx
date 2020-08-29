import React from "react";
import { TitleWrapper } from "./timeline-item-title.styles";
import { Theme } from "../../models/TimelineTreeModel";

const TimelineItemTitle: React.FunctionComponent<{
  title?: string;
  active?: boolean;
  theme?: Theme;
}> = ({ title, active, theme }) => (
  <TitleWrapper className={active ? "active" : ""} title={title} theme={theme}>
    {title}
  </TitleWrapper>
);

export default TimelineItemTitle;
