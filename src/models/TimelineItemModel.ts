import { ReactNode } from 'react';
import { Theme } from './Theme';
import { Scroll } from './TimelineHorizontalModel';
import { Media } from './TimelineMediaModel';
import { TimelineProps } from './TimelineModel';

/**
 * Represents the model for a timeline item.
 */
export interface TimelineItemModel {
  // Internal property for handling date.
  _dayjs?: any;

  // Indicates if the timeline item is active.
  active?: boolean;

  // Detailed text for the timeline card.
  cardDetailedText?: string | string[];

  // Subtitle for the timeline card.
  cardSubtitle?: string;

  // Title for the timeline card.
  cardTitle?: string;

  // Main content of the timeline item.
  content?: ReactNode | ReactNode[];

  // Date associated with the timeline item.
  date?: number | string | Date;

  // Unique identifier for the timeline item.
  id?: string;

  // Indicates if the timeline item is nested.
  isNested?: boolean;

  // Array of nested timeline items.
  items?: TimelineItemModel[];

  // Media associated with the timeline item.
  media?: Media;

  // Position of the timeline item.
  position?: string;

  // Custom content for the timeline content.
  timelineContent?: ReactNode;

  // Title of the timeline item.
  title?: string;

  // URL associated with the timeline item.
  url?: string;

  // Indicates if the timeline item is visible.
  visible?: boolean;
}

/**
 * Represents the model for a timeline card.
 */
export type TimelineCardModel = Pick<
  TimelineItemModel,
  | 'id'
  | 'visible'
  | 'title'
  | 'active'
  | 'cardDetailedText'
  | 'cardSubtitle'
  | 'cardTitle'
  | 'media'
  | 'url'
  | 'timelineContent'
  | 'isNested'
  | 'items'
> & {
  // Function for auto-scrolling.
  autoScroll?: ({
    pointOffset,
    pointWidth,
    timelinePointHeight,
    contentHeight,
  }: Partial<Scroll>) => void;

  // Custom content for the timeline card.
  customContent?: React.ReactNode | React.ReactNode[];

  // Indicates if the timeline card has focus.
  hasFocus?: boolean;

  // Icon element for the timeline card.
  iconChild?: React.ReactNode;

  // Click event handler for the timeline card.
  onClick?: (id?: string) => void;

  // Elapsed event handler for the timeline card.
  onElapsed?: (id?: string) => void;

  // Duration of slide item transitions.
  slideItemDuration?: number;

  // Indicates if the slide show is running.
  slideShowRunning?: boolean;

  // Theme to be applied to the timeline card.
  theme?: Theme;

  // Unique identifier for the timeline wrapper.
  wrapperId: string;
} & Pick<TimelineProps, 'cardHeight' | 'cardWidth' | 'nestedCardHeight'>;
