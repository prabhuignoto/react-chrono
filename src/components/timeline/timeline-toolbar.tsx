// Import necessary dependencies
import { FunctionComponent, useContext, useMemo } from 'react';
import { GlobalContext } from '../GlobalContext';
import TimelineControl from '../timeline-elements/timeline-control/timeline-control';
import { Toolbar } from '../toolbar';
import {
  ChangeDensity,
  LayoutSwitcher,
  QuickJump,
} from './timeline-popover-elements';
import { TimelineToolbarProps } from './timeline-toolbar.model';
import {
  ToolbarExtraControl,
  ToolbarExtraControlChild,
} from './timeline.style';

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
}) => {
  // Access the global context
  const {
    theme,
    cardLess,
    enableQuickJump,
    darkMode,
    toolbarPosition,
    textDensity,
    isMobile,
    
  } = useContext(GlobalContext);

  // Define the toolbar items
  const toolbarItems = useMemo(() => {
    return [
      {
        label: 'Timeline Controls',
        name: 'timeline_control',
        onSelect: () => {},
      },
      {
        label: 'timeline_popover',
        name: 'popover',
        onSelect: () => {},
      },
      {
        label: 'layout_popover',
        name: 'popover',
        onSelect: () => {},
      },
      {
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

  // Render the TimelineToolbar component
  return (
    <Toolbar items={toolbarItems} theme={theme}>
      <TimelineControl
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
      <ToolbarExtraControl $isMobile={isMobile} $slideShowRunning={slideShowRunning}>
        <ToolbarExtraControlChild key="quick-jump">
          {enableQuickJump ? (
            <QuickJump
              activeItem={activeTimelineItem}
              isDarkMode={darkMode}
              items={items.map((item) => ({
                ...item,
                description: item.cardSubtitle,
                title: item.title,
              }))}
              onActivateItem={onActivateTimelineItem}
              theme={theme}
              position={toolbarPosition}
              isMobile={isMobile}
            />
          ) : null}
        </ToolbarExtraControlChild>
        <ToolbarExtraControlChild key="layout-switcher">
          {!cardLess ? (
            <LayoutSwitcher
              isDarkMode={darkMode}
              theme={theme}
              onUpdateTimelineMode={onUpdateTimelineMode}
              mode={mode}
              position={toolbarPosition}
              isMobile={isMobile}
            />
          ) : null}
        </ToolbarExtraControlChild>
        <ToolbarExtraControlChild key="change-density">
          <ChangeDensity
            isDarkMode={darkMode}
            theme={theme}
            onChange={onUpdateTextContentDensity}
            position={toolbarPosition}
            selectedDensity={textDensity}
            isMobile={isMobile}
          ></ChangeDensity>
        </ToolbarExtraControlChild>
      </ToolbarExtraControl>
    </Toolbar>
  );
};

// Export the TimelineToolbar component
export { TimelineToolbar };
