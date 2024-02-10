import { FunctionComponent, useContext, useMemo } from 'react';
import { GlobalContext } from '../GlobalContext';
import TimelineControl from '../timeline-elements/timeline-control/timeline-control';
import { Toolbar } from '../toolbar';
import { LayoutSwitcher, QuickJump } from './timeline-popover-elements';
import { TimelineToolbarProps } from './timeline-toolbar.model';

const TimelineToolbar: FunctionComponent<TimelineToolbarProps> = ({
  activeTimelineItem,
  slideShowEnabled,
  slideShowRunning,
  darkMode,
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
  mode,
}) => {
  const { theme, cardLess, enableQuickJump } = useContext(GlobalContext);

  console.log(theme);
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
    ];
  }, []);

  const disableLeft = useMemo(() => {
    return flipLayout
      ? activeTimelineItem === totalItems - 1
      : activeTimelineItem === 0;
  }, [flipLayout, activeTimelineItem, totalItems]);

  const disableRight = useMemo(() => {
    return flipLayout
      ? activeTimelineItem === 0
      : activeTimelineItem === totalItems - 1;
  }, [flipLayout, activeTimelineItem, totalItems]);

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
      {enableQuickJump ? (
        <QuickJump
          activeItem={activeTimelineItem}
          items={items.map((item) => ({
            ...item,
            description: item.cardSubtitle,
          }))}
          onActivateItem={onActivateTimelineItem}
          theme={theme}
        />
      ) : null}
      {!cardLess ? (
        <LayoutSwitcher
          theme={theme}
          onUpdateTimelineMode={onUpdateTimelineMode}
          mode={mode}
        />
      ) : null}
    </Toolbar>
  );
};

export { TimelineToolbar };
