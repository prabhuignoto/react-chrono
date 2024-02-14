import {
  TextDensity,
  TimelineMode,
  TimelineModel,
  TimelineProps,
} from '@models/TimelineModel';

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
  onUpdateTextContentDensity: (value: TextDensity) => void;
  onUpdateTimelineMode: (mode: TimelineMode) => void;
  toggleDarkMode: () => void;
  totalItems: number;
} & Pick<TimelineProps, 'darkMode' | 'flipLayout'>;
