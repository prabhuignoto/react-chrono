import { TimelineItemModel } from "./TimelineItemModel";

export interface TimelineModel extends TimelineProps{
  activeTimelineItem: number;
  onFirst: () => void;
  onLast: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onTimelineUpdated?: (id: number) => void;
}

export interface TimelineProps {
  slideItemDuration?: number;
  slideShowRunning?: boolean;
  titlePosition?: "TOP" | "BOTTOM" | "ALTERNATE";
  disableNavOnKey?: boolean;
  disableNavOnScroll?: boolean;
  itemWidth?: number;
  items: TimelineItemModel[];
  mode?: "VERTICAL" | "HORIZONTAL" | "TREE";
  slideShow?: boolean;
  theme?: {
    primary: string;
    secondary: string;
  }
}