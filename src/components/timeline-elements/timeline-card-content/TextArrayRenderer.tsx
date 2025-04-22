import { ReactNode } from 'react';
import xss from 'xss';
import { TimelineProps } from '@models/TimelineModel';
import { TimelineSubContent } from './timeline-card-content.styles';
import { TextParagraph } from './TextParagraph';
import { createHighlightedHTML } from './highlight-utils';

interface TextArrayRendererProps
  extends Pick<TimelineProps, 'parseDetailsAsHTML' | 'fontSizes' | 'theme'> {
  cardTextClassName: string;
  detailedText: string[];
  searchTerm?: string;
}

/**
 * Renders an array of text paragraphs
 */
export const renderTextArray = ({
  fontSizes,
  parseDetailsAsHTML,
  theme,
  detailedText,
  cardTextClassName,
  searchTerm,
}: TextArrayRendererProps): ReactNode => {
  return detailedText.map((text, index) => {
    // For HTML content - we still want to try highlighting if possible
    if (parseDetailsAsHTML) {
      // For HTML content with search term, add highlighting
      if (searchTerm) {
        const safeHtml = xss(text);
        // Try to highlight within HTML without breaking it
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
