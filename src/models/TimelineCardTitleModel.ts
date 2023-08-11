import { Theme } from './Theme';

/**
 * Represents the model for a title element.
 */
export interface TitleModel {
  // Indicates if the title is active.
  active?: boolean;

  // Alignment of the title (left or right).
  align?: 'left' | 'right';

  // Additional CSS class string for styling.
  classString?: string;

  // Theme to be applied to the title element.
  theme?: Theme;

  // Text content of the title.
  title?: string;
}
