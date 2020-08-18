import { TimelineItemModel } from "./TimelineItemModel";

export interface TimelineModel {
  items: TimelineItemModel[];
  CardPosition: "TOP" | "BOTTOM" | "ALTERNATE";
  itemWidth?: number;
}