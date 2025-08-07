import cls from 'classnames';
import React from 'react';
import { CardSubTitleSemantic } from '../timeline-card-content/timeline-card-content.styles';
import { Content } from './memoized-model';
import { useTimelineContext } from '../../contexts';

/**
 * Renders the subtitle content for the timeline card using configurable semantic tags.
 * @param {Content} props - Subtitle properties
 * @returns {JSX.Element | null} The rendered subtitle
 */
const SubTitleMemo = React.memo<Content>(
  ({ content, color, dir, theme, fontSize, classString, padding }: Content) => {
    const { semanticTags } = useTimelineContext();

    return content ? (
      <CardSubTitleSemantic
        as={semanticTags?.cardSubtitle ?? 'span'}
        style={{ color }}
        dir={dir}
        theme={theme}
        $fontSize={fontSize}
        className={cls('card-sub-title', classString)}
        $padding={padding}
      >
        {content}
      </CardSubTitleSemantic>
    ) : null;
  },
  (prev, next) =>
    prev.theme?.cardSubtitleColor === next.theme?.cardSubtitleColor,
);

SubTitleMemo.displayName = 'Timeline Content';

export { SubTitleMemo };
