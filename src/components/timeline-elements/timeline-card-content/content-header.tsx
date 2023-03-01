import { FunctionComponent, useContext } from 'react';
import { TimelineContentModel } from '../../../models/TimelineContentModel';
import { GlobalContext } from '../../GlobalContext';
import { SubTitleMemo, TitleMemo } from '../memoized';
import { TimelineCardHeader } from './timeline-card-content.styles';

export type ContentHeaderProps = Pick<
  TimelineContentModel,
  'theme' | 'url' | 'title' | 'media' | 'content'
>;

const ContentHeader: FunctionComponent<ContentHeaderProps> = ({
  title,
  theme,
  url,
  media,
  content,
}) => {
  const { fontSizes, classNames } = useContext(GlobalContext);

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
};

export { ContentHeader };
