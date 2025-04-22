import React from 'react';
import { Theme } from '@models/Theme';

interface HighlightedTextProps {
  text: string;
  searchTerm: string;
  theme: Theme;
}

/**
 * Very simple component that highlights text using dangerouslySetInnerHTML
 * This approach is safer for this specific use case where we're only inserting
 * styled marks around matched text
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

  try {
    const textStr = String(text);
    const searchStr = String(searchTerm).trim();

    // If search term is empty, return original text
    if (searchStr === '') {
      return <>{textStr}</>;
    }

    // If search term not in text, return original text
    if (!textStr.toLowerCase().includes(searchStr.toLowerCase())) {
      return <>{textStr}</>;
    }

    // Escape search term for regex safety
    const escapedSearchTerm = searchStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Create a regex with global and case-insensitive flags
    const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');

    // Define the aggressive inline style for the mark tag
    const highlightStyle = `
      display: inline !important;
      background-color: ${theme.primary}99 !important; 
      color: #000000 !important;
      font-weight: bold !important;
      padding: 0 3px !important;
      margin: 0 1px !important;
      border-radius: 3px !important;
      border: 1px solid ${theme.primary} !important;
      box-shadow: 0 0 2px ${theme.primary} !important;
      position: relative !important;
      z-index: 5 !important;
    `;

    // Replace matches with highlighted HTML using the <mark> tag
    const highlightedHtml = textStr.replace(
      regex,
      `<mark style="${highlightStyle}">$1</mark>`,
    );

    // Return the HTML with highlights, wrapped in a span for React compatibility
    return (
      <span
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        style={{ display: 'inline' }} // Ensure the wrapper span doesn't break layout
      />
    );
  } catch (error) {
    // If anything goes wrong, just return the original text
    console.error('Error in TextHighlighter:', error);
    return <>{text}</>;
  }
};

export default TextHighlighter;
