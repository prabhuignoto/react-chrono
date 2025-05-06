import { useCallback, useState, useRef } from 'react';
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

  // Find matches based on search query
  const findMatches = useCallback(
    (query: string) => {
      if (!query) {
        setSearchResults([]);
        setCurrentMatchIndex(-1);
        return;
      }

      const queryLower = query.toLowerCase();
      const results: number[] = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        // Combine all searchable text into one operation
        const searchableContent = [
          getSearchableText(item.title),
          getSearchableText(item.cardTitle),
          getSearchableText(item.cardSubtitle),
          Array.isArray(item.cardDetailedText)
            ? item.cardDetailedText.map(getSearchableText).join(' ')
            : getSearchableText(item.cardDetailedText),
        ]
          .join(' ')
          .toLowerCase();

        if (searchableContent.includes(queryLower)) {
          results.push(i);
        }
      }

      setSearchResults(results);

      if (results.length > 0) {
        setCurrentMatchIndex(0);
        const firstMatchItemId = items[results[0]]?.id;
        if (firstMatchItemId) {
          // Store the current search query before navigation
          const currentQuery = query;

          activeItemIndex.current = results[0];
          onTimelineUpdated?.(results[0]);
          handleTimelineItemClick(firstMatchItemId);

          // Ensure the search query persists
          setSearchQuery(currentQuery);

          // Return focus to search input after the search completes and navigation happens
          setTimeout(() => {
            if (searchInputRef.current) {
              searchInputRef.current.focus();

              // Ensure the cursor is at the end of the text
              const length = searchInputRef.current.value.length;
              searchInputRef.current.setSelectionRange(length, length);
            }
          }, 50);
        }
      } else {
        setCurrentMatchIndex(-1);

        // Return focus to search input even when no results are found
        setTimeout(() => {
          if (searchInputRef.current) {
            searchInputRef.current.focus();

            // Ensure the cursor is at the end of the text
            const length = searchInputRef.current.value.length;
            searchInputRef.current.setSelectionRange(length, length);
          }
        }, 50);
      }
    },
    [items, onTimelineUpdated, handleTimelineItemClick],
  );

  // Debounced search handler to avoid excessive processing during typing
  const debouncedSearch = useDebouncedCallback(findMatches, 300);

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

    if (items.length > 0) {
      activeItemIndex.current = 0;
      onTimelineUpdated?.(0);

      const firstItemId = items[0]?.id;
      if (firstItemId) handleTimelineItemClick(firstItemId);
    }
  }, [items, onTimelineUpdated, handleTimelineItemClick]);

  // Navigate between search matches
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
        // Store the current search query before navigation
        const currentQuery = searchQuery;

        handleTimelineItemClick(itemId);

        // Ensure the search query persists
        if (currentQuery) {
          setSearchQuery(currentQuery);
        }
      }

      // Set focus back to the search input after navigation completes
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
          const length = searchInputRef.current.value.length;
          searchInputRef.current.setSelectionRange(length, length);
        }
      }, 50);
    },
    [
      searchResults,
      currentMatchIndex,
      items,
      onTimelineUpdated,
      searchQuery,
      handleTimelineItemClick,
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
      }
    },
    [searchResults.length, handleNextMatch],
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
