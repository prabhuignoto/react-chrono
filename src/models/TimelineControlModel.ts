export interface TimelineControlModel {
  activeTimelineItem?: number;
  disableLeft: boolean;
  disableRight: boolean;
  id?: string;
  onFirst: () => void;
  onLast: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onReplay?: () => void;
  slideShowEnabled?: boolean;
  slideShowRunning?: boolean;
}
