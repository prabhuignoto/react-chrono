import { ReactNode, ButtonHTMLAttributes } from 'react';
import { Theme } from '@models/Theme';

/**
 * Size variants for the fullscreen button
 */
export type FullscreenButtonSize = 'small' | 'medium' | 'large';

/**
 * Props interface for the FullscreenButton component
 * Extends standard HTML button attributes for maximum flexibility
 */
export interface FullscreenButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onClick' | 'onKeyDown'
  > {
  /**
   * Whether the element is currently in fullscreen mode
   * @default false
   */
  isFullscreen?: boolean;

  /**
   * Callback function triggered when the fullscreen state should toggle
   */
  onToggle?: () => void;

  /**
   * Theme configuration for styling
   */
  theme: Theme;

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Size variant of the button
   * @default 'medium'
   */
  size?: FullscreenButtonSize;

  /**
   * Custom CSS class name
   */
  className?: string;

  /**
   * Custom aria-label for accessibility
   * If not provided, defaults to "Enter fullscreen" or "Exit fullscreen"
   */
  ariaLabel?: string;

  /**
   * Custom title attribute for tooltip
   * If not provided, defaults to appropriate fullscreen action with keyboard hint
   */
  title?: string;

  /**
   * Test ID for testing purposes
   * @default 'fullscreen-button'
   */
  testId?: string;

  /**
   * Custom children to override default icons
   * If not provided, will use MaximizeIcon or MinimizeIcon based on isFullscreen
   */
  children?: ReactNode;
}

/**
 * Styled component props for internal use
 */
export interface FullscreenButtonStyleProps {
  theme: Theme;
  $size: FullscreenButtonSize;
  $isFullscreen: boolean;
}
