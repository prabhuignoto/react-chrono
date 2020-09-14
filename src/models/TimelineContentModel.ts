import { Theme } from "./TimelineTreeModel";

export interface TimelineContentModel {
  active?: boolean;
  content: string;
  detailedText?: string;
  onShowMore: () => void;
  slideShowActive?: boolean;
  theme?: Theme;
  title?: string;
}