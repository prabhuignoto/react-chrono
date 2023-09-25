import { Theme } from './Theme';
import { Scroll } from './TimelineHorizontalModel';
import { TimelineCardModel, TimelineItemModel } from './TimelineItemModel';
import { Media } from './TimelineMediaModel';
import { TimelineProps } from './TimelineModel';

/**
 * Represents the props for the timeline component.
 */
export type Props = Pick<
  TimelineProps,
  // List of properties inherited from TimelineProps:
  | 'flipLayout'
  | 'theme'
  | 'mode'
  | 'timelinePointDimension'
  | 'lineWidth'
  | 'cardHeight'
  | 'enableOutline'
  | 'disableClickOnCircle'
  | 'cardLess'
  | 'nestedCardHeight'
> & {
  // Indicates whether to show alternate cards.
  alternateCards?: boolean;

  // Indicates if the timeline has focus.
  hasFocus?: boolean;

  // Click event handler for timeline item click.
  onClick: (id?: string) => void;

  // Elapsed event handler for timeline items.
  onElapsed?: (id?: string) => void;

  // Duration for slide item transitions.
  slideItemDuration?: number;

  // Indicates if the slide show is running.
  slideShowRunning?: boolean;

  // Theme to be applied to the timeline component.
  theme?: Theme;
};

type VerticalModel = Pick<
  Props,
  | 'alternateCards'
  | 'hasFocus'
  | 'onClick'
  | 'onElapsed'
  | 'slideShowRunning'
  | 'mode'
  | 'timelinePointDimension'
  | 'lineWidth'
  | 'disableClickOnCircle'
  | 'cardLess'
  | 'nestedCardHeight'
> &
  Pick<
    TimelineItemModel,
    | 'cardDetailedText'
    | 'cardSubtitle'
    | 'cardTitle'
    | 'title'
    | 'url'
    | 'timelineContent'
    | 'items'
    | 'isNested'
  > & { active?: boolean; className: string; id?: string, urlClassName?: string };

/**
 * Represents the model for a vertical timeline point.
 */
export type TimelinePointModel = Omit<VerticalModel, 'timelineContent'> & {
  // Icon element associated with the timeline point.
  iconChild?: React.ReactNode;

  // Event handler for activating the timeline point.
  onActive: (pointOffset: number) => void;
};

/**
 * Represents the model for a vertical timeline item.
 */
export interface VerticalItemModel extends VerticalModel {
  // Children elements for content details.
  contentDetailsChildren?: React.ReactNode;

  // Icon element associated with the timeline item.
  iconChild?: React.ReactNode;

  // Index of the timeline item.
  index: number;

  // Nested timeline items.
  items?: TimelineItemModel[];

  // Media content associated with the timeline item.
  media?: Media;

  // Event handler for activating the timeline item.
  onActive: (
    pointOffset: number,
    contentHeight: number,
    contentOffset: number,
  ) => void;

  // Event handler for showing more content.
  onShowMore?: () => void;

  // Indicates if the timeline item is visible.
  visible?: boolean;
}

/**
 * Represents the model for a vertical timeline.
 */
export type TimelineVerticalModel = Pick<
  Props,
  // List of properties inherited from Props:
  | 'alternateCards'
  | 'enableOutline'
  | 'mode'
  | 'onClick'
  | 'onElapsed'
  | 'slideShowRunning'
  | 'theme'
  | 'hasFocus'
  | 'cardLess'
  | 'nestedCardHeight'
> & {
  // Index of the active timeline item.
  activeTimelineItem?: number;

  // Function for auto-scrolling the timeline.
  autoScroll: (s: Partial<Scroll>) => void;

  // Children nodes for the timeline.
  childrenNode?: React.ReactNode;

  // Children elements for content details.
  contentDetailsChildren?: React.ReactNode;

  // Children elements for icons.
  iconChildren?: React.ReactNode;

  // Array of timeline card models.
  items: TimelineCardModel[];

  // Event handler for selecting an outline item.
  onOutlineSelection?: (index: number) => void;
};
