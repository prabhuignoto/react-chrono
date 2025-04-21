import cls from 'classnames';
import React from 'react';
import { CardSubTitle } from '../timeline-card-content/timeline-card-content.styles';
import { Content } from './memoized-model';
import TextHighlighter from '../../common/TextHighlighter';
import { useSearch } from '../../common/SearchContext';

/**
 * Renders the subtitle content for the timeline card.
 * @param {Content} props - Subtitle properties
 * @returns {JSX.Element | null} The rendered subtitle
 */
const SubTitleMemo = React.memo<Content>(
  ({ content, color, dir, theme, fontSize, classString, padding }: Content) => {
    const { searchTerm } = useSearch();

    return content ? (
      <CardSubTitle
        style={{ color }}
        dir={dir}
        theme={theme}
        $fontSize={fontSize}
        className={cls('card-sub-title', classString)}
        $padding={padding}
      >
        {searchTerm ? (
          <TextHighlighter
            text={content as string}
            searchTerm={searchTerm}
            theme={theme!}
          />
        ) : (
          content
        )}
      </CardSubTitle>
    ) : null;
  },
  (prev, next) =>
    prev.theme?.cardSubtitleColor === next.theme?.cardSubtitleColor,
);

SubTitleMemo.displayName = 'Timeline Content';

export { SubTitleMemo };
