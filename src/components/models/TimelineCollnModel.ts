import { TimelineItemViewModel } from "./TimelineItemModel";

export interface TimelineCollectionModel {
  handleItemClick: (id?: string) => void;
  itemWidth: number;
  items: TimelineItemViewModel[];
  mode: "HORIZONTAL" | "VERTICAL"
  onScroll: (t: Scroll) => void;
}

export interface Scroll {
  circleHeight?: number;
  circleOffset: number;
  circleWidth?: number;
  contentHeight?: number;
  contentOffset?: number;
}
