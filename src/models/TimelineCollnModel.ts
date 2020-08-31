import { TimelineItemViewModel } from "./TimelineItemModel";

export interface TimelineCollectionModel {
  autoScroll: (t: Partial<Scroll>) => void;
  handleItemClick: (id?: string) => void;
  itemWidth: number;
  items: TimelineItemViewModel[];
  mode: "HORIZONTAL" | "VERTICAL" | "TREE";
  wrapperId: string;
}

export interface Scroll {
  timelinePointHeight: number;
  timelinePointOffset: number;
  timelinePointWidth: number;
  timelineContentHeight: number;
  timelineContentOffset: number;
}
