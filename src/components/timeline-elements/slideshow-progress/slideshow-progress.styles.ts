import styled, { css, keyframes } from 'styled-components';
import { Theme } from '@models/Theme';

// Animation for smooth progress transitions
const progressAnimation = (progressPercentage: number) => keyframes`
  from {
    width: 0%;
  }
  to {
    width: ${progressPercentage}%;
  }
`;

// Wrapper for the entire progress bar component
export const SlideshowProgressWrapper = styled.div`
  width: 100%;
  // margin: 0 0 1rem 0;
  z-index: 10;
  pointer-events: none;
`;

// Background track for the progress bar
export const SlideshowProgressBar = styled.div<{ theme?: Theme }>`
  width: 100%;
  height: 4px;
  background-color: ${(p) => p.theme?.toolbarBgColor || 'rgba(0, 0, 0, 0.1)'};
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  // border: 1px solid ${(p) =>
    p.theme?.buttonBorderColor || 'rgba(0, 0, 0, 0.1)'};
`;

// Animated fill for the progress bar
export const SlideshowProgressFill = styled.div<{
  $progressPercentage: number;
  $duration: number;
  $isPaused: boolean;
  $isAnimating?: boolean;
  theme?: Theme;
}>`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${(p) => p.theme?.primary || '#3b82f6'} 0%,
    ${(p) => p.theme?.secondary || p.theme?.primary || '#8b5cf6'} 100%
  );
  border-radius: 2px;
  width: ${(p) => p.$progressPercentage}%;

  /* Use smooth CSS transition instead of keyframe animation for continuous progress */
  transition: width 0.1s linear;

  ${(p) =>
    p.$isPaused &&
    css`
      transition: none; /* Stop smooth transitions when paused */
    `}

  /* Add a subtle glow effect */
  box-shadow: 0 0 6px ${(p) => p.theme?.primary || '#3b82f6'}40;

  /* Smooth color transitions */
  transition:
    width 0.1s linear,
    background 0.2s ease,
    box-shadow 0.2s ease;
`;

// Overall progress bar that shows at the top of the page
export const OverallProgressBar = styled.progress<{
  $color?: string;
  $duration?: number;
  $paused?: boolean;
}>`
  /* Basic styling */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  z-index: 1000;
  background: transparent;

  /* Remove default appearance */
  appearance: none;
  border: none;
  outline: none;

  /* Webkit specific styling */
  &::-webkit-progress-bar {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 0;
  }

  &::-webkit-progress-value {
    background-color: ${(p) => p.$color || '#007bff'};
    transition: width 0.2s ease;
  }

  /* Firefox specific styling */
  &::-moz-progress-bar {
    background-color: ${(p) => p.$color || '#007bff'};
    transition: width 0.2s ease;
  }

  /* Animation control */
  ${(p) => {
    const value = Number(p.value) || 0;
    const max = Number(p.max) || 100;
    const percentage = (value / max) * 100;

    if (!p.$paused && p.$duration && p.$duration > 0) {
      return css`
        animation-play-state: running;
      `;
    } else {
      return css`
        animation-play-state: paused;
      `;
    }
  }}
`;
