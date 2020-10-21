import React from "react";
import { Theme } from "../../../models/Theme";
import { TitleWrapper } from "./timeline-card-title.styles";

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
