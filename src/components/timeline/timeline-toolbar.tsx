import { TimelineModel, TimelineProps } from '@models/TimelineModel';
import { FunctionComponent, useContext } from 'react';
import { GlobalContext } from '../GlobalContext';
import { List } from '../list/list';
import { PopOver } from '../popover';
import TimelineControl from '../timeline-elements/timeline-control/timeline-control';
import { Toolbar } from '../toolbar';

export type TimelineToolbarProps = Pick<
  TimelineModel,
  | 'activeTimelineItem'
  | 'slideShowEnabled'
  | 'slideShowRunning'
  | 'onRestartSlideshow'
  | 'onNext'
  | 'onPrevious'
  | 'onPaused'
  | 'onFirst'
  | 'onLast'
  | 'items'
> & {
  id: string;
  onActivateTimelineItem: (id: string) => void;
  onUpdateTimelineMode: (mode: string) => void;
  toggleDarkMode: () => void;
  totalItems: number;
} & Pick<TimelineProps, 'darkMode' | 'flipLayout'>;

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
}) => {
  const { theme } = useContext(GlobalContext);
  return (
    <Toolbar
      items={[
        {
          content: (
            <TimelineControl
              disableLeft={
                flipLayout
                  ? activeTimelineItem === totalItems - 1
                  : activeTimelineItem === 0
              }
              disableRight={
                flipLayout
                  ? activeTimelineItem === 0
                  : activeTimelineItem === totalItems - 1
              }
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
          ),
          label: 'Timeline Controls',
          name: 'timeline_control',
          onSelect: () => {},
        },
        {
          content: (
            <PopOver
              placeholder="Quick jump to an item"
              position="down"
              theme={theme}
              width={'400px'}
            >
              <List
                items={items.map((item, index) => ({
                  active: index === activeTimelineItem,
                  description: item.cardSubtitle,
                  id: item.id,
                  label: item.title,
                  onSelect: () => {},
                  title: item.title,
                }))}
                theme={theme}
                onClick={onActivateTimelineItem}
              />
            </PopOver>
          ),
          label: 'timeline_popover',
          name: 'popover',
          onSelect: () => {},
        },
        {
          content: (
            <PopOver
              placeholder="Change the layout"
              position="down"
              theme={theme}
            >
              <List
                items={[
                  {
                    id: 'VERTICAL',
                    onSelect: () => onUpdateTimelineMode('VERTICAL'),
                    title: 'Vertical Layout',
                  },
                  {
                    id: 'VERTICAL_ALTERNATING',
                    onSelect: () =>
                      onUpdateTimelineMode('VERTICAL_ALTERNATING'),
                    title: 'Vertical Alternating Layout',
                  },
                  {
                    id: 'HORIZONTAL',
                    onSelect: () => onUpdateTimelineMode('HORIZONTAL'),
                    title: 'Horizontal Layout',
                  },
                ]}
                theme={theme}
                multiSelectable
              />
            </PopOver>
          ),
          label: 'layout_popover',
          name: 'popover',
          onSelect: () => {},
        },
      ]}
    />
  );
};

export { TimelineToolbar };
