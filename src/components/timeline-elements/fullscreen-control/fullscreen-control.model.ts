import { RefObject, ButtonHTMLAttributes } from 'react';
import { Theme } from '@models/Theme';
import { FullscreenButtonSize } from '../fullscreen-button/fullscreen-button.model';

/**
 * Props interface for the FullscreenControl component
 * Combines fullscreen functionality with button presentation
 */
export interface FullscreenControlProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onClick' | 'onKeyDown' | 'onError'
  > {
  /**
   * Reference to the element that should be made fullscreen
   */
  targetRef: RefObject<HTMLElement>;

  /**
   * Theme configuration for styling
   */
  theme: Theme;

  /**
   * Callback function triggered when entering fullscreen mode
   */
  onEnterFullscreen?: () => void;

  /**
   * Callback function triggered when exiting fullscreen mode
   */
  onExitFullscreen?: () => void;

  /**
   * Callback function triggered when an error occurs
   * @param error - Error message describing what went wrong
   */
  onError?: (error: string) => void;

  /**
   * Size variant of the button
   * @default 'medium'
   */
  size?: FullscreenButtonSize;

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom CSS class name
   */
  className?: string;

  /**
   * Custom aria-label for accessibility
   * If not provided, defaults to appropriate fullscreen action
   */
  ariaLabel?: string;

  /**
   * Custom title attribute for tooltip
   * If not provided, defaults to appropriate fullscreen action with keyboard hint
   */
  title?: string;

  /**
   * Test ID for testing purposes
   * @default 'fullscreen-control'
   */
  testId?: string;
}
