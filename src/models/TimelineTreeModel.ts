import { TimelineItemViewModel } from "./TimelineItemModel";
import { Scroll } from "./TimelineCollnModel";

export interface TreeLeafModel {
  active?: boolean;
  alternateCards?: boolean;
  className: string;
  id?: string;
  onActive: (timelinePointOffset: number) => void;
  onClick: (id: string) => void;
  theme?: Theme;
}

export interface TreeBranchModel {
  active?: boolean;
  className: string;
  contentDetailedText?: string;
  contentText: string;
  contentTitle?: string;
  id?: string;
  index: number;
  onClick: (id: string) => void;
  onActive: (
    timelinePointOffset: number,
    timelineContentHeight: number,
    timelineContentOffset: number
  ) => void;
  onShowMore: () => void;
  alternateCards?: boolean;
  slideShowRunning?: boolean;
  theme?: Theme;
  title: string;
  visible?: boolean;
}

export interface TimelineTreeModel {
  activeTimelineItem: number;
  alternateCards?: boolean;
  autoScroll: (s: Partial<Scroll>) => void;
  items: TimelineItemViewModel[];
  onClick: (id?: string) => void;
  slideShowRunning?: boolean;
  theme?: Theme;
}

export interface Theme {
  primary: string;
  secondary: string;
}