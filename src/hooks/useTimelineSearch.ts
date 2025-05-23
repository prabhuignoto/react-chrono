import { useCallback, useState, useRef, useMemo } from 'react';
import { TimelineCardModel } from '@models/TimelineItemModel';
import { getSearchableText } from '../utils/timelineUtils';
import { useDebouncedCallback } from 'use-debounce';

interface UseTimelineSearchProps {
  items: TimelineCardModel[];
  onTimelineUpdated?: (index: number) => void;
  handleTimelineItemClick: (itemId?: string) => void;
}

export const useTimelineSearch = ({
  items,
  onTimelineUpdated,
  handleTimelineItemClick,
}: UseTimelineSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const activeItemIndex = useRef<number>(0);

  // Memoize searchable content to avoid recalculating on every search
  const searchableContent = useMemo(() => {
    return items.map((item) => {
      const content = [
        getSearchableText(item.title),
        getSearchableText(item.cardTitle),
        getSearchableText(item.cardSubtitle),
        Array.isArray(item.cardDetailedText)
          ? item.cardDetailedText.map(getSearchableText).join(' ')
          : getSearchableText(item.cardDetailedText),
      ]
        .filter(Boolean) // Remove empty strings
        .join(' ')
        .toLowerCase();

      return content;
    });
  }, [items]);

  // Focus helper function to reduce code duplication
  const focusSearchInput = useCallback(() => {
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
        const length = searchInputRef.current.value.length;
        searchInputRef.current.setSelectionRange(length, length);
      }
    }, 50);
  }, []);

  // Find matches based on search query - optimized version
  const findMatches = useCallback(
    (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        setCurrentMatchIndex(-1);
        return;
      }

      const queryLower = query.toLowerCase().trim();
      const results: number[] = [];

      // Use the pre-computed searchable content for faster search
      for (let i = 0; i < searchableContent.length; i++) {
        if (searchableContent[i].includes(queryLower)) {
          results.push(i);
        }
      }

      setSearchResults(results);

      if (results.length > 0) {
        setCurrentMatchIndex(0);
        const firstMatchItemId = items[results[0]]?.id;
        if (firstMatchItemId) {
          activeItemIndex.current = results[0];
          onTimelineUpdated?.(results[0]);
          handleTimelineItemClick(firstMatchItemId);
          focusSearchInput();
        }
      } else {
        setCurrentMatchIndex(-1);
        focusSearchInput();
      }
    },
    [
      searchableContent,
      items,
      onTimelineUpdated,
      handleTimelineItemClick,
      focusSearchInput,
    ],
  );

  // Reduced debounce delay for better responsiveness while still preventing excessive processing
  const debouncedSearch = useDebouncedCallback(findMatches, 200, {
    maxWait: 1000, // Ensure search executes within reasonable time
  });

  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);
      debouncedSearch(query);
    },
    [debouncedSearch],
  );

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setCurrentMatchIndex(-1);
    debouncedSearch.cancel(); // Cancel any pending searches

    if (items.length > 0) {
      activeItemIndex.current = 0;
      onTimelineUpdated?.(0);

      const firstItemId = items[0]?.id;
      if (firstItemId) handleTimelineItemClick(firstItemId);
    }
  }, [items, onTimelineUpdated, handleTimelineItemClick, debouncedSearch]);

  // Navigate between search matches - optimized version
  const navigateMatches = useCallback(
    (direction: 'next' | 'prev') => {
      if (searchResults.length === 0) return;

      const nextIndex =
        direction === 'next'
          ? (currentMatchIndex + 1) % searchResults.length
          : (currentMatchIndex - 1 + searchResults.length) %
            searchResults.length;

      const newTimelineIndex = searchResults[nextIndex];
      setCurrentMatchIndex(nextIndex);
      activeItemIndex.current = newTimelineIndex;
      onTimelineUpdated?.(newTimelineIndex);

      const itemId = items[newTimelineIndex]?.id;
      if (itemId) {
        handleTimelineItemClick(itemId);
        focusSearchInput();
      }
    },
    [
      searchResults,
      currentMatchIndex,
      items,
      onTimelineUpdated,
      handleTimelineItemClick,
      focusSearchInput,
    ],
  );

  const handleNextMatch = useCallback(
    () => navigateMatches('next'),
    [navigateMatches],
  );

  const handlePreviousMatch = useCallback(
    () => navigateMatches('prev'),
    [navigateMatches],
  );

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && searchResults.length > 0) {
        e.preventDefault();
        handleNextMatch();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        clearSearch();
      }
    },
    [searchResults.length, handleNextMatch, clearSearch],
  );

  return {
    searchQuery,
    searchResults,
    currentMatchIndex,
    searchInputRef,
    activeItemIndex,
    handleSearchChange,
    clearSearch,
    handleNextMatch,
    handlePreviousMatch,
    handleSearchKeyDown,
  };
};
