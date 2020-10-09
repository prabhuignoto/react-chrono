import { TimelineMode } from "./TimelineModel";
import { Theme } from "./TimelineTreeModel";

export interface TimelineControlModel {
  disableLeft: boolean;
  disableRight: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onFirst: () => void;
  onLast: () => void;
  mode?: TimelineMode;
  theme?: Theme;
  slideShowEnabled?: boolean;
  slideShowRunning?: boolean;
  onReplay?: () => void;
}