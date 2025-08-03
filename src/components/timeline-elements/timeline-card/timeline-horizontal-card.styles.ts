import { Theme } from '@models/Theme';
import styled, { keyframes } from 'styled-components';
import { zIndex } from '../../../styles/z-index';

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
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.6);
  }
  70% {
    box-shadow: 0 0 0 12px rgba(0, 123, 255, 0);
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
    z-index: ${zIndex.timelinePoint + 1}; /* Above the timeline point */
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
        ? 'rotate(45deg) scale(1.12)'
        : 'scale(1.12)'};
    box-shadow: 0 0 0 4px ${(p) => p.theme?.primary}22;
  }

  &:active:not(:disabled) {
    transform: ${(p) =>
      p.$timelinePointShape === 'diamond'
        ? 'rotate(45deg) scale(0.98)'
        : 'scale(0.98)'};
    transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
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
      z-index: ${zIndex.timelinePoint - 1}; /* Behind the timeline point */
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
  outline-offset: 2px;
  border-radius: 12px;

  margin: 1rem;

  &.horizontal {
    min-width: ${(p) => p.$cardWidth}px;
  }

  &.vertical {
    width: calc(100% - 5em);
    margin-left: auto;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    margin: 0.5rem;
    outline-width: 1px;

    &.horizontal {
      min-width: auto;
      width: 100%;
    }

    &.vertical {
      width: calc(100% - 3.5em);
    }
  }
`;

// Card container with improved cross-browser support
export const CardContainer = styled.div<{ theme: Theme }>`
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 250px;
  max-width: 350px;
  margin: 0.5rem;
  padding: 1.5rem;
  background: ${(p) => p.theme.cardBgColor};
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

  &:hover {
    -webkit-transform: translateY(-4px);
    transform: translateY(-4px);
    -webkit-box-shadow:
      0 4px 8px rgba(0, 0, 0, 0.08),
      0 12px 24px rgba(0, 0, 0, 0.12),
      0 16px 32px rgba(0, 0, 0, 0.08);
    box-shadow:
      0 4px 8px rgba(0, 0, 0, 0.08),
      0 12px 24px rgba(0, 0, 0, 0.12),
      0 16px 32px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    min-width: 200px;
    max-width: 100%;
    margin: 0.25rem;
    padding: 1rem;
    border-radius: 8px;

    &:hover {
      transform: none;
      -webkit-transform: none;
    }
  }
`;
