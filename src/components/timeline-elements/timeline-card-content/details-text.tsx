import { TimelineContentModel } from '@models/TimelineContentModel';
import { ReactNode, forwardRef, useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';
import { getTextOrContent } from './text-or-content';
import { TimelineContentDetailsWrapper } from './timeline-card-content.styles';

type DetailsTextProps = Pick<
  TimelineContentModel,
  'detailedText' | 'timelineContent'
> & {
  cardActualHeight?: number;
  contentDetailsClass?: string;
  customContent?: ReactNode;
  detailsHeight?: number;
  gradientColor?: string;
  showMore?: boolean;
};

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
    } = useContext(GlobalContext);

    const TextContent = getTextOrContent({
      detailedText,
      showMore,
      theme,
      timelineContent,
    });

    return (
      <>
        {/* detailed text */}
        <TimelineContentDetailsWrapper
          aria-expanded={showMore}
          className={contentDetailsClass}
          $customContent={!!customContent}
          ref={ref}
          theme={theme}
          $useReadMore={useReadMore}
          $borderLess={borderLessCards}
          $showMore={showMore}
          $cardHeight={!textOverlay ? cardActualHeight : null}
          $contentHeight={detailsHeight}
          height={contentDetailsHeight}
          $textOverlay={textOverlay}
          $gradientColor={gradientColor}
        >
          {customContent || (
            <TextContent
              {...{ detailedText, showMore, theme, timelineContent }}
            />
          )}
        </TimelineContentDetailsWrapper>
      </>
    );
  },
);

DetailsText.displayName = 'Details Text';

export { DetailsText };
