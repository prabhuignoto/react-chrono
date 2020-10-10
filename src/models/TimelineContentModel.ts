import { Media } from "./TimelineItemMedia";
import { TimelineMode } from "./TimelineModel";
import { Theme } from "./TimelineTreeModel";

export interface TimelineContentModel {
  active?: boolean;
  cardHeight?: number;
  content: string;
  detailedText?: string;
  id?: string;
  media?: Media;
  mode?: TimelineMode;
  onClick?: (id: string) => void;
  onShowMore: () => void;
  slideShowActive?: boolean;
  theme?: Theme;
  title?: string;
}