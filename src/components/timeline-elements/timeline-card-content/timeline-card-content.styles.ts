import { Theme } from '@models/Theme';
import { TextDensity, TimelineProps } from '@models/TimelineModel';
import styled, { css, keyframes } from 'styled-components';
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

// Reusable styles
const baseFontStyles = css`
  margin: 0;
  width: 100%;
  text-align: left;
`;

const baseCardStyles = css<{ theme: Theme }>`
  background: ${(p) => p.theme.cardBgColor};
  border-radius: 8px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.06),
    0 4px 10px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.2s ease-out,
    box-shadow 0.2s ease-out;
`;

const scrollbarStyles = css<{ theme: Theme }>`
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
  } & ContentT
>`
  ${baseCardStyles}
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  line-height: 1.5;
  margin: 0;
  max-width: ${(p) => p.$maxWidth}px;
  position: relative;
  padding: 1rem;
  z-index: 0;
  overflow: hidden;
  width: 100%;

  // Handle text density and height
  ${({ $textDensity, $customContent, $minHeight }) =>
    `${$customContent ? 'height' : 'min-height'}: ${$minHeight}px`};

  ${(p) => (p.$textOverlay ? `min-height: ${p.$minHeight}px` : '')};
  ${(p) => (p.$textOverlay ? 'height: 0' : '')};

  // Focus state
  &:focus {
    outline: 1px solid ${(p) => p.theme?.primary};
  }

  // Highlight effect
  ${(p) =>
    p.$highlight &&
    css`
      &:hover {
        transform: translateY(-2px);
        box-shadow:
          0 2px 5px rgba(0, 0, 0, 0.08),
          0 8px 16px rgba(0, 0, 0, 0.1);
      }
    `}

  // Nested card styling
  ${(p) =>
    p.$isNested &&
    css`
      background: ${p.theme.nestedCardBgColor};
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    `}

  // Animations
  ${getSlideShowAnimation}
  ${getSlideShowVisibility}
`;

// Header Components
export const TimelineCardHeader = styled.header`
  width: 100%;
  padding: 0;
  margin-bottom: 0.5rem;
`;

export const CardTitle = styled.h1<{
  $fontSize: string;
  $padding?: boolean;
  dir?: string;
  theme: Theme;
}>`
  ${baseFontStyles}
  color: ${(p) => p.theme.cardTitleColor};
  font-size: ${(p) => p.$fontSize && '1.1rem'};
  font-weight: 600;
  margin-bottom: 0.5rem;
  padding: ${(p) => (p.$padding ? '0.5rem 0 0.5rem 0.5rem' : '0')};

  &.active {
    color: ${(p) => p.theme.primary};
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
  font-size: ${(p) => p.$fontSize && '0.9rem'};
  font-weight: 500;
  margin-bottom: 0.25rem;
  padding: ${(p) => (p.$padding ? '0.5rem 0 0.5rem 0.5rem' : '0')};
`;

export const CardTitleAnchor = styled.a`
  color: inherit;

  &:active {
    color: inherit;
  }
`;

// Content Components
export const TimelineContentDetails = styled.p<{ theme?: Theme }>`
  font-size: 0.85rem;
  font-weight: 400;
  margin: 0;
  width: 100%;
  color: ${(p) => p.theme.cardDetailsColor};
  line-height: 1.5;
`;

export const TimelineSubContent = styled.span<{
  fontSize?: string;
  theme?: Theme;
}>`
  margin-bottom: 0.5rem;
  display: block;
  font-size: ${(p) => p.fontSize && '0.8rem'};
  color: ${(p) => p.theme.cardDetailsColor};
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
  overflow-y: auto;
  transition: max-height 0.25s ease-in-out;
  width: ${(p) => (p.$borderLess ? 'calc(100% - 0.5rem)' : '100%')};
  padding: 0;

  // Height handling based on different conditions
  ${({ $useReadMore, $customContent, $showMore, height = 0, $textOverlay }) =>
    $useReadMore && !$customContent && !$showMore && !$textOverlay
      ? `max-height: ${height}px;`
      : 'height: 100%'};

  ${({
    $cardHeight = 0,
    $contentHeight = 0,
    height = 0,
    $showMore,
    $textOverlay,
  }) =>
    $showMore && !$textOverlay
      ? `max-height: ${($cardHeight ?? 0) + ($contentHeight ?? 0) - height}px;`
      : ''}

  ${(p) => (p.$customContent ? `height: 100%;` : '')}

  // Animation for show more
  ${({
    height = 0,
    $cardHeight = 0,
    $contentHeight = 0,
    $showMore,
    $useReadMore,
  }) =>
    $showMore && $useReadMore && $cardHeight
      ? css`
          animation: ${keyframes`
            0% {
              max-height: ${height}px;
            }
            100% {
             max-height: ${$cardHeight + $contentHeight - height}px;
            }
          `} 0.25s ease-in-out;
        `
      : ''}
      
  &.show-less {
    scrollbar-width: none;
    &::-webkit-scrollbar {
      width: 0;
    }
    overflow: hidden;
  }

  // Gradient for "show more" functionality
  --rc-gradient-color: ${(p) => p.$gradientColor};
  ${linearGradient}
`;

// Interactive Elements
export const ShowMore = styled.button<{
  show?: 'true' | 'false';
  theme?: Theme;
}>`
  align-items: center;
  align-self: flex-end;
  border-radius: 4px;
  cursor: pointer;
  display: ${(p) => (p.show === 'true' ? 'flex' : 'none')};
  font-size: 0.75rem;
  justify-self: flex-end;
  margin: auto 0.5em 0.5em auto;
  padding: 0.25em;
  color: ${(p) => p.theme.primary};
  border: 0;
  background: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const SlideShowProgressBar = styled.progress<{
  $color?: string;
  $duration?: number;
  $paused?: boolean;
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

  // Animation control
  ${(p) => {
    if (!p.$paused && p.$startWidth && p.$startWidth > 0) {
      return css`
        animation: ${slideAnimation(p.$startWidth, 0)} ${p.$duration}ms ease-in;
        animation-play-state: running;
      `;
    } else {
      return css`
        animation-play-state: paused;
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
  z-index: -1;
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
    p.theme?.primary ? `${p.theme.primary}30` : 'rgba(255, 217, 0, 0.3)'};
  color: inherit;
  font-weight: 600;
  padding: 0.1em 0.25em;
  margin: 0 -0.1em;
  border-radius: 2px;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  transition:
    background-color 0.2s ease-out,
    box-shadow 0.15s ease-out;

  &[data-current-match='true'] {
    background-color: ${(p) =>
      p.theme?.primary ? `${p.theme.primary}50` : 'rgba(255, 217, 0, 0.5)'};
    box-shadow: 0 0 0 1px ${(p) => p.theme?.primary ?? 'rgba(255, 217, 0, 0.5)'};
  }
`;
