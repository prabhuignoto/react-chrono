import { TimelineControlModel } from '@models/TimelineControlModel';
import cls from 'classnames';
import React, { useCallback, useContext, useMemo } from 'react';
import { GlobalContext } from '../../GlobalContext';
import { MoonIcon, StopIcon, SunIcon } from '../../icons';
import ChevronLeft from '../../icons/chev-left';
import ChevronRightIcon from '../../icons/chev-right';
import ChevronsLeftIcon from '../../icons/chevs-left';
import ChevronsRightIcon from '../../icons/chevs-right';
import ReplayIcon from '../../icons/replay-icon';
import {
  TimelineControlContainer,
  TimelineNavButton,
  TimelineNavItem,
  TimelineNavWrapper,
} from './timeline-control.styles';

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
const TimelineControl: React.FunctionComponent<TimelineControlModel> = ({
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
}: TimelineControlModel) => {
  const {
    mode,
    flipLayout,
    theme,
    buttonTexts,
    classNames,
    enableDarkToggle,
    disableInteraction,
  } = useContext(GlobalContext);

  const rotate = useMemo(() => mode !== 'HORIZONTAL', [mode]);

  const flippedHorizontally = useMemo(
    () => flipLayout && mode === 'HORIZONTAL',
    [],
  );

  const canDisableLeft = useMemo(
    () => disableLeft || slideShowRunning,
    [disableLeft, slideShowRunning],
  );

  const canDisableRight = useMemo(
    () => disableRight || slideShowRunning,
    [disableRight, slideShowRunning],
  );

  const handlePlayOrPause = useCallback(() => {
    if (slideShowRunning) {
      onPaused?.();
    } else {
      onReplay?.();
    }
  }, [slideShowRunning]);

  const previousTitle = useMemo(
    () => (flipLayout ? buttonTexts?.next : buttonTexts?.previous),
    [flipLayout],
  );

  const nextTitle = useMemo(
    () => (flipLayout ? buttonTexts?.previous : buttonTexts?.next),
    [flipLayout],
  );

  const playOrPauseTile = useMemo(
    () => (slideShowRunning ? buttonTexts?.stop : buttonTexts?.play),
    [slideShowRunning],
  );

  const jumpToLastTitle = useMemo(
    () => (flipLayout ? buttonTexts?.first : buttonTexts?.last),
    [flipLayout],
  );

  const jumpToFirstTitle = useMemo(
    () => (flipLayout ? buttonTexts?.last : buttonTexts?.first),
    [flipLayout],
  );

  return (
    <TimelineControlContainer>
      <TimelineNavWrapper
        className={cls('timeline-controls', classNames?.controls)}
      >
        {/* jump to first */}
        {disableInteraction ? null : (
          <>
            <TimelineNavItem $disable={canDisableLeft}>
              <TimelineNavButton
                mode={mode}
                theme={theme}
                onClick={flippedHorizontally ? onLast : onFirst}
                title={jumpToFirstTitle}
                aria-label={jumpToFirstTitle}
                aria-disabled={disableLeft}
                aria-controls="timeline-main-wrapper"
                tabIndex={!disableLeft ? 0 : -1}
                rotate={rotate ? 'TRUE' : 'FALSE'}
              >
                <ChevronsLeftIcon />
              </TimelineNavButton>
            </TimelineNavItem>

            {/* previous */}
            <TimelineNavItem $disable={canDisableLeft}>
              <TimelineNavButton
                mode={mode}
                theme={theme}
                onClick={flippedHorizontally ? onNext : onPrevious}
                title={previousTitle}
                aria-label={previousTitle}
                aria-disabled={disableLeft}
                aria-controls="timeline-main-wrapper"
                tabIndex={!disableLeft ? 0 : -1}
                rotate={rotate ? 'TRUE' : 'FALSE'}
              >
                <ChevronLeft />
              </TimelineNavButton>
            </TimelineNavItem>

            {/* next */}
            <TimelineNavItem $disable={canDisableRight}>
              <TimelineNavButton
                mode={mode}
                theme={theme}
                onClick={flippedHorizontally ? onPrevious : onNext}
                title={nextTitle}
                aria-label={nextTitle}
                aria-disabled={disableRight}
                aria-controls="timeline-main-wrapper"
                rotate={rotate ? 'TRUE' : 'FALSE'}
                tabIndex={!disableRight ? 0 : -1}
              >
                <ChevronRightIcon />
              </TimelineNavButton>
            </TimelineNavItem>

            {/* jump to last */}
            <TimelineNavItem $disable={canDisableRight}>
              <TimelineNavButton
                mode={mode}
                theme={theme}
                onClick={flippedHorizontally ? onFirst : onLast}
                title={jumpToLastTitle}
                aria-label={jumpToLastTitle}
                aria-disabled={disableRight}
                aria-controls="timeline-main-wrapper"
                tabIndex={!disableRight ? 0 : -1}
                rotate={rotate ? 'TRUE' : 'FALSE'}
              >
                <ChevronsRightIcon />
              </TimelineNavButton>
            </TimelineNavItem>
          </>
        )}

        {/* slideshow button */}
        <TimelineNavItem>
          {slideShowEnabled && (
            <TimelineNavButton
              theme={theme}
              onClick={handlePlayOrPause}
              title={playOrPauseTile}
              tabIndex={0}
              aria-controls="timeline-main-wrapper"
              aria-label={playOrPauseTile}
            >
              {slideShowRunning ? <StopIcon /> : <ReplayIcon />}
            </TimelineNavButton>
          )}
        </TimelineNavItem>

        {/* dark toggle button */}
        {enableDarkToggle ? (
          <TimelineNavItem $disable={slideShowRunning}>
            <TimelineNavButton
              theme={theme}
              onClick={onToggleDarkMode}
              title={isDark ? buttonTexts?.light : buttonTexts?.dark}
              tabIndex={0}
              aria-controls="timeline-main-wrapper"
              aria-label={isDark ? buttonTexts?.light : buttonTexts?.dark}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </TimelineNavButton>
          </TimelineNavItem>
        ) : null}
      </TimelineNavWrapper>
    </TimelineControlContainer>
  );
};

TimelineControl.displayName = 'Timeline Control';

export default TimelineControl;
