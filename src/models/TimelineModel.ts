import { Theme } from './Theme';
import { TimelineItemModel } from './TimelineItemModel';

/**
 * model internally used by the component
 *
 * @export
 * @interface TimelineModel
 * @extends {TimelineProps}
 */
export interface TimelineModel extends TimelineProps {
  activeTimelineItem: number;
  contentDetailsChildren?: React.ReactNode | React.ReactNode[];
  iconChildren?: React.ReactNode | React.ReactNode[];
  onFirst: () => void;
  onLast: () => void;
  onNext: () => void;
  onOutlineSelection: (index: number) => void;
  onPrevious: () => void;
  onTimelineUpdated: (id: number) => void;
  slideItemDuration?: number;
  slideShowEnabled?: boolean;
  slideShowRunning?: boolean;
}

/**
 * Main props used by the host app.
 *
 * @export
 * @interface TimelineProps
 */
export interface TimelineProps {
  activeItemIndex?: number;
  allowDynamicUpdate?: boolean;
  borderLessCards?: boolean;
  cardHeight?: number;
  cardPositionHorizontal?: 'TOP' | 'BOTTOM';
  cardWidth?: number;
  children?: React.ReactElement | React.ReactElement[];
  disableAutoScrollOnClick?: boolean;
  disableClickOnCircle?: boolean;
  disableNavOnKey?: boolean;
  enableOutline?: boolean;
  flipLayout?: boolean;
  hideControls?: boolean;
  itemWidth?: number;
  items?: TimelineItemModel[];
  lineWidth?: number;
  mode?: TimelineMode;
  onItemSelected?: (data: TimelineItemModel) => void;
  onRestartSlideshow?: () => void;
  onScrollEnd?: () => void;
  scrollable?: boolean | { scrollbar: boolean };
  slideItemDuration?: number;
  slideShow?: boolean;
  theme?: Theme;
  timelineCircleDimension?: number;
  useReadMore?: boolean;
}

export type TimelineMode = 'VERTICAL' | 'HORIZONTAL' | 'VERTICAL_ALTERNATING';
