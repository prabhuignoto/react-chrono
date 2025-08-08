import { Theme } from '@models/Theme';
import { TextDensity, TimelineProps } from '@models/TimelineModel';
import styled, { css, keyframes } from 'styled-components';
import { zIndex } from '../../../styles/z-index';
import { linearGradient } from '../timeline-card-media/timeline-card-media.styles';
import {
  reveal,
  slideFromRight,
  slideInFromLeft,
  slideInFromTop,
} from './card-animations.styles';

// Common types
type ContentT = Pick<
  TimelineProps,
  'theme' | 'slideShow' | 'mode' | 'borderLessCards'
>;

// Reusable styles with vendor prefixes
const baseFontStyles = css`
  margin: 0;
  width: 100%;
  text-align: left;
`;

const baseCardStyles = css<{ $theme?: Theme }>`
  background: ${(p) => p.$theme?.cardBgColor};
  border-radius: 12px;
  -webkit-box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.04),
    0 4px 8px rgba(0, 0, 0, 0.06),
    0 8px 16px rgba(0, 0, 0, 0.08);
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.04),
    0 4px 8px rgba(0, 0, 0, 0.06),
    0 8px 16px rgba(0, 0, 0, 0.08);
  -webkit-transition:
    -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const scrollbarStyles = css<{ theme?: Theme }>`
  scrollbar-color: ${(p) => p.theme?.primary} default;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 0.3em;
  }

  &::-webkit-scrollbar-track {
    background-color: ${(p) => p.theme?.cardBgColor};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(p) => p.theme?.primary};
    border-radius: 3px;
  }
`;

// Animation helpers
const getSlideShowAnimation = (props) => {
  const { $slideShowActive, $active, $slideShowType, $branchDir } = props;

  if (!$slideShowActive || !$active) return '';

  if ($slideShowType === 'slide_in') {
    return css`
      animation: ${slideInFromTop} 0.5s ease-in-out;
    `;
  }

  if ($slideShowType === 'slide_from_sides') {
    if ($branchDir === 'left') {
      return css`
        animation: ${slideInFromLeft} 0.5s ease-in-out;
      `;
    }
    if ($branchDir === 'right') {
      return css`
        animation: ${slideFromRight} 0.5s ease-in-out;
      `;
    }
  }

  return css`
    animation: ${reveal} 0.5s ease-in-out;
  `;
};

const getSlideShowVisibility = (props) => {
  const { $slideShowActive, $active } = props;

  if ($slideShowActive && $active) {
    return css`
      opacity: 1;
      animation-timing-function: ease-in-out;
      animation-duration: 0.5s;
    `;
  }

  if ($slideShowActive && !$active) {
    return css`
      opacity: 0;
    `;
  }

  return '';
};

// Slide animation for progress bar
const slideAnimation = (start?: number, end?: number) => keyframes`
  0% {
    width: ${start}px;
  }
  100% {
    width: ${end}px;
  }
`;

// Extract shared styles into a utility function
const sharedSemanticStyles = css<{
  $fontSize?: string;
  $padding?: boolean;
  theme: Theme;
}>`
  ${baseFontStyles}
  font-size: ${(p) => p.$fontSize || '1.25rem'};
  font-weight: 700;
  margin-bottom: 0.75rem;
  padding: ${(p) => (p.$padding ? '0.5rem 0 0.5rem 0.5rem' : '0')};
  display: block;
  letter-spacing: -0.02em;
  line-height: 1.3;
`;

// Card Components
export const TimelineItemContentWrapper = styled.section<
  {
    $active?: boolean;
    $borderLessCards?: TimelineProps['borderLessCards'];
    $branchDir?: string;
    $customContent?: boolean;
    $highlight?: boolean;
    $isNested?: boolean;
    $maxWidth?: number;
    $minHeight?: number;
    $noMedia?: boolean;
    $slideShow?: TimelineProps['slideShow'];
    $slideShowActive?: boolean;
    $slideShowType?: TimelineProps['slideShowType'];
    $textDensity?: TextDensity;
    $textOverlay?: boolean;
    $theme?: Theme;
  } & ContentT
>`
  ${baseCardStyles}
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  line-height: 1.5;
  margin: 0;
  max-width: ${(p) => (p.$maxWidth ? `${p.$maxWidth}px` : '100%')};

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 8px;
  }
  position: relative;
  padding: 1.5rem;
  z-index: ${zIndex.timelineCard};
  overflow: hidden;
  width: 100%;

  // Handle text density and height
  ${({ $textDensity, $customContent, $minHeight }) =>
    `${$customContent ? 'height' : 'min-height'}: ${$minHeight}px`};

  ${(p) => (p.$textOverlay ? `min-height: ${p.$minHeight}px` : '')};
  ${(p) => (p.$textOverlay ? 'height: 0' : '')};

  // Focus state with transition
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    outline 0.15s ease-out,
    outline-offset 0.15s ease-out;

  // Remove default outline for mouse clicks
  &:focus:not(:focus-visible):not(.focus-visible) {
    outline: none;
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.04),
      0 4px 8px rgba(0, 0, 0, 0.06),
      0 8px 16px rgba(0, 0, 0, 0.08);
  }

  // Show outline only for keyboard navigation, not toolbar navigation
  &:focus-visible,
  &.focus-visible {
    outline: 3px solid transparent;
    outline-offset: 4px;
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.04),
      0 4px 8px rgba(0, 0, 0, 0.06),
      0 8px 16px rgba(0, 0, 0, 0.08);
  }

  /* Show outline only when keyboard navigation is active */
  [data-keyboard-focus='true'] &:focus-visible,
  [data-keyboard-focus='true'] &.focus-visible {
    outline-color: ${(p) => p.$theme?.primary};
  }

  /* Remove outline when toolbar navigation is active */
  [data-toolbar-navigation='true'] &:focus-visible,
  [data-toolbar-navigation='true'] &.focus-visible {
    outline-color: transparent;
  }

  // Prevent layout shift on focus
  &:focus,
  &:focus-visible,
  &.focus-visible {
    position: relative;
    z-index: ${zIndex.timelineCard + 1};
  }

  // Highlight effect
  ${(p) =>
    p.$highlight &&
    css`
      cursor: pointer;

      &:hover {
        transform: translateY(-4px);
        box-shadow:
          0 4px 8px rgba(0, 0, 0, 0.08),
          0 12px 24px rgba(0, 0, 0, 0.12),
          0 16px 32px rgba(0, 0, 0, 0.08);
      }

      &:active {
        transform: translateY(-1px);
        transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
      }
    `}

  // Nested card styling
  ${(p) =>
    p.$isNested &&
    css`
      background: ${p.$theme?.nestedCardBgColor};
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.03),
        0 2px 4px rgba(0, 0, 0, 0.04);
      border: 1px solid ${p.$theme?.shadowColor || 'rgba(0, 0, 0, 0.06)'};
    `}

  // Animations
  ${getSlideShowAnimation}
  ${getSlideShowVisibility}
`;

// Header Components
export const TimelineCardHeader = styled.header`
  width: 100%;
  padding: 0;
  margin-bottom: 1rem;
`;

export const CardTitle = styled.h1<{
  $fontSize: string;
  $padding?: boolean;
  dir?: string;
  theme: Theme;
}>`
  ${baseFontStyles}
  color: ${(p) => p.theme.cardTitleColor};
  font-size: ${(p) => p.$fontSize || '1.25rem'};
  font-weight: 700;
  margin-bottom: 0.75rem;
  padding: ${(p) => (p.$padding ? '0.5rem 0 0.5rem 0.5rem' : '0')};
  letter-spacing: -0.02em;
  line-height: 1.3;

  &.active {
    color: ${(p) => p.theme.primary};
  }

  @media (max-width: 768px) {
    font-size: ${(p) => p.$fontSize || '1.125rem'};
    margin-bottom: 0.5rem;
  }
`;

export const CardSubTitle = styled.h2<{
  $fontSize?: string;
  $padding?: boolean;
  dir?: string;
  theme?: Theme;
}>`
  ${baseFontStyles}
  color: ${(p) => p.theme.cardSubtitleColor};
  font-size: ${(p) => p.$fontSize || '0.95rem'};
  font-weight: 500;
  margin-bottom: 0.5rem;
  padding: ${(p) => (p.$padding ? '0.5rem 0 0.5rem 0.5rem' : '0')};
  letter-spacing: -0.01em;
  line-height: 1.4;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: ${(p) => p.$fontSize || '0.875rem'};
  }
`;

// Refactor CardTitleSemantic to use shared styles
export const CardTitleSemantic = styled.h1.withConfig({
  shouldForwardProp: (prop) =>
    !['$fontSize', '$padding', 'theme'].includes(prop),
})<{
  $fontSize: string;
  $padding?: boolean;
  dir?: string;
  theme: Theme;
  as?: string;
}>`
  ${sharedSemanticStyles}
  color: ${(p) => p.theme.cardTitleColor};

  &.active {
    color: ${(p) => p.theme.primary};
  }
`;

// Refactor CardSubTitleSemantic to use shared styles
export const CardSubTitleSemantic = styled.span.withConfig({
  shouldForwardProp: (prop) =>
    !['$fontSize', '$padding', 'theme'].includes(prop),
})<{
  $fontSize?: string;
  $padding?: boolean;
  dir?: string;
  theme: Theme;
  as?: string;
}>`
  ${sharedSemanticStyles}
  color: ${(p) => p.theme.cardSubtitleColor};
  font-size: ${(p) => p.$fontSize || '0.9rem'};
`;

export const CardTitleAnchor = styled.a`
  color: inherit;

  &:active {
    color: inherit;
  }
`;

// Content Components
export const TimelineContentDetails = styled.p<{ theme?: Theme }>`
  font-size: 0.95rem;
  font-weight: 400;
  margin: 0;
  width: 100%;
  color: ${(p) => p.theme.cardDetailsColor};
  line-height: 1.6;
  letter-spacing: -0.01em;

  & + & {
    margin-top: 0.75rem;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    line-height: 1.5;
  }
`;

export const TimelineSubContent = styled.span<{
  fontSize?: string;
  theme?: Theme;
}>`
  margin-bottom: 0.75rem;
  display: block;
  font-size: ${(p) => p.fontSize || '0.875rem'};
  color: ${(p) => p.theme.cardDetailsColor};
  line-height: 1.5;
  opacity: 0.85;
`;

export const TimelineContentDetailsWrapper = styled.div<{
  $borderLess?: boolean;
  $cardHeight?: number | null;
  $contentHeight?: number;
  $customContent?: boolean;
  $gradientColor?: string | null;
  $showMore?: boolean;
  $textOverlay?: boolean;
  $useReadMore?: boolean;
  branchDir?: string;
  height?: number;
  theme?: Theme;
}>`
  ${scrollbarStyles}
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin: 0;
  position: relative;
  overflow-x: hidden;
  overflow-y: ${(p) => (p.$showMore ? 'auto' : 'hidden')};
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: ${(p) => (p.$borderLess ? 'calc(100% - 0.5rem)' : '100%')};
  padding: 0;
  background: ${(p) => p.theme?.cardDetailsBackGround || p.theme?.cardBgColor};

  // Simplified height handling
  ${({
    $useReadMore,
    $customContent,
    $showMore,
    height = 150,
    $textOverlay,
  }) => {
    if ($customContent) return 'height: 100%;';
    if ($textOverlay) return '';
    if (!$useReadMore) return 'height: auto;';

    // When collapsed, limit height; when expanded, allow full height
    return $showMore ? 'max-height: 1000px;' : `max-height: ${height}px;`;
  }}

  // Show gradient overlay when content is collapsed
  ${({ $useReadMore, $showMore, $gradientColor }) =>
    $useReadMore && !$showMore && $gradientColor
      ? css`
          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: linear-gradient(
              to bottom,
              transparent,
              ${$gradientColor} 50%,
              ${$gradientColor}
            );
            pointer-events: none;
            transition: opacity 0.3s ease;
          }
        `
      : ''}
      
  &.show-less {
    scrollbar-width: none;
    &::-webkit-scrollbar {
      width: 0;
    }
    overflow: hidden;
  }

  // Set gradient color variable
  --rc-gradient-color: ${(p) => p.$gradientColor};
`;

// Interactive Elements
export const ShowMore = styled.button<{
  show?: 'true' | 'false';
  theme?: Theme;
}>`
  /* Reset button styles to look like a link */
  background: none;
  border: none;
  padding: 0;
  margin: 1rem 0.5rem 0.5rem auto;

  /* Link-like appearance */
  color: ${(p) => p.theme.primary};
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;

  /* Layout */
  align-items: center;
  align-self: flex-end;
  display: ${(p) => (p.show === 'true' ? 'flex' : 'none')};
  justify-self: flex-end;

  /* Smooth transitions */
  transition: all 0.2s ease;

  &:hover {
    color: ${(p) => p.theme.primary}CC;
    text-decoration: underline;
    text-decoration-thickness: 2px;
  }

  &:active {
    color: ${(p) => p.theme.primary}AA;
  }

  &:focus-visible {
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-radius: 2px;
  }

  /* Show outline only when keyboard navigation is active */
  [data-keyboard-focus='true'] &:focus-visible {
    outline-color: ${(p) => p.theme.primary};
  }

  /* Remove outline when toolbar navigation is active */
  [data-toolbar-navigation='true'] &:focus-visible {
    outline-color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 0.8125rem;
    margin: 0.75rem 0.25rem 0.25rem auto;
  }
`;

export const SlideShowProgressBar = styled.progress<{
  $color?: string;
  $duration?: number;
  $resuming?: boolean;
  $startWidth?: number;
}>`
  background: ${(p) => p.color};
  bottom: -0.75em;
  display: block;
  height: 4px;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  border-radius: 2px;
  border: 0;
  outline: none; /* Remove the outline/border */

  /* Remove the default styling from progress element */
  &::-webkit-progress-bar {
    background-color: transparent;
    border: 0;
  }

  &::-webkit-progress-value {
    background-color: ${(p) => p.color || '#007bff'};
    border-radius: 2px;
  }

  &::-moz-progress-bar {
    background-color: ${(p) => p.color || '#007bff'};
    border-radius: 2px;
  }

  // Animation control - simplified without pause
  ${(p) => {
    if (p.$startWidth && p.$startWidth > 0) {
      return css`
        animation: ${slideAnimation(p.$startWidth, 0)} ${p.$duration}ms ease-in;
        animation-play-state: running;
      `;
    } else {
      return css`
        width: ${p.$startWidth}px;
      `;
    }
  }}

  svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
`;

// Icon Wrappers
export const ChevronIconWrapper = styled.span<{ collapsed?: 'true' | 'false' }>`
  align-items: center;
  display: flex;
  height: 1.25em;
  justify-content: center;
  margin-left: 0.2em;
  margin-top: 0.2em;
  width: 1.25em;
  transform: ${(p) =>
    p.collapsed === 'false' ? 'rotate(90deg)' : 'rotate(-90deg)'};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  svg {
    height: 100%;
    width: 100%;
  }
`;

export const TriangleIconWrapper = styled.span<{
  dir?: string;
  offset?: number;
  theme?: Theme;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: calc(50%);
  background: ${(p) => p.theme.cardBgColor};
  transform: translateY(-50%) rotate(225deg);
  z-index: ${zIndex.timelineCard - 3}; /* Arrow tip should be below the card */
  ${(p) =>
    p.dir === 'left' ? `right: ${p.offset}px;` : `left: ${p.offset}px;`}

  & svg {
    width: 100%;
    height: 100%;
    fill: #fff;
  }
`;

// Search highlighting
export const Mark = styled.mark<{ theme: Theme }>`
  background-color: ${(p) =>
    p.theme?.searchHighlightColor ||
    (p.theme?.primary ? `${p.theme.primary}30` : 'rgba(255, 217, 0, 0.3)')};
  color: inherit;
  font-weight: 600;
  padding: 0.15em 0.3em;
  margin: 0 0.05em;
  border-radius: 4px;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  transition:
    background-color 0.2s ease-out,
    box-shadow 0.15s ease-out,
    transform 0.15s ease-out;

  &[data-current-match='true'] {
    background-color: ${(p) => {
      if (p.theme?.searchHighlightColor) {
        // If custom search highlight color is provided, make it more intense
        const color = p.theme.searchHighlightColor;
        // Extract opacity and increase it for current match
        if (color.includes('rgba')) {
          return color.replace(/0\.\d+\)$/, '0.6)');
        }
        return color;
      }

      // Fallback logic
      if (p.theme?.primary) {
        return p.theme.cardBgColor === '#1f2937'
          ? `rgba(96, 165, 250, 0.6)` // More intense for current match in dark mode
          : `${p.theme.primary}50`; // Standard for light mode
      }
      return 'rgba(255, 217, 0, 0.5)';
    }};
    box-shadow:
      0 0 0 2px
        ${(p) => {
          if (p.theme?.iconColor) {
            return p.theme.iconColor;
          }

          // Fallback logic
          if (p.theme?.primary) {
            return p.theme.cardBgColor === '#1f2937'
              ? 'rgba(96, 165, 250, 0.8)'
              : p.theme.primary;
          }
          return 'rgba(255, 217, 0, 0.5)';
        }},
      0 2px 4px rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
  }
`;
