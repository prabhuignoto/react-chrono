import { ReactNode } from 'react';
import { Theme } from './Theme';
import { Scroll } from './TimelineHorizontalModel';
import { Media } from './TimelineMediaModel';
import { TimelineProps } from './TimelineModel';
/**
 *
 *
 * @export
 * @interface TimelineItemModel
 */
export interface TimelineItemModel {
  _dayjs?: any;
  active?: boolean;
  cardDetailedText?: string | string[];
  cardSubtitle?: string;
  cardTitle?: string;
  content?: ReactNode | ReactNode[];
  date?: number | string | Date;
  id?: string;
  isNested?: boolean;
  items?: TimelineItemModel[];
  media?: Media;
  position?: string;
  timelineContent?: ReactNode;
  title?: string;
  url?: string;
  visible?: boolean;
}

export type TimelineCardModel = Pick<
  TimelineItemModel,
  | 'id'
  | 'visible'
  | 'title'
  | 'active'
  | 'cardDetailedText'
  | 'cardSubtitle'
  | 'cardTitle'
  | 'media'
  | 'url'
  | 'timelineContent'
  | 'isNested'
> & {
  autoScroll?: ({
    pointOffset,
    pointWidth,
    timelinePointHeight,
    contentHeight,
  }: Partial<Scroll>) => void;
  customContent?: React.ReactNode | React.ReactNode[];
  hasFocus?: boolean;
  iconChild?: React.ReactNode;
  // mode: TimelineMode;
  onClick?: (id?: string) => void;
  onElapsed?: (id?: string) => void;
  slideItemDuration?: number;
  slideShowRunning?: boolean;
  theme?: Theme;
  wrapperId: string;
} & Pick<TimelineProps, 'cardHeight' | 'cardWidth' | 'nestedCardHeight'>;
