import { Scroll } from "./TimelineCollnModel";
import { Theme } from "./TimelineTreeModel";

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
  position?: string;
  title: string;
  visible?: boolean;
}

export interface TimelineItemViewModel extends TimelineItemModel {
  autoScroll: ({ timelinePointOffset, timelinePointWidth, timelinePointHeight, timelineContentHeight }: Partial<Scroll>) => void;
  mode: "HORIZONTAL" | "VERTICAL" | "TREE";
  onClick: (id?: string) => void;
  slideShowRunning?: boolean;
  theme?: Theme;
  wrapperId: string;
}