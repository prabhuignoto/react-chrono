import { useState, useCallback, RefObject } from 'react';
import { TimelineItemModel } from '@models/TimelineItemModel';
import { useDebounce } from '../../../hooks/useDebounce';
import { useSearch } from 'src/components/common/SearchContext';

export interface UseSearchBoxProps {
  items: TimelineItemModel[];
  onActivateItem: (id: string) => void;
  inputRef?: RefObject<HTMLInputElement | null>;
  minimumSearchLength?: number;
  searchKeys?: ('title' | 'cardTitle' | 'cardSubtitle' | 'cardDetailedText')[];
  debounceTime?: number;
  highlightResults?: boolean;
  navigateResults?: boolean;
}

export const useSearchBox = ({
  items,
  onActivateItem,
  inputRef,
  minimumSearchLength = 2,
  searchKeys = ['title', 'cardTitle', 'cardSubtitle', 'cardDetailedText'],
  debounceTime = 300,
  highlightResults = true,
  navigateResults = true,
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

      // Update the global search term for highlighting if enabled
      if (highlightResults) {
        setSearchTerm(searchTerm);
      }

      // Reset search state if search is empty or too short
      if (!searchTerm || searchTerm.length < minimumSearchLength) {
        setSearchMatches([]);
        setCurrentMatchIndex(0);
        return;
      }

      // Find ALL matching items
      const matches = items
        .filter((item) => {
          // Create a searchable content string based on configured searchKeys
          const searchableContentParts = searchKeys.map((key) => {
            if (key === 'cardDetailedText') {
              return typeof item[key] === 'string'
                ? (item[key] as string)
                : Array.isArray(item[key])
                  ? (item[key] as string[]).join(' ')
                  : '';
            }
            return (item[key as keyof TimelineItemModel] as string) || '';
          });

          const searchableContent = searchableContentParts
            .join(' ')
            .toLowerCase();
          return searchableContent.includes(searchTerm);
        })
        .map((item) => item.id || '');

      // Update matches and reset index
      const validMatches = matches.filter(Boolean); // Filter out empty IDs
      setSearchMatches(validMatches);
      setCurrentMatchIndex(0);

      // Activate the first match if there are any
      if (validMatches.length > 0) {
        onActivateItem(validMatches[0]);

        // Restore focus to input after activation with a slightly longer delay
        setTimeout(() => {
          if (inputRef?.current) {
            inputRef.current.focus();
          }
        }, 50);
      }
    },
    [
      items,
      onActivateItem,
      setSearchTerm,
      inputRef,
      minimumSearchLength,
      searchKeys,
      highlightResults,
    ],
  );

  // Debounce search for better performance
  const debouncedSearch = useDebounce(handleSearch, debounceTime);

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

        if (!navigateResults) return;

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
      navigateResults,
    ],
  );

  // Navigate to next match
  const handleNextMatch = useCallback(() => {
    if (!navigateResults || searchMatches.length === 0) return;

    const nextIndex = (currentMatchIndex + 1) % searchMatches.length;
    setCurrentMatchIndex(nextIndex);
    onActivateItem(searchMatches[nextIndex]);

    // Maintain focus on the search input
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, [
    searchMatches,
    currentMatchIndex,
    onActivateItem,
    inputRef,
    navigateResults,
  ]);

  // Navigate to previous match
  const handlePrevMatch = useCallback(() => {
    if (!navigateResults || searchMatches.length === 0) return;

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
  }, [
    searchMatches,
    currentMatchIndex,
    onActivateItem,
    inputRef,
    navigateResults,
  ]);

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

    // Maintain focus on the search input with a small delay to ensure it works reliably
    setTimeout(() => {
      if (inputRef?.current) {
        inputRef.current.focus();
      }
    }, 10);
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
