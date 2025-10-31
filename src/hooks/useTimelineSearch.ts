import { useCallback, useState, useRef, useMemo } from 'react';
import { TimelineCardModel } from '@models/TimelineItemModel';
import { getSearchableText } from '../utils/timelineUtils';

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
  const isFirstSearchRef = useRef<boolean>(true);

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

  // Optimized focus helper - only focus when needed, not during typing
  const focusSearchInput = useCallback((forceRefocus = false) => {
    // Only refocus if the search input is not currently focused or if forced
    if (!forceRefocus && document.activeElement === searchInputRef.current) {
      return;
    }

    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      if (
        searchInputRef.current &&
        (forceRefocus || document.activeElement !== searchInputRef.current)
      ) {
        searchInputRef.current.focus();
        const length = searchInputRef.current.value.length;
        searchInputRef.current.setSelectionRange(length, length);
      }
    });
  }, []);

  // Enhanced search with better performance
  // Now synchronous - only triggered explicitly on Enter key
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
      const maxResults = 100; // Limit results for performance

      // Use for-loop with early break for better performance
      for (let i = 0; i < searchableContent.length; i++) {
        // No optional chaining needed: i is always a valid index within bounds
        if (searchableContent[i].content.includes(queryLower)) {
          results.push(i);

          // Early break if we have enough results
          if (results.length >= maxResults) {
            break;
          }
        }
      }

      setSearchResults(results);

      if (results.length > 0) {
        setCurrentMatchIndex(0);
        const firstResult = results[0]!; // Non-null: we just checked results.length > 0
        const firstMatchData = searchableContent[firstResult];
        if (firstMatchData?.id) {
          activeItemIndex.current = firstResult;
          isFirstSearchRef.current = false;

          // Update active timeline item visually without clicking it
          // This scrolls to the item but doesn't steal focus from search input
          onTimelineUpdatedRef.current?.(firstResult);
          // Don't call handleTimelineItemClick - it steals focus
          // Only navigate explicitly when user presses Enter or next/previous buttons
        }
      } else {
        setCurrentMatchIndex(-1);
      }
    },
    [searchableContent],
  );

  // Handle query input changes (typing) - does NOT trigger search
  // Search is triggered explicitly via triggerSearch() when user presses Enter
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    // Clear results if query is empty
    if (!query.trim()) {
      setSearchResults([]);
      setCurrentMatchIndex(-1);
    }
  }, []);

  // Explicitly trigger search - called when user presses Enter
  const triggerSearch = useCallback(() => {
    findMatches(searchQuery);
  }, [searchQuery, findMatches]);

  const clearSearch = useCallback(
    (preservePosition = false) => {
      setSearchQuery('');
      setSearchResults([]);
      setCurrentMatchIndex(-1);

      // Reset first search flag when clearing
      isFirstSearchRef.current = true;

      if (items.length > 0 && !preservePosition) {
        activeItemIndex.current = 0;
        onTimelineUpdatedRef.current?.(0);
        // Note: Don't call handleTimelineItemClick here to avoid focus stealing
        // Focus management is handled by the timeline component's useEffect
      }

      // Force refocus after clearing (only when user explicitly clears)
      if (!preservePosition) {
        focusSearchInput(true);
      }
    },
    [items, focusSearchInput],
  );

  // Optimized navigation with bounds checking
  const navigateMatches = useCallback(
    (direction: 'next' | 'prev') => {
      if (searchResults.length === 0) return;

      const nextIndex =
        direction === 'next'
          ? (currentMatchIndex + 1) % searchResults.length
          : (currentMatchIndex - 1 + searchResults.length) %
            searchResults.length;

      if (nextIndex === currentMatchIndex) return;

      const newTimelineIndex = searchResults[nextIndex];
      const matchData =
        newTimelineIndex !== undefined
          ? searchableContent[newTimelineIndex]
          : undefined;

      setCurrentMatchIndex(nextIndex);
      if (newTimelineIndex !== undefined) {
        activeItemIndex.current = newTimelineIndex;
        onTimelineUpdatedRef.current?.(newTimelineIndex);
      }

      if (matchData?.id) {
        handleTimelineItemClickRef.current?.(matchData.id);
        // Keep focus in search input for continued navigation
        // Timeline component handles item focus/visibility internally
        // Explicitly return focus to search input after navigation
        requestAnimationFrame(() => {
          if (searchInputRef.current) {
            searchInputRef.current.focus();
          }
        });
      }
    },
    [searchResults, currentMatchIndex, searchableContent],
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
    triggerSearch,
    clearSearch,
    handleNextMatch,
    handlePreviousMatch,
    handleSearchKeyDown,
  };
};
