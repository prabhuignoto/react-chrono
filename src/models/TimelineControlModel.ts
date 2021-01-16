import { Theme } from './Theme';
export interface TimelineControlModel {
  disableLeft: boolean;
  disableRight: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onFirst: () => void;
  onLast: () => void;
  theme?: Theme;
  slideShowEnabled?: boolean;
  slideShowRunning?: boolean;
  onReplay?: () => void;
  id?: string;
}
