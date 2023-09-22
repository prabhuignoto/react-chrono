import { FunctionComponent, memo, useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';
import { SubTitleMemo, TitleMemo } from '../memoized';
import { ContentHeaderProps } from './header-footer.model';
import { TimelineCardHeader } from './timeline-card-content.styles';

/**
 * ContentHeader component
 * This component renders the header of the timeline card including the title and subtitle.
 * It doesn't render the title and subtitle if the card has media.
 * The title and subtitle are memoized to prevent unnecessary re-renders.
 *
 * @property {string} title - The title of the card.
 * @property {string} url - The URL of the card.
 * @property {string} urlClassName - Class applied to title, if url present
 * @property {boolean} media - Indicates whether the card has media or not.
 * @property {string} content - The main content of the card.
 * @returns {JSX.Element} The ContentHeader component.
 */
const ContentHeader: FunctionComponent<ContentHeaderProps> = memo(
  ({ title, url, urlClassName, media, content }: ContentHeaderProps) => {
    // Using context to get global values
    const { fontSizes, classNames, theme } = useContext(GlobalContext);

    return (
      <TimelineCardHeader>
        {/* Render title if there is no media */}
        {!media && (
          <TitleMemo
            title={title}
            theme={theme}
            url={url}
            urlClassName={urlClassName}
            fontSize={fontSizes?.cardTitle}
            classString={classNames?.cardTitle}
          />
        )}
        {/* Render subtitle if there is no media */}
        {!media && (
          <SubTitleMemo
            content={content}
            theme={theme}
            fontSize={fontSizes?.cardSubtitle}
            classString={classNames?.cardSubTitle}
          />
        )}
      </TimelineCardHeader>
    );
  },
);

// Setting display name for easier debugging
ContentHeader.displayName = 'ContentHeader';

export { ContentHeader };
