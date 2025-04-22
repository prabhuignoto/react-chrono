import { ReactNode, ForwardedRef } from 'react';
import xss from 'xss';
import { TimelineContentDetails } from './timeline-card-content.styles';
import { renderTextArray } from './TextArrayRenderer';
import { createHighlightedHTML } from './highlight-utils';

interface ContentRendererProps {
  ref: ForwardedRef<HTMLParagraphElement>;
  timelineContent?: ReactNode;
  detailedText?: string | string[];
  theme: any;
  showMore?: boolean;
  searchTerm?: string;
  shouldHideContent: boolean;
  fontSizes?: any;
  parseDetailsAsHTML?: boolean;
  classNames?: {
    cardText?: string;
    [key: string]: string | undefined;
  };
}

/**
 * Renders different types of timeline content
 */
export const renderTimelineContent = ({
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
}: ContentRendererProps): ReactNode => {
  // 1. Handle custom timeline content
  if (timelineContent) {
    return <div ref={ref}>{timelineContent}</div>;
  }

  // 2. Return null if no detailed text
  if (!detailedText) {
    return null;
  }

  // 3. Should content be hidden due to text density?
  if (shouldHideContent) {
    return <TimelineContentDetails ref={ref} theme={theme} />;
  }

  // 4. Content container CSS class
  const contentClass = `timeline-content-details ${showMore ? 'active' : ''} ${searchTerm ? 'has-search' : ''}`;
  const isTextArray = Array.isArray(detailedText);

  // 5. Handle array of text paragraphs
  if (isTextArray) {
    return (
      <TimelineContentDetails className={contentClass} ref={ref} theme={theme}>
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
    <TimelineContentDetails className={contentClass} ref={ref} theme={theme}>
      {textContent}
    </TimelineContentDetails>
  );
};
