import cls from 'classnames';
import React from 'react';
import {
  TimelineCardTitle,
  TimelineContentSubTitle,
} from '../timeline-card-content/timeline-card-content.styles';
import { Content, Title } from './memoized-model';

const MemoTitle = ({
  title,
  url,
  theme,
  color,
  dir,
  active,
  fontSize = '1rem',
  classString = '',
}: Title) => {
  return title && theme ? (
    <TimelineCardTitle
      className={cls(active ? 'active' : '', { [classString]: true })}
      theme={theme}
      style={{ color }}
      dir={dir}
      fontSize={fontSize}
      data-class={classString}
    >
      <a href={url} target="_blank" rel="noreferrer">
        {title}
      </a>
    </TimelineCardTitle>
  ) : null;
};

MemoTitle.displayName = 'Timeline Title';

const MemoSubTitle = React.memo<Content>(
  ({ content, color, dir, theme, fontSize, classString }: Content) =>
    content ? (
      <TimelineContentSubTitle
        style={{ color }}
        dir={dir}
        theme={theme}
        fontSize={fontSize}
        className={cls('card-sub-title', classString)}
      >
        {content}
      </TimelineContentSubTitle>
    ) : null,
  () => true,
);

MemoSubTitle.displayName = 'Timeline Content';

export { MemoTitle, MemoSubTitle };
