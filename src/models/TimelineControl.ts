import { TimelineMode } from "./TimelineModel";

export interface TimelineControlModel {
  disableLeft: boolean;
  disableRight: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onFirst: () => void;
  onLast: () => void;
  mode?: TimelineMode;
}