import { TimelineItemViewModel } from "./TimelineItemModel";
import { Scroll } from "./TimelineCollnModel";
import { Media } from "./TimelineItemMedia";

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
  alternateCards?: boolean;
  className: string;
  contentDetailedText?: string;
  contentText: string;
  contentTitle?: string;
  id?: string;
  index: number;
  media?: Media;
  mode?: "VERTICAL" | "HORIZONTAL" | "TREE";
  onClick: (id: string) => void;
  onShowMore: () => void;
  slideShowRunning?: boolean;
  theme?: Theme;
  title: string;
  visible?: boolean;
  onActive: (
    timelinePointOffset: number,
    timelineContentHeight: number,
    timelineContentOffset: number
  ) => void;
  cardHeight?: number;
}

export interface TimelineTreeModel {
  activeTimelineItem: number;
  alternateCards?: boolean;
  autoScroll: (s: Partial<Scroll>) => void;
  items: TimelineItemViewModel[];
  onClick: (id?: string) => void;
  slideShowRunning?: boolean;
  theme?: Theme;
  mode?: "VERTICAL" | "HORIZONTAL" | "TREE";
  sRef?: React.Ref<any>;
  cardHeight?: number;
}

export interface Theme {
  primary: string;
  secondary: string;
}