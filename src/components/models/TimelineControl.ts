export interface TimelineControlModel {
  onNext: () => void;
  onPrevious: () => void;
  disableLeftNav: boolean;
  disableRightNav: boolean;
}