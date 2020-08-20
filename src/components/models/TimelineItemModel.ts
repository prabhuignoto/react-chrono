import { Scroll } from "./TimelineCollnModel";

export interface TimelineItemModel {
  active?: boolean;
  contentText: string;
  id?: string;
  position?: string;
  title: string;
}

export interface TimelineItemViewModel extends TimelineItemModel {
  mode: "HORIZONTAL" | "VERTICAL" | "TREE";
  onClick: (id?: string) => void;
  onScroll: ({ circleOffset, circleWidth, circleHeight, contentHeight }: Scroll) => void;
}