import { TimelineItemModel } from "./TimelineItemModel";

export interface TimelineModel extends TimelineProps{
  activeTimelineItem: number;
  onFirst: () => void;
  onLast: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onTimelineUpdated?: (id: number) => void;
  slideShowRunning?: boolean;
}

export interface TimelineProps {
  disableNavOnKey?: boolean;
  disableNavOnScroll?: boolean;
  itemWidth?: number;
  items: TimelineItemModel[];
  mode?: "VERTICAL" | "HORIZONTAL" | "TREE";
  slideItemDuration?: number;
  slideShow?: boolean;
  titlePosition?: "TOP" | "BOTTOM" | "ALTERNATE";
  theme?: {
    primary: string;
    secondary: string;
  }
}