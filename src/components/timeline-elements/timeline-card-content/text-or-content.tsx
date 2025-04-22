import { TimelineContentModel } from '@models/TimelineContentModel';
import {
  ForwardRefExoticComponent,
  forwardRef,
  useContext,
  useEffect,
} from 'react';
import { GlobalContext } from '../../GlobalContext';
import { useSearch } from '../../common/SearchContext';
import { renderTimelineContent } from './ContentRenderer';

// Define the type for the TextOrContentModel
export type TextOrContentModel = Pick<
  TimelineContentModel,
  'timelineContent' | 'theme' | 'detailedText'
> & {
  showMore?: boolean;
};

// Function to get the TextOrContent component
const getTextOrContent: (
  p: TextOrContentModel,
) => ForwardRefExoticComponent<TextOrContentModel> = ({
  timelineContent,
  theme,
  detailedText,
  showMore,
}) => {
  const TextOrContent = forwardRef<HTMLParagraphElement, TextOrContentModel>(
    (_, ref) => {
      const { fontSizes, classNames, parseDetailsAsHTML, textDensity } =
        useContext(GlobalContext);
      const { searchTerm } = useSearch();

      // Debug when component renders with search
      useEffect(() => {
        if (searchTerm) {
          console.log('TextOrContent rendering with search term:', searchTerm);
          console.log('Has detailedText:', !!detailedText);
        }
      }, [searchTerm, detailedText]);

      // Determine if content should be hidden based on text density
      const shouldHideContent = textDensity === 'LOW';

      return renderTimelineContent({
        ref,
        timelineContent,
        detailedText,
        theme,
        showMore,
        searchTerm,
        shouldHideContent,
        fontSizes,
        parseDetailsAsHTML,
        classNames,
      });
    },
  );

  TextOrContent.displayName = 'Text Or Content';
  return TextOrContent;
};

export { getTextOrContent };
