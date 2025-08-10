import { forwardRef } from 'react';
import { useTimelineContext } from '../../contexts';
import { DetailsTextProps } from './details-text.model';
import { getTextOrContent } from './text-or-content';
import { contentDetailsWrapper } from './timeline-card-content.css';
import { computeCssVarsFromTheme } from '../../../styles/theme-bridge';

const DetailsText = forwardRef<HTMLDivElement, DetailsTextProps>(
  (prop, ref) => {
    const {
      showMore,
      cardActualHeight,
      detailsHeight,
      gradientColor,
      customContent,
      timelineContent,
      detailedText,
      contentDetailsClass,
    } = prop;

    const {
      useReadMore,
      borderLessCards,
      contentDetailsHeight,
      textOverlay,
      theme,
    } = useTimelineContext();

    const TextContent = getTextOrContent({
      detailedText,
      showMore,
      theme,
      timelineContent,
    });

    return (
      <>
        {/* detailed text */}
        <div
          aria-expanded={showMore}
          className={contentDetailsClass + ' ' + contentDetailsWrapper}
          ref={ref}
          style={{
            ...computeCssVarsFromTheme(theme),
            overflowY: showMore ? 'auto' : 'hidden',
            width: borderLessCards ? 'calc(100% - 0.5rem)' : '100%',
            background: theme?.cardDetailsBackGround || theme?.cardBgColor,
            maxHeight: !useReadMore
              ? 'none'
              : showMore
              ? '1000px'
              : `${contentDetailsHeight ?? 150}px`,
          }}
        >
          {customContent ?? (
            <TextContent
              {...{ detailedText, showMore, theme, timelineContent }}
            />
          )}
        </div>
      </>
    );
  },
);

DetailsText.displayName = 'Details Text';

export { DetailsText };
