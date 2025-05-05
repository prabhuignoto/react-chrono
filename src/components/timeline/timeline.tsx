import { Scroll } from '@models/TimelineHorizontalModel';
import { TimelineCardModel } from '@models/TimelineItemModel';
import { TimelineModel } from '@models/TimelineModel';
import { getUniqueID } from '@utils/index';
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

// Function to safely extract searchable text from potentially ReactNode content
const getSearchableText = (content: string | React.ReactNode | any): string => {
  if (content === null || content === undefined) {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }
  if (Array.isArray(content)) {
    return content
      .map((item) => getSearchableText(item))
      .filter(Boolean)
      .join(' ');
  }
  // For React elements or other objects, we can't search them
  return '';
};

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

  const canScrollTimeline = useMemo(() => {
    if (!slideShowRunning) {
      if (typeof scrollable === 'boolean') {
        return scrollable;
      }

      if (typeof scrollable === 'object' && scrollable.scrollbar) {
        return scrollable.scrollbar;
      }
    }
  }, [slideShowRunning, scrollable]);

  const id = useRef(
    `react-chrono-timeline-${noUniqueId ? uniqueId : getUniqueID()}`,
  );

  // --- Search Logic ---

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setCurrentMatchIndex(-1);

    // Always activate and scroll to the first item when clearing search
    if (items.length > 0) {
      // Set focus to first item
      activeItemIndex.current = 0;
      onTimelineUpdated?.(0);

      // Explicitly scroll to first item
      const firstItemId = items[0]?.id;
      if (firstItemId) handleTimelineItemClick(firstItemId);
    }
  }, [items, onTimelineUpdated]);

  const findMatches = useCallback(
    (query: string) => {
      if (!query) {
        setSearchResults([]);
        setCurrentMatchIndex(-1);
        return;
      }

      const queryLower = query.toLowerCase();
      const results: number[] = [];

      items.forEach((item, index) => {
        // Get searchable text from each field
        const titleText = getSearchableText(item.title);
        const cardTitleText = getSearchableText(item.cardTitle);
        const cardSubtitleText = getSearchableText(item.cardSubtitle);

        // Handle detailed text which might be a string or array
        let detailedText = '';
        if (Array.isArray(item.cardDetailedText)) {
          detailedText = item.cardDetailedText
            .map((text) => getSearchableText(text))
            .join(' ');
        } else {
          detailedText = getSearchableText(item.cardDetailedText);
        }

        // Check if any text contains the search query
        if (
          titleText.toLowerCase().includes(queryLower) ||
          cardTitleText.toLowerCase().includes(queryLower) ||
          cardSubtitleText.toLowerCase().includes(queryLower) ||
          detailedText.toLowerCase().includes(queryLower)
        ) {
          results.push(index);
        }
      });

      setSearchResults(results);
      setCurrentMatchIndex(results.length > 0 ? 0 : -1);

      // Activate the first match immediately
      if (results.length > 0) {
        const firstMatchItemId = items[results[0]]?.id;
        if (firstMatchItemId) {
          activeItemIndex.current = results[0];
          onTimelineUpdated?.(results[0]);
          handleTimelineItemClick(firstMatchItemId);
        }
      }
    },
    [items, onTimelineUpdated],
  );

  // Debounced search handler
  const debouncedSearch = useDebouncedCallback(findMatches, 300);

  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);
      debouncedSearch(query);
    },
    [debouncedSearch],
  );

  // Navigate search results
  const navigateMatches = useCallback(
    (direction: 'next' | 'prev') => {
      if (searchResults.length === 0) return;

      let nextIndex;
      if (direction === 'next') {
        nextIndex = (currentMatchIndex + 1) % searchResults.length;
      } else {
        nextIndex =
          (currentMatchIndex - 1 + searchResults.length) % searchResults.length;
      }

      const newTimelineIndex = searchResults[nextIndex];
      setCurrentMatchIndex(nextIndex);
      activeItemIndex.current = newTimelineIndex;
      onTimelineUpdated?.(newTimelineIndex);

      // Scroll to the item
      const itemId = items[newTimelineIndex]?.id;
      if (itemId) handleTimelineItemClick(itemId); // Reuse existing click handler for activation/scroll
    },
    [searchResults, currentMatchIndex, items, onTimelineUpdated],
  );

  const handleNextMatch = useCallback(
    () => navigateMatches('next'),
    [navigateMatches],
  );
  const handlePreviousMatch = useCallback(
    () => navigateMatches('prev'),
    [navigateMatches],
  );

  // Handle keyboard events for search (Enter key)
  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && searchResults.length > 0) {
        e.preventDefault();
        // Navigate to next match when Enter is pressed
        handleNextMatch();
      }
    },
    [searchResults.length, handleNextMatch],
  );

  // --- End Search Logic ---

  // handlers for navigation
  const handleNext = useCallback(() => {
    if (hasFocus) {
      activeItemIndex.current = Math.min(
        activeItemIndex.current + 1,
        items.length - 1,
      );
      onNext?.();
    }
  }, [hasFocus, onNext]);

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
  }, [hasFocus, onLast]);

  // handler for keyboard navigation
  const handleKeySelection = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const { key } = event;

      if (mode === 'HORIZONTAL' && key === 'ArrowRight') {
        flipLayout ? handlePrevious() : handleNext();
      } else if (mode === 'HORIZONTAL' && key === 'ArrowLeft') {
        flipLayout ? handleNext() : handlePrevious();
      } else if (
        (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') &&
        key === 'ArrowDown'
      ) {
        handleNext();
      } else if (
        (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') &&
        key === 'ArrowUp'
      ) {
        handlePrevious();
      } else if (key === 'Home') {
        handleFirst();
      } else if (key === 'End') {
        handleLast();
      }
    },
    [handleNext, handlePrevious, handleLast],
  );

  // Helper function to find target element
  const findTargetElement = (itemId: string) => {
    let elementId = `timeline-${timelineMode.toLowerCase()}-item-${itemId}`;
    let targetElement = document.getElementById(elementId);

    // Check in portal for horizontal modes
    if (
      !targetElement &&
      (timelineMode === 'HORIZONTAL' || timelineMode === 'HORIZONTAL_ALL')
    ) {
      const portalContainer = document.getElementById(id.current);
      if (portalContainer) {
        targetElement = portalContainer.querySelector(
          `#timeline-card-${itemId}`,
        );
      }
    }

    return targetElement;
  };

  // Helper function to update the timeline
  const updateTimelinePosition = (
    targetIndex: number,
    isSlideShow?: boolean,
  ) => {
    activeItemIndex.current = targetIndex;

    // Calculate the index to update to
    const updateIndex =
      isSlideShow && targetIndex < items.length - 1
        ? targetIndex + 1
        : targetIndex;

    onTimelineUpdated?.(updateIndex);
  };

  const handleTimelineItemClick = (itemId?: string, isSlideShow?: boolean) => {
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
  };

  useEffect(() => {
    const activeItem = items[activeTimelineItem || 0];

    if (slideShowRunning) {
      activeItemIndex.current = activeTimelineItem;
    }

    if (items.length && activeItem) {
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
        const contentRect =
          horizontalContentRef.current?.getBoundingClientRect();

        if (cardRect && contentRect) {
          const { width: cardWidth, left: cardLeft } = cardRect;
          const { width: contentWidth, left: contentLeft } = contentRect;
          setTimeout(() => {
            const ele = horizontalContentRef.current as HTMLElement;
            ele.style.scrollBehavior = 'smooth';
            ele.scrollLeft +=
              cardLeft - contentLeft + cardWidth / 2 - contentWidth / 2;
          }, 100);
        }
      }
    }
  }, [activeTimelineItem, items.length, slideShowRunning]);

  const handleScroll = (scroll: Partial<Scroll>) => {
    const element = timelineMainRef.current;
    if (element) {
      setNewOffset(element, scroll);
    }
  };

  useEffect(() => {
    const ele = timelineMainRef.current;
    if (!ele) {
      return;
    }
    if (mode === 'HORIZONTAL') {
      ele.scrollLeft = Math.max(newOffSet, 0);
    } else {
      ele.scrollTop = newOffSet;
    }
  }, [newOffSet]);

  useEffect(() => {
    // setup observer for the timeline elements
    setTimeout(() => {
      const element = timelineMainRef.current;

      if (element) {
        const childElements = element.querySelectorAll('.vertical-item-row');
        Array.from(childElements).forEach((elem) => {
          if (observer.current) {
            observer.current.observe(elem);
          }
        });
      }
    }, 0);

    const toggleMedia = (elem: HTMLElement, state: string) => {
      elem
        .querySelectorAll('img,video')
        .forEach(
          (ele) =>
            ((ele as HTMLElement).style.visibility =
              state === 'hide' ? 'hidden' : 'visible'),
        );
    };

    if (mode !== 'HORIZONTAL') {
      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const element = entry.target as HTMLDivElement;
            if (entry.isIntersecting) {
              // show img and video when visible.
              toggleMedia(element, 'show');
            } else {
              // hide img and video when not visible.
              toggleMedia(element, 'hide');
              // pause YouTube embeds
              element.querySelectorAll('iframe').forEach((element) => {
                // Check if it's a YouTube iframe
                const src = element.getAttribute('src') || '';

                // Determine appropriate target origin
                let targetOrigin = '*';
                if (src.includes('youtube.com')) {
                  targetOrigin = 'https://www.youtube.com';
                } else if (src.startsWith('https://')) {
                  try {
                    targetOrigin = new URL(src).origin;
                  } catch (e) {
                    // If URL parsing fails, log it and use default wildcard
                    console.warn('Invalid iframe URL:', src, e);
                    // Keep wildcard as fallback for invalid URLs
                    targetOrigin = '*';
                  }
                }

                element.contentWindow?.postMessage(
                  '{"event":"command","func":"stopVideo","args":""}',
                  targetOrigin,
                );
              });
            }
          });
        },
        {
          root: timelineMainRef.current,
          threshold: 0,
        },
      );
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
    // eslint-disable-next-line
  }, []);

  const handleKeyDown = useCallback(
    (evt: React.KeyboardEvent<HTMLDivElement>) => {
      if (!disableNavOnKey && !slideShowRunning) {
        setHasFocus(true);
        handleKeySelection(evt);
      }
    },
    [disableNavOnKey, slideShowRunning, handleKeySelection],
  );

  const handleTimelineUpdate = useCallback((mode: string) => {
    if (mode === 'VERTICAL') {
      setTimelineMode('VERTICAL');
    } else if (mode === 'HORIZONTAL') {
      setTimelineMode('HORIZONTAL');
      updateHorizontalAllCards?.(false);
    } else if (mode === 'VERTICAL_ALTERNATING') {
      setTimelineMode('VERTICAL_ALTERNATING');
    } else if (mode === 'HORIZONTAL_ALL') {
      setTimelineMode('HORIZONTAL_ALL');
      updateHorizontalAllCards?.(true);
    }
  }, []);

  const wrapperClass = useMemo(() => {
    return cls(mode.toLocaleLowerCase(), {
      'focus-visible': !isChild,
      'js-focus-visible': !isChild,
    });
  }, [mode, isChild]);

  const canShowToolbar = useMemo(() => {
    return !disableToolbar && !isChild;
  }, [isChild, disableToolbar]);

  return (
    <Wrapper
      onKeyDown={handleKeyDown}
      className={wrapperClass}
      cardPositionHorizontal={cardPositionHorizontal}
      onMouseDown={() => {
        setHasFocus(true);
      }}
      onKeyUp={(evt) => {
        if (evt.key === 'Escape') {
          onPaused?.();
        }
      }}
    >
      {canShowToolbar ? (
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
            id={id.current}
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
          />
        </ToolbarWrapper>
      ) : null}
      <TimelineMainWrapper
        ref={timelineMainRef}
        $scrollable={canScrollTimeline}
        className={`${mode.toLowerCase()} timeline-main-wrapper`}
        id="timeline-main-wrapper"
        data-testid="timeline-main-wrapper"
        theme={theme}
        mode={mode}
        position={toolbarPosition}
        onScroll={(ev) => {
          const target = ev.target as HTMLElement;
          let scrolled = 0;

          if (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') {
            scrolled = target.scrollTop + target.clientHeight;

            if (target.scrollHeight - scrolled < 1) {
              onScrollEnd?.();
            }
          } else {
            scrolled = target.scrollLeft + target.offsetWidth;

            if (target.scrollWidth === scrolled) {
              onScrollEnd?.();
            }
          }
        }}
      >
        {/* VERTICAL ALTERNATING */}
        {timelineMode === 'VERTICAL_ALTERNATING' ? (
          <TimelineVertical
            activeTimelineItem={activeTimelineItem}
            autoScroll={handleScroll}
            contentDetailsChildren={contentDetailsChildren}
            hasFocus={hasFocus}
            iconChildren={iconChildren}
            items={items as TimelineCardModel[]}
            mode={timelineMode}
            onClick={handleTimelineItemClick}
            onElapsed={(itemId?: string) =>
              handleTimelineItemClick(itemId, true)
            }
            onOutlineSelection={onOutlineSelection}
            slideShowRunning={slideShowRunning}
            theme={theme}
            nestedCardHeight={nestedCardHeight}
          />
        ) : null}

        {/* HORIZONTAL */}
        {timelineMode === 'HORIZONTAL' || timelineMode === 'HORIZONTAL_ALL' ? (
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
              onElapsed={(itemId?: string) =>
                handleTimelineItemClick(itemId, true)
              }
              slideShowRunning={slideShowRunning}
              wrapperId={id.current}
              nestedCardHeight={nestedCardHeight}
            />
          </TimelineMain>
        ) : null}

        {/* VERTICAL */}
        {timelineMode === 'VERTICAL' ? (
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
            onElapsed={(itemId?: string) =>
              handleTimelineItemClick(itemId, true)
            }
            onOutlineSelection={onOutlineSelection}
            slideShowRunning={slideShowRunning}
            theme={theme}
            nestedCardHeight={nestedCardHeight}
          />
        ) : null}
      </TimelineMainWrapper>

      {/* placeholder to render timeline content for horizontal mode */}
      <TimelineContentRender
        id={id.current}
        $showAllCards={showAllCardsHorizontal}
        ref={horizontalContentRef}
      />
    </Wrapper>
  );
};

Timeline.displayName = 'Timeline';

export default Timeline;
