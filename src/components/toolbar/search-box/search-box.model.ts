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

  /**
   * Minimum number of characters required to trigger search
   */
  minimumSearchLength?: number;

  /**
   * Properties to search within each timeline item
   */
  searchKeys?: ('title' | 'cardTitle' | 'cardSubtitle' | 'cardDetailedText')[];

  /**
   * Time in milliseconds to wait before triggering search after typing
   */
  debounceTime?: number;

  /**
   * Whether to highlight matching text in search results
   */
  highlightResults?: boolean;

  /**
   * Whether to enable navigation between search results
   */
  navigateResults?: boolean;
}
