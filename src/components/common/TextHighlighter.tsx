import React from 'react';
import styled from 'styled-components';
import { Theme } from '@models/Theme';

interface HighlightedTextProps {
  text: string;
  searchTerm: string;
  theme: Theme;
}

// Styled component for highlighted text
const HighlightSpan = styled.span<{ theme: Theme }>`
  background-color: ${({ theme }) =>
    theme.primary}33; /* Primary color with 20% opacity */
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  border-radius: 2px;
  padding: 0 2px;
`;

/**
 * Component that highlights occurrences of a search term within text
 */
const TextHighlighter: React.FC<HighlightedTextProps> = ({
  text,
  searchTerm,
  theme,
}) => {
  // If no search term or no text, just return the original text
  if (!searchTerm || !text) {
    return <>{text}</>;
  }

  // Escape special regex characters in the search term
  const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Create a case-insensitive regular expression to find all occurrences
  const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');

  // Split the text by the search term
  const parts = text.split(regex);

  // Return the text with highlighted parts
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <HighlightSpan key={i} theme={theme}>
            {part}
          </HighlightSpan>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  );
};

export default TextHighlighter;
