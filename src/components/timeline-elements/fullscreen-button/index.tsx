import React, { forwardRef, memo } from 'react';
import { MaximizeIcon, MinimizeIcon } from '../../icons';
import { FullscreenButtonProps } from './fullscreen-button.model';
import { fullscreenButton } from './fullscreen-button.css';

/**
 * FullscreenButton Component
 *
 * A reusable button component for toggling fullscreen mode with proper accessibility
 * and theming support. Switches between maximize and minimize icons based on state.
 *
 * @component
 * @example
 * ```tsx
 * <FullscreenButton
 *   isFullscreen={false}
 *   onToggle={() => toggleFullscreen()}
 *   theme={theme}
 *   disabled={false}
 *   size="medium"
 * />
 * ```
 */
const FullscreenButton = memo(
  forwardRef<HTMLButtonElement, FullscreenButtonProps>(
    (
      {
        isFullscreen = false,
        onToggle,
        theme,
        disabled = false,
        size = 'medium',
        className,
        ariaLabel,
        title,
        testId = 'fullscreen-button',
        children,
        ...rest
      },
      ref,
    ) => {
      // Determine button content and labels
      const defaultAriaLabel = isFullscreen
        ? 'Exit fullscreen'
        : 'Enter fullscreen';
      const defaultTitle = isFullscreen
        ? 'Exit Fullscreen (Esc)'
        : 'Enter Fullscreen';

      const buttonAriaLabel = ariaLabel || defaultAriaLabel;
      const buttonTitle = title || defaultTitle;

      // Handle button click
      const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (!disabled) {
          onToggle?.();
        }
      };

      // Handle keyboard interaction
      const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
          event.preventDefault();
          onToggle?.();
        }
      };

      const classNameComputed = fullscreenButton({
        size,
        isFullscreen: isFullscreen ? 'true' : 'false',
      } as any);

      return (
        <button
          ref={ref}
          className={`${className ?? ''} ${classNameComputed}`}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label={buttonAriaLabel}
          title={buttonTitle}
          data-testid={testId}
          type="button"
          role="button"
          {...rest}
        >
          {children || (isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />)}
        </button>
      );
    },
  ),
);

FullscreenButton.displayName = 'FullscreenButton';

export { FullscreenButton };
export type { FullscreenButtonProps };
