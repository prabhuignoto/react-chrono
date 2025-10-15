import { TimelineControlModel } from '@models/TimelineControlModel';
import cls from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { useTimelineContext } from '../../contexts';
import { MoonIcon, StopIcon, SunIcon } from '../../icons';
import ChevronLeft from '../../icons/chev-left';
import ChevronRightIcon from '../../icons/chev-right';
import ChevronsLeftIcon from '../../icons/chevs-left';
import ChevronsRightIcon from '../../icons/chevs-right';
import ReplayIcon from '../../icons/replay-icon';
import {
  navButton,
  navButtonActive,
  navButtonFocus,
  navButtonHover,
  navItem,
  navItemDisabled,
  navWrapper,
  srOnly,
  timelineControlContainer,
  navButtonSvg,
} from './timeline-control.css';

/**
 * TimelineControl component
 * Provides navigation controls for a timeline, including next, previous, first, last, and slideshow buttons.
 * Optionally supports flipping the layout and dark mode toggle.
 *
 * @property {function} onNext - Function to go to the next item.
 * @property {function} onPrevious - Function to go to the previous item.
 * @property {function} onFirst - Function to jump to the first item.
 * @property {function} onLast - Function to jump to the last item.
 * @property {boolean} disableLeft - Whether to disable the left navigation buttons.
 * @property {boolean} disableRight - Whether to disable the right navigation buttons.
 * @property {boolean} slideShowRunning - Whether the slideshow is currently running.
 * @property {function} onReplay - Function to restart the slideshow.
 * @property {boolean} slideShowEnabled - Whether the slideshow feature is enabled.
 * @property {function} onToggleDarkMode - Function to toggle dark mode (if enabled).
 * @property {boolean} isDark - Whether dark mode is currently active.
 * @property {function} onPaused - Function to pause the slideshow (if running).
 * @returns {JSX.Element} The TimelineControl component.
 */
const Controls: React.FunctionComponent<TimelineControlModel> = ({
  onNext,
  onPrevious,
  onFirst,
  onLast,
  disableLeft,
  disableRight,
  slideShowRunning,
  onReplay,
  slideShowEnabled,
  onToggleDarkMode,
  isDark,
  onPaused,
  activeTimelineItem = 0,
  totalItems = 0,
}: TimelineControlModel) => {
  // Use unified context
  const {
    theme,
    mode,
    flipLayout,
    disableInteraction,
    buttonTexts,
    classNames,
    enableDarkToggle,
    isDarkMode,
  } = useTimelineContext();

  // Remove icon rotation in non-horizontal modes for consistent UX
  const rotate = false;

  const flippedHorizontally = useMemo(
    () => flipLayout && mode === 'HORIZONTAL',
    [flipLayout, mode],
  );

  const canDisableLeft = useMemo(
    () => disableLeft || slideShowRunning,
    [disableLeft, slideShowRunning],
  );

  const canDisableRight = useMemo(
    () => disableRight || slideShowRunning,
    [disableRight, slideShowRunning],
  );

  const handlePause = useCallback(() => {
    onPaused?.();
  }, [onPaused]);

  const handlePlay = useCallback(() => {
    onReplay?.();
  }, [onReplay]);

  const previousTitle = useMemo(
    () => (flipLayout ? buttonTexts?.next : buttonTexts?.previous),
    [flipLayout, buttonTexts?.next, buttonTexts?.previous],
  );

  const nextTitle = useMemo(
    () => (flipLayout ? buttonTexts?.previous : buttonTexts?.next),
    [flipLayout, buttonTexts?.previous, buttonTexts?.next],
  );

  const playOrPauseTile = useMemo(
    () => (slideShowRunning ? buttonTexts?.stop : buttonTexts?.play),
    [slideShowRunning, buttonTexts?.stop, buttonTexts?.play],
  );

  const jumpToLastTitle = useMemo(
    () => (flipLayout ? buttonTexts?.first : buttonTexts?.last),
    [flipLayout, buttonTexts?.first, buttonTexts?.last],
  );

  const jumpToFirstTitle = useMemo(
    () => (flipLayout ? buttonTexts?.last : buttonTexts?.first),
    [flipLayout, buttonTexts?.last, buttonTexts?.first],
  );

  // Create a message about current position for screen readers
  const positionStatus = useMemo(() => {
    return '';
  }, []);

  // Create a message about slideshow status for screen readers
  const slideshowStatus = useMemo(() => '', []);

  return (
    <div className={timelineControlContainer} key="control-wrapper">
      {/* Visually hidden status information for screen readers */}
      <output className={srOnly} aria-live="polite">
        {positionStatus}
        {slideshowStatus && ` ${slideshowStatus}`}
      </output>

      <div
        className={cls(navWrapper, 'timeline-controls', classNames?.controls)}
        aria-label="Timeline Navigation"
        role="toolbar"
      >
        {/* jump to first */}
        {disableInteraction ? null : (
          <>
            <div
              className={cls(navItem, { [navItemDisabled]: canDisableLeft })}
            >
              <button
                className={cls(
                  navButton,
                  navButtonHover,
                  navButtonActive,
                  navButtonFocus,
                )}
                onClick={flippedHorizontally ? onLast : onFirst}
                title={jumpToFirstTitle}
                aria-label={jumpToFirstTitle}
                aria-disabled={disableLeft}
                aria-controls="timeline-main-wrapper"
                tabIndex={!disableLeft ? 0 : -1}
                data-test-id="jump-to-first"
              >
                <span className={navButtonSvg}>
                  <ChevronsLeftIcon />
                </span>
              </button>
            </div>

            {/* previous */}
            <div
              className={cls(navItem, { [navItemDisabled]: canDisableLeft })}
            >
              <button
                className={cls(
                  navButton,
                  navButtonHover,
                  navButtonActive,
                  navButtonFocus,
                )}
                onClick={flippedHorizontally ? onNext : onPrevious}
                title={previousTitle}
                aria-label={previousTitle}
                aria-disabled={disableLeft}
                aria-controls="timeline-main-wrapper"
                tabIndex={!disableLeft ? 0 : -1}
                data-test-id="previous"
              >
                <span className={navButtonSvg}>
                  <ChevronLeft />
                </span>
              </button>
            </div>

            {/* next */}
            <div
              className={cls(navItem, { [navItemDisabled]: canDisableRight })}
            >
              <button
                className={cls(
                  navButton,
                  navButtonHover,
                  navButtonActive,
                  navButtonFocus,
                )}
                onClick={flippedHorizontally ? onPrevious : onNext}
                title={nextTitle}
                aria-label={nextTitle}
                aria-disabled={disableRight}
                aria-controls="timeline-main-wrapper"
                tabIndex={!disableRight ? 0 : -1}
                data-test-id="next"
              >
                <span className={navButtonSvg}>
                  <ChevronRightIcon />
                </span>
              </button>
            </div>

            {/* jump to last */}
            <div
              className={cls(navItem, { [navItemDisabled]: canDisableRight })}
            >
              <button
                className={cls(
                  navButton,
                  navButtonHover,
                  navButtonActive,
                  navButtonFocus,
                )}
                onClick={flippedHorizontally ? onFirst : onLast}
                title={jumpToLastTitle}
                aria-label={jumpToLastTitle}
                aria-disabled={disableRight}
                aria-controls="timeline-main-wrapper"
                tabIndex={!disableRight ? 0 : -1}
                data-test-id="jump-to-last"
              >
                <span className={navButtonSvg}>
                  <ChevronsRightIcon />
                </span>
              </button>
            </div>
          </>
        )}

        {/* slideshow button */}
        <div className={navItem}>
          {slideShowEnabled && (
            <button
              className={cls(
                navButton,
                navButtonHover,
                navButtonActive,
                navButtonFocus,
              )}
              onClick={slideShowRunning ? handlePause : handlePlay}
              title={playOrPauseTile}
              tabIndex={0}
              aria-controls="timeline-main-wrapper"
              aria-label={playOrPauseTile}
              aria-pressed={slideShowRunning ? 'true' : 'false'}
              data-test-id="play-pause"
            >
              <span className={navButtonSvg}>
                {slideShowRunning ? <StopIcon /> : <ReplayIcon />}
              </span>
            </button>
          )}
        </div>

        {/* dark toggle button */}
        {enableDarkToggle ? (
          <div
            className={cls(navItem, { [navItemDisabled]: slideShowRunning })}
          >
            <button
              className={cls(
                navButton,
                navButtonHover,
                navButtonActive,
                navButtonFocus,
              )}
              onClick={onToggleDarkMode}
              title={isDark ? buttonTexts?.light : buttonTexts?.dark}
              tabIndex={0}
              aria-controls="timeline-main-wrapper"
              aria-label={isDark ? buttonTexts?.light : buttonTexts?.dark}
              aria-pressed={isDark ? 'true' : 'false'}
              data-test-id="dark-toggle"
            >
              <span className={navButtonSvg}>
                {isDark ? <SunIcon /> : <MoonIcon />}
              </span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

Controls.displayName = 'Timeline Control';

export default Controls;
