export interface TimelineControlModel {
  onNext: () => void;
  onPrevious: () => void;
  disableLeft: boolean;
  disableRight: boolean;
}