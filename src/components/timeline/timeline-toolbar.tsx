// Import necessary dependencies
import React, { FunctionComponent, useMemo } from 'react';
import { useStableContext, useDynamicContext } from '../contexts';
import Controls from '../timeline-elements/timeline-control/timeline-control';
import { TimelineNavButton } from '../timeline-elements/timeline-control/timeline-control.styles';
import { ChevronLeft, ChevronRight, CloseIcon } from '../icons';
import { Toolbar } from '../toolbar';
import {
  ChangeDensity,
  LayoutSwitcher,
  QuickJump,
} from './timeline-popover-elements';
import { TimelineToolbarProps } from './timeline-toolbar.model';
import {
  ExtraControls,
  SearchInput,
  SearchWrapper,
  SearchInfo,
  SearchControls,
  NavigationGroup,
  SearchGroup,
  ActionGroup,
} from './timeline.style';

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
}: TimelineToolbarProps) => {
  // Access the stable and dynamic contexts
  const {
    cardLess,
    enableQuickJump,
    toolbarPosition,
    enableLayoutSwitch,
    memoizedButtonTexts: buttonTexts,
  } = useStableContext();

  const {
    memoizedTheme: theme,
    isDarkMode: darkMode,
    textContentDensity: textDensity,
    isMobile,
  } = useDynamicContext();

  // Prepare QuickJump items with proper string conversions
  const quickJumpItems = useMemo(() => {
    return items.map((item) => ({
      id: item.id ?? '',
      title: getTextFromNode(item.title),
      description: getTextFromNode(item.cardSubtitle),
      active: item.active,
    }));
  }, [items]);

  // Define the toolbar items
  const toolbarItems = useMemo(() => {
    return [
      {
        id: 'timeline-controls',
        label: 'Timeline Controls',
        name: 'timeline_control',
        onSelect: () => {},
      },
      {
        id: 'timeline-popover',
        label: 'timeline_popover',
        name: 'popover',
        onSelect: () => {},
      },
      {
        id: 'layout-popover',
        label: 'layout_popover',
        name: 'popover',
        onSelect: () => {},
      },
      // {
      //   id: 'change-density',
      //   label: 'change_density',
      //   name: 'changeDensity',
      //   onSelect: () => {},
      // },
    ];
  }, []);

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

  // Render the TimelineToolbar component
  return (
    <Toolbar items={toolbarItems} theme={theme}>
      <NavigationGroup $primary>
        <Controls
          disableLeft={isLeftDisabled}
          disableRight={isRightDisabled}
          id={id}
          onFirst={onFirst}
          onLast={onLast}
          onNext={onNext}
          onPrevious={onPrevious}
          onReplay={onRestartSlideshow}
          slideShowEnabled={slideShowEnabled}
          slideShowRunning={slideShowRunning}
          isDark={darkMode}
          onToggleDarkMode={toggleDarkMode}
          onPaused={onPaused}
          activeTimelineItem={activeTimelineItem}
          totalItems={totalItems}
        />
      </NavigationGroup>
      <SearchGroup>
        <SearchWrapper theme={theme}>
          <SearchInput
            ref={searchInputRef}
            type="search"
            placeholder={buttonTexts?.searchPlaceholder ?? 'Search Timeline'}
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleSearchKeyDown}
            onBlur={handleSearchInputBlur}
            aria-label={
              buttonTexts?.searchAriaLabel ?? 'Search timeline content'
            }
            disabled={slideShowRunning}
          />
          {searchQuery && (
            <TimelineNavButton
              onClick={handleClearSearch}
              title={buttonTexts?.clearSearch ?? 'Clear Search'}
              aria-label={buttonTexts?.clearSearch ?? 'Clear Search'}
              theme={theme}
              style={{
                height: '24px',
                width: '24px',
                marginRight: '0.5rem',
              }}
            >
              <CloseIcon />
            </TimelineNavButton>
          )}
          <SearchControls>
            {totalMatches > 0 && (
              <SearchInfo theme={theme}>
                {`${currentMatchIndex + 1} / ${totalMatches}`}
              </SearchInfo>
            )}
            {searchQuery && (
              <>
                <div className="timeline-nav-wrapper">
                  <TimelineNavButton
                    onClick={onPreviousMatch}
                    title={buttonTexts?.previousMatch ?? 'Previous Match'}
                    aria-label={buttonTexts?.previousMatch ?? 'Previous Match'}
                    disabled={disableSearchNav}
                    theme={theme}
                    style={{ height: '28px', width: '28px' }}
                  >
                    <ChevronLeft />
                  </TimelineNavButton>
                </div>
                <div className="timeline-nav-wrapper">
                  <TimelineNavButton
                    onClick={onNextMatch}
                    title={buttonTexts?.nextMatch ?? 'Next Match'}
                    aria-label={buttonTexts?.nextMatch ?? 'Next Match'}
                    disabled={disableSearchNav}
                    theme={theme}
                    style={{ height: '28px', width: '28px' }}
                  >
                    <ChevronRight />
                  </TimelineNavButton>
                </div>
              </>
            )}
          </SearchControls>
        </SearchWrapper>
      </SearchGroup>
      <ActionGroup>
        <ExtraControls
          $hide={hideExtraControls}
          $slideShowRunning={slideShowRunning}
          key="timeline-extra-controls"
        >
          <div className="control-wrapper" key="quick-jump">
            {enableQuickJump ? (
              <QuickJump
                activeItem={activeTimelineItem}
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
                onUpdateTimelineMode={onUpdateTimelineMode}
                mode={mode}
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
          ) : null}{' '}
        </ExtraControls>
      </ActionGroup>
    </Toolbar>
  );
};

// Export the TimelineToolbar component
export { TimelineToolbar };
