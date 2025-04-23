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

type ContentT = Pick<
  TimelineProps,
  'theme' | 'slideShow' | 'mode' | 'borderLessCards'
>;

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
  align-items: flex-start;
  background: ${(p) => p.theme.cardBgColor};
  border-radius: 12px;
  display: flex;
  position: absolute;
  ${({ borderLessCards }) =>
    !borderLessCards ? `box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);` : 'none'};
  flex-direction: column;
  justify-content: flex-start;
  line-height: 1.5em;
  margin: ${(p) => (p.mode === 'HORIZONTAL' ? '0 auto' : '')};
  max-width: ${(p) => p.$maxWidth}px;
  // min-height: ${(p) => p.$minHeight}px;
  ${({ $textDensity, $customContent, $minHeight }) => css`
    ${$textDensity === 'HIGH'
      ? `${$customContent ? 'height' : 'min-height'}: ${$minHeight}px`
      : ''};
  `}
  ${(p) => (p.$textOverlay ? `min-height: ${p.$minHeight}px` : '')};
  position: relative;
  text-align: left;
  width: 98%;
  z-index: 0;
  padding: ${(p) => (p.$textOverlay ? '0' : '1rem')};
  transition: all 0.2s ease-in-out;
  overflow: ${(p) => (p.$textOverlay ? 'hidden' : 'visible')};
  ${(p) =>
    p.$textOverlay && p.mode === 'HORIZONTAL'
      ? `
        display: flex;
        flex-direction: column;
        max-height: 100%;
      `
      : ''}

  ${(p) =>
    p.$highlight
      ? css`
          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);

            &::before {
              content: '';
              height: 100%;
              left: 0;
              position: absolute;
              top: 0;
              width: 100%;
              z-index: -1;
              border: 2px solid ${p.theme.primary};
              border-radius: 12px;
            }
          }
        `
      : css``}

  ${(p) =>
    p.$isNested
      ? css`
          background: ${p.theme.nestedCardBgColor};
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.12);
          margin: 0.75rem 0;
          border-radius: 10px;
        `
      : css``}

  ${(p) =>
    p.$active
      ? css`
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.15);
        `
      : css``}

  height: ${(p) => (p.$textOverlay ? '0' : '')};

  &:focus {
    outline: none;
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.15);
    border: 2px solid rgba(0, 123, 255, 0.3);
  }

  ${(p) => {
    if (p.$slideShowActive && p.$active) {
      if (p.$slideShowType === 'slide_in') {
        return css`
          animation: ${slideInFromTop} 0.5s ease-in-out;
        `;
      } else if (
        p.$slideShowType === 'slide_from_sides' &&
        p.$branchDir === 'left'
      ) {
        return css`
          animation: ${slideInFromLeft} 0.5s ease-in-out;
        `;
      } else if (
        p.$slideShowType === 'slide_from_sides' &&
        p.$branchDir === 'right'
      ) {
        return css`
          animation: ${slideFromRight} 0.5s ease-in-out;
        `;
      } else {
        return css`
          animation: ${reveal} 0.5s ease-in-out;
        `;
      }
    }
    return '';
  }}

  ${(p) => {
    if (p.$slideShowActive && p.$active) {
      return css`
        opacity: 1;
        animation-timing-function: ease-in-out;
        animation-duration: 0.5s;
      `;
    }

    if (p.$slideShowActive && !p.$active) {
      return css`
        opacity: 0;
      `;
    }
    return '';
  }}
`;

export const TimelineCardHeader = styled.header`
  width: 100%;
  padding: 0 0 0.75rem 0;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

export const CardSubTitle = styled.h2<{
  $fontSize?: string;
  $padding?: boolean;
  dir?: string;
  theme?: Theme;
}>`
  color: ${(p) => p.theme.cardSubtitleColor};
  font-size: ${(p) => p.$fontSize};
  font-weight: 500;
  margin: 0 0 0.5rem 0;
  text-align: left;
  width: 100%;
  padding: ${(p) => (p.$padding ? '0.5rem 0 0.5rem 0' : '0')};
  line-height: 1.4;
`;

export const CardTitle = styled.h1<{
  $fontSize: string;
  $padding?: boolean;
  dir?: string;
  theme: Theme;
}>`
  color: ${(p) => p.theme.cardTitleColor};
  font-size: ${(p) => p.$fontSize};
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  text-align: left;
  width: 100%;
  padding: ${(p) => (p.$padding ? '0.2rem 0 0.25rem 0' : '0')};
  line-height: 1.3;

  &.active {
    color: ${(p) => p.theme.primary};
  }
`;

export const CardTitleAnchor = styled.a`
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #0275d8;
  }

  &:active {
    color: inherit;
  }
`;

export const TimelineContentDetails = styled.p<{ theme?: Theme }>`
  font-size: 0.9rem;
  font-weight: 400;
  margin: 0 0 1rem 0;
  width: 100%;
  color: ${(p) => p.theme.cardDetailsColor};
  word-break: break-word;
  overflow-wrap: break-word;
  line-height: 1.6;
  padding: 0;

  &.timeline-content-details {
    width: 100%;
  }

  /* Ensure highlighted text is visible */
  span,
  mark {
    display: inline !important;
  }

  /* Stronger styling for highlighted content */
  &.has-search,
  &.highlight-container {
    mark {
      display: inline !important;
    }
  }
`;

export const TimelineSubContent = styled.span<{
  fontSize?: string;
  theme?: Theme;
}>`
  margin-bottom: 1rem;
  display: block;
  font-size: ${(p) => p.fontSize || '0.9rem'};
  color: ${(p) => p.theme.cardDetailsColor};
  word-break: break-word;
  overflow-wrap: break-word;
  line-height: 1.6;
  padding: 0;

  /* Ensure highlighted text is visible */
  span,
  mark {
    display: inline !important;
  }

  /* Stronger styling for highlighted content */
  &.highlight-container {
    mark {
      display: inline !important;
      background-color: ${(p) => p.theme && p.theme.primary}99 !important;
      color: #000000 !important;
      font-weight: bold !important;
      padding: 0 3px !important;
      margin: 0 1px !important;
      border-radius: 3px !important;
      border: 1px solid ${(p) => p.theme && p.theme.primary} !important;
      box-shadow: 0 0 2px ${(p) => p.theme && p.theme.primary} !important;
      position: relative !important;
      z-index: 5 !important;
    }
  }
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
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: ${(p) => (p.$textOverlay ? '0' : '0.5em')};
  margin-bottom: ${(p) => (p.$textOverlay ? '0' : '0.5em')};
  position: relative;
  ${({ $useReadMore, $customContent, $showMore, height = 0, $textOverlay }) =>
    $useReadMore && !$customContent && !$showMore && !$textOverlay
      ? `max-height: ${height}px;`
      : $textOverlay
        ? 'max-height: 100%; height: 100%;'
        : 'height: 100%;'}
  ${({
    $cardHeight = 0,
    $contentHeight = 0,
    height = 0,
    $showMore,
    $textOverlay,
  }) =>
    $showMore && !$textOverlay
      ? `max-height: ${($cardHeight || 0) + ($contentHeight || 0) - height}px;`
      : ''}
  overflow-x: hidden;
  overflow-y: ${(p) => (p.$textOverlay ? 'auto' : 'auto')};
  scrollbar-color: ${(p) => p.theme?.primary} default;
  scrollbar-width: thin;
  transition: max-height 0.25s ease-in-out;
  width: ${(p) =>
    p.$textOverlay
      ? '100%'
      : p.$borderLess
        ? 'calc(100% - 0.5rem)'
        : 'calc(95% - 0.5rem)'};
  padding: ${(p) => (p.$textOverlay ? '0.5rem 0.75rem' : '0.25rem 0.25rem')};

  ${(p) => (p.$customContent ? `height: 100%;` : '')}

  /* Special styling for containers with search highlighting */
  &.has-search-highlighting {
    mark {
      display: inline !important;
      background-color: ${(p) => p.theme?.primary}99 !important;
      color: #000000 !important;
      font-weight: bold !important;
      padding: 0 3px !important;
      margin: 0 1px !important;
      border-radius: 3px !important;
      border: 1px solid ${(p) => p.theme?.primary} !important;
      box-shadow: 0 0 2px ${(p) => p.theme?.primary} !important;
      position: relative !important;
      z-index: 5 !important;
    }

    p,
    span {
      mark {
        display: inline !important;
      }
    }
  }

  $${({
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
    &::-webkit-scrollbar {
    width: 0.3em;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(p) => p.theme?.primary};
    outline: 1px solid ${(p) => p.theme?.primary};
  }

  &.show-less {
    scrollbar-width: none;

    &::-webkit-scrollbar {
      width: 0;
    }
    overflow: hidden;
  }

  --rc-gradient-color: ${(p) => p.$gradientColor};
  ${linearGradient}
`;

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
  margin-bottom: 0.5em;
  margin-left: 0.5em;
  margin-right: 0.5em;
  margin-top: auto;
  padding: 0.25em;
  color: ${(p) => p.theme.primary};
  border: 0;
  background: none;

  &:hover {
    text-decoration: underline;
  }
`;

const slideAnimation = (start?: number, end?: number) => keyframes`
  0% {
    width: ${start}px;
  }
  100% {
    width: ${end}px;
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
  border-radius: 2px;gggg
  border: 0;

  ${(p) => {
    if (p.$paused) {
      return css`
        left: 50%;
        transform: translateX(-50%);
      `;
    }
    return '';
  }}

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

export const ChevronIconWrapper = styled.span<{ collapsed?: 'true' | 'false' }>`
  align-items: center;
  display: flex;
  height: 1.25em;
  justify-content: center;
  margin-left: 0.2em;
  margin-top: 0.2em;
  width: 1.25em;
  ${(p) =>
    p.collapsed === 'false'
      ? `
      transform: rotate(90deg);
  `
      : `transform: rotate(-90deg)`};

  svg {
    height: 100%;
    width: 100%;
  }
`;

export const TriangleIconWrapper = styled.span<{
  dir?: string;
  offset?: number;
  theme?: Theme;
  flip?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: calc(50%);
  background: ${(p) => p.theme.cardBgColor};
  transform: translateY(-50%)
    rotate(
      ${(p) => {
        // When flip mode is enabled, we need to adjust the rotation
        if (p.flip) {
          return p.dir === 'left' ? '225deg' : '45deg';
        }
        // Default rotation
        return p.dir === 'left' ? '225deg' : '45deg';
      }}
    );
  z-index: 1; /* Ensure visibility */

  & svg {
    width: 100%;
    height: 100%;
    fill: #fff;
  }

  ${(p) => {
    // For flip mode, we need to swap the positioning logic
    if (p.flip) {
      return p.dir === 'right'
        ? `right: ${p.offset || -8}px;`
        : `left: ${p.offset || -8}px;`;
    }
    // Default positioning
    return p.dir === 'left'
      ? `right: ${p.offset || -8}px;`
      : `left: ${p.offset || -8}px;`;
  }}
`;
