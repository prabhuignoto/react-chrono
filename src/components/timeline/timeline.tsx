import { Scroll } from '@models/TimelineHorizontalModel';
import { TimelineCardModel } from '@models/TimelineItemModel';
import { TimelineModel } from '@models/TimelineModel';
import { getUniqueID } from '@utils/index';
import {
  findTimelineElement,
  getSearchableText,
  pauseVideoEmbeds,
  toggleMediaVisibility,
} from '@utils/timelineUtils';
import cls from 'classnames';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { GlobalContext } from '../GlobalContext';
import useNewScrollPosition from '../effects/useNewScrollPosition';
import TimelineHorizontal from '../timeline-horizontal/timeline-horizontal';
import TimelineVertical from '../timeline-vertical/timeline-vertical';
import { TimelineToolbar } from './timeline-toolbar';
import {
  Outline,
  TimelineContentRender,
  TimelineMain,
  TimelineMainWrapper,
  ToolbarWrapper,
  Wrapper,
} from './timeline.style';
import { useDebouncedCallback } from 'use-debounce';

const Timeline: React.FunctionComponent<TimelineModel> = (
  props: TimelineModel,
) => {
  // de-structure the props
  const {
    activeTimelineItem,
    contentDetailsChildren,
    iconChildren,
    items = [],
    onFirst,
    onLast,
    onNext,
    onPrevious,
    onRestartSlideshow,
    onTimelineUpdated,
    onItemSelected,
    onOutlineSelection,
    slideShowEnabled,
    slideShowRunning,
    mode = 'HORIZONTAL',
    nestedCardHeight,
    isChild = false,
    onPaused,
    uniqueId,
    noUniqueId,
  } = props;

  const {
    cardPositionHorizontal,
    disableNavOnKey,
    flipLayout,
    itemWidth = 200,
    lineWidth,
    onScrollEnd,
    scrollable = true,
    showAllCardsHorizontal,
    theme,
    darkMode,
    toggleDarkMode,
    updateHorizontalAllCards,
    toolbarPosition,
    updateTextContentDensity,
    disableToolbar,
  } = useContext(GlobalContext);

  const [newOffSet, setNewOffset] = useNewScrollPosition(mode, itemWidth);
  const observer = useRef<IntersectionObserver | null>(null);
  const [hasFocus, setHasFocus] = useState(false);
  const horizontalContentRef = useRef<HTMLDivElement | null>(null);
  const [timelineMode, setTimelineMode] = useState(
    mode === 'HORIZONTAL' && showAllCardsHorizontal ? 'HORIZONTAL_ALL' : mode,
  );

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);

  const activeItemIndex = useRef<number>(activeTimelineItem);

  // reference to the timeline
  const timelineMainRef = useRef<HTMLDivElement>(null);

  // Memoize ID generation to prevent unnecessary regeneration
  const id = useMemo(
    () => `react-chrono-timeline-${noUniqueId ? uniqueId : getUniqueID()}`,
    [noUniqueId, uniqueId],
  );

  // Memoize scroll capability determination
  const canScrollTimeline = useMemo(() => {
    if (slideShowRunning) return false;

    if (typeof scrollable === 'boolean') {
      return scrollable;
    }

    return typeof scrollable === 'object' && scrollable.scrollbar;
  }, [slideShowRunning, scrollable]);

  // Memoize classes and display flags
  const wrapperClass = useMemo(
    () =>
      cls(mode.toLocaleLowerCase(), {
        'focus-visible': !isChild,
        'js-focus-visible': !isChild,
      }),
    [mode, isChild],
  );

  const canShowToolbar = useMemo(
    () => !disableToolbar && !isChild,
    [isChild, disableToolbar],
  );

  // Add a ref for the search input
  const searchInputRef = useRef<HTMLInputElement>(null);

  // --- Search Logic ---
  // Optimize findMatches to reduce iterations and memory allocations
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
          if (currentQuery) {
            setSearchQuery(currentQuery);
          }

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
    [items, onTimelineUpdated],
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
  }, [items, onTimelineUpdated]);

  // Optimize navigation between search matches
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
      // Use a longer timeout to ensure state updates have completed
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();

          // Ensure the cursor is at the end of the text
          const length = searchInputRef.current.value.length;
          searchInputRef.current.setSelectionRange(length, length);
        }
      }, 50);
    },
    [searchResults, currentMatchIndex, items, onTimelineUpdated, searchQuery],
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

  // --- Navigation Logic ---
  // Optimize navigation handlers
  const handleNext = useCallback(() => {
    if (hasFocus) {
      activeItemIndex.current = Math.min(
        activeItemIndex.current + 1,
        items.length - 1,
      );
      onNext?.();
    }
  }, [hasFocus, items.length, onNext]);

  const handlePrevious = useCallback(() => {
    if (hasFocus) {
      activeItemIndex.current = Math.max(activeItemIndex.current - 1, 0);
      onPrevious?.();
    }
  }, [hasFocus, onPrevious]);

  const handleFirst = useCallback(() => {
    if (hasFocus) {
      activeItemIndex.current = 0;
      onFirst?.();
    }
  }, [hasFocus, onFirst]);

  const handleLast = useCallback(() => {
    if (hasFocus) {
      activeItemIndex.current = items.length - 1;
      onLast?.();
    }
  }, [hasFocus, items.length, onLast]);

  // Optimize keyboard navigation
  const handleKeySelection = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const { key } = event;

      // Common handlers
      if (key === 'Home') {
        handleFirst();
        return;
      }
      if (key === 'End') {
        handleLast();
        return;
      }

      // Mode-specific handlers
      switch (mode) {
        case 'HORIZONTAL':
          if (key === 'ArrowRight') {
            flipLayout ? handlePrevious() : handleNext();
          } else if (key === 'ArrowLeft') {
            flipLayout ? handleNext() : handlePrevious();
          }
          break;

        case 'VERTICAL':
        case 'VERTICAL_ALTERNATING':
          if (key === 'ArrowDown') {
            handleNext();
          } else if (key === 'ArrowUp') {
            handlePrevious();
          }
          break;
      }
    },
    [mode, flipLayout, handleNext, handlePrevious, handleFirst, handleLast],
  );

  const handleKeyDown = useCallback(
    (evt: React.KeyboardEvent<HTMLDivElement>) => {
      if (!disableNavOnKey && !slideShowRunning) {
        setHasFocus(true);
        handleKeySelection(evt);
      }
    },
    [disableNavOnKey, slideShowRunning, handleKeySelection],
  );

  // --- Timeline Item Handling ---
  // Using the imported findTimelineElement utility function
  const findTargetElement = useCallback(
    (itemId: string) => {
      return findTimelineElement(itemId, timelineMode, id);
    },
    [timelineMode, id],
  );

  const updateTimelinePosition = useCallback(
    (targetIndex: number, isSlideShow?: boolean) => {
      activeItemIndex.current = targetIndex;

      const updateIndex =
        isSlideShow && targetIndex < items.length - 1
          ? targetIndex + 1
          : targetIndex;

      onTimelineUpdated?.(updateIndex);
    },
    [items.length, onTimelineUpdated],
  );

  const handleTimelineItemClick = useCallback(
    (itemId?: string, isSlideShow?: boolean) => {
      if (!itemId) return;

      const targetIndex = items.findIndex((item) => item.id === itemId);
      if (targetIndex === -1) return;

      // Update timeline position
      updateTimelinePosition(targetIndex, isSlideShow);

      // Find and scroll to target element
      const targetElement = findTargetElement(itemId);
      targetElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });

      // Update search match index if applicable
      const resultIndex = searchResults.indexOf(targetIndex);
      if (resultIndex !== -1) {
        setCurrentMatchIndex(resultIndex);
      }
    },
    [items, updateTimelinePosition, findTargetElement, searchResults],
  );

  // Memoize the onElapsed handler to prevent creating a new function on every render
  const handleTimelineItemElapsed = useCallback(
    (itemId?: string) => handleTimelineItemClick(itemId, true),
    [handleTimelineItemClick],
  );

  // Handle scrolling
  const handleScroll = useCallback(
    (scroll: Partial<Scroll>) => {
      const element = timelineMainRef.current;
      if (element) {
        setNewOffset(element, scroll);
      }
    },
    [setNewOffset],
  );

  // Optimize mode update handling
  const handleTimelineUpdate = useCallback(
    (newMode: string) => {
      switch (newMode) {
        case 'VERTICAL':
          setTimelineMode('VERTICAL');
          break;
        case 'HORIZONTAL':
          setTimelineMode('HORIZONTAL');
          updateHorizontalAllCards?.(false);
          break;
        case 'VERTICAL_ALTERNATING':
          setTimelineMode('VERTICAL_ALTERNATING');
          break;
        case 'HORIZONTAL_ALL':
          setTimelineMode('HORIZONTAL_ALL');
          updateHorizontalAllCards?.(true);
          break;
      }
    },
    [updateHorizontalAllCards],
  );

  // Scroll handler for detecting end
  const handleMainScroll = useCallback(
    (ev: React.UIEvent<HTMLDivElement>) => {
      const target = ev.target as HTMLElement;

      if (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') {
        const scrolled = target.scrollTop + target.clientHeight;
        if (target.scrollHeight - scrolled < 1) {
          onScrollEnd?.();
        }
      } else {
        const scrolled = target.scrollLeft + target.offsetWidth;
        if (target.scrollWidth === scrolled) {
          onScrollEnd?.();
        }
      }
    },
    [mode, onScrollEnd],
  );

  // --- Effects ---
  // Update scroll position when offset changes
  useEffect(() => {
    const ele = timelineMainRef.current;
    if (!ele) return;

    if (mode === 'HORIZONTAL') {
      ele.scrollLeft = Math.max(newOffSet, 0);
    } else {
      ele.scrollTop = newOffSet;
    }
  }, [newOffSet, mode]);

  // Update active item information
  useEffect(() => {
    const activeItem = items[activeTimelineItem || 0];

    if (slideShowRunning) {
      activeItemIndex.current = activeTimelineItem;
    }

    if (!items.length || !activeItem) return;

    const { title, cardTitle, cardSubtitle, cardDetailedText } = activeItem;
    onItemSelected?.({
      cardDetailedText,
      cardSubtitle,
      cardTitle,
      index: activeItemIndex.current,
      title,
    });

    if (mode === 'HORIZONTAL') {
      const card = horizontalContentRef.current?.querySelector(
        `#timeline-card-${activeItem.id}`,
      );

      const cardRect = card?.getBoundingClientRect();
      const contentRect = horizontalContentRef.current?.getBoundingClientRect();

      if (cardRect && contentRect) {
        const { width: cardWidth, left: cardLeft } = cardRect;
        const { width: contentWidth, left: contentLeft } = contentRect;

        // Defer DOM manipulation to next tick
        requestAnimationFrame(() => {
          const ele = horizontalContentRef.current as HTMLElement;
          if (!ele) return;

          ele.style.scrollBehavior = 'smooth';
          ele.scrollLeft +=
            cardLeft - contentLeft + cardWidth / 2 - contentWidth / 2;
        });
      }
    }
  }, [activeTimelineItem, items, slideShowRunning, mode, onItemSelected]);

  // Setup IntersectionObserver for efficient media handling
  useEffect(() => {
    if (mode === 'HORIZONTAL') return;

    // Create observer first for better performance
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLDivElement;
          if (entry.isIntersecting) {
            toggleMediaVisibility(element, true);
          } else {
            toggleMediaVisibility(element, false);
            pauseVideoEmbeds(element);
          }
        });
      },
      {
        root: timelineMainRef.current,
        threshold: 0,
      },
    );

    // Use requestAnimationFrame to defer DOM operations
    requestAnimationFrame(() => {
      const element = timelineMainRef.current;
      if (!element) return;

      const childElements = element.querySelectorAll('.vertical-item-row');
      childElements.forEach((elem) => {
        observer.current?.observe(elem);
      });
    });

    return () => {
      observer.current?.disconnect();
    };
  }, [mode]);

  // Memoize each timeline type component to prevent unnecessary re-renders
  const VerticalAlternatingTimeline = useMemo(() => {
    if (timelineMode !== 'VERTICAL_ALTERNATING') return null;

    return (
      <TimelineVertical
        activeTimelineItem={activeTimelineItem}
        autoScroll={handleScroll}
        contentDetailsChildren={contentDetailsChildren}
        hasFocus={hasFocus}
        iconChildren={iconChildren}
        items={items as TimelineCardModel[]}
        mode={timelineMode}
        onClick={handleTimelineItemClick}
        onElapsed={handleTimelineItemElapsed}
        onOutlineSelection={onOutlineSelection}
        slideShowRunning={slideShowRunning}
        theme={theme}
        nestedCardHeight={nestedCardHeight}
      />
    );
  }, [
    timelineMode,
    activeTimelineItem,
    handleScroll,
    contentDetailsChildren,
    hasFocus,
    iconChildren,
    items,
    handleTimelineItemClick,
    onOutlineSelection,
    slideShowRunning,
    theme,
    nestedCardHeight,
    handleTimelineItemElapsed,
  ]);

  const HorizontalTimeline = useMemo(() => {
    if (timelineMode !== 'HORIZONTAL' && timelineMode !== 'HORIZONTAL_ALL')
      return null;

    return (
      <TimelineMain className={mode.toLowerCase()}>
        <Outline color={theme?.primary} height={lineWidth} />
        <TimelineHorizontal
          autoScroll={handleScroll}
          contentDetailsChildren={contentDetailsChildren}
          handleItemClick={handleTimelineItemClick}
          hasFocus={hasFocus}
          iconChildren={iconChildren}
          items={items as TimelineCardModel[]}
          mode={timelineMode}
          onElapsed={handleTimelineItemElapsed}
          slideShowRunning={slideShowRunning}
          wrapperId={id}
          nestedCardHeight={nestedCardHeight}
        />
      </TimelineMain>
    );
  }, [
    timelineMode,
    mode,
    theme?.primary,
    lineWidth,
    handleScroll,
    contentDetailsChildren,
    handleTimelineItemClick,
    hasFocus,
    iconChildren,
    items,
    slideShowRunning,
    id,
    nestedCardHeight,
    handleTimelineItemElapsed,
  ]);

  const VerticalTimeline = useMemo(() => {
    if (timelineMode !== 'VERTICAL') return null;

    return (
      <TimelineVertical
        activeTimelineItem={activeTimelineItem}
        alternateCards={false}
        autoScroll={handleScroll}
        contentDetailsChildren={contentDetailsChildren}
        hasFocus={hasFocus}
        iconChildren={iconChildren}
        items={items as TimelineCardModel[]}
        mode={mode}
        onClick={handleTimelineItemClick}
        onElapsed={handleTimelineItemElapsed}
        onOutlineSelection={onOutlineSelection}
        slideShowRunning={slideShowRunning}
        theme={theme}
        nestedCardHeight={nestedCardHeight}
      />
    );
  }, [
    timelineMode,
    activeTimelineItem,
    handleScroll,
    contentDetailsChildren,
    hasFocus,
    iconChildren,
    items,
    mode,
    handleTimelineItemClick,
    onOutlineSelection,
    slideShowRunning,
    theme,
    nestedCardHeight,
    handleTimelineItemElapsed,
  ]);

  // Memoize toolbar component to prevent re-renders
  const ToolbarComponent = useMemo(() => {
    if (!canShowToolbar) return null;

    return (
      <ToolbarWrapper position={toolbarPosition}>
        <TimelineToolbar
          activeTimelineItem={activeTimelineItem}
          totalItems={items.length}
          slideShowEnabled={slideShowEnabled}
          slideShowRunning={slideShowRunning}
          onFirst={handleFirst}
          onLast={handleLast}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onRestartSlideshow={onRestartSlideshow}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onPaused={onPaused}
          id={id}
          flipLayout={flipLayout}
          items={items}
          onActivateTimelineItem={handleTimelineItemClick}
          onUpdateTimelineMode={handleTimelineUpdate}
          onUpdateTextContentDensity={updateTextContentDensity}
          mode={timelineMode}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onClearSearch={clearSearch}
          onNextMatch={handleNextMatch}
          onPreviousMatch={handlePreviousMatch}
          totalMatches={searchResults.length}
          currentMatchIndex={currentMatchIndex}
          onSearchKeyDown={handleSearchKeyDown}
          searchInputRef={searchInputRef}
        />
      </ToolbarWrapper>
    );
  }, [
    canShowToolbar,
    toolbarPosition,
    activeTimelineItem,
    items.length,
    slideShowEnabled,
    slideShowRunning,
    handleFirst,
    handleLast,
    handleNext,
    handlePrevious,
    onRestartSlideshow,
    darkMode,
    toggleDarkMode,
    onPaused,
    id,
    flipLayout,
    items,
    handleTimelineItemClick,
    handleTimelineUpdate,
    updateTextContentDensity,
    timelineMode,
    searchQuery,
    handleSearchChange,
    clearSearch,
    handleNextMatch,
    handlePreviousMatch,
    searchResults.length,
    currentMatchIndex,
    handleSearchKeyDown,
    searchInputRef,
  ]);

  return (
    <Wrapper
      onKeyDown={handleKeyDown}
      className={wrapperClass}
      cardPositionHorizontal={cardPositionHorizontal}
      onMouseDown={() => setHasFocus(true)}
      onKeyUp={(evt) => {
        if (evt.key === 'Escape') {
          onPaused?.();
        }
      }}
    >
      {ToolbarComponent}

      <TimelineMainWrapper
        ref={timelineMainRef}
        $scrollable={canScrollTimeline}
        className={`${mode.toLowerCase()} timeline-main-wrapper`}
        id="timeline-main-wrapper"
        data-testid="timeline-main-wrapper"
        theme={theme}
        mode={mode}
        position={toolbarPosition}
        onScroll={handleMainScroll}
      >
        {VerticalAlternatingTimeline}
        {HorizontalTimeline}
        {VerticalTimeline}
      </TimelineMainWrapper>

      {/* placeholder to render timeline content for horizontal mode */}
      <TimelineContentRender
        id={id}
        $showAllCards={showAllCardsHorizontal}
        ref={horizontalContentRef}
      />
    </Wrapper>
  );
};

Timeline.displayName = 'Timeline';

export default React.memo(Timeline);
