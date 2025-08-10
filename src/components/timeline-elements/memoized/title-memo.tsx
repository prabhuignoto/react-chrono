import cls from 'classnames';
import React from 'react';
import { Title } from './memoized-model';
import { useTimelineContext } from '../../contexts';

/**
 * Renders the timeline's title with optional link using configurable semantic tags.
 * @param {Title} props - Title properties
 * @returns {JSX.Element | null} The rendered title
 */
const TitleMemoComponent = ({
  title,
  url,
  theme,
  color,
  dir,
  active,
  fontSize = '1rem',
  classString = '',
}: Title) => {
  const { semanticTags } = useTimelineContext();

  const Tag: any = semanticTags?.cardTitle ?? 'span';

  return title ? (
    <Tag
      className={cls(active ? 'active' : '', { [classString]: true })}
      style={{ color, fontSize }}
      dir={dir}
      data-class={classString}
    >
      {url ? (
        <a href={url} target="_blank" rel="noreferrer">
          {title}
        </a>
      ) : (
        title
      )}
    </Tag>
  ) : null;
};

export const TitleMemo = React.memo(TitleMemoComponent);

TitleMemo.displayName = 'Timeline Title';
