import { ReactNode } from 'react';
import { Theme } from './Theme';
import { TimelineCardModel } from './TimelineItemModel';
import { TimelineMode } from './TimelineModel';

export interface TimelineHorizontalModel {
  autoScroll: (t: Partial<Scroll>) => void;
  handleItemClick: (id?: string) => void;
  activeTimelineItem: number;
  itemWidth?: number;
  items: TimelineCardModel[];
  mode?: TimelineMode;
  slideShowRunning?: boolean;
  theme?: Theme;
  wrapperId: string;
  onElapsed?: (id?: string) => void;
  contentDetailsChildren?: ReactNode | ReactNode[];
  iconChildren?: ReactNode;
  hasFocus?: boolean;
}

export interface HorizontalCircleModel {
  active?: boolean;
  slideShowRunning?: boolean;
  theme?: Theme;
  id?: string;
  onClick: (id?: string) => void;
  onActive: (pointOffset: number) => void;
  iconChild?: React.ReactNode;
}

export interface Scroll {
  /**
   * Height of the Timeline card content
   *
   * @type {number}
   * @memberof Scroll
   */
  contentHeight: number;

  /**
   * Offset of the Content card
   *
   * @type {number}
   * @memberof Scroll
   */
  contentOffset: number;

  /**
   * Height of the timeline point
   *
   * @type {number}
   * @memberof Scroll
   */
  timelinePointHeight: number;

  /**
   * Offset of the timeline point
   *
   * @type {number}
   * @memberof Scroll
   */
  pointOffset: number;

  /**
   * Width of the timeline point
   *
   * @type {number}
   * @memberof Scroll
   */
  pointWidth: number;
}
