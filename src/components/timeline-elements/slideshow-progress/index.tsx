import React, { useContext, useEffect, useRef } from 'react';
import {
  OverallProgressBar,
  SlideshowProgressBar,
  SlideshowProgressFill,
  SlideshowProgressWrapper,
} from './slideshow-progress.styles';
import { GlobalContext } from '../../GlobalContext';

interface SlideshowProgressProps {
  /** Current active timeline item (0-indexed) */
  activeItem: number;
  /** Total number of items in the timeline */
  totalItems: number;
  /** Whether the slideshow is running */
  isRunning: boolean;
  /** Duration of each slide in milliseconds */
  slideDuration: number;
  /** Whether the progress is paused */
  isPaused: boolean;
  /** Whether to show overall progress at the top */
  showOverallProgress?: boolean;
}

/**
 * Component that displays progress for slideshow mode
 * Can show individual item progress or overall progress based on props
 */
const SlideshowProgress: React.FC<SlideshowProgressProps> = ({
  activeItem,
  totalItems,
  isRunning,
  slideDuration,
  isPaused,
  showOverallProgress = false,
}) => {
  const progressRef = useRef<HTMLProgressElement>(null);
  const { theme } = useContext(GlobalContext);

  // Calculate overall progress (0-100%)
  const progress = totalItems > 0 ? ((activeItem + 1) / totalItems) * 100 : 0;

  // Calculate remaining time for the current transition
  const remainingDuration =
    slideDuration * ((totalItems - activeItem) / totalItems);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.value = progress;
    }
  }, [progress]);

  if (!isRunning) {
    return null;
  }

  return (
    <>
      {/* Item progress bar */}
      <SlideshowProgressWrapper>
        <SlideshowProgressBar theme={theme}>
          <SlideshowProgressFill
            $progressPercentage={100}
            $duration={slideDuration}
            $isPaused={isPaused}
            theme={theme}
          />
        </SlideshowProgressBar>
      </SlideshowProgressWrapper>

      {/* Overall progress bar (shows at top of page) */}
      {showOverallProgress && (
        <OverallProgressBar
          ref={progressRef}
          max={100}
          value={progress}
          $color={theme?.primary}
          $duration={remainingDuration}
          $paused={isPaused}
          aria-label="Overall slideshow progress"
        />
      )}
    </>
  );
};

export default React.memo(SlideshowProgress);
