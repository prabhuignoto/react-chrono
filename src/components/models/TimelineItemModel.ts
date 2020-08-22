import { Scroll } from "./TimelineCollnModel";

export interface TimelineItemModel {
  active?: boolean;
  contentText: string;
  id?: string;
  position?: string;
  title: string;
  visible?: boolean;
}

export interface TimelineItemViewModel extends TimelineItemModel {
  mode: "HORIZONTAL" | "VERTICAL" | "TREE";
  onClick: (id?: string) => void;
  autoScroll: ({ circleOffset, circleWidth, circleHeight, contentHeight }: Partial<Scroll>) => void;
}