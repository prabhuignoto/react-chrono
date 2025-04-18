import React, { useEffect, useRef } from 'react';
import { Theme } from '@models/Theme';
import {
  SearchBoxWrapper,
  SearchIcon,
  SearchInput,
  SearchResultsLabel,
  SearchNavButtonGroup,
  SearchNavButton,
} from './search-box.styles';
import { useSearch } from '../../common/SearchContext';
import { SearchIcon as SearchIconComponent } from '../../icons/search';
import CloseIcon from '../../icons/close';
import ChevLeftIcon from '../../icons/chev-left';
import ChevRightIcon from '../../icons/chev-right';
import { SearchBoxProps } from './search-box.model';
import { useSearchBox } from './useSearchBox';

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
  const { setSearchTerm } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    searchText,
    searchMatches,
    currentMatchIndex,
    handleChange,
    handleClearSearch,
    handleNextMatch,
    handlePrevMatch,
    handleKeyDown,
  } = useSearchBox({
    items,
    onActivateItem,
    inputRef,
  });

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
        <SearchIconComponent />
      </SearchIcon>
      <SearchInput
        ref={inputRef}
        type="text"
        value={searchText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
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
          data-testid="search-clear-button"
        >
          <CloseIcon />
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
              <ChevLeftIcon />
            </SearchNavButton>
            <SearchNavButton
              onClick={handleNextMatch}
              disabled={searchMatches.length <= 1}
              theme={theme}
              aria-label="Next match"
              title="Next match"
            >
              <ChevRightIcon />
            </SearchNavButton>
          </SearchNavButtonGroup>
        </>
      )}
    </SearchBoxWrapper>
  );
};

export default SearchBox;
