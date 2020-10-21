import { Theme } from "./Theme";
import { Scroll } from "./TimelineCollnModel";
import { Media } from "./TimelineMediaModel";
/**
 *
 *
 * @export
 * @interface TimelineItemModel
 */
export interface TimelineItemModel {
  active?: boolean;
  contentDetailedText?: string;
  contentText: string;
  contentTitle?: string;
  id?: string;
  media?: Media;
  position?: string;
  title: string;
  visible?: boolean;
}

export interface TimelineCardModel extends TimelineItemModel {
  autoScroll: ({ timelinePointOffset, timelinePointWidth, timelinePointHeight, timelineContentHeight }: Partial<Scroll>) => void;
  mode: "HORIZONTAL" | "VERTICAL" | "TREE";
  onClick: (id?: string) => void;
  slideShowRunning?: boolean;
  theme?: Theme;
  wrapperId: string;
  cardHeight?: number;
  slideItemDuration?: number;
  onElapsed?: (id?: string) => void;
}