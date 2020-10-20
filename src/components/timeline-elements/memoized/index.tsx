import React from "react";
import { Theme } from "../../../models/Theme";
import {
  TimelineContentText,
  TimelineContentTitle,
} from "../timeline-card-content/timeline-card-content.styles";

export const MemoTitle = React.memo<{
  title?: string;
  theme?: Theme;
  color?: string;
  dir?: string;
  active?: boolean;
}>(({ title, theme, color, dir, active }) =>
  title && theme ? (
    <TimelineContentTitle
      className={active ? "active" : ""}
      theme={theme}
      style={{ color }}
      dir={dir}
    >
      {title}
    </TimelineContentTitle>
  ) : null
);

export const MemoContentText = React.memo<{
  content: string;
  color?: string;
  dir?: string;
}>(({ content, color, dir }) =>
  content ? (
    <TimelineContentText style={{ color }} dir={dir}>
      {content}
    </TimelineContentText>
  ) : null
);
