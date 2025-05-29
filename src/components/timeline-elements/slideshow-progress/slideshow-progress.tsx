import React, { useEffect, useState, useRef } from 'react';
import { useDynamicContext } from '../../contexts';
import {
  SlideshowProgressWrapper,
  SlideshowProgressBar,
  SlideshowProgressFill,
} from './slideshow-progress.styles';

interface SlideshowProgressProps {
  /** Current active timeline item index (0-based) */
  activeItemIndex: number;
  /** Total number of timeline items */
  totalItems: number;
  /** Whether the slideshow is currently running */
  isRunning: boolean;
  /** Duration of each slide in milliseconds */
  slideItemDuration: number;
  /** Whether the slideshow is paused */
  isPaused?: boolean;
}

/**
 * SlideshowProgress component displays the overall progress of the slideshow
 * as a line-based progress bar. Only shown during slideshow mode.
 *
 * Features:
 * - Shows continuous progress across all timeline items
 * - Smooth animation within each slide
 * - Pauses when slideshow is paused
 * - Uses consistent theming with the rest of the project
 * - Minimal and non-intrusive design
 */
const SlideshowProgress: React.FC<SlideshowProgressProps> = ({
  activeItemIndex,
  totalItems,
  isRunning,
  slideItemDuration,
  isPaused = false,
}) => {
  const { memoizedTheme: theme } = useDynamicContext();
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Calculate the base progress for completed items
  const baseProgress =
    totalItems > 0 ? (activeItemIndex / totalItems) * 100 : 0;

  // Calculate the progress increment per item
  const progressPerItem = totalItems > 0 ? 100 / totalItems : 0;

  useEffect(() => {
    if (!isRunning || totalItems === 0) {
      setCurrentProgress(0);
      return;
    }

    // If paused, maintain current progress
    if (isPaused) {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    // Start animation for the current slide
    setIsAnimating(true);
    startTimeRef.current = performance.now();

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / slideItemDuration, 1);

      // Calculate smooth progress: base progress + progress within current item
      const smoothProgress = baseProgress + progressPerItem * progress;

      setCurrentProgress(Math.min(smoothProgress, 100));

      if (progress < 1 && !isPaused) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    activeItemIndex,
    totalItems,
    isRunning,
    slideItemDuration,
    isPaused,
    baseProgress,
    progressPerItem,
  ]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Don't render if slideshow is not running or we have no items
  if (!isRunning || totalItems === 0) {
    return null;
  }

  return (
    <SlideshowProgressWrapper data-testid="slideshow-progress">
      <SlideshowProgressBar theme={theme}>
        <SlideshowProgressFill
          $progressPercentage={currentProgress}
          $duration={slideItemDuration}
          $isPaused={isPaused}
          $isAnimating={isAnimating}
          theme={theme}
        />
      </SlideshowProgressBar>
    </SlideshowProgressWrapper>
  );
};

export default React.memo(SlideshowProgress);
