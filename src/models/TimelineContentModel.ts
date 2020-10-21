import { Theme } from './Theme';
import { Media } from './TimelineMediaModel';
import { TimelineMode } from './TimelineModel';

export interface TimelineContentModel {
  active?: boolean;
  cardHeight?: number;
  content: string;
  detailedText?: string;
  id?: string;
  media?: Media;
  mode?: TimelineMode;
  onClick?: (id: string) => void;
  onShowMore: () => void;
  onElapsed?: (id?: string) => void;
  slideShowActive?: boolean;
  slideItemDuration?: number;
  theme?: Theme;
  title?: string;
  branchDir?: string;
}
