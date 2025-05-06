import { TimelineModel } from '@models/TimelineModel';
import { getUniqueID } from '@utils/index';
import cls from 'classnames';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { GlobalContext } from '../GlobalContext';
import useNewScrollPosition from '../effects/useNewScrollPosition';
import {
  TimelineContentRender,
  TimelineMainWrapper,
  ToolbarWrapper,
  Wrapper,
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
  const [hasFocus, setHasFocus] = useState(false);

  // Memoize ID generation to prevent unnecessary regeneration
  const id = useMemo(
    () => `react-chrono-timeline-${noUniqueId ? uniqueId : getUniqueID()}`,
    [noUniqueId, uniqueId],
  );

  // Use custom hooks
  const { timelineMode, handleTimelineUpdate } = useTimelineMode({
    initialMode: mode,
    showAllCardsHorizontal,
    updateHorizontalAllCards,
  });

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
    items: items.map((item) => ({ ...item, wrapperId: id })),
    onTimelineUpdated,
    handleTimelineItemClick,
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
    const activeItem = items[activeTimelineItem || 0];

    if (slideShowRunning) {
      activeItemIndex.current = activeTimelineItem || 0;
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
          />
        </ToolbarWrapper>
      )}

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
        {/* @ts-ignore - Ignoring type issues here as we're using a more flexible approach */}
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
