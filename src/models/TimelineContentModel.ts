import { Theme } from './Theme';
import { Media } from './TimelineMediaModel';

export interface TimelineContentModel {
  active?: boolean;
  branchDir?: string;
  content?: string;
  customContent?: React.ReactNode;
  detailedText?: string | string[];
  flip?: boolean;
  hasFocus?: boolean;
  id?: string;
  lessText?: string;
  media?: Media;
  moreText?: string;
  onClick?: (id: string) => void;
  onElapsed?: (id?: string) => void;
  onShowMore: () => void;
  slideShowActive?: boolean;
  theme?: Theme;
  title?: string;
  url?: string;
}
