import { Theme } from './Theme';
import { Media } from './TimelineMediaModel';

export interface TimelineContentModel {
  active?: boolean;
  content?: string;
  detailedText?: string | string[];
  id?: string;
  media?: Media;
  onClick?: (id: string) => void;
  onShowMore: () => void;
  onElapsed?: (id?: string) => void;
  slideShowActive?: boolean;
  theme?: Theme;
  title?: string;
  branchDir?: string;
  customContent?: React.ReactNode;
  hasFocus?: boolean;
}
