import { TimelineItemModel } from "./TimelineItemModel";

export interface TimelineModel {
  itemWidth?: number;
  items: TimelineItemModel[];
  mode?: "VERTICAL" | "HORIZONTAL"
  titlePosition?: "TOP" | "BOTTOM" | "ALTERNATE";
}