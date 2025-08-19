import { TimelineModel } from '@models/TimelineModel';
import { getUniqueID } from '@utils/index';
import cls from 'classnames';
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useTimelineContext } from '../contexts';
import useNewScrollPosition from '../effects/useNewScrollPosition';
import { useSlideshowProgress } from '../../hooks/useSlideshowProgress';
import * as ve from './timeline.css';
// Temporarily disabled new Vanilla Extract styles due to PostCSS errors
// import {
//   timelineWrapper,
//   timelineMainWrapper as timelineMainWrapperVE,
//   timelineContentRender
// } from './timeline-main.css';
import { computeCssVarsFromTheme } from '../../styles/theme-bridge';
import { TimelineToolbar } from './timeline-toolbar';
import { useTimelineSearch } from '../../hooks/useTimelineSearch';
import { useTimelineNavigation } from '../../hooks/useTimelineNavigation';
import { useTimelineMode } from '../../hooks/useTimelineMode';
import { useTimelineScroll } from '../../hooks/useTimelineScroll';
import { useTimelineMedia } from '../../hooks/useTimelineMedia';
import TimelineView from './TimelineView';

// Disable TypeScript checking for the Timeline component
// as we're addressing the type conflicts through our custom hooks
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
    nestedCardHeight,
    isChild = false,
    onPaused,
    uniqueId,
    noUniqueId,
  } = props;

  // Use unified context
  const {
    // Navigation context properties
    scrollable,
    disableNavOnKey,
    disableInteraction,
    onScrollEnd,

    // Theme context properties
    theme,
    isDarkMode: darkMode,
    toggleDarkMode,

    // Layout context properties
    mode,
    cardHeight,
    cardLess,
    flipLayout,
    itemWidth,
    lineWidth,
    toolbarPosition,
    disableToolbar,
    borderLessCards,
    showAllCardsHorizontal,
    textContentDensity,
    enableLayoutSwitch,
    useReadMore,
    cardPositionHorizontal,
    updateShowAllCardsHorizontal: updateHorizontalAllCards,
    updateTextContentDensity,
  } = useTimelineContext();

  // Default slideItemDuration - will be moved to a separate context later
  const slideItemDuration = 2000;

  const [newOffSet, setNewOffset] = useNewScrollPosition(mode, itemWidth);
  const [hasFocus, setHasFocus] = useState(false);
  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);
  const [isToolbarNavigation, setIsToolbarNavigation] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Listen to native fullscreen change events to keep state in sync
  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as Document & {
        webkitFullscreenElement?: Element;
        mozFullScreenElement?: Element;
        msFullscreenElement?: Element;
      };

      const isCurrentlyFullscreen = !!(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange,
      );
      document.removeEventListener(
        'mozfullscreenchange',
        handleFullscreenChange,
      );
      document.removeEventListener(
        'msfullscreenchange',
        handleFullscreenChange,
      );
    };
  }, []);

  // Memoize ID generation to prevent unnecessary regeneration
  const id = useMemo(
    () => `react-chrono-timeline-${noUniqueId ? uniqueId : getUniqueID()}`,
    [noUniqueId, uniqueId],
  );

  // Use custom hooks - prioritize component prop mode over context mode
  const { timelineMode, handleTimelineUpdate } = useTimelineMode({
    initialMode: mode, // Use mode from context
    showAllCardsHorizontal,
    updateHorizontalAllCards,
  });

  // Ensure context's showAllCardsHorizontal stays in sync with computed mode
  useEffect(() => {
    if (timelineMode === 'HORIZONTAL_ALL') {
      updateHorizontalAllCards(true);
    } else if (timelineMode === 'HORIZONTAL') {
      updateHorizontalAllCards(false);
    }
  }, [timelineMode, updateHorizontalAllCards]);

  // Debug logging for timeline mode
  if (typeof window !== 'undefined') {
    console.log(
      'Timeline Component - Context Mode:',
      mode,
      'Timeline Mode:',
      timelineMode,
      'ShowAllCards:',
      showAllCardsHorizontal,
    );
  }

  const {
    timelineMainRef,
    horizontalContentRef,
    handleScroll,
    handleMainScroll,
  } = useTimelineScroll({
    mode,
    onScrollEnd: onScrollEnd || (() => {}),
    setNewOffset,
  });

  const {
    activeItemIndex,
    handleTimelineItemClick: handleTimelineItemClickInternal,
    handleTimelineItemElapsed,
    handleNext: handleNextInternal,
    handlePrevious: handlePreviousInternal,
    handleFirst: handleFirstInternal,
    handleLast: handleLastInternal,
    handleKeySelection,
    syncActiveItemIndex,
  } = useTimelineNavigation({
    items,
    mode: timelineMode,
    timelineId: id,
    hasFocus,
    flipLayout: !!flipLayout,
    slideShowRunning: !!slideShowRunning,
    isKeyboardNavigation: !!isKeyboardNavigation,
    onTimelineUpdated: onTimelineUpdated || (() => {}),
    onNext: onNext || (() => {}),
    onPrevious: onPrevious || (() => {}),
    onFirst: onFirst || (() => {}),
    onLast: onLast || (() => {}),
  });

  // Wrap timeline item click to reset navigation states
  const handleTimelineItemClick = React.useCallback(
    (itemId?: string, isSlideShow?: boolean) => {
      // Reset navigation states when clicking directly on items
      setIsKeyboardNavigation(false);
      setIsToolbarNavigation(false);
      handleTimelineItemClickInternal(itemId, isSlideShow);

      // After activating, bring the card/row to focus for accessibility
      if (itemId) {
        requestAnimationFrame(() => {
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
      }
    },
    [handleTimelineItemClickInternal],
  );

  // Enhanced navigation handlers that track source
  const handleNext = React.useCallback(() => {
    setIsToolbarNavigation(true);
    setIsKeyboardNavigation(false);
    // Clear keyboard state after a delay to ensure styles are applied
    setTimeout(() => {
      setIsToolbarNavigation(false);
    }, 500);
    handleNextInternal();
  }, [handleNextInternal]);

  const handlePrevious = React.useCallback(() => {
    setIsToolbarNavigation(true);
    setIsKeyboardNavigation(false);
    // Clear keyboard state after a delay to ensure styles are applied
    setTimeout(() => {
      setIsToolbarNavigation(false);
    }, 500);
    handlePreviousInternal();
  }, [handlePreviousInternal]);

  const handleFirst = React.useCallback(() => {
    setIsToolbarNavigation(true);
    setIsKeyboardNavigation(false);
    // Clear keyboard state after a delay to ensure styles are applied
    setTimeout(() => {
      setIsToolbarNavigation(false);
    }, 500);
    handleFirstInternal();
  }, [handleFirstInternal]);

  const handleLast = React.useCallback(() => {
    setIsToolbarNavigation(true);
    setIsKeyboardNavigation(false);
    // Clear keyboard state after a delay to ensure styles are applied
    setTimeout(() => {
      setIsToolbarNavigation(false);
    }, 500);
    handleLastInternal();
  }, [handleLastInternal]);

  // Sync activeItemIndex with activeTimelineItem prop
  useEffect(() => {
    if (
      activeTimelineItem !== undefined &&
      activeTimelineItem !== activeItemIndex.current
    ) {
      syncActiveItemIndex(activeTimelineItem);
      // Move keyboard focus to the active element once activation changes
      if (mode === 'HORIZONTAL' || mode === 'HORIZONTAL_ALL') {
        requestAnimationFrame(() => {
          const activeId = items[activeTimelineItem ?? 0]?.id;
          if (activeId) {
            // Prefer focusing the card container in horizontal modes
            const cardContainer = document.getElementById(
              `timeline-card-${activeId}`,
            );
            if (cardContainer) {
              try {
                (cardContainer as HTMLElement).focus({ preventScroll: false });
                return;
              } catch (_) {
                // fall through to point focus
              }
            }

            const circle = document.querySelector(
              `button[data-testid="timeline-circle"][data-item-id="${activeId}"]`,
            ) as HTMLButtonElement | null;
            if (circle) {
              try {
                circle.focus({ preventScroll: false });
                return;
              } catch (_) {
                // fall through
              }
            }
          }
          const ele = timelineMainRef.current;
          if (ele) {
            ele.focus({ preventScroll: false });
          }
        });
      } else if (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') {
        // In vertical modes, focus the vertical row (li) for the active item
        requestAnimationFrame(() => {
          const activeId = items[activeTimelineItem ?? 0]?.id;
          if (activeId) {
            const verticalRow = document.querySelector(
              `[data-testid="vertical-item-row"][data-item-id="${activeId}"]`,
            ) as HTMLElement | null;
            if (verticalRow) {
              try {
                verticalRow.focus({ preventScroll: false });
                return;
              } catch (_) {
                // fall back to container focus
              }
            }
          }
          const ele = timelineMainRef.current;
          if (ele) {
            ele.focus({ preventScroll: false });
          }
        });
      }
    }
  }, [activeTimelineItem, syncActiveItemIndex, mode, timelineMainRef, items]);

  const {
    searchQuery,
    searchResults,
    currentMatchIndex,
    searchInputRef,
    handleSearchChange,
    clearSearch,
    handleNextMatch,
    handlePreviousMatch,
    handleSearchKeyDown,
  } = useTimelineSearch({
    items: useMemo(
      () => items.map((item) => ({ ...item, wrapperId: id })),
      [items, id],
    ),
    onTimelineUpdated: onTimelineUpdated || (() => {}),
    handleTimelineItemClick,
  });

  // Overall slideshow progress hook
  useSlideshowProgress({
    slideShowRunning: slideShowRunning ?? false,
    activeTimelineItem: activeTimelineItem ?? 0,
  });

  useTimelineMedia({
    mode,
    timelineMainRef,
  });

  // Memoize classes and display flags
  const wrapperClass = useMemo(
    () =>
      cls(mode.toLocaleLowerCase(), ve.wrapper, {
        'focus-visible': !isChild,
        'js-focus-visible': !isChild,
      }),
    [mode, isChild],
  );

  const canShowToolbar = useMemo(
    () => !disableToolbar && !isChild,
    [isChild, disableToolbar],
  );

  // Memoize scroll capability determination
  const canScrollTimeline = useMemo(() => {
    if (slideShowRunning) return false;

    if (typeof scrollable === 'boolean') {
      return scrollable;
    }

    return typeof scrollable === 'object' && scrollable.scrollbar;
  }, [slideShowRunning, scrollable]);

  // Handle keyboard events
  const handleKeyDown = React.useCallback(
    (evt: React.KeyboardEvent<HTMLDivElement>) => {
      if (!disableNavOnKey && !slideShowRunning) {
        const isNavigationKey = [
          'ArrowLeft',
          'ArrowRight',
          'ArrowUp',
          'ArrowDown',
          'Home',
          'End',
        ].includes(evt.key);

        if (isNavigationKey) {
          setHasFocus(true);
          setIsKeyboardNavigation(true);
          setIsToolbarNavigation(false);
          handleKeySelection(evt);
        }
      }
    },
    [disableNavOnKey, slideShowRunning, handleKeySelection],
  );

  // Handle focus events to maintain proper focus state
  const handleFocus = React.useCallback(() => {
    if (!slideShowRunning) {
      setHasFocus(true);
    }
  }, [slideShowRunning]);

  const handleBlur = React.useCallback(
    (evt: React.FocusEvent<HTMLDivElement>) => {
      // Only lose focus if focus is moving outside the timeline entirely
      const relatedTarget = evt.relatedTarget as HTMLElement;
      const currentTarget = evt.currentTarget as HTMLElement;

      // Check if focus is moving to a child element (like toolbar buttons)
      if (!currentTarget.contains(relatedTarget)) {
        // Only set hasFocus to false if focus is truly leaving the timeline
        // Keep focus active for better keyboard navigation experience
        // setHasFocus(false);
      }
    },
    [],
  );

  // Update active item information
  useEffect(() => {
    const activeItem = items[activeTimelineItem ?? 0];

    if (slideShowRunning) {
      activeItemIndex.current = activeTimelineItem ?? 0;
    }

    if (!items.length || !activeItem) return;

    const { title, cardTitle, cardSubtitle, cardDetailedText } = activeItem;

    // Use the activeTimelineItem directly instead of activeItemIndex.current
    // to prevent infinite loops caused by ref changes
    onItemSelected?.({
      cardDetailedText,
      cardSubtitle,
      cardTitle,
      index: activeTimelineItem ?? 0,
      title,
    });

    // Handle centering for both slideshow and manual navigation
    if (mode === 'HORIZONTAL' || mode === 'HORIZONTAL_ALL') {
      const card = horizontalContentRef.current?.querySelector(
        `#timeline-card-${activeItem.id}`,
      );

      if (card && horizontalContentRef.current) {
        const cardRect = card.getBoundingClientRect();
        const contentRect =
          horizontalContentRef.current.getBoundingClientRect();

        if (cardRect && contentRect) {
          const { width: cardWidth, left: cardLeft } = cardRect;
          const { width: contentWidth, left: contentLeft } = contentRect;

          requestAnimationFrame(() => {
            const ele = horizontalContentRef.current as HTMLElement;
            if (!ele) return;

            ele.style.scrollBehavior = 'smooth';
            const targetScrollLeft =
              cardLeft - contentLeft + cardWidth / 2 - contentWidth / 2;
            ele.scrollLeft += targetScrollLeft;

            // Also ensure the card gets focus
            (card as HTMLElement).focus({ preventScroll: true });
          });
        }
      }

      // Also ensure timeline point is visible
      const point = document.querySelector(
        `button[data-testid="timeline-circle"][data-item-id="${activeItem.id}"]`,
      ) as HTMLButtonElement | null;

      if (point) {
        requestAnimationFrame(() => {
          point.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest',
          });
        });
      }
    } else if (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') {
      const verticalItemRow = document.querySelector(
        `[data-testid="vertical-item-row"][data-item-id="${activeItem.id}"]`,
      );

      if (verticalItemRow) {
        requestAnimationFrame(() => {
          // Check if scrollIntoView is available (not available in JSDOM)
          if ((verticalItemRow as HTMLElement).scrollIntoView) {
            (verticalItemRow as HTMLElement).scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        });
      }
    }
  }, [
    activeTimelineItem,
    items,
    slideShowRunning,
    mode,
    onItemSelected,
    horizontalContentRef,
  ]);

  // Update scroll position when offset changes
  useEffect(() => {
    const ele = timelineMainRef.current;
    if (!ele) return;

    if (mode === 'HORIZONTAL') {
      ele.scrollLeft = Math.max(newOffSet, 0);
    } else {
      ele.scrollTop = newOffSet;
    }
  }, [newOffSet, mode, timelineMainRef]);

  // Use Vanilla Extract styles with proper CSS variables
  const wrapperHeight = useMemo(() => {
    return typeof props.timelineHeight === 'number'
      ? `${props.timelineHeight}px`
      : props.timelineHeight || '100%';
  }, [props.timelineHeight]);

  return (
    <div
      ref={wrapperRef}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`timeline-wrapper ${mode.toLowerCase()} ${ve.wrapper}`}
      style={{
        ...computeCssVarsFromTheme(theme, darkMode),
        height: wrapperHeight,
      }}
      data-fullscreen={isFullscreen}
      data-keyboard-focus={isKeyboardNavigation}
      data-toolbar-navigation={isToolbarNavigation}
      onMouseDown={() => setHasFocus(true)}
      onKeyUp={(evt) => {
        if (evt.key === 'Escape') {
          onPaused?.();
        }
      }}
      tabIndex={isChild ? -1 : 0}
    >
      {canShowToolbar && (
        <TimelineToolbar
          activeTimelineItem={activeTimelineItem ?? 0}
          totalItems={items.length}
          slideShowEnabled={!!slideShowEnabled}
          slideShowRunning={!!slideShowRunning}
          onFirst={handleFirst}
          onLast={handleLast}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onRestartSlideshow={onRestartSlideshow || (() => {})}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onPaused={onPaused || (() => {})}
          id={id}
          flipLayout={!!flipLayout}
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
          searchInputRef={
            searchInputRef as unknown as React.RefObject<HTMLInputElement>
          }
          timelineRef={wrapperRef as unknown as React.RefObject<HTMLElement>}
          onEnterFullscreen={() => {
            console.log('Entered fullscreen mode');
            setIsFullscreen(true);
          }}
          onExitFullscreen={() => {
            console.log('Exited fullscreen mode');
            setIsFullscreen(false);
          }}
          onFullscreenError={(error: string) => {
            console.error('Fullscreen error:', error);
            setIsFullscreen(false);
          }}
        />
      )}

      {/* Overall slideshow progress bar - positioned below toolbar */}
      {/* {slideShowRunning && showOverallSlideshowProgress && (
        <SlideshowProgress
          activeItemIndex={activeTimelineItem ?? 0}
          totalItems={items.length}
          isRunning={slideShowRunning}
          slideItemDuration={slideItemDuration}
          isPaused={isPaused}
        />
      )} */}

      <div
        ref={timelineMainRef}
        className={`timeline-main-wrapper ${mode.toLowerCase()} ${ve.timelineMainWrapper(
          {
            mode:
              mode === 'VERTICAL'
                ? 'vertical'
                : mode === 'VERTICAL_ALTERNATING'
                  ? 'verticalAlternating'
                  : mode === 'HORIZONTAL_ALL'
                    ? 'horizontalAll'
                    : 'horizontal',
          },
        )}`}
        id="timeline-main-wrapper"
        data-testid="timeline-main-wrapper"
        style={computeCssVarsFromTheme(theme, darkMode)}
        onScroll={handleMainScroll}
      >
        <TimelineView
          timelineMode={timelineMode}
          activeTimelineItem={activeTimelineItem ?? 0}
          autoScroll={handleScroll}
          contentDetailsChildren={contentDetailsChildren}
          hasFocus={hasFocus}
          iconChildren={iconChildren}
          items={items}
          handleTimelineItemClick={handleTimelineItemClick}
          handleTimelineItemElapsed={handleTimelineItemElapsed}
          slideShowRunning={!!slideShowRunning}
          id={id}
          theme={theme}
          lineWidth={lineWidth}
          onOutlineSelection={onOutlineSelection || (() => {})}
          nestedCardHeight={nestedCardHeight ?? 0}
        />
      </div>

      <div
        id={id}
        ref={horizontalContentRef}
        className={`timeline-content-render ${ve.timelineContentRender}`}
      />
    </div>
  );
};

Timeline.displayName = 'Timeline';

export default React.memo(Timeline);
