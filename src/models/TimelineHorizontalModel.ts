import { ReactNode } from 'react';
// import { Theme } from './Theme';
import { TimelineCardModel } from './TimelineItemModel';
import { TimelineMode } from './TimelineModel';

/**
 * Represents the model for a horizontal timeline.
 */
export interface TimelineHorizontalModel {
  // Function to trigger auto-scrolling.
  autoScroll: (t: Partial<Scroll>) => void;

  // Children elements for the content details.
  contentDetailsChildren?: ReactNode | ReactNode[];

  // Click event handler for timeline item click.
  handleItemClick: (id?: string) => void;

  // Indicates if the timeline has focus.
  hasFocus?: boolean;

  // Children elements for icons.
  iconChildren?: ReactNode;

  // Indicates if the timeline is nested.
  isNested?: boolean;

  // Width of each timeline item.
  itemWidth?: number;

  // Array of timeline card models.
  items: TimelineCardModel[];

  // Mode of the timeline (horizontal or vertical).
  mode?: TimelineMode;

  // Height of nested card within the timeline item.
  nestedCardHeight?: number;

  // Elapsed event handler for timeline items.
  onElapsed?: (id?: string) => void;

  // Indicates if the slide show is running.
  slideShowRunning?: boolean;

  // Unique identifier for the timeline wrapper.
  wrapperId: string;
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

  /**
   * Height of the timeline point
   *
   * @type {number}
   * @memberof Scroll
   */
  timelinePointHeight: number;
}
