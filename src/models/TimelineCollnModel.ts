import { TimelineItemViewModel } from "./TimelineItemModel";
import { TimelineMode } from "./TimelineModel";
import { Theme } from "./TimelineTreeModel";

export interface TimelineCollectionModel {
  autoScroll: (t: Partial<Scroll>) => void;
  handleItemClick: (id?: string) => void;
  itemWidth: number;
  items: TimelineItemViewModel[];
  mode: TimelineMode;
  slideShowRunning?: boolean;
  theme?: Theme;
  wrapperId: string;
  cardHeight?: number;
  onMediaStateChange: (state: { id?: string; playing?: boolean; paused?: boolean }) => void;
  slideItemDuration?: number;
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
