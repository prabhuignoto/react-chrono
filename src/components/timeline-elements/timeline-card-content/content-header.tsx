import { FunctionComponent, memo, useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';
import { SubTitleMemo, TitleMemo } from '../memoized';
import { ContentHeaderProps } from './header-footer.model';
import { TimelineCardHeader } from './timeline-card-content.styles';

/*
 * This component is used to render the header of the timeline card.
 * It renders the title and subtitle of the card.
 * If the card has media, it will not render the title and subtitle.
 * The title and subtitle are memoized to prevent unnecessary re-renders.
 */

const ContentHeader: FunctionComponent<ContentHeaderProps> = memo(
  ({ title, url, media, content }: ContentHeaderProps) => {
    const { fontSizes, classNames, theme } = useContext(GlobalContext);

    return (
      <TimelineCardHeader>
        {/* main title */}
        {!media && (
          <TitleMemo
            title={title}
            theme={theme}
            url={url}
            fontSize={fontSizes?.cardTitle}
            classString={classNames?.cardTitle}
          />
        )}
        {/* main timeline text */}
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

ContentHeader.displayName = 'ContentHeader';

export { ContentHeader };
