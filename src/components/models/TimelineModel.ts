import { TimelineItemModel } from "./TimelineItemModel";

export interface TimelineModel {
  activeTimelineItem: number;
  itemWidth?: number;
  items: TimelineItemModel[];
  mode?: "VERTICAL" | "HORIZONTAL" | "TREE";
  onNext: () => void;
  onPrevious: () => void;
  onTimelineUpdated?: (id: number) => void;
  slideShowRunning?: boolean;
  titlePosition?: "TOP" | "BOTTOM" | "ALTERNATE";
  disableNavOnScroll?: boolean;
  disableNavOnKey?: boolean;
}