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
  padding: 0.5rem 0;
  transition: all 0.2s ease;

  &.vertical {
    justify-content: flex-start;
    margin-bottom: 1rem;
  }

  &:hover {
    transform: scale(1.01);
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
  return 'border-radius: 50%;'; // Default to circle
};

export const Shape = styled.div<ShapeModel>`
  ${ShapeBorderStyle}
  cursor: pointer;
  height: ${(p) => p.dimension}px;
  width: ${(p) => p.dimension}px;
  transform: ${(p) =>
    p.$timelinePointShape === 'diamond' ? 'rotate(45deg)' : ''};
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition:
    transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    box-shadow 0.25s ease,
    background-color 0.25s ease;

  &:hover {
    transform: ${(p) =>
      p.$timelinePointShape === 'diamond'
        ? 'rotate(45deg) scale(1.08)'
        : 'scale(1.08)'};
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow:
      0 0 0 3px rgba(0, 123, 255, 0.3),
      0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &.active {
    &.using-icon {
      /* transform: scale(1.75); */
    }
    &:not(.using-icon) {
      transform: ${(p) =>
        p.$timelinePointShape === 'diamond' ? 'rotate(45deg)' : ''};
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
    }

    &:hover {
      transform: ${(p) =>
        p.$timelinePointShape === 'diamond'
          ? 'rotate(45deg) scale(1.08)'
          : 'scale(1.08)'};
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
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
    }
  }

  &:not(.using-icon) {
    background: ${(p: ShapeModel) => p.theme?.primary};

    &.active {
      background: ${(p: ShapeModel) => p.theme?.secondary};
      border: ${(p) => (p.dimension ? Math.round(p.dimension * 0.2) : '3')}px
        solid ${(p: ShapeModel) => p.theme?.primary};
    }

    &.in-active {
    }
  }

  &.using-icon {
    background: ${(p) => p.theme?.iconBackgroundColor};
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 2px solid transparent;
    transition:
      transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      box-shadow 0.25s ease,
      background-color 0.25s ease,
      border 0.25s ease;

    img {
      max-width: 85%;
      max-height: 85%;
      transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      object-fit: cover;
    }

    &:hover {
      border: 2px solid ${(p) => p.theme?.primary};
      img {
        transform: scale(1.15);
      }
    }
  }
`;

export const TimelineTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem 0;
  transition: all 0.2s ease;

  &.vertical {
    margin-bottom: 1.25em;
    padding-left: 0.5rem;
  }

  &.horizontal {
    position: absolute;
    top: 0;
    font-weight: 500;
    padding-top: 0.75rem;
  }

  &:hover {
    transform: translateY(-1px);
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
  border-radius: 12px;
  transition: all 0.2s ease;

  outline: ${(p) =>
    p.$highlight && p.$active
      ? `2px solid ${p.theme?.primary}`
      : '1px solid transparent'};

  margin: 1.25rem;

  &.horizontal {
    min-width: ${(p) => p.$cardWidth}px;
  }

  &.vertical {
    width: calc(100% - 5.5em);
    margin-left: auto;
    flex-direction: column;
  }

  &:hover {
    transform: ${(p) => (p.$active ? 'translateY(-2px)' : 'none')};
  }
`;
