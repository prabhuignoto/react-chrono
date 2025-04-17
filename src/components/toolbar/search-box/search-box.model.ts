import { Theme } from '@models/Theme';
import { TimelineItemModel } from '@models/TimelineItemModel';

export interface SearchBoxProps {
  /**
   * Placeholder text for the search input
   */
  placeholder?: string;

  /**
   * Aria label for accessibility
   */
  ariaLabel?: string;

  /**
   * Theme for styling
   */
  theme: Theme;

  /**
   * Callback when a search match is activated
   */
  onActivateItem: (id: string) => void;

  /**
   * Items to search through
   */
  items: TimelineItemModel[];

  /**
   * Data test id for testing
   */
  dataTestId?: string;
}
