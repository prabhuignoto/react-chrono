import { Theme } from "./TimelineTreeModel";

export interface TimelineContentModel {
  content: string;
  active?: boolean;
  title?: string;
  detailedText?: string;
  onShowMore: () => void;
  theme?: Theme;
  slideShowActive?: boolean;
}