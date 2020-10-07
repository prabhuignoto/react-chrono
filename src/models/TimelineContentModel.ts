import { Mode } from "fs";
import { Media } from "./TimelineItemMedia";
import { Theme } from "./TimelineTreeModel";

export interface TimelineContentModel {
  active?: boolean;
  content: string;
  detailedText?: string;
  onShowMore: () => void;
  slideShowActive?: boolean;
  theme?: Theme;
  title?: string;
  media?: Media;
  mode?: "VERTICAL" | "HORIZONTAL" | "TREE";
}