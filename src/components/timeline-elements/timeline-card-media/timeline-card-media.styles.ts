import { Theme } from '@models/Theme';
import { TimelineMode } from '@models/TimelineModel';
import styled, { css } from 'styled-components';
import { ScrollBar } from '../../common/styles';

export const linearGradient = css`
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2rem;
    background: linear-gradient(
      0deg,
      var(--rc-gradient-color) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }
`;

export const MediaWrapper = styled.div<{
  $active?: boolean;
  $cardHeight?: number;
  $slideShowActive?: boolean;
  $textOverlay?: boolean;
  align?: 'left' | 'right' | 'center';
  dir?: string;
  mode?: TimelineMode;
  theme?: Theme;
}>`
  align-items: flex-start;
  align-self: center;
  background: ${(p) => (!p.$textOverlay ? p.theme?.cardMediaBgColor : 'none')};
  border-radius: 4px;
  flex-direction: row;
  height: ${(p) => (p.$textOverlay ? 'calc(100% - 1em)' : '0')};
  padding: 0.5em;
  // pointer-events: ${(p) => (!p.$active && p.$slideShowActive ? 'none' : '')};
  position: relative;
  text-align: ${(p) => p.align};
  width: calc(100% - 1em);

  ${(p) => (p.$cardHeight ? `min-height: ${p.$cardHeight}px;` : '')};
  ${(p) => {
    if (p.mode === 'HORIZONTAL') {
      return `
        justify-content: flex-start;
      `;
    } else {
      if (p.dir === 'left') {
        return `
        justify-content: flex-start;
      `;
      } else {
        return `
        justify-content: flex-end;
      `;
      }
    }
  }}
`;

export const CardImage = styled.img<{
  $enableBorderRadius?: boolean;
  $visible?: boolean;
  dir?: string;
  fit?: string;
  mode?: TimelineMode;
}>`
  flex: 4;
  justify-self: center;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  width: 100%;
  object-fit: ${(p) => p.fit || 'cover'};
  object-position: center;
  visibility: ${(p) => (p.$visible ? 'visible' : 'hidden')};
  border-radius: ${(p) => (p.$enableBorderRadius ? '6px' : '0')};
`;

export const CardVideo = styled.video<{ height?: number }>`
  max-width: 100%;
  max-height: 100%;
  margin-left: auto;
  margin-right: auto;
`;

export const MediaDetailsWrapper = styled.div<{
  $absolutePosition?: boolean;
  $borderLessCard?: boolean;
  $expandFull?: boolean;
  $expandable?: boolean;
  $gradientColor?: string | null;
  $showText?: boolean;
  $textInMedia?: boolean;
  mode?: TimelineMode;
  theme?: Theme;
}>`
  bottom: 0;
  left: 0;
  right: 0;
  margin-right: auto;
  width: ${(p) => {
    switch (p.mode) {
      case 'HORIZONTAL':
      case 'VERTICAL':
      case 'VERTICAL_ALTERNATING':
        return `calc(90% - 0rem)`;
    }
  }};
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  ${(p) => {
    if (p.$textInMedia && p.$expandFull) {
      return css`
        height: 100%;
        width: 100%;
        border: 0;
      `;
    }

    if (!p.$showText) {
      return css`
        height: 15%;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        border-radius: 10px;
      `;
    }

    if (p.$textInMedia && p.$expandable) {
      return css`
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        height: 50%;
      `;
    }
  }}
  position: ${(p) => (p.$absolutePosition ? 'absolute' : 'relative')};
  ${(p) =>
    p.$absolutePosition
      ? `
    left: 50%;
    bottom: ${p.$expandFull ? '0%' : ' 5%'};
    transform: translateX(-50%);
    background: ${
      p.$showText ? p.theme?.cardDetailsBackGround : p.theme?.cardBgColor
    };
    // backdrop-filter: blur(1px);
    padding: 0.25rem;
    ${p.$showText ? `overflow: auto;` : `overflow: hidden;`}
    transition: height 0.25s ease-out, width 0.25s ease-out, bottom 0.25s ease-out, background 0.25s ease-out;
  `
      : ``}

  ${({ $borderLessCard }) =>
    $borderLessCard
      ? `border-radius: 6px; box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);`
      : ``}
  --rc-gradient-color: ${(p) => p.$gradientColor};
  ${(p) => (p.$gradientColor ? linearGradient : null)}
`;

export const ErrorMessage = styled.span`
  color: #a3a3a3;
  left: 50%;
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
`;

export const IFrameVideo = styled.iframe`
  position: relative;
  height: 100%;
  width: 100%;
`;

export const DetailsTextWrapper = styled.div<{
  $expandFull?: boolean;
  $show?: boolean;
  background: string;
  theme?: Theme;
}>`
  align-self: center;
  display: flex;
  transition: height 0.5s ease;
  width: calc(100%);
  background: ${(p) => p.background};
  color: ${(p) => p.theme?.cardDetailsColor};
  padding: 0.5rem;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  position: relative;
  align-items: flex-start;
  justify-content: center;

  ${ScrollBar}

  ${(p) => {
    if (p.$expandFull) {
      return `
        overflow: auto;
      `;
    } else {
      return `
        overflow: hidden;
      `;
    }
  }}

  ${(p) =>
    p.$show
      ? `
    height: 100%;`
      : `
    height: 0;
  `}

  ${(p) => !p.$expandFull && linearGradient}
`;

export const CardMediaHeader = styled.div`
  padding: 0.5rem 0 0.5rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageWrapper = styled.div<{ height?: number }>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 6px;
`;
