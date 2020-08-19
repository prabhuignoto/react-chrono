import { TimelineItemViewModel } from "./TimelineItemModel";

export interface TimelineCollectionModel {
  items: TimelineItemViewModel[];
  itemWidth: number;
  handleItemClick: (id?: string) => void;
  onScroll: (t: Scroll) => void;
  mode: "HORIZONTAL" | "VERTICAL"
}

export interface Scroll {
  circleWidth?: number;
  circleHeight?: number;
  circleOffset: number;
  contentHeight?: number;
  contentOffset?: number;
}
