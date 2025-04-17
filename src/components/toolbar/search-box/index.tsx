import React, { useState, useCallback, useEffect } from 'react';
import { Theme } from '@models/Theme';
import { useDebounce } from '../../../hooks/useDebounce';
import {
  SearchBoxWrapper,
  SearchIcon,
  SearchInput,
  SearchResultsLabel,
  SearchNavButtonGroup,
  SearchNavButton,
} from './search-box.styles';
import { TimelineItemModel } from '@models/TimelineItemModel';
import { useSearch } from '../../common/SearchContext';

export interface SearchBoxProps {
  /**
   * Placeholder text for the search input
   */
  placeholder?: string;

  /**
   * Aria label for accessibility
   */
  ariaLabel?: string;

  /**
   * Theme for styling
   */
  theme: Theme;

  /**
   * Callback when a search match is activated
   */
  onActivateItem: (id: string) => void;

  /**
   * Items to search through
   */
  items: TimelineItemModel[];

  /**
   * Data test id for testing
   */
  dataTestId?: string;
}

/**
 * SearchBox component that provides search functionality with navigation through results
 */
export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = 'Search...',
  ariaLabel = 'Search',
  theme,
  onActivateItem,
  items,
  dataTestId = 'timeline-search-input',
}) => {
  // State for search text and results
  const [searchText, setSearchText] = useState('');
  const [searchMatches, setSearchMatches] = useState<string[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const { setSearchTerm } = useSearch();

  // Handle search with debounce to avoid excessive searches
  const handleSearch = useCallback(
    (searchText: string) => {
      const searchTerm = searchText.toLowerCase().trim();

      // Update the global search term for highlighting
      setSearchTerm(searchTerm);

      // Reset search state if search is empty
      if (!searchTerm) {
        setSearchMatches([]);
        setCurrentMatchIndex(0);
        return;
      }

      // Find ALL matching items
      const matches = items
        .filter((item) => {
          return (
            item.title?.toLowerCase().includes(searchTerm) ||
            item.cardTitle?.toLowerCase().includes(searchTerm) ||
            item.cardSubtitle?.toLowerCase().includes(searchTerm) ||
            (typeof item.cardDetailedText === 'string' &&
              item.cardDetailedText.toLowerCase().includes(searchTerm)) ||
            (Array.isArray(item.cardDetailedText) &&
              item.cardDetailedText.some((text) =>
                text?.toLowerCase().includes(searchTerm),
              ))
          );
        })
        .map((item) => item.id || '');

      // Update matches and reset index
      const validMatches = matches.filter(Boolean); // Filter out empty IDs
      setSearchMatches(validMatches);
      setCurrentMatchIndex(0);

      // Activate the first match if there are any
      if (validMatches.length > 0) {
        onActivateItem(validMatches[0]);
      }
    },
    [items, onActivateItem, setSearchTerm],
  );

  // Debounce search for better performance
  const debouncedSearch = useDebounce(handleSearch, 300);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedSearch(value);
  };

  // Navigate to next match
  const handleNextMatch = useCallback(() => {
    if (searchMatches.length === 0) return;

    const nextIndex = (currentMatchIndex + 1) % searchMatches.length;
    setCurrentMatchIndex(nextIndex);
    onActivateItem(searchMatches[nextIndex]);
  }, [searchMatches, currentMatchIndex, onActivateItem]);

  // Navigate to previous match
  const handlePrevMatch = useCallback(() => {
    if (searchMatches.length === 0) return;

    const prevIndex =
      currentMatchIndex > 0 ? currentMatchIndex - 1 : searchMatches.length - 1;

    setCurrentMatchIndex(prevIndex);
    onActivateItem(searchMatches[prevIndex]);
  }, [searchMatches, currentMatchIndex, onActivateItem]);

  // Clear search
  const handleClearSearch = useCallback(() => {
    setSearchText('');
    setSearchMatches([]);
    setCurrentMatchIndex(0);
    setSearchTerm('');

    // Activate first item to reset view
    if (items.length > 0 && items[0].id) {
      onActivateItem(items[0].id);
    }
  }, [items, onActivateItem, setSearchTerm]);

  // Clean up the search term when component unmounts
  useEffect(() => {
    return () => {
      setSearchTerm('');
    };
  }, [setSearchTerm]);

  // Render search box
  return (
    <SearchBoxWrapper theme={theme}>
      <SearchIcon theme={theme}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="currentColor"
        >
          <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
      </SearchIcon>
      <SearchInput
        type="text"
        value={searchText}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={ariaLabel}
        theme={theme}
        data-testid={dataTestId}
      />

      {/* Clear button - show only when there's text */}
      {searchText && (
        <SearchNavButton
          onClick={handleClearSearch}
          theme={theme}
          aria-label="Clear search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="currentColor"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </SearchNavButton>
      )}

      {/* Search results count and navigation - show only when there are matches */}
      {searchMatches.length > 0 && (
        <>
          <SearchResultsLabel theme={theme}>
            <span>{currentMatchIndex + 1}</span>
            <span className="separator">of</span>
            <span>{searchMatches.length}</span>
          </SearchResultsLabel>
          <SearchNavButtonGroup>
            <SearchNavButton
              onClick={handlePrevMatch}
              disabled={searchMatches.length <= 1}
              theme={theme}
              aria-label="Previous match"
              title="Previous match"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </SearchNavButton>
            <SearchNavButton
              onClick={handleNextMatch}
              disabled={searchMatches.length <= 1}
              theme={theme}
              aria-label="Next match"
              title="Next match"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </SearchNavButton>
          </SearchNavButtonGroup>
        </>
      )}
    </SearchBoxWrapper>
  );
};

export default SearchBox;
