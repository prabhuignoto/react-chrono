// Import necessary dependencies
import {
  FunctionComponent,
  useContext,
  useMemo,
  useCallback,
  useState,
} from 'react';
import { GlobalContext } from '../GlobalContext';
import Controls from '../timeline-elements/timeline-control/timeline-control';
import { Toolbar } from '../toolbar';
import {
  ChangeDensity,
  LayoutSwitcher,
  QuickJump,
} from './timeline-popover-elements';
import { TimelineToolbarProps } from './timeline-toolbar.model';
import { ExtraControlChild, ExtraControls } from './timeline.style';
import { SearchToolbarItem } from '@models/ToolbarItem';

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
}: TimelineToolbarProps) => {
  // Access the global context
  const {
    theme,
    cardLess,
    enableQuickJump,
    darkMode,
    toolbarPosition,
    textDensity,
    isMobile,
    enableLayoutSwitch,
  } = useContext(GlobalContext);

  // Search functionality
  const handleSearch = useCallback(
    (searchText: string) => {
      const searchTerm = searchText.toLowerCase();
      if (!searchTerm) {
        // Reset to show all items if search is empty
        onActivateTimelineItem(items[0]?.id || '');
        return;
      }

      // Find the first matching item
      const matchingItem = items.find((item) => {
        return (
          item.title?.toLowerCase().includes(searchTerm) ||
          item.cardTitle?.toLowerCase().includes(searchTerm) ||
          item.cardSubtitle?.toLowerCase().includes(searchTerm) ||
          (typeof item.cardDetailedText === 'string' &&
            item.cardDetailedText.toLowerCase().includes(searchTerm)) ||
          (Array.isArray(item.cardDetailedText) &&
            item.cardDetailedText.some((text) =>
              text.toLowerCase().includes(searchTerm),
            ))
        );
      });

      if (matchingItem?.id) {
        onActivateTimelineItem(matchingItem.id);
      }
    },
    [items, onActivateTimelineItem],
  );

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
      {
        id: 'change-density',
        label: 'change_density',
        name: 'changeDensity',
        onSelect: () => {},
      },
    ];
  }, []);

  // Define search toolbar items
  const searchToolbarItems = useMemo(() => {
    return [
      {
        id: 'timeline-search',
        label: 'Search timeline items',
        placeholder: 'Search by title, subtitle...',
        onSearch: handleSearch,
      },
    ];
  }, [handleSearch]);

  // Determine if the left arrow should be disabled
  const disableLeft = useMemo(() => {
    return flipLayout
      ? activeTimelineItem === totalItems - 1
      : activeTimelineItem === 0;
  }, [flipLayout, activeTimelineItem, totalItems]);

  // Determine if the right arrow should be disabled
  const disableRight = useMemo(() => {
    return flipLayout
      ? activeTimelineItem === 0
      : activeTimelineItem === totalItems - 1;
  }, [flipLayout, activeTimelineItem, totalItems]);

  const hideExtraControls = useMemo(() => {
    return cardLess || slideShowRunning;
  }, [cardLess, slideShowRunning]);

  const canShowDensity = useMemo(() => {
    return items.every((item) => item.cardDetailedText);
  }, []);

  // Render the TimelineToolbar component
  return (
    <Toolbar
      items={toolbarItems}
      searchItems={searchToolbarItems as SearchToolbarItem[]}
      theme={theme}
    >
      <Controls
        disableLeft={disableLeft}
        disableRight={disableRight}
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
      />
      <ExtraControls
        $hide={hideExtraControls}
        $slideShowRunning={slideShowRunning}
        key="timeline-extra-controls"
      >
        <ExtraControlChild key="quick-jump">
          {enableQuickJump ? (
            <QuickJump
              activeItem={activeTimelineItem}
              isDarkMode={darkMode}
              items={items.map((item) => ({
                ...item,
                description: item.cardSubtitle,
                id: item.id,
                title: item.title,
              }))}
              onActivateItem={onActivateTimelineItem}
              theme={theme}
              position={toolbarPosition}
              isMobile={isMobile}
            />
          ) : null}
        </ExtraControlChild>
        <ExtraControlChild key="layout-switcher">
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
        </ExtraControlChild>
        {canShowDensity ? (
          <ExtraControlChild key="change-density">
            <ChangeDensity
              isDarkMode={darkMode}
              theme={theme}
              onChange={onUpdateTextContentDensity}
              position={toolbarPosition}
              selectedDensity={textDensity}
              isMobile={isMobile}
            ></ChangeDensity>
          </ExtraControlChild>
        ) : null}{' '}
      </ExtraControls>
    </Toolbar>
  );
};

// Export the TimelineToolbar component
export { TimelineToolbar };
