/**
 * Creates a highlighted HTML string with very strong styling to override any CSS conflicts
 */
export const createHighlightedHTML = (
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
