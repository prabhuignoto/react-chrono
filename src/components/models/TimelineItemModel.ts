export interface TimelineItemModel {
  contentText: string;
  position?: string;
  title: string;
  id?: string;
  active?: boolean;
}

export interface TimelineItemViewModel extends TimelineItemModel {
  onClick: (id?: string) => void;
  scroll: ({ circleOffset, circleWidth }: { circleOffset: number, circleWidth: number }) => void;
}