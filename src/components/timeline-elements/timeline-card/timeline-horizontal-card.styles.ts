import { Theme } from '@models/Theme';
import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  border: 1px solid transparent;
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;

  &.vertical {
    justify-content: flex-start;
  }
`;

export const Item = styled.div``;

const show = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.8;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 123, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
  }
`;

export const ShapeWrapper = styled.div`
  /* height: 100%; */
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 5em;
`;

type ShapeModel = {
  $timelinePointShape?: 'circle' | 'square' | 'diamond';
  dimension?: number;
  theme?: Theme;
};

const ShapeBorderStyle = (p: Pick<ShapeModel, '$timelinePointShape'>) => {
  if (p.$timelinePointShape === 'circle') {
    return 'border-radius: 50%;';
  } else if (p.$timelinePointShape === 'square') {
    return 'border-radius: 2px;';
  } else if (p.$timelinePointShape === 'diamond') {
    return `border-radius: 0;`;
  }
};

export const Shape = styled.div<ShapeModel>`
  ${ShapeBorderStyle}
  cursor: pointer;
  height: ${(p) => p.dimension}px;
  width: ${(p) => p.dimension}px;
  transform: ${(p) =>
    p.$timelinePointShape === 'diamond' ? 'rotate(45deg)' : ''};
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;

  /* Reset button styles when used as a button */
  background: none;
  border: none;
  padding: 0;

  /* Ripple effect */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${(p) => (p.dimension ? Math.round(p.dimension * 0.5) : 10)}px;
    height: ${(p) => (p.dimension ? Math.round(p.dimension * 0.5) : 10)}px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    transform: scale(0) translate(-50%, -50%);
    transform-origin: top left;
    pointer-events: none;
    z-index: 10;
    opacity: 0;
  }

  &:active::before {
    animation: ${ripple} 0.6s ease-out;
  }

  /* Improve focus styles for accessibility */
  &:focus-visible {
    outline: 3px solid ${(p) => p.theme?.primary ?? '#007bff'};
    outline-offset: 2px;
  }

  /* Add subtle hover effect */
  &:hover:not(:disabled) {
    transform: ${(p) =>
      p.$timelinePointShape === 'diamond'
        ? 'rotate(45deg) scale(1.08)'
        : 'scale(1.08)'};
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled) {
    transform: ${(p) =>
      p.$timelinePointShape === 'diamond'
        ? 'rotate(45deg) scale(0.95)'
        : 'scale(0.95)'};
  }

  &.active {
    &.using-icon {
      transform: ${(p) =>
        p.$timelinePointShape === 'diamond'
          ? 'rotate(45deg) scale(1.1)'
          : 'scale(1.1)'};
      animation: ${pulse} 1.5s infinite;
    }
    &:not(.using-icon) {
      transform: ${(p) =>
        p.$timelinePointShape === 'diamond' ? 'rotate(45deg)' : ''};
    }

    &::after {
      ${ShapeBorderStyle}
      content: '';
      display: block;
      height: ${(p) => (p.dimension ? Math.round(p.dimension * 0.75) : 20)}px;
      width: ${(p) => (p.dimension ? Math.round(p.dimension * 0.75) : 20)}px;
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%) translateX(-50%);
      z-index: -1;
      transition: all 0.3s ease-in-out;
    }
  }

  &:not(.using-icon) {
    background: ${(p: ShapeModel) => p.theme?.primary};

    &.active {
      background: ${(p: ShapeModel) => p.theme?.secondary};
      border: ${(p) => (p.dimension ? Math.round(p.dimension * 0.2) : '3')}px
        solid ${(p: ShapeModel) => p.theme?.primary};
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
      animation: ${pulse} 1.5s infinite;
    }

    &:disabled {
      opacity: 0.6;
      cursor: default;
    }
  }

  &.using-icon {
    background: ${(p) => p.theme?.iconBackgroundColor};
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 90%;
      max-height: 90%;
    }

    &:disabled {
      opacity: 0.6;
      cursor: default;
    }
  }
`;

export const TimelineTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &.vertical {
    margin-bottom: 1em;
  }

  &.horizontal {
    position: absolute;
    top: 0;
  }
`;

export const TimelineContentContainer = styled.div<{
  $active?: boolean;
  $cardWidth?: number;
  $highlight?: boolean;
  position?: string;
  theme?: Theme;
}>`
  align-items: flex-start;
  animation: ${show} 0.25s ease-in;

  outline: 2px solid
    ${(p) => (p.$highlight && p.$active ? p.theme?.primary : 'transparent')};

  margin: 1rem;

  &.horizontal {
    min-width: ${(p) => p.$cardWidth}px;
  }

  &.vertical {
    width: calc(100% - 5em);
    margin-left: auto;
    flex-direction: column;
  }
`;
