import cls from 'classnames';
import React, { useContext } from 'react';
import { CardTitle } from '../timeline-card-content/timeline-card-content.styles';
import { Title } from './memoized-model';
import TextHighlighter from '../../common/TextHighlighter';
import { useSearch } from '../../common/SearchContext';
import { GlobalContext } from '../../GlobalContext';

/**
 * Renders the title content for the timeline card.
 * @param {Title} props - Title properties
 * @returns {JSX.Element | null} The rendered title
 */
const TitleMemo = React.memo<Omit<Title, 'theme'>>(
  ({
    color,
    dir,
    fontSize,
    classString,
    padding,
    title,
    url,
  }: Omit<Title, 'theme'>) => {
    const { searchTerm } = useSearch();
    const { theme } = useContext(GlobalContext);

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
  (prev, next) => prev.title === next.title && prev.url === next.url,
);

TitleMemo.displayName = 'Timeline Title';

export { TitleMemo };
