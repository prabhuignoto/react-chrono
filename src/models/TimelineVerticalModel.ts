import { Theme } from './Theme';
import { Scroll } from './TimelineHorizontalModel';
import { TimelineCardModel } from './TimelineItemModel';
import { Media } from './TimelineMediaModel';
import { TimelineMode } from './TimelineModel';

interface CommonPropsModel {
  alternateCards?: boolean;
  cardHeight?: number;
  disableClickOnCircle?: boolean;
  enableOutline?: boolean;
  flipLayout?: boolean;
  hasFocus?: boolean;
  lineWidth?: number;
  mode?: TimelineMode;
  onClick: (id?: string) => void;
  onElapsed?: (id?: string) => void;
  slideItemDuration?: number;
  slideShowRunning?: boolean;
  theme?: Theme;
  timelineCircleDimension?: number;
}

interface CommonVerticalModel extends CommonPropsModel {
  active?: boolean;
  className: string;
  id?: string;
}

export interface VerticalCircleModel extends CommonVerticalModel {
  iconChild?: React.ReactNode;
  onActive: (pointOffset: number) => void;
}

export interface VerticalItemModel extends CommonVerticalModel {
  cardDetailedText?: string | string[];
  cardSubtitle?: string;
  cardTitle?: string;
  contentDetailsChildren?: React.ReactNode;
  iconChild?: React.ReactNode;
  index: number;
  media?: Media;
  onActive: (
    pointOffset: number,
    contentHeight: number,
    contentOffset: number,
  ) => void;
  onShowMore?: () => void;
  title?: string;
  url?: string;
  visible?: boolean;
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
