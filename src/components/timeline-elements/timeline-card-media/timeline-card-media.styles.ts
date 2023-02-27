import styled from 'styled-components';
import { Theme } from '../../../models/Theme';
import { TimelineMode } from '../../../models/TimelineModel';

export const MediaWrapper = styled.div<{
  active?: boolean;
  align?: 'left' | 'right' | 'center';
  cardHeight?: number;
  dir?: string;
  fullHeight?: boolean;
  mode?: TimelineMode;
  slideShowActive?: boolean;
  theme?: Theme;
}>`
  ${(p) => (p.cardHeight ? `min-height: ${p.cardHeight}px;` : '')};
  align-items: center;
  align-self: center;
  background: ${(p) => (p.active ? `rgba(${p.theme?.secondary}, 0.35)` : '')};
  border-radius: 4px;
  flex-direction: row;
  padding: 0.5em;
  pointer-events: ${(p) => (!p.active && p.slideShowActive ? 'none' : '')};
  position: relative;
  text-align: ${(p) => p.align};
  width: calc(100% - 1em);
  height: ${(p) => (p.fullHeight ? 'calc(100% - 1em)' : '0')};

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
  active?: boolean;
  dir?: string;
  enableBorderRadius?: boolean;
  mode?: TimelineMode;
  visible?: boolean;
}>`
  flex: 4;
  justify-self: center;
  margin-left: auto;
  margin-right: auto;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  visibility: ${(p) => (p.visible ? 'visible' : 'hidden')};
  border-radius: ${(p) => (p.enableBorderRadius ? '6px' : '0')};
`;

export const CardVideo = styled.video<{ height?: number }>`
  max-width: 100%;
  max-height: 100%;
  margin-left: auto;
  margin-right: auto;
`;

export const MediaDetailsWrapper = styled.div<{
  absolutePosition?: boolean;
  mode?: TimelineMode;
}>`
  bottom: 0;
  left: 0;
  right: 0;
  margin-right: auto;
  width: ${(p) => {
    switch (p.mode) {
      case 'HORIZONTAL':
        return '100%';
      case 'VERTICAL':
        return '100%';
      case 'VERTICAL_ALTERNATING':
        return '100%';
    }
  }};
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 6px;
  // padding-bottom: 0.5em;
  position: ${(p) => (p.absolutePosition ? 'absolute' : 'relative')};
  background: ${(p) =>
    p.absolutePosition ? 'rgba(255,255,255,0.9)' : 'transparent'};
  ${(p) =>
    p.absolutePosition
      ? `
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    padding: 0.5rem;
  `
      : ``}
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
