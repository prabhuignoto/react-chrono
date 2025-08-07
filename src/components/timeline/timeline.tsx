import { TimelineModel } from '@models/TimelineModel';
import { getUniqueID } from '@utils/index';
import cls from 'classnames';
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useTimelineContext } from '../contexts';
import useNewScrollPosition from '../effects/useNewScrollPosition';
import { useSlideshowProgress } from '../../hooks/useSlideshowProgress';
import {
  Wrapper,
  TimelineMainWrapper,
  TimelineContentRender,
  ToolbarWrapper,
} from './timeline.style';
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

  // Debug logging for timeline mode
  if (typeof window !== 'undefined') {
    console.log('Timeline Component - Context Mode:', mode, 'Timeline Mode:', timelineMode, 'ShowAllCards:', showAllCardsHorizontal);
  }

  const {
    timelineMainRef,
    horizontalContentRef,
    handleScroll,
    handleMainScroll,
  } = useTimelineScroll({
    mode,
    onScrollEnd,
    setNewOffset,
  });

  const {
    activeItemIndex,
    handleTimelineItemClick,
    handleTimelineItemElapsed,
    handleNext,
    handlePrevious,
    handleFirst,
    handleLast,
    handleKeySelection,
  } = useTimelineNavigation({
    items,
    mode: timelineMode,
    timelineId: id,
    hasFocus,
    flipLayout,
    slideShowRunning,
    onTimelineUpdated,
    onNext,
    onPrevious,
    onFirst,
    onLast,
  });

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
      [items, id]
    ),
    onTimelineUpdated,
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
        setHasFocus(true);
        handleKeySelection(evt);
      }
    },
    [disableNavOnKey, slideShowRunning, handleKeySelection],
  );

  // Update active item information
  useEffect(() => {
    const activeItem = items[activeTimelineItem ?? 0];

    if (slideShowRunning) {
      activeItemIndex.current = activeTimelineItem ?? 0;
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
    } else if (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') {
      // Handle vertical scrolling for slideshow mode
      if (slideShowRunning) {
        // Find the vertical item row for the active item
        const verticalItemRow = document.querySelector(
          `[data-testid="vertical-item-row"][data-item-id="${activeItem.id}"]`,
        );
        
        if (verticalItemRow) {
          // Scroll the item into view smoothly
          requestAnimationFrame(() => {
            (verticalItemRow as HTMLElement).scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          });
        }
      }
    }
  }, [
    activeTimelineItem,
    items,
    slideShowRunning,
    mode,
    onItemSelected,
    activeItemIndex,
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


  // Ensure all styled components are properly integrated
  return (
    <Wrapper
      ref={wrapperRef}
      onKeyDown={handleKeyDown}
      className={wrapperClass}
      $cardPositionHorizontal={cardPositionHorizontal}
      theme={theme}
      $isDarkMode={darkMode}
      $isFullscreen={isFullscreen}
      data-fullscreen={isFullscreen}
      onMouseDown={() => setHasFocus(true)}
      onKeyUp={(evt) => {
        if (evt.key === 'Escape') {
          onPaused?.();
        }
      }}
      tabIndex={isChild ? -1 : 0}
    >
      {canShowToolbar && (
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
            timelineRef={wrapperRef}
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
        </ToolbarWrapper>
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
        <TimelineView
          timelineMode={timelineMode}
          activeTimelineItem={activeTimelineItem}
          autoScroll={handleScroll}
          contentDetailsChildren={contentDetailsChildren}
          hasFocus={hasFocus}
          iconChildren={iconChildren}
          items={items}
          handleTimelineItemClick={handleTimelineItemClick}
          handleTimelineItemElapsed={handleTimelineItemElapsed}
          slideShowRunning={slideShowRunning}
          id={id}
          theme={theme}
          lineWidth={lineWidth}
          onOutlineSelection={onOutlineSelection}
          nestedCardHeight={nestedCardHeight}
        />
      </TimelineMainWrapper>

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
