import { TimelineItemModel } from "./TimelineItemModel";

export interface TimelineModel {
  items: TimelineItemModel[];
  titlePosition?: "TOP" | "BOTTOM" | "ALTERNATE";
  itemWidth?: number;
  mode?: "VERTICAL" | "HORIZONTAL"
}