import { useState, useCallback } from 'react';
import { TimelineItemModel } from '@models/TimelineItemModel';
import { useDebounce } from '../../../hooks/useDebounce';
import { useSearch } from 'src/components/common/SearchContext';

export interface UseSearchBoxProps {
  items: TimelineItemModel[];
  onActivateItem: (id: string) => void;
}

export const useSearchBox = ({ items, onActivateItem }: UseSearchBoxProps) => {
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
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchText(value);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

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
      currentMatchIndex === 0
        ? searchMatches.length - 1
        : currentMatchIndex - 1;
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

  return {
    searchText,
    searchMatches,
    currentMatchIndex,
    handleChange,
    handleClearSearch,
    handleNextMatch,
    handlePrevMatch,
  };
};
