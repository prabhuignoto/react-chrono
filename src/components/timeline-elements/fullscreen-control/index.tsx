import React, { forwardRef, memo, RefObject } from 'react';
import { useFullscreen } from '../../../hooks/useFullscreen';
import { FullscreenButton } from '../fullscreen-button';
import { FullscreenControlProps } from './fullscreen-control.model';
import { pickDefined } from '../../../utils/propUtils';

/**
 * FullscreenControl Component
 *
 * A high-level component that combines the fullscreen hook with the fullscreen button
 * to provide complete fullscreen functionality for any target element.
 *
 * @component
 * @example
 * ```tsx
 * const timelineRef = useRef<HTMLDivElement>(null);
 *
 * <FullscreenControl
 *   targetRef={timelineRef}
 *   theme={theme}
 *   onEnterFullscreen={() => console.log('Entered fullscreen')}
 *   onExitFullscreen={() => console.log('Exited fullscreen')}
 *   size="medium"
 * />
 * ```
 */
const FullscreenControl = memo(
  forwardRef<HTMLButtonElement, FullscreenControlProps>(
    (
      {
        targetRef,
        theme,
        onEnterFullscreen,
        onExitFullscreen,
        onError,
        size = 'medium',
        disabled = false,
        className,
        ariaLabel,
        title,
        testId = 'fullscreen-control',
        ...rest
      },
      ref,
    ) => {
      // Use the fullscreen hook
      const { isFullscreen, isSupported, toggleFullscreen, error } =
        useFullscreen(targetRef, {
          onEnter: onEnterFullscreen || (() => {}),
          onExit: onExitFullscreen || (() => {}),
          onError: onError || (() => {}),
        });

      // Don't render if fullscreen is not supported
      if (!isSupported) {
        return null;
      }

      return (
        <FullscreenButton
          {...rest}
          ref={ref}
          isFullscreen={isFullscreen}
          onToggle={() => {
            toggleFullscreen().catch((err) => {
              const errorMessage =
                err instanceof Error
                  ? err.message
                  : 'Fullscreen operation failed';
              onError?.(errorMessage);
            });
          }}
          theme={theme}
          disabled={disabled || !!error}
          size={size}
          testId={testId}
          {...pickDefined({
            className,
            ariaLabel,
          })}
          {...(title || error
            ? { title: title || `Fullscreen unavailable: ${error}` }
            : {})}
        />
      );
    },
  ),
);

FullscreenControl.displayName = 'FullscreenControl';

export { FullscreenControl };
export type { FullscreenControlProps };
