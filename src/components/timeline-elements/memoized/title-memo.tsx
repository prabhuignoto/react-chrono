import cls from 'classnames';
import React, { useContext } from 'react';
import { CardTitle } from '../timeline-card-content/timeline-card-content.styles';
import { Title } from './memoized-model';
import TextHighlighter from '../../common/TextHighlighter';
import { useSearch } from '../../common/SearchContext';

/**
 * Renders the title content for the timeline card.
 * @param {Title} props - Title properties
 * @returns {JSX.Element | null} The rendered title
 */
const TitleMemo = React.memo<Title>(
  ({
    color,
    dir,
    fontSize,
    classString,
    padding,
    theme,
    title,
    url,
  }: Title) => {
    const { searchTerm } = useSearch();

    const titleContent = (
      <CardTitle
        color={color}
        dir={dir}
        $fontSize={fontSize}
        className={cls('card-title', classString)}
        $padding={padding}
        theme={theme}
      >
        {searchTerm ? (
          <TextHighlighter text={title} searchTerm={searchTerm} theme={theme} />
        ) : (
          title
        )}
      </CardTitle>
    );

    if (url) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          {titleContent}
        </a>
      );
    }

    return titleContent;
  },
  (prev, next) => prev.theme?.cardTitleColor === next.theme?.cardTitleColor,
);

TitleMemo.displayName = 'Timeline Title';

export { TitleMemo };
