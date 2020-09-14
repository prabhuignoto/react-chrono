import { TimelineItemViewModel } from "./TimelineItemModel";
import { Theme } from "./TimelineTreeModel";

export interface TimelineCollectionModel {
  autoScroll: (t: Partial<Scroll>) => void;
  handleItemClick: (id?: string) => void;
  itemWidth: number;
  items: TimelineItemViewModel[];
  mode: "HORIZONTAL" | "VERTICAL" | "TREE";
  slideShowRunning?: boolean;
  theme?: Theme;
  wrapperId: string;
}

export interface Scroll {
  timelineContentHeight: number;
  timelineContentOffset: number;
  timelinePointHeight: number;
  timelinePointOffset: number;
  timelinePointWidth: number;
}
