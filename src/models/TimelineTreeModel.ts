import { TimelineItemViewModel } from "./TimelineItemModel";
import { Scroll } from "./TimelineCollnModel";
import { Media } from "./TimelineItemMedia";
import { TimelineMode } from "./TimelineModel";

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
  mode?: TimelineMode;
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
  onMediaStateChange: (state: { id?: string; playing?: boolean; paused?: boolean }) => void;
}

export interface TimelineTreeModel {
  activeTimelineItem: number;
  alternateCards?: boolean;
  autoScroll: (s: Partial<Scroll>) => void;
  items: TimelineItemViewModel[];
  onClick: (id?: string) => void;
  slideShowRunning?: boolean;
  theme?: Theme;
  mode?: TimelineMode;
  sRef?: React.Ref<any>;
  cardHeight?: number;
  onMediaStateChange: (state: { id?: string; playing?: boolean; paused?: boolean }) => void;
}

export interface Theme {
  primary: string;
  secondary: string;
  textColor?: string;
}