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
  toggleDarkMode: () => void;
  totalItems: number;
  id: string;
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
}) => {
  const { theme } = useContext(GlobalContext);
  return (
    <Toolbar
      items={[
        {
          name: 'timeline_control',
          label: 'Timeline Controls',
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
          onSelect: () => {},
        },
        {
          name: 'popover',
          label: 'timeline_popover',
          content: (
            <PopOver placeholder="Select a item" position="down">
              <List
                items={items.map((item) => ({
                  id: item.id,
                  label: item.title,
                  onSelect: () => {},
                  description: item.cardSubtitle,
                  title: item.title,
                }))}
                theme={theme}
              />
            </PopOver>
          ),
          onSelect: () => {},
        },
      ]}
    />
  );
};

export { TimelineToolbar };
