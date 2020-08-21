import React from "react";
import { PaneTitle } from "./timeline-item-pane.styles";

const TimelineItemTitle: React.FunctionComponent<{
  title?: string;
  active?: boolean;
}> = ({ title, active }) => {
  return <PaneTitle className={active ? "active" : ""} title={title}>{title}</PaneTitle>;
};

export default TimelineItemTitle;
