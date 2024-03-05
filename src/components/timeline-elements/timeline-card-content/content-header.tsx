import { FunctionComponent, memo, useContext, useMemo } from 'react';
import { GlobalContext } from '../../GlobalContext';
import { SubTitleMemo, TitleMemo } from '../memoized';
import { ContentHeaderProps } from './header-footer.model';
import { CardTitle, TimelineCardHeader } from './timeline-card-content.styles';

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
    const { fontSizes, classNames, theme, isMobile } =
      useContext(GlobalContext);

    const isNotMedia = useMemo(() => !media, [media]);

    return (
      <TimelineCardHeader>
        {/* Render title if there is no media */}

        {isMobile ? (
          <CardTitle $fontSize={'1.2rem'} theme={theme}>
            {cardTitle}
          </CardTitle>
        ) : null}

        {isNotMedia ? (
          <TitleMemo
            title={title}
            theme={theme}
            url={url}
            fontSize={fontSizes?.cardTitle}
            classString={classNames?.cardTitle}
          />
        ) : null}

        {/* Render subtitle if there is no media */}

        {isNotMedia ? (
          <SubTitleMemo
            content={content}
            theme={theme}
            fontSize={fontSizes?.cardSubtitle}
            classString={classNames?.cardSubTitle}
          />
        ) : null}
      </TimelineCardHeader>
    );
  },
);

// Setting display name for easier debugging
ContentHeader.displayName = 'ContentHeader';

export { ContentHeader };
