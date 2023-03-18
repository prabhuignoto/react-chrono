export interface TimelineControlModel {
  activeTimelineItem?: number;
  disableLeft: boolean;
  disableRight: boolean;
  id?: string;
  isDark?: boolean;
  onFirst: () => void;
  onLast: () => void;
  onNext: () => void;
  onPaused?: () => void;
  onPrevious: () => void;
  onReplay?: () => void;
  onToggleDarkMode?: () => void;
  slideShowEnabled?: boolean;
  slideShowRunning?: boolean;
}
