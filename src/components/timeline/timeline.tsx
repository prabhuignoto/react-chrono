import { TimelineModel } from '@models/TimelineModel';
import { getUniqueID } from '@utils/index';
import cls from 'classnames';
import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useTimelineContext } from '../contexts';
import useNewScrollPosition from '../effects/useNewScrollPosition';
import { useSlideshowProgress } from '../../hooks/useSlideshowProgress';
import * as ve from './timeline-new.css';
// Note: Removed unused imports from timeline-main.css
import { computeCssVarsFromTheme } from '../../styles/theme-bridge';
import { lightThemeClass, darkThemeClass } from '../../styles/themes.css';
import { TimelineToolbar } from './timeline-toolbar';
import { useTimelineSearch } from '../../hooks/useTimelineSearch';
import { useTimelineNavigation } from '../../hooks/useTimelineNavigation';
import { useTimelineMode } from '../../hooks/useTimelineMode';
import { useTimelineScroll } from '../../hooks/useTimelineScroll';
import { useTimelineMedia } from '../../hooks/useTimelineMedia';
import { FontProvider } from '../fonts/font-provider';
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
    mode: propMode,
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
    slideItemDuration = 2000,
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
    toolbarSearchConfig,
    borderLessCards,
    showAllCardsHorizontal,
    textContentDensity,
    enableLayoutSwitch,
    useReadMore,
    cardPositionHorizontal,
    updateShowAllCardsHorizontal: updateHorizontalAllCards,
    updateTextContentDensity,

    // Font properties
    googleFonts,
  } = useTimelineContext();
  const [hasFocus, setHasFocus] = useState(false);
  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);
  // Use ref instead of state to avoid race conditions with useEffect (WCAG 2.4.3: Focus Order)
  // Refs are synchronously updated, ensuring focus prevention logic sees latest value
  const isToolbarNavigationRef = useRef(false);
  // Track if current navigation is from search to enable/disable focus (WCAG 2.1.1: Keyboard)
  // Timeline items should ONLY receive focus during search navigation, not in other scenarios
  const isSearchNavigationRef = useRef(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const keyboardTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      // Cleanup keyboard timeout
      if (keyboardTimeoutRef.current) {
        clearTimeout(keyboardTimeoutRef.current);
        keyboardTimeoutRef.current = null;
      }
    };
  }, []);

  // Focus first timeline item when entering fullscreen (WCAG 2.4.3: Focus Order)
  // This ensures keyboard users can immediately navigate the timeline after fullscreen
  useEffect(() => {
    if (!isFullscreen || !items.length) return;

    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
      // Check if search is active - don't steal focus if user is searching
      const activeElement = document.activeElement;
      const isSearchActive =
        activeElement?.tagName === 'INPUT' &&
        (activeElement as HTMLInputElement).type === 'search';

      if (isSearchActive) return;

      // Find first timeline item and focus it
      const firstItem = timelineMainRef.current?.querySelector(
        '[data-testid="vertical-item-row"], [data-testid="timeline-circle"]'
      ) as HTMLElement | null;

      if (firstItem) {
        try {
          firstItem.focus({ preventScroll: true });
        } catch (_) {
          // Silently ignore focus errors (element may not be focusable)
        }
      }
    });
  }, [isFullscreen, items.length]);

  // Memoize ID generation to prevent unnecessary regeneration
  const id = useMemo(
    () => `react-chrono-timeline-${noUniqueId ? uniqueId : getUniqueID()}`,
    [noUniqueId, uniqueId],
  );

  // Use custom hooks - prioritize component prop mode over context mode
  const { timelineMode, handleTimelineUpdate } = useTimelineMode({
    initialMode: propMode || mode, // Prioritize prop mode over context mode
    showAllCardsHorizontal,
    updateHorizontalAllCards,
  });

  const [newOffSet, setNewOffset] = useNewScrollPosition(
    timelineMode,
    itemWidth,
  );

  // Ensure context's showAllCardsHorizontal stays in sync with computed mode
  useEffect(() => {
    if (timelineMode === 'HORIZONTAL_ALL') {
      updateHorizontalAllCards(true);
    } else if (timelineMode === 'HORIZONTAL') {
      updateHorizontalAllCards(false);
    }
  }, [timelineMode, updateHorizontalAllCards]);


  // First get the navigation functions
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

  const {
    timelineMainRef,
    horizontalContentRef,
    handleScroll,
    handleMainScroll,
  } = useTimelineScroll({
    mode: timelineMode,
    onScrollEnd: onScrollEnd || (() => {}),
    setNewOffset,
    onNextItem: handleNextInternal,
    onPreviousItem: handlePreviousInternal,
    activeItemIndex: activeItemIndex,
    totalItems: items.length,
    isKeyboardNavigation: isKeyboardNavigation,
  });

  // Navigation functions are now available from the earlier useTimelineNavigation call

  // Wrap timeline item click to reset navigation states
  const handleTimelineItemClick = React.useCallback(
    (itemId?: string, isSlideShow?: boolean) => {
      // Capture whether search is active NOW, before any RAF callbacks run
      // This prevents timing issues where focus changes before RAF executes
      const wasSearchActive =
        document.activeElement?.tagName === 'INPUT' &&
        (document.activeElement as HTMLInputElement).type === 'search';

      // Reset navigation states when clicking directly on items
      setIsKeyboardNavigation(false);
      isToolbarNavigationRef.current = false;
      handleTimelineItemClickInternal(itemId, isSlideShow);

      // DISABLED: Direct click focus
      // Timeline items should ONLY receive focus during search navigation (WCAG 2.1.1: Keyboard)
      // Not during direct clicks, keyboard navigation, or other scenarios
      // Focus logic is now centralized in the main useEffect and only triggered for search
      /*
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
            // Only focus card if search was NOT active when function was called
            // Timeline card is still updated/scrolled, just not focused
            if (!wasSearchActive) {
              target?.focus?.({ preventScroll: true });
            }
          } catch {}
        });
      }
      */
    },
    [handleTimelineItemClickInternal],
  );

  // Enhanced navigation handlers that track source
  // WCAG 2.4.3: Keep focus on toolbar button during activation (not on timeline item)
  const handleNext = React.useCallback((event?: React.MouseEvent | React.KeyboardEvent) => {
    const clickedButton = (event?.currentTarget as HTMLElement) || null;
    isToolbarNavigationRef.current = true;
    setIsKeyboardNavigation(false);
    handleNextInternal();
    // Explicitly refocus button after navigation to prevent focus stealing
    requestAnimationFrame(() => {
      if (clickedButton) {
        try {
          clickedButton.focus({ preventScroll: true });
        } catch (_) {
          // Silently ignore focus errors
        }
      }
      isToolbarNavigationRef.current = false;
    });
  }, [handleNextInternal]);

  const handlePrevious = React.useCallback((event?: React.MouseEvent | React.KeyboardEvent) => {
    const clickedButton = (event?.currentTarget as HTMLElement) || null;
    isToolbarNavigationRef.current = true;
    setIsKeyboardNavigation(false);
    handlePreviousInternal();
    // Explicitly refocus button after navigation to prevent focus stealing
    requestAnimationFrame(() => {
      if (clickedButton) {
        try {
          clickedButton.focus({ preventScroll: true });
        } catch (_) {
          // Silently ignore focus errors
        }
      }
      isToolbarNavigationRef.current = false;
    });
  }, [handlePreviousInternal]);

  const handleFirst = React.useCallback((event?: React.MouseEvent | React.KeyboardEvent) => {
    const clickedButton = (event?.currentTarget as HTMLElement) || null;
    isToolbarNavigationRef.current = true;
    setIsKeyboardNavigation(false);
    handleFirstInternal();
    // Explicitly refocus button after navigation to prevent focus stealing
    requestAnimationFrame(() => {
      if (clickedButton) {
        try {
          clickedButton.focus({ preventScroll: true });
        } catch (_) {
          // Silently ignore focus errors
        }
      }
      isToolbarNavigationRef.current = false;
    });
  }, [handleFirstInternal]);

  const handleLast = React.useCallback((event?: React.MouseEvent | React.KeyboardEvent) => {
    const clickedButton = (event?.currentTarget as HTMLElement) || null;
    isToolbarNavigationRef.current = true;
    setIsKeyboardNavigation(false);
    handleLastInternal();
    // Explicitly refocus button after navigation to prevent focus stealing
    requestAnimationFrame(() => {
      if (clickedButton) {
        try {
          clickedButton.focus({ preventScroll: true });
        } catch (_) {
          // Silently ignore focus errors
        }
      }
      isToolbarNavigationRef.current = false;
    });
  }, [handleLastInternal]);

  // Wrap toggleDarkMode to prevent focus stealing (WCAG 2.4.3)
  const handleToggleDarkMode = React.useCallback((event?: React.MouseEvent) => {
    const clickedButton = (event?.currentTarget as HTMLElement) || null;
    isToolbarNavigationRef.current = true;
    setIsKeyboardNavigation(false);
    toggleDarkMode?.();
    // Explicitly refocus button after action to prevent focus stealing
    requestAnimationFrame(() => {
      if (clickedButton) {
        try {
          clickedButton.focus({ preventScroll: true });
        } catch (_) {
          // Silently ignore focus errors
        }
      }
      isToolbarNavigationRef.current = false;
    });
  }, [toggleDarkMode]);

  // Wrap onRestartSlideshow to prevent focus stealing (WCAG 2.4.3)
  const handleRestartSlideshow = React.useCallback((event?: React.MouseEvent) => {
    const clickedButton = (event?.currentTarget as HTMLElement) || null;
    isToolbarNavigationRef.current = true;
    setIsKeyboardNavigation(false);
    onRestartSlideshow?.();
    // Explicitly refocus button after action to prevent focus stealing
    requestAnimationFrame(() => {
      if (clickedButton) {
        try {
          clickedButton.focus({ preventScroll: true });
        } catch (_) {
          // Silently ignore focus errors
        }
      }
      isToolbarNavigationRef.current = false;
    });
  }, [onRestartSlideshow]);

  // Wrap onPaused to prevent focus stealing (WCAG 2.4.3)
  const handlePausedWrapper = React.useCallback((event?: React.MouseEvent) => {
    const clickedButton = (event?.currentTarget as HTMLElement) || null;
    isToolbarNavigationRef.current = true;
    setIsKeyboardNavigation(false);
    onPaused?.();
    // Explicitly refocus button after action to prevent focus stealing
    requestAnimationFrame(() => {
      if (clickedButton) {
        try {
          clickedButton.focus({ preventScroll: true });
        } catch (_) {
          // Silently ignore focus errors
        }
      }
      isToolbarNavigationRef.current = false;
    });
  }, [onPaused]);

  // Sync activeItemIndex with activeTimelineItem prop
  // FOCUS COORDINATION STRATEGY:
  // This effect manages timeline item focus when activeTimelineItem changes.
  // It coordinates with other focus operations through several mechanisms:
  // 1. Search input focus is protected - never stolen during search
  // 2. Toolbar button focus is protected - never stolen while using toolbar
  // 3. All focus operations use requestAnimationFrame for proper sequencing
  // 4. Popover focus is restored to trigger button via useCloseClickOutside
  // 5. Search navigation returns focus to search input via useTimelineSearch
  // Order of precedence: Search focus > Toolbar focus > Timeline focus
  useEffect(() => {
    // For defined activeTimelineItem, always sync
    if (activeTimelineItem !== undefined) {
      if (activeTimelineItem !== activeItemIndex.current) {
        syncActiveItemIndex(activeTimelineItem);
      }
    } else {
      // For undefined activeTimelineItem (no selection), reset to -1 to indicate no selection
      // This helps with navigation logic
      if (activeItemIndex.current !== -1) {
        activeItemIndex.current = -1;
      }
    }

    // CRITICAL: Only focus timeline items during search navigation (WCAG 2.1.1: Keyboard)
    // Timeline items should NOT auto-focus for keyboard navigation, toolbar buttons, slideshow, etc.
    if (!isSearchNavigationRef.current) {
      return;
    }

    if (activeTimelineItem !== undefined) {
      // Move keyboard focus to the active element once activation changes
      // This is ONLY called during search navigation
      // CRITICAL: Capture search state NOW before scheduling RAF to avoid timing issues
      const activeElement = document.activeElement;
      const wasSearchActive =
        activeElement?.tagName === 'INPUT' &&
        (activeElement as HTMLInputElement).type === 'search';

      // Don't steal focus from toolbar buttons (navigation, play, dark mode, popovers, fullscreen)
      const isToolbarFocused =
        activeElement?.closest('[role="toolbar"]') !== null;

      if (timelineMode === 'HORIZONTAL' || timelineMode === 'HORIZONTAL_ALL') {
        requestAnimationFrame(() => {
          // Only focus if search is still marked as active and conditions allow focus
          if (!isSearchNavigationRef.current || wasSearchActive || isToolbarFocused) return;

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
      } else if (
        timelineMode === 'VERTICAL' ||
        timelineMode === 'VERTICAL_ALTERNATING'
      ) {
        // In vertical modes, focus the vertical row (li) for the active item
        requestAnimationFrame(() => {
          // Only focus if search is still marked as active and conditions allow focus
          if (!isSearchNavigationRef.current || wasSearchActive || isToolbarFocused) return;

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

      // Clear search navigation marker after focus operations are scheduled
      // This ensures the ref is reset for next search navigation
      requestAnimationFrame(() => {
        isSearchNavigationRef.current = false;
      });
    }
  }, [activeTimelineItem, syncActiveItemIndex, mode, timelineMode, timelineMainRef, items]);

  // Wrapper callbacks for search navigation that mark it as search-triggered
  // This ensures timeline items only receive focus during search (WCAG 2.1.1: Keyboard)
  const wrappedOnTimelineUpdated = useCallback(
    (index: number) => {
      isSearchNavigationRef.current = true;
      (onTimelineUpdated || (() => {}))(index);
    },
    [onTimelineUpdated],
  );

  const wrappedHandleTimelineItemClick = useCallback(
    (itemId?: string) => {
      isSearchNavigationRef.current = true;
      handleTimelineItemClick(itemId);
    },
    [handleTimelineItemClick],
  );

  const {
    searchQuery,
    searchResults,
    currentMatchIndex,
    searchInputRef,
    handleSearchChange,
    triggerSearch,
    clearSearch,
    handleNextMatch,
    handlePreviousMatch,
    handleSearchKeyDown,
  } = useTimelineSearch({
    items: useMemo(
      () => items.map((item) => ({ ...item, wrapperId: id })),
      [items, id],
    ),
    onTimelineUpdated: wrappedOnTimelineUpdated,
    handleTimelineItemClick: wrappedHandleTimelineItemClick,
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
          isToolbarNavigationRef.current = false;
          handleKeySelection(evt);

          // Clear keyboard navigation flag after scroll animation completes
          if (keyboardTimeoutRef.current) {
            clearTimeout(keyboardTimeoutRef.current);
          }
          keyboardTimeoutRef.current = setTimeout(() => {
            setIsKeyboardNavigation(false);
            keyboardTimeoutRef.current = null;
          }, 400); // Slightly longer than scroll animation (300ms)
        }
      }
    },
    [disableNavOnKey, slideShowRunning, handleKeySelection],
  );

  // Handle focus events to maintain proper focus state
  const handleFocus = React.useCallback(
    (evt: React.FocusEvent<HTMLDivElement>) => {
      // Don't manage focus if it's coming from within toolbar (search, buttons, etc)
      const timelineToolbar = (evt.currentTarget as HTMLElement).querySelector('[role="toolbar"]');
      const isFocusFromToolbar = timelineToolbar?.contains(evt.target as Node);

      if (isFocusFromToolbar) {
        return; // Let toolbar items operate independently
      }

      if (!slideShowRunning) {
        setHasFocus(true);
      }
    },
    [slideShowRunning],
  );

  const handleBlur = React.useCallback(
    (evt: React.FocusEvent<HTMLDivElement>) => {
      // Don't manage focus if blur is due to focus moving within toolbar
      const timelineToolbar = (evt.currentTarget as HTMLElement).querySelector('[role="toolbar"]');
      const isBlurWithinToolbar = timelineToolbar?.contains(evt.relatedTarget as Node);

      if (isBlurWithinToolbar) {
        return; // Let toolbar items manage their own focus
      }

      // Only lose focus if focus is moving outside the timeline entirely
      const relatedTarget = evt.relatedTarget as HTMLElement;
      const currentTarget = evt.currentTarget as HTMLElement;

      // Check if focus is moving to a child element (like timeline cards)
      if (!currentTarget.contains(relatedTarget)) {
        // Only set hasFocus to false if focus is truly leaving the timeline
        setHasFocus(false);
      }
    },
    [],
  );

  // Update active item information
  useEffect(() => {
    // CRITICAL: Capture search state NOW to prevent timing issues with RAF callbacks
    // This ensures we check the state at the moment this effect runs, not later
    const wasSearchActive =
      document.activeElement?.tagName === 'INPUT' &&
      (document.activeElement as HTMLInputElement).type === 'search';

    if (wasSearchActive) {
      return; // Don't do any focus-stealing operations while searching
    }

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
    if (timelineMode === 'HORIZONTAL' || timelineMode === 'HORIZONTAL_ALL') {
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

            // Use captured state - don't check document.activeElement here (timing issue)
            if (!wasSearchActive) {
              (card as HTMLElement).focus({ preventScroll: true });
            }
          });
        }
      }

      // Also ensure timeline point is visible
      const point = document.querySelector(
        `button[data-testid="timeline-circle"][data-item-id="${activeItem.id}"]`,
      ) as HTMLButtonElement | null;

      if (point) {
        requestAnimationFrame(() => {
          // Check if scrollIntoView is available (not available in JSDOM)
          if (point.scrollIntoView) {
            point.scrollIntoView({
              behavior: 'smooth',
              inline: 'center',
              block: 'nearest',
            });
          }
        });
      }
    } else if (
      timelineMode === 'VERTICAL' ||
      timelineMode === 'VERTICAL_ALTERNATING'
    ) {
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

    if (timelineMode === 'HORIZONTAL') {
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

  // Memoize theme CSS variables to prevent re-creation on every render
  // Only compute vars for custom themes - default themes use vanilla-extract classes
  const themeCssVars = useMemo(
    () => computeCssVarsFromTheme(theme, darkMode),
    [theme, darkMode],
  );

  // Memoize search width CSS variables
  const searchWidthVars = useMemo(() => {
    if (!toolbarSearchConfig) return {};

    return {
      '--timeline-search-width': toolbarSearchConfig.width,
      '--timeline-search-max-width': toolbarSearchConfig.maxWidth,
      '--timeline-search-min-width': toolbarSearchConfig.minWidth,
      '--timeline-search-input-width': toolbarSearchConfig.inputWidth,
      '--timeline-search-input-max-width': toolbarSearchConfig.inputMaxWidth,
    };
  }, [toolbarSearchConfig]);

  return (
    <FontProvider googleFonts={googleFonts}>
      <div
        ref={wrapperRef}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`timeline-wrapper ${mode.toLowerCase()} ${ve.wrapper({ fullscreen: isFullscreen })} ${darkMode ? darkThemeClass : lightThemeClass}`}
        style={{
          ...themeCssVars,
          ...searchWidthVars,
          height: wrapperHeight,
        }}
        data-mode={timelineMode}
        data-fullscreen={isFullscreen}
        data-keyboard-focus={isKeyboardNavigation}
        data-toolbar-navigation={isToolbarNavigationRef.current}
        onMouseDown={(evt) => {
          // Don't steal focus from search input or toolbar
          // Check if click is within toolbar (which contains search input)
          const timelineToolbar = (evt.currentTarget as HTMLElement).querySelector('[role="toolbar"]');
          const isWithinToolbar = timelineToolbar?.contains(evt.target as Node);

          if (!isWithinToolbar) {
            setHasFocus(true);
          }
        }}
        onKeyUp={(evt) => {
          if (evt.key === 'Escape') {
            onPaused?.();
          }
        }}
        tabIndex={isChild ? -1 : 0}
        role="region"
        aria-roledescription="interactive timeline"
        aria-label="Timeline navigation"
        aria-keyshortcuts={
          timelineMode === 'VERTICAL' ||
          timelineMode === 'VERTICAL_ALTERNATING'
            ? 'ArrowUp ArrowDown Home End'
            : 'ArrowLeft ArrowRight Home End'
        }
      >
        {/* Visually hidden live region for screen reader announcements */}
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: 'absolute',
            left: '-10000px',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
        >
          {activeTimelineItem !== undefined && items[activeTimelineItem] && (
            <>
              Viewing item {activeTimelineItem + 1} of {items.length}
              {items[activeTimelineItem].title &&
                `: ${items[activeTimelineItem].title}`}
            </>
          )}
        </div>

        {canShowToolbar && (
          <div
            className={ve.toolbarContainer({
              position: toolbarPosition as 'top' | 'bottom',
              sticky: Boolean(props.stickyToolbar),
            })}
          >
            <TimelineToolbar
              activeTimelineItem={activeTimelineItem ?? 0}
              totalItems={items.length}
              slideShowEnabled={!!slideShowEnabled}
              slideShowRunning={!!slideShowRunning}
              onFirst={handleFirst}
              onLast={handleLast}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onRestartSlideshow={handleRestartSlideshow}
              darkMode={darkMode}
              toggleDarkMode={handleToggleDarkMode}
              onPaused={handlePausedWrapper}
              id={id}
              flipLayout={!!flipLayout}
              items={items}
              onActivateTimelineItem={handleTimelineItemClick}
              onUpdateTimelineMode={handleTimelineUpdate}
              onUpdateTextContentDensity={updateTextContentDensity}
              mode={timelineMode}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onTriggerSearch={triggerSearch}
              onClearSearch={clearSearch}
              onNextMatch={handleNextMatch}
              onPreviousMatch={handlePreviousMatch}
              totalMatches={searchResults.length}
              currentMatchIndex={currentMatchIndex}
              onSearchKeyDown={handleSearchKeyDown}
              searchInputRef={
                searchInputRef as unknown as React.RefObject<HTMLInputElement>
              }
              timelineRef={
                wrapperRef as unknown as React.RefObject<HTMLElement>
              }
              onEnterFullscreen={() => {
                setIsFullscreen(true);
              }}
              onExitFullscreen={() => {
                setIsFullscreen(false);
              }}
              onFullscreenError={(_error: string) => {
                setIsFullscreen(false);
              }}
              stickyToolbar={props.stickyToolbar ?? false}
            />
          </div>
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
          className={`timeline-main-wrapper ${timelineMode.toLowerCase()} ${ve.mainWrapper(
            {
              mode:
                timelineMode === 'VERTICAL'
                  ? 'vertical'
                  : timelineMode === 'VERTICAL_ALTERNATING'
                    ? 'alternating'
                    : timelineMode === 'HORIZONTAL_ALL'
                      ? 'horizontalAll'
                      : 'horizontal',
            },
          )}`}
          id="timeline-main-wrapper"
          data-testid="timeline-main-wrapper"
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

        {/* Only render content renderer for horizontal modes */}
        {(timelineMode === 'HORIZONTAL' ||
          timelineMode === 'HORIZONTAL_ALL') && (
          <div
            id={id}
            ref={horizontalContentRef}
            className={`timeline-content-render ${ve.contentRenderer({
              mode:
                timelineMode === 'HORIZONTAL_ALL'
                  ? 'horizontalAll'
                  : 'horizontal',
            })}`}
            style={
              {
                // Pass card height as CSS variable for dynamic height calculation
                '--card-height': `${cardHeight || 350}px`,
              } as React.CSSProperties
            }
          />
        )}
      </div>
    </FontProvider>
  );
};

Timeline.displayName = 'Timeline';

export default React.memo(Timeline);
