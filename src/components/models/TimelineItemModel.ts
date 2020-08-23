import { Scroll } from "./TimelineCollnModel";

export interface TimelineItemModel {
  active?: boolean;
  contentTitle?: string;
  contentText: string;
  id?: string;
  position?: string;
  title: string;
  visible?: boolean;
}

export interface TimelineItemViewModel extends TimelineItemModel {
  mode: "HORIZONTAL" | "VERTICAL" | "TREE";
  onClick: (id?: string) => void;
  autoScroll: ({ timelinePointOffset, timelinePointWidth, timelinePointHeight, timelineContentHeight }: Partial<Scroll>) => void;
}