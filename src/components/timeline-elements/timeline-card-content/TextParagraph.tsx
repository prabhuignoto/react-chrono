import { TimelineSubContent } from './timeline-card-content.styles';
import { createHighlightedHTML } from './highlight-utils';

interface TextParagraphProps {
  text: string;
  searchTerm?: string;
  theme: any;
  fontSize?: string;
  className?: string;
}

/**
 * Renders a single text paragraph with direct HTML highlighting
 */
export const TextParagraph = ({
  text,
  searchTerm,
  theme,
  fontSize,
  className,
}: TextParagraphProps) => {
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
