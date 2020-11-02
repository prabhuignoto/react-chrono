import { Theme } from './Theme';
import { Scroll } from './TimelineHorizontalModel';
import { TimelineCardModel } from './TimelineItemModel';
import { Media } from './TimelineMediaModel';
import { TimelineMode } from './TimelineModel';

interface CommonPropsModel {
  /**
   * prop that alternates the timeline card. used for tree mode.
   *
   * @type {boolean}
   * @memberof CommonPropsModel
   */
  alternateCards?: boolean;

  /**
   * configures the height of the timeline card
   *
   * @type {number}
   * @memberof CommonPropsModel
   */
  cardHeight?: number;

  /**
   * Timeline Mode (Horizontal, Vertical or Tree)
   *
   * @type {TimelineMode}
   * @memberof CommonPropsModel
   */
  mode?: TimelineMode;

  /**
   * handles the click on the timeline card
   *
   * @memberof CommonPropsModel
   */
  onClick: (id?: string) => void;

  /**
   * callback thats get called when the timer elapses for a timeline card
   *
   * @memberof CommonPropsModel
   */
  onElapsed?: (id?: string) => void;

  /**
   *
   *
   * @type {number}
   * @memberof CommonPropsModel
   */
  slideItemDuration?: number;

  /**
   * Indicates whether the slideshow is active or not
   *
   * @type {boolean}
   * @memberof CommonPropsModel
   */
  slideShowRunning?: boolean;

  /**
   * theme
   *
   * @type {Theme}
   * @memberof CommonPropsModel
   */
  theme?: Theme;
}

interface CommonBranchAndLeafModel extends CommonPropsModel {
  active?: boolean;
  className: string;
  id?: string;
}

export interface VerticalCircleModel extends CommonBranchAndLeafModel {
  onActive: (timelinePointOffset: number) => void;
}

export interface VerticalItemModel extends CommonBranchAndLeafModel {
  cardDetailedText?: string;
  cardSubtitle: string;
  cardTitle?: string;
  index: number;
  media?: Media;
  onShowMore?: () => void;
  title: string;
  visible?: boolean;
  onActive: (
    timelinePointOffset: number,
    timelineContentHeight: number,
    timelineContentOffset: number,
  ) => void;
}

export interface TimelineVerticalModel extends CommonPropsModel {
  activeTimelineItem: number;
  autoScroll: (s: Partial<Scroll>) => void;
  items: TimelineCardModel[];
}
