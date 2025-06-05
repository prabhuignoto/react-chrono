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
  
  // Cache callback refs to prevent unnecessary re-renders
  const onTimelineUpdatedRef = useRef(onTimelineUpdated);
  const handleTimelineItemClickRef = useRef(handleTimelineItemClick);
  
  onTimelineUpdatedRef.current = onTimelineUpdated;
  handleTimelineItemClickRef.current = handleTimelineItemClick;

  // Memoize searchable content with better caching strategy
  const searchableContent = useMemo(() => {
    return items.map((item, index) => {
      const textParts = [
        getSearchableText(item.title),
        getSearchableText(item.cardTitle),
        getSearchableText(item.cardSubtitle),
        Array.isArray(item.cardDetailedText)
          ? item.cardDetailedText.map(getSearchableText).join(' ')
          : getSearchableText(item.cardDetailedText),
      ];

      return {
        index,
        content: textParts.filter(Boolean).join(' ').toLowerCase(),
        id: item.id,
      };
    });
  }, [items]);

  // Optimized focus helper with reduced timeout
  const focusSearchInput = useCallback(() => {
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
        const length = searchInputRef.current.value.length;
        searchInputRef.current.setSelectionRange(length, length);
      }
    });
  }, []);

  // Enhanced search with better performance
  const findMatches = useCallback(
    (query: string) => {
      const trimmedQuery = query.trim();
      if (!trimmedQuery) {
        setSearchResults([]);
        setCurrentMatchIndex(-1);
        return;
      }

      const queryLower = trimmedQuery.toLowerCase();
      const results: number[] = [];

      // Use for-loop for better performance than array methods
      for (let i = 0; i < searchableContent.length; i++) {
        if (searchableContent[i].content.includes(queryLower)) {
          results.push(i);
        }
      }

      setSearchResults(results);

      if (results.length > 0) {
        setCurrentMatchIndex(0);
        const firstMatchData = searchableContent[results[0]];
        if (firstMatchData?.id) {
          activeItemIndex.current = results[0];
          onTimelineUpdatedRef.current?.(results[0]);
          handleTimelineItemClickRef.current(firstMatchData.id);
          focusSearchInput();
        }
      } else {
        setCurrentMatchIndex(-1);
        focusSearchInput();
      }
    },
    [searchableContent, focusSearchInput],
  );

  // Optimized debounced search with better performance
  const debouncedSearch = useDebouncedCallback(findMatches, 150, {
    maxWait: 500,
    leading: false,
    trailing: true,
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
    debouncedSearch.cancel();

    if (items.length > 0) {
      activeItemIndex.current = 0;
      onTimelineUpdatedRef.current?.(0);

      const firstItem = items[0];
      if (firstItem?.id) {
        handleTimelineItemClickRef.current(firstItem.id);
      }
    }
  }, [items, debouncedSearch]);

  // Optimized navigation with bounds checking
  const navigateMatches = useCallback(
    (direction: 'next' | 'prev') => {
      if (searchResults.length === 0) return;

      const nextIndex =
        direction === 'next'
          ? (currentMatchIndex + 1) % searchResults.length
          : (currentMatchIndex - 1 + searchResults.length) % searchResults.length;

      if (nextIndex === currentMatchIndex) return;

      const newTimelineIndex = searchResults[nextIndex];
      const matchData = searchableContent[newTimelineIndex];
      
      setCurrentMatchIndex(nextIndex);
      activeItemIndex.current = newTimelineIndex;
      
      onTimelineUpdatedRef.current?.(newTimelineIndex);

      if (matchData?.id) {
        handleTimelineItemClickRef.current(matchData.id);
        focusSearchInput();
      }
    },
    [searchResults, currentMatchIndex, searchableContent, focusSearchInput],
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
      switch (e.key) {
        case 'Enter':
          if (searchResults.length > 0) {
            e.preventDefault();
            handleNextMatch();
          }
          break;
        case 'Escape':
          e.preventDefault();
          clearSearch();
          break;
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
