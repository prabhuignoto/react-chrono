// Import necessary dependencies
import { FunctionComponent, useContext, useMemo } from 'react';
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
  }, []);

  // Render the TimelineToolbar component
  return (
    <Toolbar items={toolbarItems} theme={theme}>
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
