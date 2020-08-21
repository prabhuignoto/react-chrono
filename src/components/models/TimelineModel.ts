import { TimelineItemModel } from "./TimelineItemModel";

export interface TimelineModel {
  itemWidth?: number;
  items: TimelineItemModel[];
  mode?: "VERTICAL" | "HORIZONTAL" | "TREE";
  titlePosition?: "TOP" | "BOTTOM" | "ALTERNATE";
  autoPlay?: boolean;
}