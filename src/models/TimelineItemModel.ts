import { Scroll } from "./TimelineCollnModel";
import { Theme } from "./TimelineTreeModel";

export interface TimelineItemModel {
  active?: boolean;
  contentTitle?: string;
  contentText: string;
  contentDetailedText?: string;
  id?: string;
  position?: string;
  title: string;
  visible?: boolean;
}

export interface TimelineItemViewModel extends TimelineItemModel {
  mode: "HORIZONTAL" | "VERTICAL" | "TREE";
  theme: Theme;
  onClick: (id?: string) => void;
  autoScroll: ({ timelinePointOffset, timelinePointWidth, timelinePointHeight, timelineContentHeight }: Partial<Scroll>) => void;
}