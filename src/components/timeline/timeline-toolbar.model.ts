import {
  TextDensity,
  TimelineMode,
  TimelineModel,
  TimelineProps,
} from '@models/TimelineModel';
import { RefObject } from 'react';

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

  // Search related props
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  onNextMatch: () => void;
  onPreviousMatch: () => void;
  totalMatches: number;
  currentMatchIndex: number; // 0-based index
  onSearchKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  searchInputRef?: RefObject<HTMLInputElement>; // Ref for the search input
} & Pick<TimelineProps, 'darkMode' | 'flipLayout'>;
