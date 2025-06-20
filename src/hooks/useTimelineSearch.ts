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

  // Return focus to search input after a delay when cards receive focus
  const scheduleFocusReturn = useCallback(() => {
    setTimeout(() => {
      if (searchInputRef.current && searchQuery) {
        focusSearchInput();
      }
    }, 300); // Wait for card focus to complete, then return to search
  }, [focusSearchInput, searchQuery]);

  // Track if user is actively typing to prevent focus interruption
  const isTypingRef = useRef(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Enhanced search input focus with initial focus setup
  useEffect(() => {
    // Ensure search input has initial focus when component mounts
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Global focus protection - prevent any other element from stealing focus during search
  useEffect(() => {
    if (searchQuery && searchInputRef.current) {
      let focusCheckInterval: NodeJS.Timeout;
      
      const protectSearchFocus = () => {
        if (searchInputRef.current && 
            document.activeElement !== searchInputRef.current && 
            searchQuery && 
            !isTypingRef.current) {
          // Check if focus moved to a timeline element
          const activeEl = document.activeElement as HTMLElement;
          if (activeEl && (
              activeEl.closest('.timeline-card-content') ||
              activeEl.closest('[data-testid="timeline-circle"]') ||
              activeEl.closest('.timeline-wrapper') ||
              activeEl.closest('.timeline-vertical') ||
              activeEl.closest('.timeline-horizontal')
            )) {
            // Focus was stolen by timeline element, restore it
            setTimeout(() => {
              if (searchInputRef.current && searchQuery) {
                searchInputRef.current.focus();
              }
            }, 10);
          }
        }
      };

      // Check focus every 100ms when search is active
      focusCheckInterval = setInterval(protectSearchFocus, 100);

      return () => {
        if (focusCheckInterval) {
          clearInterval(focusCheckInterval);
        }
      };
    }
  }, [searchQuery]);

  // Keep search input focused when typing - prevent focus loss during search
  useEffect(() => {
    if (searchQuery && searchInputRef.current) {
      const inputElement = searchInputRef.current;
      
      // Only add event listeners if the element has the addEventListener method
      if (typeof inputElement.addEventListener === 'function') {
        // Track typing state to prevent focus stealing
        const handleInput = () => {
          isTypingRef.current = true;
          if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
          }
          typingTimeoutRef.current = setTimeout(() => {
            isTypingRef.current = false;
          }, 500); // User is considered "typing" for 500ms after last input
        };

        // Prevent focus loss during typing
        const handleBlur = (event: FocusEvent) => {
          if (isTypingRef.current || searchQuery) {
            // If user is typing or there's a search query, immediately refocus
            setTimeout(() => {
              if (searchInputRef.current && (isTypingRef.current || searchQuery)) {
                searchInputRef.current.focus();
              }
            }, 0);
          }
        };

        // More aggressive focus retention
        const handleFocusOut = (event: FocusEvent) => {
          // Check if focus is moving to timeline elements
          const relatedTarget = event.relatedTarget as HTMLElement;
          if (relatedTarget && 
              (relatedTarget.closest('.timeline-card-content') ||
               relatedTarget.closest('[data-testid="timeline-circle"]') ||
               relatedTarget.closest('.timeline-nav-wrapper')) &&
              searchQuery) {
            // Focus is moving to timeline elements during search, prevent it
            event.preventDefault();
            setTimeout(() => {
              if (searchInputRef.current) {
                searchInputRef.current.focus();
              }
            }, 0);
          }
        };

        inputElement.addEventListener('input', handleInput);
        inputElement.addEventListener('blur', handleBlur);
        inputElement.addEventListener('focusout', handleFocusOut);

        return () => {
          if (typeof inputElement.removeEventListener === 'function') {
            inputElement.removeEventListener('input', handleInput);
            inputElement.removeEventListener('blur', handleBlur);
            inputElement.removeEventListener('focusout', handleFocusOut);
          }
          if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
          }
        };
      }
    }
  }, [searchQuery]);

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
          scheduleFocusReturn(); // Schedule focus return after card receives focus
        }
      } else {
        setCurrentMatchIndex(-1);
        focusSearchInput();
      }
    },
    [searchableContent, focusSearchInput, scheduleFocusReturn],
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
      
      // Mark user as actively typing
      isTypingRef.current = true;
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        isTypingRef.current = false;
      }, 500);

      // Ensure input stays focused during typing
      setTimeout(() => {
        if (searchInputRef.current && query) {
          searchInputRef.current.focus();
        }
      }, 0);

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
        scheduleFocusReturn(); // Schedule focus return after card receives focus
      }
    },
    [searchResults, currentMatchIndex, searchableContent, focusSearchInput, scheduleFocusReturn],
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
