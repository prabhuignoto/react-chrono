// Import necessary dependencies
import React, { FunctionComponent, useMemo } from 'react';
import { useTimelineContext } from '../contexts';
import Controls from '../timeline-elements/timeline-control/timeline-control';
import { FullscreenControl } from '../timeline-elements/fullscreen-control';
// Removed direct styled import; buttons use native <button> with classes now
import { ChevronLeft, ChevronRight, CloseIcon } from '../icons';
import { computeCssVarsFromTheme } from '../../styles/theme-bridge';
import {
  ChangeDensity,
  LayoutSwitcher,
  QuickJump,
} from './timeline-popover-elements';
import { TimelineToolbarProps } from './timeline-toolbar.model';
import { TimelineMode } from '@models/TimelineModel';
import {
  actionGroup as veActionGroup,
  navigationGroup as veNavigationGroup,
  searchControls as veSearchControls,
  searchGroup as veSearchGroup,
  searchInfo as veSearchInfo,
  searchInput as veSearchInput,
  searchWrapper as veSearchWrapper,
  extraControls as veExtraControls,
  toolbarWrapper as veToolbarWrapper,
} from '../toolbar/toolbar.css';
import {
  navButton,
  navButtonSvg,
} from '../timeline-elements/timeline-control/timeline-control.css';

// Helper function to convert ReactNode to string safely
const getTextFromNode = (
  content: React.ReactNode | string | undefined,
): string => {
  if (content === null || content === undefined) {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }
  if (typeof content === 'number' || typeof content === 'boolean') {
    return String(content);
  }
  // For any other ReactNode, return empty string
  return '';
};

// Define the TimelineToolbar component
const TimelineToolbar: FunctionComponent<TimelineToolbarProps> = ({
  activeTimelineItem,
  slideShowEnabled,
  slideShowRunning,
  flipLayout,
  toggleDarkMode,
  onPaused,
  onFirst,
  onLast,
  onNext,
  onPrevious,
  onRestartSlideshow,
  totalItems,
  items = [],
  id,
  onActivateTimelineItem,
  onUpdateTimelineMode,
  onUpdateTextContentDensity,
  mode,
  searchQuery,
  onSearchChange,
  onClearSearch,
  onNextMatch,
  onPreviousMatch,
  totalMatches,
  currentMatchIndex,
  onSearchKeyDown,
  searchInputRef,
  timelineRef,
  onEnterFullscreen,
  onExitFullscreen,
  onFullscreenError,
}: TimelineToolbarProps) => {
  // Access the stable and dynamic contexts
  const {
    cardLess,
    enableQuickJump,
    toolbarPosition,
    enableLayoutSwitch,
    buttonTexts,
    theme,
    isDarkMode: darkMode,
    textContentDensity: textDensity,
    isMobile,
  } = useTimelineContext();

  // Prepare QuickJump items with proper string conversions
  const quickJumpItems = useMemo(() => {
    return items.map((item) => ({
      id: item.id ?? '',
      title: getTextFromNode(item.title),
      description: getTextFromNode(item.cardSubtitle),
      ...(item.active !== undefined ? { active: item.active } : {}),
    }));
  }, [items]);

  // Define methods to determine button state
  const isLeftDisabled = useMemo(() => {
    if (flipLayout) {
      return activeTimelineItem === totalItems - 1;
    }
    return activeTimelineItem === 0;
  }, [flipLayout, activeTimelineItem, totalItems]);

  // Determine if the right arrow should be disabled
  const isRightDisabled = useMemo(() => {
    if (flipLayout) {
      return activeTimelineItem === 0;
    }
    return activeTimelineItem === totalItems - 1;
  }, [flipLayout, activeTimelineItem, totalItems]);

  const hideExtraControls = useMemo(() => {
    return cardLess || slideShowRunning;
  }, [cardLess, slideShowRunning]);

  const canShowDensity = useMemo(() => {
    return items.every((item) => item.cardDetailedText);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  // Prevent search input from losing focus when timeline elements are clicked
  const handleSearchInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // Check if the new focus target is a timeline card or navigation element
    const relatedTarget = event.relatedTarget as HTMLElement;

    // If focus is moving to a timeline card or navigation, prevent blur
    if (
      relatedTarget &&
      (relatedTarget.closest('[data-testid*="timeline"]') ||
        relatedTarget.closest('.timeline-card') ||
        relatedTarget.closest('.timeline-item'))
    ) {
      // Restore focus to search input after a short delay
      setTimeout(() => {
        if (searchInputRef?.current) {
          searchInputRef.current.focus();
        }
      }, 10);
    }
  };

  // Handle clear search and focus the input
  const handleClearSearch = () => {
    onClearSearch();
    // The focus restoration is now handled in the hook
  };

  // Add KeyDown handler for Enter key navigation
  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter' && totalMatches > 0) {
      event.preventDefault(); // Prevent potential form submission

      // Navigate to next match - focus restoration is handled in the hook
      if (onSearchKeyDown) {
        onSearchKeyDown(event);
      } else {
        onNextMatch();
      }
    }
  };

  // Disable search navigation if no matches or slideshow running
  const disableSearchNav = useMemo(
    () => totalMatches === 0 || slideShowRunning,
    [totalMatches, slideShowRunning],
  );

  // ARIA: tie the input to the live match count
  const searchInfoId = useMemo(() => {
    return id ? `timeline-search-info-${id}` : 'timeline-search-info';
  }, [id]);

  // Render the TimelineToolbar component
  return (
    <div
      className={veToolbarWrapper}
      style={computeCssVarsFromTheme(theme, darkMode)}
      role="toolbar"
      aria-label="Timeline toolbar"
      aria-orientation="horizontal"
    >
      <div
        className={veNavigationGroup}
        role="group"
        aria-label="Timeline navigation controls"
      >
        <Controls
          disableLeft={isLeftDisabled}
          disableRight={isRightDisabled}
          id={id}
          {...(onFirst ? { onFirst } : {})}
          {...(onLast ? { onLast } : {})}
          {...(onNext ? { onNext } : {})}
          {...(onPrevious ? { onPrevious } : {})}
          {...(onRestartSlideshow ? { onReplay: onRestartSlideshow } : {})}
          {...(slideShowEnabled !== undefined ? { slideShowEnabled } : {})}
          {...(slideShowRunning !== undefined ? { slideShowRunning } : {})}
          isDark={darkMode}
          onToggleDarkMode={toggleDarkMode}
          {...(onPaused ? { onPaused } : {})}
          activeTimelineItem={activeTimelineItem ?? 0}
          totalItems={totalItems}
        />
      </div>
      <div className={veSearchGroup} role="search" aria-label="Timeline search">
        <div className={veSearchWrapper}>
          <input
            ref={searchInputRef}
            type="search"
            placeholder={buttonTexts?.searchPlaceholder ?? 'Search Timeline'}
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={(event) => {
              // Support Enter for next, Shift+Enter for previous, Escape to clear
              if (event.key === 'Escape') {
                event.preventDefault();
                handleClearSearch();
                return;
              }
              if (event.key === 'Enter' && totalMatches > 0) {
                event.preventDefault();
                if (event.shiftKey) {
                  onPreviousMatch();
                } else {
                  onNextMatch();
                }
                return;
              }
              handleSearchKeyDown(event);
            }}
            onBlur={handleSearchInputBlur}
            aria-label={
              buttonTexts?.searchAriaLabel ?? 'Search timeline content'
            }
            disabled={slideShowRunning}
            aria-keyshortcuts="Enter Shift+Enter Escape"
            aria-describedby={
              searchQuery && totalMatches > 0 ? searchInfoId : undefined
            }
            autoComplete="off"
            spellCheck="false"
            className={veSearchInput}
          />
          {searchQuery && (
            <button
              className={navButton}
              onClick={handleClearSearch}
              title={buttonTexts?.clearSearch ?? 'Clear Search'}
              aria-label={buttonTexts?.clearSearch ?? 'Clear Search'}
              style={{ height: '24px', width: '24px', marginRight: '0.5rem' }}
              type="button"
            >
              <span className={navButtonSvg}>
                <CloseIcon />
              </span>
            </button>
          )}
          <div
            className={veSearchControls}
            role="group"
            aria-label="Search navigation"
          >
            {totalMatches > 0 && (
              <span
                id={searchInfoId}
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className={veSearchInfo}
                aria-label={`Search result ${currentMatchIndex + 1} of ${totalMatches}`}
              >
                {`${currentMatchIndex + 1} / ${totalMatches}`}
              </span>
            )}
            {searchQuery && totalMatches === 0 && (
              <span
                role="status"
                aria-live="polite"
                aria-atomic="true"
                style={{
                  position: 'absolute',
                  width: 1,
                  height: 1,
                  padding: 0,
                  margin: -1,
                  overflow: 'hidden',
                  clip: 'rect(0, 0, 0, 0)',
                  whiteSpace: 'nowrap',
                  border: 0,
                }}
              >
                {'No matches found'}
              </span>
            )}
            {searchQuery && (
              <>
                <div className="timeline-nav-wrapper">
                  <button
                    className={navButton}
                    onClick={onPreviousMatch}
                    title={
                      buttonTexts?.previousMatch ??
                      'Previous Match (Shift+Enter)'
                    }
                    aria-label={
                      buttonTexts?.previousMatch ??
                      'Previous Match (Shift+Enter)'
                    }
                    disabled={disableSearchNav}
                    style={{ height: '28px', width: '28px' }}
                    type="button"
                  >
                    <span className={navButtonSvg}>
                      <ChevronLeft />
                    </span>
                  </button>
                </div>
                <div className="timeline-nav-wrapper">
                  <button
                    className={navButton}
                    onClick={onNextMatch}
                    title={buttonTexts?.nextMatch ?? 'Next Match (Enter)'}
                    aria-label={buttonTexts?.nextMatch ?? 'Next Match (Enter)'}
                    disabled={disableSearchNav}
                    style={{ height: '28px', width: '28px' }}
                    type="button"
                  >
                    <span className={navButtonSvg}>
                      <ChevronRight />
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={veActionGroup} role="group" aria-label="Timeline actions">
        <div
          className={veExtraControls}
          key="timeline-extra-controls"
          style={{ visibility: hideExtraControls ? 'hidden' : 'visible' }}
          role="group"
          aria-label="Additional timeline controls"
        >
          <div className="control-wrapper" key="quick-jump">
            {enableQuickJump ? (
              <QuickJump
                activeItem={activeTimelineItem ?? 0}
                isDarkMode={darkMode}
                items={quickJumpItems}
                onActivateItem={onActivateTimelineItem}
                theme={theme}
                position={toolbarPosition}
                isMobile={isMobile}
              />
            ) : null}
          </div>
          <div className="control-wrapper" key="layout-switcher">
            {!cardLess && enableLayoutSwitch ? (
              <LayoutSwitcher
                isDarkMode={darkMode}
                theme={theme}
                onUpdateTimelineMode={(modeString: string) =>
                  onUpdateTimelineMode(modeString as TimelineMode)
                }
                {...(mode ? { mode } : {})}
                position={toolbarPosition}
                isMobile={isMobile}
              />
            ) : null}
          </div>
          {canShowDensity ? (
            <div className="control-wrapper" key="change-density">
              <ChangeDensity
                isDarkMode={darkMode}
                theme={theme}
                onChange={onUpdateTextContentDensity}
                position={toolbarPosition}
                selectedDensity={textDensity}
                isMobile={isMobile}
              ></ChangeDensity>
            </div>
          ) : null}
          <div className="control-wrapper" key="fullscreen-control">
            {timelineRef && (
              <FullscreenControl
                targetRef={timelineRef}
                theme={theme}
                {...(onEnterFullscreen ? { onEnterFullscreen } : {})}
                {...(onExitFullscreen ? { onExitFullscreen } : {})}
                {...(onFullscreenError ? { onError: onFullscreenError } : {})}
                size="medium"
                disabled={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the TimelineToolbar component
export { TimelineToolbar };
