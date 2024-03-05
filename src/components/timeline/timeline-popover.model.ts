import { Theme } from '@models/Theme';
import { TextDensity, TimelineMode } from '@models/TimelineModel';
import { ListItemModel } from '../elements/list/list.model';

export type CommonProps = {
  isDarkMode: boolean;
  isMobile: boolean;
  position: 'top' | 'bottom';
  theme: Theme;
};

export type LayoutSwitcherProp = {
  initialTimelineMode?: TimelineMode | 'HORIZONTAL_ALL';
  mode?: TimelineMode;
  onUpdateTimelineMode: (s: string) => void;
} & CommonProps;

export type QuickJumpProp = {
  activeItem: number;
  items: ListItemModel[];
  onActivateItem: (id: string) => void;
} & CommonProps;

export type ChangeDensityProp = {
  onChange: (value: TextDensity) => void;
  selectedDensity: TextDensity;
} & CommonProps;
