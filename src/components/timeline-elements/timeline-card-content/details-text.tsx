import { forwardRef, useContext, useEffect } from 'react';
import { GlobalContext } from '../../GlobalContext';
import { DetailsTextProps } from './details-text.model';
import { getTextOrContent } from './text-or-content';
import { TimelineContentDetailsWrapper } from './timeline-card-content.styles';
import { useSearch } from '../../common/SearchContext';

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
      'data-testid': testId,
    } = prop;

    const {
      useReadMore,
      borderLessCards,
      contentDetailsHeight,
      textOverlay,
      theme,
    } = useContext(GlobalContext);

    const { searchTerm } = useSearch();

    // Log search term and detailed text for debugging
    useEffect(() => {
      if (searchTerm) {
        console.log('DetailsText - Search Term:', searchTerm);
        console.log('DetailsText - Has Detailed Text:', !!detailedText);
        console.log('DetailsText - Type:', typeof detailedText);
        if (typeof detailedText === 'string') {
          console.log('DetailsText - Content:', detailedText.substring(0, 50));
        }
        if (Array.isArray(detailedText)) {
          console.log('DetailsText - Array Length:', detailedText.length);
        }
      }
    }, [searchTerm, detailedText]);

    const TextContent = getTextOrContent({
      detailedText,
      showMore,
      theme,
      timelineContent,
    });

    // Force a console.log of the component tree when searching
    useEffect(() => {
      if (searchTerm) {
        // Force redraw when search term changes
        console.log('Need to redraw because search term changed:', searchTerm);
      }
    }, [searchTerm]);

    // Add search-specific class to enable stronger styling
    const detailsWrapperClass = `timeline-content-details ${contentDetailsClass || ''} ${
      searchTerm ? 'has-search-highlighting' : ''
    }`;

    return (
      <>
        {/* detailed text */}
        <TimelineContentDetailsWrapper
          aria-expanded={showMore}
          className={detailsWrapperClass}
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
          data-testid={testId}
          data-has-search={searchTerm ? 'true' : 'false'}
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
