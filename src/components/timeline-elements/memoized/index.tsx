import React, { memo } from 'react';
import {
  TimelineCardTitle,
  TimelineContentSubTitle,
} from '../timeline-card-content/timeline-card-content.styles';
import { Content, Title } from './memoized-model';

const MemoTitle = memo(
  ({ title, url, theme, color, dir, active, fontSize = '1rem' }: Title) =>
    title && theme ? (
      <TimelineCardTitle
        className={active ? 'active card-title' : 'card-title'}
        theme={theme}
        style={{ color }}
        dir={dir}
        fontSize={fontSize}
      >
        <a href={url} target="_blank" rel="noreferrer">
          {title}
        </a>
      </TimelineCardTitle>
    ) : null,
  () => true,
);

MemoTitle.displayName = 'Timeline Title';

const MemoSubTitle = React.memo<Content>(
  ({ content, color, dir, theme, fontSize }: Content) =>
    content ? (
      <TimelineContentSubTitle
        style={{ color }}
        dir={dir}
        theme={theme}
        fontSize={fontSize}
        className="card-sub-title"
      >
        {content}
      </TimelineContentSubTitle>
    ) : null,
  () => true,
);

MemoSubTitle.displayName = 'Timeline Content';

export { MemoTitle, MemoSubTitle };
