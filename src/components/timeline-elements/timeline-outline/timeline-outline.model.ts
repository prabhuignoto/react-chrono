import { Theme } from '@models/Theme';
import { TimelineMode } from '@models/TimelineModel';

export enum OutlinePosition {
  'left',
  'right',
}

export interface TimelineOutlineModel {
  items?: TimelineOutlineItem[];
  mode?: TimelineMode;
  onSelect?: (index: number) => void;
  theme?: Theme;
}

export interface TimelineOutlineItem {
  id?: string;
  name?: string;
  selected?: boolean;
}
