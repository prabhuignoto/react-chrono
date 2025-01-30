import cls from 'classnames';
import React from 'react';
import { CardSubTitle } from '../timeline-card-content/timeline-card-content.styles';
import { Content } from './memoized-model';

/**
 * Renders the subtitle content for the timeline card.
 * @param {Content} props - Subtitle properties
 * @returns {JSX.Element | null} The rendered subtitle
 */
const SubTitleMemo = React.memo<Content>(
  ({ content, color, dir, theme, fontSize, classString, padding }: Content) =>
    content ? (
      <CardSubTitle
        style={{ color }}
        dir={dir}
        theme={theme}
        $fontSize={fontSize}
        className={cls('card-sub-title', classString)}
        $padding={padding}
      >
        {content}
      </CardSubTitle>
    ) : null,
  (prev, next) =>
    prev.theme?.cardSubtitleColor === next.theme?.cardSubtitleColor,
);

SubTitleMemo.displayName = 'Timeline Content';

export { SubTitleMemo };
