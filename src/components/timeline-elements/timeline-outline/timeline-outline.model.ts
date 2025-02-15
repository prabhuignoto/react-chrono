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
  isLoading?: boolean;
  error?: Error | null;
  onError?: (error: Error) => void;
}

export interface TimelineOutlineItem {
  id?: string;
  name?: string;
  selected?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}
