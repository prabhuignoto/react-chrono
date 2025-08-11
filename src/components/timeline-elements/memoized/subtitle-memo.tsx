import cls from 'classnames';
import React from 'react';
// Replaced styled component with semantic tag + classes
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

    const Tag: any = semanticTags?.cardSubtitle ?? 'span';
    return content ? (
      <Tag
        style={{ color, fontSize }}
        dir={dir}
        className={cls('card-sub-title', classString)}
      >
        {content}
      </Tag>
    ) : null;
  },
  (prev, next) =>
    prev.theme?.cardSubtitleColor === next.theme?.cardSubtitleColor,
);

SubTitleMemo.displayName = 'Timeline Content';

export { SubTitleMemo };
