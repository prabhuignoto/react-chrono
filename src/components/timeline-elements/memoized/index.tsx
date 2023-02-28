import cls from 'classnames';
import React, { memo } from 'react';
import { MaximizeIcon, MinimizeIcon, MinusIcon, PlusIcon } from '../../icons';
import {
  TimelineCardTitle,
  TimelineContentSubTitle,
} from '../timeline-card-content/timeline-card-content.styles';
import { ExpandButton } from '../timeline-card-media/timeline-card-media.styles';
import { ShowHideTextButton } from './../timeline-card-media/timeline-card-media.styles';
import {
  Content,
  ExpandButtonModel,
  ShowHideTextButtonModel,
  Title,
} from './memoized-model';

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

export const ExpandButtonMemo = memo<ExpandButtonModel>(
  ({ theme, expanded, onExpand, textInsideMedia }: ExpandButtonModel) => {
    return textInsideMedia ? (
      <ExpandButton
        onPointerDown={onExpand}
        onKeyDown={(ev) => ev.key === 'Enter' && onExpand?.(ev)}
        theme={theme}
        aria-expanded={expanded}
        tabIndex={0}
      >
        {expanded ? <MinimizeIcon /> : <MaximizeIcon />}
      </ExpandButton>
    ) : null;
  },
  (prev, next) => prev.expanded === next.expanded,
);

ExpandButtonMemo.displayName = 'Expand Button';

export const ShowOrHideTextButtonMemo = memo<ShowHideTextButtonModel>(
  ({ textInsideMedia, onToggle, theme, show }: ShowHideTextButtonModel) => {
    return textInsideMedia ? (
      <ShowHideTextButton
        onPointerDown={onToggle}
        theme={theme}
        tabIndex={0}
        onKeyDown={(ev) => ev.key === 'Enter' && onToggle?.(ev)}
      >
        {show ? <MinusIcon /> : <PlusIcon />}
      </ShowHideTextButton>
    ) : null;
  },
);

ShowOrHideTextButtonMemo.displayName = 'Show Hide Text Button';

export { MemoTitle, MemoSubTitle };
