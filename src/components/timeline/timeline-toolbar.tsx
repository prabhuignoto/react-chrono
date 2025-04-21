// Import necessary dependencies
import { FunctionComponent, useContext, useMemo } from 'react';
import { GlobalContext } from '../GlobalContext';
import Controls from '../timeline-elements/timeline-control/timeline-control';
import { Toolbar } from '../toolbar';
import SearchBox from '../toolbar/search-box';
import {
  ChangeDensity,
  LayoutSwitcher,
  QuickJump,
} from './timeline-popover-elements';
import { TimelineToolbarProps } from './timeline-toolbar.model';
import {
  ExtraControlChild,
  ExtraControls,
  SearchBoxContainer,
} from './timeline.style';
import { TextDensity } from '@models/TimelineModel';

// Define the TimelineToolbar component
const TimelineToolbar: FunctionComponent<TimelineToolbarProps> = ({
  activeTimelineItem = 0,
  slideShowEnabled = false,
  slideShowRunning = false,
  flipLayout,
  toggleDarkMode,
  onPaused = () => {},
  onFirst = () => {},
  onLast = () => {},
  onNext = () => {},
  onPrevious = () => {},
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
    theme = {} as any,
    cardLess = false,
    enableQuickJump = false,
    darkMode = false,
    toolbarPosition = 'top',
    textDensity = 'HIGH' as TextDensity,
    isMobile = false,
    enableLayoutSwitch = false,
    search,
  } = useContext(GlobalContext);

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
  }, [items]);

  // Render the TimelineToolbar component
  return (
    <Toolbar items={toolbarItems} theme={theme as any}>
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
                description: item.cardSubtitle || '',
                id: item.id || '',
                title: item.title || '',
              }))}
              onActivateItem={onActivateTimelineItem}
              theme={theme as any}
              position={toolbarPosition}
              isMobile={isMobile}
            />
          ) : null}
        </ExtraControlChild>
        <ExtraControlChild key="layout-switcher">
          {!cardLess && enableLayoutSwitch ? (
            <LayoutSwitcher
              isDarkMode={darkMode}
              theme={theme as any}
              onUpdateTimelineMode={(s: string) =>
                onUpdateTimelineMode?.(s as any)
              }
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
              theme={theme as any}
              onChange={onUpdateTextContentDensity}
              position={toolbarPosition}
              selectedDensity={textDensity}
              isMobile={isMobile}
            ></ChangeDensity>
          </ExtraControlChild>
        ) : null}{' '}
      </ExtraControls>
      {/* Render SearchBox only if search is enabled */}
      {(typeof search === 'boolean' ? search : search?.enabled) && (
        <SearchBoxContainer>
          <SearchBox
            placeholder={
              typeof search === 'object'
                ? search.placeholder || 'Search by title, subtitle...'
                : 'Search by title, subtitle...'
            }
            ariaLabel={
              typeof search === 'object'
                ? search.ariaLabel || 'Search timeline items'
                : 'Search timeline items'
            }
            theme={theme}
            onActivateItem={onActivateTimelineItem}
            items={items}
            dataTestId="timeline-search-input"
            minimumSearchLength={
              typeof search === 'object'
                ? search.minimumSearchLength
                : undefined
            }
            searchKeys={
              typeof search === 'object' ? search.searchKeys : undefined
            }
            debounceTime={
              typeof search === 'object' ? search.debounceTime : undefined
            }
            highlightResults={
              typeof search === 'object' ? search.highlightResults : undefined
            }
            navigateResults={
              typeof search === 'object' ? search.navigateResults : undefined
            }
          />
        </SearchBoxContainer>
      )}
    </Toolbar>
  );
};

// Export the TimelineToolbar component
export { TimelineToolbar };
