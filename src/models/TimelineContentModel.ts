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
  onElapsed: (id?: string) => void;
  slideShowActive?: boolean;
  slideItemDuration?: number;
  theme?: Theme;
  title?: string;
  branchDir?: string;
}