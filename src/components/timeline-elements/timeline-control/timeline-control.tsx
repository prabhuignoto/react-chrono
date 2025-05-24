import { TimelineControlModel } from '@models/TimelineControlModel';
import { Theme } from '@models/Theme';
import { TimelineMode } from '@models/TimelineModel';
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
  TimelineNavWrapper,
  ScreenReaderOnly,
} from './timeline-control.styles';

// Helper component for standard navigation buttons
interface StandardNavButtonProps {
  mode: TimelineMode;
  theme: Theme;
  onClick: () => void;
  title?: string;
  ariaLabel?: string;
  isDisabled: boolean;
  rotate: boolean;
  testId: string;
  IconComponent: React.ElementType;
}

const StandardNavButtonComponent: React.FC<StandardNavButtonProps> = React.memo(
  ({
    mode,
    theme,
    onClick,
    title,
    ariaLabel,
    isDisabled,
    rotate,
    testId,
    IconComponent,
  }) => (
    <div className={`nav-item ${isDisabled ? 'disabled' : ''}`}>
      <TimelineNavButton
        mode={mode}
        theme={theme}
        onClick={isDisabled ? undefined : onClick} // Prevent click if truly disabled
        title={title}
        aria-label={ariaLabel}
        aria-disabled={isDisabled}
        aria-controls="timeline-main-wrapper"
        tabIndex={!isDisabled ? 0 : -1}
        rotate={rotate ? 'TRUE' : 'FALSE'}
        data-test-id={testId}
      >
        <IconComponent />
      </TimelineNavButton>
    </div>
  ),
);
StandardNavButtonComponent.displayName = 'StandardNavButton';

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

  const handlePause = useCallback(() => {
    onPaused?.();
  }, [onPaused]);

  const handlePlay = useCallback(() => {
    onReplay?.();
  }, [onReplay]);

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

  // Create a message about current position for screen readers
  const positionStatus = useMemo(() => {
    if (totalItems <= 0) return '';
    return `Item ${activeTimelineItem + 1} of ${totalItems}`;
  }, [activeTimelineItem, totalItems]);

  // Create a message about slideshow status for screen readers
  const slideshowStatus = useMemo(() => {
    if (!slideShowEnabled) return '';
    return slideShowRunning ? 'Slideshow is playing' : 'Slideshow is paused';
  }, [slideShowRunning, slideShowEnabled]);

  return (
    <TimelineControlContainer key="control-wrapper">
      {/* Visually hidden status information for screen readers */}
      <ScreenReaderOnly as="output" aria-live="polite">
        {positionStatus}
        {slideshowStatus && ` ${slideshowStatus}`}
      </ScreenReaderOnly>

      <TimelineNavWrapper
        className={cls('timeline-controls', classNames?.controls)}
        theme={theme}
        aria-label="Timeline Navigation"
        role="toolbar"
      >
        {/* jump to first, previous, next, jump to last */}
        {disableInteraction ? null : (
          <>
            <StandardNavButtonComponent
              mode={mode}
              theme={theme}
              onClick={flippedHorizontally ? onLast : onFirst}
              title={jumpToFirstTitle}
              ariaLabel={jumpToFirstTitle}
              isDisabled={canDisableLeft}
              rotate={rotate}
              testId="jump-to-first"
              IconComponent={ChevronsLeftIcon}
            />
            <StandardNavButtonComponent
              mode={mode}
              theme={theme}
              onClick={flippedHorizontally ? onNext : onPrevious}
              title={previousTitle}
              ariaLabel={previousTitle}
              isDisabled={canDisableLeft}
              rotate={rotate}
              testId="previous"
              IconComponent={ChevronLeft}
            />
            <StandardNavButtonComponent
              mode={mode}
              theme={theme}
              onClick={flippedHorizontally ? onPrevious : onNext}
              title={nextTitle}
              ariaLabel={nextTitle}
              isDisabled={canDisableRight}
              rotate={rotate}
              testId="next"
              IconComponent={ChevronRightIcon}
            />
            <StandardNavButtonComponent
              mode={mode}
              theme={theme}
              onClick={flippedHorizontally ? onFirst : onLast}
              title={jumpToLastTitle}
              ariaLabel={jumpToLastTitle}
              isDisabled={canDisableRight}
              rotate={rotate}
              testId="jump-to-last"
              IconComponent={ChevronsRightIcon}
            />
          </>
        )}

        {/* slideshow button */}
        <div className="nav-item">
          {slideShowEnabled && (
            <TimelineNavButton
              theme={theme}
              onClick={slideShowRunning ? handlePause : handlePlay}
              title={playOrPauseTile}
              tabIndex={0}
              aria-controls="timeline-main-wrapper"
              aria-label={playOrPauseTile}
              aria-pressed={slideShowRunning ? 'true' : 'false'}
              data-test-id="play-pause"
            >
              {slideShowRunning ? <StopIcon /> : <ReplayIcon />}
            </TimelineNavButton>
          )}
        </div>

        {/* dark toggle button */}
        {enableDarkToggle ? (
          <div className={`nav-item ${slideShowRunning ? 'disabled' : ''}`}>
            <TimelineNavButton
              theme={theme}
              onClick={onToggleDarkMode}
              title={isDark ? buttonTexts?.light : buttonTexts?.dark}
              tabIndex={0}
              aria-controls="timeline-main-wrapper"
              aria-label={isDark ? buttonTexts?.light : buttonTexts?.dark}
              aria-pressed={isDark ? 'true' : 'false'}
              data-test-id="dark-toggle"
              $active={isDark}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </TimelineNavButton>
          </div>
        ) : null}
      </TimelineNavWrapper>
    </TimelineControlContainer>
  );
};

Controls.displayName = 'Timeline Control';

export default Controls;
