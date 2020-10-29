import React from 'react';
import { Theme } from '../../../models/Theme';
import {
  TimelineContentSubTitle,
  TimelineContentTitle,
} from '../timeline-card-content/timeline-card-content.styles';

interface Title {
  title?: string;
  theme?: Theme;
  color?: string;
  dir?: string;
  active?: boolean;
}

interface Content {
  content: string;
  color?: string;
  dir?: string;
}

const MemoTitle = React.memo(({ title, theme, color, dir, active }: Title) =>
  title && theme ? (
    <TimelineContentTitle
      className={active ? 'active card-title' : 'card-title'}
      theme={theme}
      style={{ color }}
      dir={dir}
    >
      {title}
    </TimelineContentTitle>
  ) : null,
);

MemoTitle.displayName = 'Timeline Title';

const MemoSubTitle = React.memo<Content>(({ content, color, dir }: Content) =>
  content ? (
    <TimelineContentSubTitle
      style={{ color }}
      dir={dir}
      className="card-sub-title"
    >
      {content}
    </TimelineContentSubTitle>
  ) : null,
);

MemoSubTitle.displayName = 'Timeline Content';

export { MemoTitle, MemoSubTitle };
