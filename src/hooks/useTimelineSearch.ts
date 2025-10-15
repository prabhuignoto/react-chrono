import { useCallback, useState, useRef, useMemo, useEffect } from 'react';
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
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
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
        if (searchableContent[i]?.content?.includes(queryLower)) {
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
        const firstResult = results[0];
        const firstMatchData =
          firstResult !== undefined
            ? searchableContent[firstResult]
            : undefined;
        if (firstMatchData?.id && firstResult !== undefined) {
          activeItemIndex.current = firstResult;

          // Clear any existing timeout
          if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
          }

          // On first search, focus immediately. On subsequent searches, use delay
          const delay = isFirstSearchRef.current ? 100 : 400;
          isFirstSearchRef.current = false;

          searchTimeoutRef.current = setTimeout(() => {
            onTimelineUpdatedRef.current?.(firstResult);
            handleTimelineItemClickRef.current(firstMatchData.id);
            // After navigating to first match, focus the item row/card
            requestAnimationFrame(() => {
              const itemId = firstMatchData.id;
              // Try vertical first
              const verticalRow = document.querySelector(
                `[data-testid="vertical-item-row"][data-item-id="${itemId}"]`,
              ) as HTMLElement | null;
              const target =
                verticalRow ||
                (document.getElementById(
                  `timeline-card-${itemId}`,
                ) as HTMLElement | null);
              try {
                target?.focus?.({ preventScroll: true });
              } catch {}
            });
          }, delay);
        }
      } else {
        setCurrentMatchIndex(-1);
      }
    },
    [searchableContent],
  );

  // Optimized debounced search with better performance
  const debouncedSearch = useDebouncedCallback(findMatches, 200, {
    maxWait: 600,
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

  const clearSearch = useCallback(
    (preservePosition = false) => {
      setSearchQuery('');
      setSearchResults([]);
      setCurrentMatchIndex(-1);
      debouncedSearch.cancel();

      // Clear any pending auto-focus timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // Reset first search flag when clearing
      isFirstSearchRef.current = true;

      if (items.length > 0 && !preservePosition) {
        activeItemIndex.current = 0;
        onTimelineUpdatedRef.current?.(0);

        const firstItem = items[0];
        if (firstItem?.id) {
          handleTimelineItemClickRef.current(firstItem.id);
        }
      }

      // Force refocus after clearing (only when user explicitly clears)
      if (!preservePosition) {
        focusSearchInput(true);
      }
    },
    [items, debouncedSearch, focusSearchInput],
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
        handleTimelineItemClickRef.current(matchData.id);
        // Focus the matched item to make it visible to screen readers
        requestAnimationFrame(() => {
          const itemId = matchData.id;
          const verticalRow = document.querySelector(
            `[data-testid="vertical-item-row"][data-item-id="${itemId}"]`,
          ) as HTMLElement | null;
          const target =
            verticalRow ||
            (document.getElementById(
              `timeline-card-${itemId}`,
            ) as HTMLElement | null);
          try {
            target?.focus?.({ preventScroll: true });
          } catch {}
        });
        // Then return focus to search for continued navigation
        focusSearchInput(true);
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

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
