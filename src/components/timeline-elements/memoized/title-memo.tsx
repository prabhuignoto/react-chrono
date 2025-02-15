import cls from 'classnames';
import {
  CardTitle,
  CardTitleAnchor,
} from '../timeline-card-content/timeline-card-content.styles';
import { Title } from './memoized-model';
import React from 'react';

/**
 * Renders the timeline’s title with optional link.
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
  padding = false,
}: Title) => {
  return title ? (
    <CardTitle
      className={cls(active ? 'active' : '', { [classString]: true })}
      theme={theme}
      style={{ color }}
      dir={dir}
      $fontSize={fontSize}
      data-class={classString}
      $padding={padding}
    >
      {url ? (
        <CardTitleAnchor href={url} target="_blank" rel="noreferrer">
          {title}
        </CardTitleAnchor>
      ) : (
        title
      )}
    </CardTitle>
  ) : null;
};

export const TitleMemo = React.memo(TitleMemoComponent);

TitleMemo.displayName = 'Timeline Title';
