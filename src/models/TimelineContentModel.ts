import { ReactNode } from 'react';
import { Theme } from './Theme';
import { TimelineItemModel } from './TimelineItemModel';
import { Media } from './TimelineMediaModel';

/**
 * Represents the model for timeline content.
 */
export type TimelineContentModel = {
  // Indicates if the content is active.
  active?: boolean;

  // Directory for branch-related content.
  branchDir?: string;

  // Main content of the timeline item.
  content?: string | ReactNode;

  // Custom content for the timeline item.
  customContent?: React.ReactNode;

  // Detailed text for the timeline item.
  detailedText?: string | string[];

  // Indicates if the timeline item should be flipped.
  flip?: boolean;

  // Indicates if the timeline item has focus.
  hasFocus?: boolean;

  // Unique identifier for the timeline item.
  id?: string;

  // Indicates if the timeline item is nested.
  isNested?: boolean;

  // Array of timeline items nested within this item.
  items?: TimelineItemModel[];

  // Media associated with the timeline item.
  media?: Media;

  // Height of nested card within the item.
  nestedCardHeight?: number;

  // Click event handler for the timeline item.
  onClick?: (id: string) => void;

  // Elapsed event handler for the timeline item.
  onElapsed?: (id?: string) => void;

  // Show more event handler for the timeline item.
  onShowMore: () => void;

  // Indicates if slide show is active.
  slideShowActive?: boolean;

  // Theme to be applied to the timeline item.
  theme?: Theme;

  // Custom content for the entire timeline content.
  timelineContent?: React.ReactNode;

  // Title of the timeline item.
  title?: string;

  // URL associated with the timeline item.
  url?: string;

  // Class applied to title, if title is URL
  urlClassName: string
};
