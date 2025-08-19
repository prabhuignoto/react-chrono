import { FunctionComponent, memo, useMemo } from 'react';
import { useTimelineContext } from '../../contexts';
import { SubTitleMemo } from '../memoized/subtitle-memo';
import { TitleMemo } from '../memoized/title-memo';
import { ContentHeaderProps } from './header-footer.model';
import { timelineCardHeader } from './timeline-card-content.css';
// Styled component removed in VE migration

/**
 * ContentHeader component
 * This component renders the header of the timeline card including the title and subtitle.
 * It doesn't render the title and subtitle if the card has media.
 * The title and subtitle are memoized to prevent unnecessary re-renders.
 *
 * @property {string} title - The title of the card.
 * @property {string} url - The URL of the card.
 * @property {boolean} media - Indicates whether the card has media or not.
 * @property {string} content - The main content of the card.
 * @returns {JSX.Element} The ContentHeader component.
 */
const ContentHeader: FunctionComponent<ContentHeaderProps> = memo(
  ({ title, url, media, content, cardTitle }: ContentHeaderProps) => {
    // Using context to get global values
    const { fontSizes, classNames, theme, isMobile, semanticTags } =
      useTimelineContext();

    const isNotMedia = useMemo(() => !media, [media]);

    return (
      <header className={timelineCardHeader}>
        {/* Render mobile title only if cardTitle exists */}
        {isMobile && cardTitle ? (
          <h3
            style={{
              fontSize: '1.5rem',
              color: theme?.cardTitleColor,
              margin: 0,
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            {cardTitle}
          </h3>
        ) : null}

        {isNotMedia ? (
          <TitleMemo
            title={title}
            theme={theme}
            url={url || ''}
            fontSize={fontSizes?.cardTitle || ''}
            classString={classNames?.cardTitle || ''}
          />
        ) : null}

        {/* Render subtitle if there is no media */}

        {isNotMedia ? (
          <SubTitleMemo
            content={content}
            theme={theme}
            fontSize={fontSizes?.cardSubtitle || ''}
            classString={classNames?.cardSubTitle || ''}
          />
        ) : null}
      </header>
    );
  },
);

// Setting display name for easier debugging
ContentHeader.displayName = 'ContentHeader';

export { ContentHeader };
