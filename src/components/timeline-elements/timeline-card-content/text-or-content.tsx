import { TimelineContentModel } from '@models/TimelineContentModel';
import { TimelineProps } from '@models/TimelineModel';
import {
  ForwardRefExoticComponent,
  ReactNode,
  forwardRef,
  useContext,
  useEffect,
} from 'react';
import xss from 'xss';
import { GlobalContext } from '../../GlobalContext';
import { useSearch } from '../../common/SearchContext';
import {
  TimelineContentDetails,
  TimelineSubContent,
} from './timeline-card-content.styles';

// Define the type for the TextOrContentModel
export type TextOrContentModel = Pick<
  TimelineContentModel,
  'timelineContent' | 'theme' | 'detailedText'
> & {
  showMore?: boolean;
};

/**
 * Creates a highlighted HTML string with very strong styling to override any CSS conflicts
 */
const createHighlightedHTML = (
  text: string,
  searchTerm: string,
  color: string,
) => {
  if (!searchTerm || !text) return text;

  try {
    const searchStr = searchTerm.trim();
    if (!searchStr) return text;

    // Check if text includes the search term (case insensitive)
    if (!text.toLowerCase().includes(searchStr.toLowerCase())) {
      return text;
    }

    // Escape the search term for regex
    const escapedSearchTerm = searchStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Set up a very aggressive style that will override almost anything
    const highlightStyle = `
      display: inline !important;
      background-color: ${color}99 !important; 
      color: #000000 !important;
      font-weight: bold !important;
      padding: 0 3px !important;
      margin: 0 1px !important;
      border-radius: 3px !important;
      border: 1px solid ${color} !important;
      box-shadow: 0 0 2px ${color} !important;
      position: relative !important;
      z-index: 5 !important;
    `;

    // Replace with highlighted HTML - using mark tag for better semantic meaning and accessibility
    const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');
    return text.replace(regex, `<mark style="${highlightStyle}">$1</mark>`);
  } catch (e) {
    console.error('Error highlighting text:', e);
    return text;
  }
};

/**
 * Renders a single text paragraph with direct HTML highlighting
 */
const TextParagraph = ({
  text,
  searchTerm,
  theme,
  fontSize,
  className,
}: {
  text: string;
  searchTerm?: string;
  theme: any;
  fontSize?: string;
  className?: string;
}) => {
  // Skip if no text
  if (!text) return null;

  // If no search term, render normal text
  if (!searchTerm) {
    return (
      <TimelineSubContent
        fontSize={fontSize}
        className={className || ''}
        theme={theme}
      >
        {text}
      </TimelineSubContent>
    );
  }

  // With search term, use direct HTML highlighting with aggressive styling
  const highlightedHTML = createHighlightedHTML(
    text,
    searchTerm,
    theme?.primary || '#0066CC',
  );

  return (
    <TimelineSubContent
      fontSize={fontSize}
      className={`${className || ''} highlight-container`}
      theme={theme}
      dangerouslySetInnerHTML={{ __html: highlightedHTML }}
    />
  );
};

/**
 * Renders an array of text paragraphs
 */
const renderTextArray = ({
  fontSizes,
  parseDetailsAsHTML,
  theme,
  detailedText,
  cardTextClassName,
  searchTerm,
}: Pick<TimelineProps, 'parseDetailsAsHTML' | 'fontSizes' | 'theme'> & {
  cardTextClassName: string;
  detailedText: string[];
  searchTerm?: string;
}): ReactNode => {
  return detailedText.map((text, index) => {
    // For HTML content - we still want to try highlighting if possible
    if (parseDetailsAsHTML) {
      // For HTML content with search term, add highlighting
      if (searchTerm) {
        const safeHtml = xss(text);
        // Try to highlight within HTML without breaking it
        // This is risky but worth a try
        const highlightedHTML = createHighlightedHTML(
          safeHtml,
          searchTerm,
          theme?.primary || '#0066CC',
        );

        return (
          <TimelineSubContent
            key={index}
            fontSize={fontSizes?.cardText}
            className={`${cardTextClassName} highlight-container`}
            theme={theme}
            dangerouslySetInnerHTML={{ __html: highlightedHTML }}
          />
        );
      }

      // Without search term, just render HTML
      return (
        <TimelineSubContent
          key={index}
          fontSize={fontSizes?.cardText}
          className={cardTextClassName}
          theme={theme}
          dangerouslySetInnerHTML={{ __html: xss(text) }}
        />
      );
    }

    // For regular text with optional highlighting
    return (
      <TextParagraph
        key={index}
        text={text}
        searchTerm={searchTerm}
        theme={theme}
        fontSize={fontSizes?.cardText}
        className={cardTextClassName}
      />
    );
  });
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
      const isTextArray = Array.isArray(detailedText);
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

      /**
       * Main render function for timeline content
       */
      const renderTimelineContent = () => {
        // 1. Handle custom timeline content
        if (timelineContent) {
          return <div ref={ref}>{timelineContent}</div>;
        }

        // 2. Return null if no detailed text
        if (!detailedText) {
          return null;
        }

        // 3. Should content be hidden due to text density?
        const shouldHideContent = textDensity === 'LOW';
        if (shouldHideContent) {
          return <TimelineContentDetails ref={ref} theme={theme} />;
        }

        // 4. Content container CSS class
        const contentClass = `timeline-content-details ${showMore ? 'active' : ''} ${searchTerm ? 'has-search' : ''}`;

        // 5. Handle array of text paragraphs
        if (isTextArray) {
          return (
            <TimelineContentDetails
              className={contentClass}
              ref={ref}
              theme={theme}
            >
              {renderTextArray({
                cardTextClassName: classNames?.cardText ?? '',
                detailedText,
                fontSizes,
                parseDetailsAsHTML,
                theme,
                searchTerm,
              })}
            </TimelineContentDetails>
          );
        }

        // 6. Handle HTML content with parsing enabled
        if (parseDetailsAsHTML) {
          // Even with HTML parsing, try to highlight if search term is present
          if (searchTerm) {
            const safeHtml = xss(String(detailedText ?? ''));
            const highlightedHTML = createHighlightedHTML(
              safeHtml,
              searchTerm,
              theme?.primary || '#0066CC',
            );

            return (
              <TimelineContentDetails
                className={`${contentClass} highlight-container`}
                ref={ref}
                theme={theme}
                dangerouslySetInnerHTML={{
                  __html: highlightedHTML,
                }}
              />
            );
          }

          // Without search term, render normal HTML
          return (
            <TimelineContentDetails
              className={contentClass}
              ref={ref}
              theme={theme}
              dangerouslySetInnerHTML={{
                __html: xss(String(detailedText ?? '')),
              }}
            />
          );
        }

        // 7. Handle single text string with direct HTML highlighting
        const textContent = String(detailedText ?? '');

        if (searchTerm) {
          // Force direct HTML highlighting for better visibility
          const highlightedHTML = createHighlightedHTML(
            textContent,
            searchTerm,
            theme?.primary || '#0066CC',
          );

          return (
            <TimelineContentDetails
              className={`${contentClass} highlight-container`}
              ref={ref}
              theme={theme}
              dangerouslySetInnerHTML={{ __html: highlightedHTML }}
            />
          );
        }

        // Regular text with no highlighting
        return (
          <TimelineContentDetails
            className={contentClass}
            ref={ref}
            theme={theme}
          >
            {textContent}
          </TimelineContentDetails>
        );
      };

      return renderTimelineContent();
    },
  );

  TextOrContent.displayName = 'Text Or Content';
  return TextOrContent;
};

export { getTextOrContent };
