import { TimelineModel, TimelineProps } from '@models/TimelineModel';
import { FunctionComponent, useContext, useMemo } from 'react';
import { GlobalContext } from '../GlobalContext';
import TimelineControl from '../timeline-elements/timeline-control/timeline-control';
import { Toolbar } from '../toolbar';
import { LayoutSwitcher, QuickJump } from './timeline-popover-elements';

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
  | 'mode'
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
  mode,
}) => {
  const { theme } = useContext<TimelineModel>(GlobalContext);

  const isVertical = useMemo(
    () => mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING',
    [mode],
  );

  console.log('mode parent', mode);

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
          content: QuickJump({
            activeItem: activeTimelineItem,
            items: items.map((item) => ({
              ...item,
              description: item.cardSubtitle,
            })),
            onActivateItem: onActivateTimelineItem,
            theme: theme,
          }),
          label: 'timeline_popover',
          name: 'popover',
          onSelect: () => {},
        },
        {
          // content: LayoutSwitcher({
          //   initialTimelineMode: showAllCardsHorizontal
          //     ? 'HORIZONTAL_ALL'
          //     : mode,
          //   mode: verticalOrHorizontal,
          //   onUpdateTimelineMode,
          //   theme,
          // }),
          content: (
            <LayoutSwitcher
              theme={theme}
              onUpdateTimelineMode={onUpdateTimelineMode}
              mode={mode}
            />
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
