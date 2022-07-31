import { Theme } from './Theme';
import { Scroll } from './TimelineHorizontalModel';
import { TimelineCardModel } from './TimelineItemModel';
import { Media } from './TimelineMediaModel';
import { TimelineProps } from './TimelineModel';

export type Props = Pick<
  TimelineProps,
  | 'flipLayout'
  | 'theme'
  | 'mode'
  | 'timelineCircleDimension'
  | 'lineWidth'
  | 'cardHeight'
  | 'enableOutline'
  | 'disableClickOnCircle'
  | 'cardLess'
> & {
  alternateCards?: boolean;
  hasFocus?: boolean;
  onClick: (id?: string) => void;
  onElapsed?: (id?: string) => void;
  slideItemDuration?: number;
  slideShowRunning?: boolean;
  theme?: Theme;
};

type VerticalModel = Pick<
  Props,
  | 'alternateCards'
  | 'hasFocus'
  | 'onClick'
  | 'onElapsed'
  | 'slideShowRunning'
  | 'mode'
  | 'timelineCircleDimension'
  | 'lineWidth'
  | 'disableClickOnCircle'
  | 'cardLess'
> & {
  active?: boolean;
  className: string;
  id?: string;
};

export interface VerticalCircleModel extends VerticalModel {
  iconChild?: React.ReactNode;
  onActive: (pointOffset: number) => void;
}

export interface VerticalItemModel extends VerticalModel {
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

export type TimelineVerticalModel = Pick<
  Props,
  | 'alternateCards'
  | 'enableOutline'
  | 'mode'
  | 'onClick'
  | 'onElapsed'
  | 'slideShowRunning'
  | 'theme'
  | 'hasFocus'
  | 'cardLess'
> & {
  activeTimelineItem: number;
  autoScroll: (s: Partial<Scroll>) => void;
  childrenNode?: React.ReactNode;
  contentDetailsChildren?: React.ReactNode;
  iconChildren?: React.ReactNode;
  items: TimelineCardModel[];
  onOutlineSelection?: (index: number) => void;
};
