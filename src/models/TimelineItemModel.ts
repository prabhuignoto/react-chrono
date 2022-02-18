import { Theme } from './Theme';
import { Scroll } from './TimelineHorizontalModel';
import { Media } from './TimelineMediaModel';
import { TimelineMode } from './TimelineModel';
/**
 *
 *
 * @export
 * @interface TimelineItemModel
 */
export interface TimelineItemModel {
  active?: boolean;
  cardDetailedText?: string | string[];
  cardSubtitle?: string;
  cardTitle?: string;
  id?: string;
  media?: Media;
  position?: string;
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
> & {
  autoScroll: ({
    pointOffset,
    pointWidth,
    timelinePointHeight,
    contentHeight,
  }: Partial<Scroll>) => void;
  cardHeight?: number;
  customContent?: React.ReactNode | React.ReactNode[];
  hasFocus?: boolean;
  iconChild?: React.ReactNode;
  mode: TimelineMode;
  onClick: (id?: string) => void;
  onElapsed?: (id?: string) => void;
  slideItemDuration?: number;
  slideShowRunning?: boolean;
  theme?: Theme;
  wrapperId: string;
};
