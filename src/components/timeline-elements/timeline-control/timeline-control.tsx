import { TimelineControlModel } from '@models/TimelineControlModel';
import cls from 'classnames';
import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { useTimelineContext } from '../../contexts';
import { useAriaLiveRegion } from '../../../hooks';
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
  activeTimelineItem,
  totalItems,
}: TimelineControlModel) => {
  // Use unified context
  const {
    mode,
    flipLayout,
    disableInteraction,
    buttonTexts,
    classNames,
    enableDarkToggle,
  } = useTimelineContext();

  // Use ARIA live region for screen reader announcements (WCAG 4.1.3)
  const { announce, LiveRegion } = useAriaLiveRegion({
    politeness: 'polite',
  });

  // Create button refs for roving tabindex
  const buttonRefsMap = useRef<Map<string, React.RefObject<HTMLButtonElement>>>(
    new Map(),
  );

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

  // WCAG 2.4.3: Focus Order - Sequential tab navigation
  // All buttons are tabbable in order, disabled buttons are skipped by browser

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

  // Announce position changes to screen readers (WCAG 4.1.3)
  useEffect(() => {
    if (
      activeTimelineItem !== undefined &&
      totalItems !== undefined &&
      totalItems > 0
    ) {
      const current = activeTimelineItem + 1;
      announce(`Item ${current} of ${totalItems}`);
    }
  }, [activeTimelineItem, totalItems, announce]);

  // Announce slideshow status changes to screen readers
  useEffect(() => {
    if (slideShowRunning) {
      announce('Slideshow is running');
    }
  }, [slideShowRunning, announce]);

  return (
    <div className={timelineControlContainer} key="control-wrapper">
      {/* ARIA live region for screen reader announcements */}
      <LiveRegion />

      <div
        className={cls(navWrapper, 'timeline-controls', classNames?.controls)}
        aria-label="Timeline navigation controls"
        role="toolbar"
      >
        {/* Navigation group: First, Previous, Next, Last */}
        {disableInteraction ? null : (
          <div role="group" aria-label="Item navigation" style={{display: "flex"}}>
            {/* jump to first */}
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
                aria-controls="timeline-main-wrapper"
                disabled={!!canDisableLeft}
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
                aria-controls="timeline-main-wrapper"
                disabled={!!canDisableLeft}
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
                aria-controls="timeline-main-wrapper"
                disabled={!!canDisableRight}
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
                aria-controls="timeline-main-wrapper"
                disabled={!!canDisableRight}
                data-test-id="jump-to-last"
              >
                <span className={navButtonSvg}>
                  <ChevronsRightIcon />
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Slideshow control group */}
        {slideShowEnabled && (
          <div role="group" aria-label="Slideshow controls">
            <div className={navItem}>
              <button
                className={cls(
                  navButton,
                  navButtonHover,
                  navButtonActive,
                  navButtonFocus,
                )}
                onClick={slideShowRunning ? handlePause : handlePlay}
                title={playOrPauseTile}
                aria-controls="timeline-main-wrapper"
                aria-label={playOrPauseTile}
                aria-pressed={slideShowRunning ? 'true' : 'false'}
                data-test-id="play-pause"
              >
                <span className={navButtonSvg}>
                  {slideShowRunning ? <StopIcon /> : <ReplayIcon />}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Theme control group */}
        {enableDarkToggle ? (
          <div role="group" aria-label="Theme controls">
            <div
              className={cls(navItem, {
                [navItemDisabled]: slideShowRunning,
              })}
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
                aria-controls="timeline-main-wrapper"
                aria-label={isDark ? buttonTexts?.light : buttonTexts?.dark}
                aria-pressed={isDark ? 'true' : 'false'}
                disabled={!!slideShowRunning}
                data-test-id="dark-toggle"
              >
                <span className={navButtonSvg}>
                  {isDark ? <SunIcon /> : <MoonIcon />}
                </span>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

Controls.displayName = 'Timeline Control';

export default Controls;
