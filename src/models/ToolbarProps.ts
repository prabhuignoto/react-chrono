import { ReactNode, CSSProperties, HTMLAttributes } from 'react';
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
  /**
   * Opt-in to Vanilla Extract toolbar styles. Defaults to false to preserve styled-components.
   */
  useVeStyles?: boolean;
  /**
   * Custom CSS styles to apply to the toolbar.
   */
  style?: CSSProperties;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'>;
