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

  &.active {
    &.using-icon {
      /* transform: scale(1.75); */
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

    img {
      max-width: 90%;
      max-height: 90%;
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
