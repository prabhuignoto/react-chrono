import { Theme } from './Theme';
import { Scroll } from './TimelineCollnModel';
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
  cardDetailedText?: string;
  cardSubtitle: string;
  cardTitle?: string;
  id?: string;
  media?: Media;
  position?: string;
  title: string;
  visible?: boolean;
}

export interface TimelineCardModel extends TimelineItemModel {
  autoScroll: ({
    timelinePointOffset,
    timelinePointWidth,
    timelinePointHeight,
    timelineContentHeight,
  }: Partial<Scroll>) => void;
  mode: TimelineMode;
  onClick: (id?: string) => void;
  slideShowRunning?: boolean;
  theme?: Theme;
  wrapperId: string;
  cardHeight?: number;
  slideItemDuration?: number;
  onElapsed?: (id?: string) => void;
}
