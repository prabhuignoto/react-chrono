import cls from 'classnames';
import {
  CardTitleAnchor,
  CardTitleSemantic,
} from '../timeline-card-content/timeline-card-content.styles';
import { Title } from './memoized-model';
import React, { useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';

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
  const { semanticTags } = useContext(GlobalContext);

  return title ? (
    <CardTitleSemantic
      as={semanticTags?.cardTitle ?? 'span'}
      className={cls(active ? 'active' : '', { [classString]: true })}
      theme={theme}
      style={{ color }}
      dir={dir}
      $fontSize={fontSize}
      data-class={classString}
    >
      {url ? (
        <CardTitleAnchor href={url} target="_blank" rel="noreferrer">
          {title}
        </CardTitleAnchor>
      ) : (
        title
      )}
    </CardTitleSemantic>
  ) : null;
};

export const TitleMemo = React.memo(TitleMemoComponent);

TitleMemo.displayName = 'Timeline Title';
