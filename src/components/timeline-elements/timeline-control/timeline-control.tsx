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
  active: boolean;
  children: React.ReactNode;
}

const StandardNavButton: React.FC<StandardNavButtonProps> = ({
  mode,
  theme,
  onClick,
  title,
  ariaLabel,
  isDisabled,
  rotate,
  active,
  testId,
  children,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button
      onClick={isDisabled ? undefined : onClick}
      tabIndex={!isDisabled ? 0 : -1}
      onKeyDown={handleKeyDown}
      aria-disabled={isDisabled}
      aria-label={ariaLabel}
      title={title}
      data-test-id={testId}
    >
      {children}
    </button>
  );
};

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
    () => disableLeft ?? slideShowRunning,
    [disableLeft, slideShowRunning],
  );

  const canDisableRight = useMemo(
    () => disableRight ?? slideShowRunning,
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
        aria-label={buttonTexts?.timelineNavigation ?? 'Timeline Navigation'}
        role="toolbar"
      >
        {/* jump to first, previous, next, jump to last */}
        {disableInteraction ? null : (
          <>
            <StandardNavButton
              mode={mode}
              theme={theme}
              onClick={flippedHorizontally ? onLast : onFirst}
              title={jumpToFirstTitle}
              ariaLabel={jumpToFirstTitle}
              isDisabled={canDisableLeft}
              rotate={rotate}
              testId="jump-to-first"
              active={!canDisableLeft}
            >
              <ChevronsLeftIcon />
            </StandardNavButton>
            <StandardNavButton
              mode={mode}
              theme={theme}
              onClick={flippedHorizontally ? onNext : onPrevious}
              title={previousTitle}
              ariaLabel={previousTitle}
              isDisabled={canDisableLeft}
              rotate={rotate}
              testId="previous"
              active={!canDisableLeft}
            >
              <ChevronLeft />
            </StandardNavButton>
            <StandardNavButton
              mode={mode}
              theme={theme}
              onClick={flippedHorizontally ? onPrevious : onNext}
              title={nextTitle}
              ariaLabel={nextTitle}
              isDisabled={canDisableRight}
              rotate={rotate}
              testId="next"
              active={!canDisableRight}
            >
              <ChevronRightIcon />
            </StandardNavButton>
            <StandardNavButton
              mode={mode}
              theme={theme}
              onClick={flippedHorizontally ? onFirst : onLast}
              title={jumpToLastTitle}
              ariaLabel={jumpToLastTitle}
              isDisabled={canDisableRight}
              rotate={rotate}
              testId="jump-to-last"
              active={!canDisableRight}
            >
              <ChevronsRightIcon />
            </StandardNavButton>
          </>
        )}

        {/* slideshow button */}
        <div className="nav-item">
          {slideShowEnabled && (
            <StandardNavButton
              mode={mode}
              theme={theme}
              onClick={slideShowRunning ? handlePause : handlePlay}
              title={playOrPauseTile}
              ariaLabel={playOrPauseTile}
              isDisabled={false}
              rotate={rotate}
              testId="play-pause"
              active={true}
            >
              {slideShowRunning ? <StopIcon /> : <ReplayIcon />}
            </StandardNavButton>
          )}
        </div>

        {/* dark toggle button */}
        {enableDarkToggle ? (
          <div className={`nav-item ${slideShowRunning ? 'disabled' : ''}`}>
            <StandardNavButton
              mode={mode}
              theme={theme}
              onClick={onToggleDarkMode}
              title={isDark ? buttonTexts?.light : buttonTexts?.dark}
              ariaLabel={isDark ? buttonTexts?.light : buttonTexts?.dark}
              isDisabled={false}
              rotate={rotate}
              testId="dark-toggle"
              active={!slideShowRunning}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </StandardNavButton>
          </div>
        ) : null}
      </TimelineNavWrapper>
    </TimelineControlContainer>
  );
};

Controls.displayName = 'Timeline Control';

export default Controls;
