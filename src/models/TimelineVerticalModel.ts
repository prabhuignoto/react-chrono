import { Theme } from './Theme';
import { Scroll } from './TimelineHorizontalModel';
import { TimelineCardModel } from './TimelineItemModel';
import { Media } from './TimelineMediaModel';
import { TimelineMode } from './TimelineModel';

interface CommonPropsModel {
  alternateCards?: boolean;
  cardHeight?: number;
  flipLayout?: boolean;
  hasFocus?: boolean;
  mode?: TimelineMode;
  onClick: (id?: string) => void;
  onElapsed?: (id?: string) => void;
  slideItemDuration?: number;
  slideShowRunning?: boolean;
  theme?: Theme;
  enableOutline?: boolean;
}

interface CommonVerticalModel extends CommonPropsModel {
  active?: boolean;
  className: string;
  id?: string;
}

export interface VerticalCircleModel extends CommonVerticalModel {
  onActive: (pointOffset: number) => void;
  iconChild?: React.ReactNode;
}

export interface VerticalItemModel extends CommonVerticalModel {
  cardDetailedText?: string | string[];
  cardSubtitle?: string;
  cardTitle?: string;
  contentDetailsChildren?: React.ReactNode;
  iconChild?: React.ReactNode;
  index: number;
  media?: Media;
  onShowMore?: () => void;
  title?: string;
  visible?: boolean;
  onActive: (
    pointOffset: number,
    contentHeight: number,
    contentOffset: number,
  ) => void;
}

export interface TimelineVerticalModel extends CommonPropsModel {
  activeTimelineItem: number;
  autoScroll: (s: Partial<Scroll>) => void;
  childrenNode?: React.ReactNode;
  contentDetailsChildren?: React.ReactNode;
  iconChildren?: React.ReactNode;
  items: TimelineCardModel[];
  onOutlineSelection?: (index: number) => void;
}
