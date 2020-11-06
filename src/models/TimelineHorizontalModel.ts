import { ReactNode } from 'react';
import { Theme } from './Theme';
import { TimelineCardModel } from './TimelineItemModel';
import { TimelineMode } from './TimelineModel';

export interface TimelineHorizontalModel {
  autoScroll: (t: Partial<Scroll>) => void;
  handleItemClick: (id?: string) => void;
  itemWidth: number;
  items: TimelineCardModel[];
  mode: TimelineMode;
  slideShowRunning?: boolean;
  theme?: Theme;
  wrapperId: string;
  cardHeight?: number;
  onElapsed?: (id?: string) => void;
  slideItemDuration?: number;
  contentDetailsChildren?: ReactNode | ReactNode[];
  hasFocus?: boolean;
}

export interface Scroll {
  /**
   * Height of the Timeline card content
   *
   * @type {number}
   * @memberof Scroll
   */
  timelineContentHeight: number;

  /**
   * Offset of the Content card
   *
   * @type {number}
   * @memberof Scroll
   */
  timelineContentOffset: number;

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
  timelinePointOffset: number;

  /**
   * Width of the timeline point
   *
   * @type {number}
   * @memberof Scroll
   */
  timelinePointWidth: number;
}
