import styled from 'styled-components';
import { Theme } from '../../../models/Theme';
import { TimelineMode } from '../../../models/TimelineModel';

export const MediaWrapper = styled.div<{
  active?: boolean;
  align?: 'left' | 'right' | 'center';
  cardHeight?: number;
  dir?: string;
  mode?: TimelineMode;
  slideShowActive?: boolean;
  textInsideMedia?: boolean;
  theme?: Theme;
}>`
  ${(p) => (p.cardHeight ? `min-height: ${p.cardHeight}px;` : '')};
  align-items: center;
  align-self: center;
  background: ${(p) => (p.active ? `rgba(${p.theme?.secondary}, 0.35)` : '')};
  border-radius: 4px;
  flex-direction: row;
  height: ${(p) => (p.textInsideMedia ? 'calc(100% - 1em)' : '0')};
  padding: 0.5em;
  pointer-events: ${(p) => (!p.active && p.slideShowActive ? 'none' : '')};
  position: relative;
  text-align: ${(p) => p.align};
  width: calc(100% - 1em);

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
  borderLessCard?: boolean;
  expandFull?: boolean;
  mode?: TimelineMode;
  showText?: boolean;
  textInMedia?: boolean;
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
        return `calc(100% - 0rem)`;
    }
  }};
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  ${(p) => {
    if (p.textInMedia && p.expandFull) {
      return `
        height: 100%;
      `;
    }

    if (!p.showText) {
      return `
        height: 10%;
      `;
    }

    if (p.textInMedia) {
      return `
        height: 50%;
      `;
    }
  }}
  position: ${(p) => (p.absolutePosition ? 'absolute' : 'relative')};
  ${(p) =>
    p.absolutePosition
      ? `
    left: 50%;
    bottom: 0%;
    transform: translateX(-50%);
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(1px);
    padding: 0.25rem;
    ${p.showText ? `overflow: auto;` : `overflow: hidden;`}
    transition: height 0.25s ease;
  `
      : ``}

  ${({ borderLessCard }) =>
    borderLessCard
      ? `border-radius: 6px; box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);`
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

export const DetailsTextWrapper = styled.div<{
  expandFull?: boolean;
  height?: number;
  show?: boolean;
  theme?: Theme;
}>`
  align-self: center;
  display: flex;
  transition: height 0.5s ease;

  scrollbar-color: ${(p) => p.theme?.primary} default;
  scrollbar-width: thin;

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

  ${(p) => {
    if (p.expandFull) {
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
    p.show
      ? `
    height: 100%;`
      : `
    height: 0;
  `}
`;

const Button = styled.button`
  align-items: center;
  background: none;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  height: 1.5rem;
  justify-content: center;
  padding: 0;
  position: absolute;
  width: 1.5rem;
  z-index: 10px;

  svg {
    width: 70%;
    height: 70%;
  }
`;

export const ExpandButton = styled(Button)<{
  expandFull?: boolean;
  theme: Theme;
}>`
  right: 0.5rem;
  top: 0.5rem;

  &:hover {
    color: ${(p) => p.theme?.primary};
  }
`;

export const ShowHideTextButton = styled(Button)<{
  showText?: boolean;
  theme: Theme;
}>`
  top: 0.5rem;
  right: 2.5rem;

  &:hover {
    color: ${(p) => p.theme?.primary};
  }
`;
