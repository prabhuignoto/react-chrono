import { Scroll } from "./TimelineCollnModel";

export interface TimelineItemModel {
  contentText: string;
  position?: string;
  title: string;
  id?: string;
  active?: boolean;
}

export interface TimelineItemViewModel extends TimelineItemModel {
  onClick: (id?: string) => void;
  scroll: ({ circleOffset, circleWidth, circleHeight, contentHeight }: Scroll) => void;
  mode: "HORIZONTAL" | "VERTICAL"
}