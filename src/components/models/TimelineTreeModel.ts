import { TimelineItemViewModel } from "./TimelineItemModel";
import { Scroll } from "./TimelineCollnModel";

export interface TreeLeafModel {
  className: string;
  id?: string;
  active?: boolean;
  onClick: (id: string) => void;
  onActive: (timelinePointOffset: number) => void;
  theme?: Theme;
}

export interface TreeBranchModel {
  className: string;
  index: number;
  contentText: string;
  contentTitle?: string;
  contentDetailedText?: string;
  active?: boolean;
  id?: string;
  onClick: (id: string) => void;
  onActive: (
    timelinePointOffset: number,
    timelineContentHeight: number,
    timelineContentOffset: number
  ) => void;
  onShowMore: () => void;
  title: string;
  visible?: boolean;
  theme?: Theme;
}

export interface TimelineTreeModel {
  items: TimelineItemViewModel[];
  onClick: (id?: string) => void;
  activeTimelineItem: number;
  autoScroll: (s: Partial<Scroll>) => void;
  theme?: Theme
}

export interface Theme {
  primary: string;
  secondary: string;
}