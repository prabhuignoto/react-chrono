import { ReactNode } from 'react';
import { Theme } from '@models/Theme';
import { ToolbarItem } from './ToolbarItem';

export type ToolbarProps = {
  /**
   * Child nodes to be rendered within the toolbar.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Array of toolbar items to be displayed.
   */
  items?: ToolbarItem[];
  /**
   * Theme settings for the toolbar.
   */
  theme: Theme;
};
