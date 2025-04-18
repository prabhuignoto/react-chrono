import { useState, useCallback, RefObject } from 'react';
import { TimelineItemModel } from '@models/TimelineItemModel';
import { useDebounce } from '../../../hooks/useDebounce';
import { useSearch } from 'src/components/common/SearchContext';

export interface UseSearchBoxProps {
  items: TimelineItemModel[];
  onActivateItem: (id: string) => void;
  inputRef?: RefObject<HTMLInputElement>;
}

export const useSearchBox = ({
  items,
  onActivateItem,
  inputRef,
}: UseSearchBoxProps) => {
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
        .filter(item => {
          const searchableContent = [
            item.title,
            item.cardTitle,
            item.cardSubtitle,
            typeof item.cardDetailedText === 'string' ? item.cardDetailedText : '',
            Array.isArray(item.cardDetailedText) ? item.cardDetailedText.join(' ') : ''
          ].join(' ').toLowerCase();
          
          return searchableContent.includes(searchTerm);
        })
        .map(item => item.id || '');

      // Update matches and reset index
      const validMatches = matches.filter(Boolean); // Filter out empty IDs
      setSearchMatches(validMatches);
      setCurrentMatchIndex(0);

      // Activate the first match if there are any
      if (validMatches.length > 0) {
        onActivateItem(validMatches[0]);

        // Restore focus to input after activation
        setTimeout(() => {
          if (inputRef?.current) {
            inputRef.current.focus();
          }
        }, 0);
      }
    },
    [items, onActivateItem, setSearchTerm, inputRef],
  );

  // Debounce search for better performance
  const debouncedSearch = useDebounce(handleSearch, 500);

  // Handle input change
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchText(value);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  // Handle keyboard events, especially Enter key
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // Prevent default form submission behavior

        // Flag to track if immediate search was triggered
        const isFirstSearch = searchMatches.length === 0 && searchText;

        if (searchMatches.length > 0) {
          // If we already have matches, cycle to the next match
          const nextIndex = (currentMatchIndex + 1) % searchMatches.length;
          setCurrentMatchIndex(nextIndex);
          onActivateItem(searchMatches[nextIndex]);
        } else if (searchText) {
          // If no matches yet but we have search text, trigger immediate search
          handleSearch(searchText);
        }

        // Ensure input retains focus with a slightly longer delay
        // This is important for the first search especially
        setTimeout(
          () => {
            if (inputRef?.current) {
              inputRef.current.focus();
            }
          },
          isFirstSearch ? 100 : 0,
        );
      }
    },
    [
      searchText,
      searchMatches,
      currentMatchIndex,
      onActivateItem,
      handleSearch,
      inputRef,
    ],
  );

  // Navigate to next match
  const handleNextMatch = useCallback(() => {
    if (searchMatches.length === 0) return;

    const nextIndex = (currentMatchIndex + 1) % searchMatches.length;
    setCurrentMatchIndex(nextIndex);
    onActivateItem(searchMatches[nextIndex]);

    // Maintain focus on the search input
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, [searchMatches, currentMatchIndex, onActivateItem, inputRef]);

  // Navigate to previous match
  const handlePrevMatch = useCallback(() => {
    if (searchMatches.length === 0) return;

    const prevIndex =
      currentMatchIndex === 0
        ? searchMatches.length - 1
        : currentMatchIndex - 1;
    setCurrentMatchIndex(prevIndex);
    onActivateItem(searchMatches[prevIndex]);

    // Maintain focus on the search input
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, [searchMatches, currentMatchIndex, onActivateItem, inputRef]);

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

    // Maintain focus on the search input
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, [items, onActivateItem, setSearchTerm, inputRef]);

  return {
    searchText,
    searchMatches,
    currentMatchIndex,
    handleChange,
    handleClearSearch,
    handleNextMatch,
    handlePrevMatch,
    handleKeyDown,
  };
};
