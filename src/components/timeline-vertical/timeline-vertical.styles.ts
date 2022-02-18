import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { TimelineMode } from '../../models/TimelineModel';

export const TimelineVerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1em;
  outline: 0;
`;

const animateVisible = keyframes`
  from {
    opacity: 0;
    visibility: hidden;
  }
  to {
    opacity: 1;
    visibility: visible;
  }
`;

export const VerticalItemWrapper = styled.div<{
  alternateCards?: boolean;
  cardHeight?: number;
  cardLess?: boolean;
}>`
  display: flex;
  position: relative;
  visibility: hidden;
  width: 100%;
  align-items: stretch;

  &.left {
    margin-right: auto;
  }
  &.right {
    margin-left: auto;
  }

  &.visible {
    visibility: visible;
  }

  min-height: ${(p) => p.cardHeight}px;
`;

export const VerticalCircleWrapper = styled.div<{
  alternateCards?: boolean;
  bg?: string;
  cardLess?: boolean;
  width?: number;
}>`
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  width: ${(p) => (p.cardLess ? '5%' : '10%')};

  &.left {
    order: 2;
  }

  &.right {
    order: 1;
  }

  &::after {
    background: ${(p) => p.bg};
    content: '';
    display: block;
    height: 100%;
    left: 0;
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    right: 0;
    width: ${(p) => (p.width ? `${p.width}px` : '4px')};
    z-index: 0;
  }
`;

export const TimelineCardContentWrapper = styled.div<{
  alternateCards?: boolean;
  cardLess?: boolean;
  flip?: boolean;
  height?: number;
  noTitle?: boolean;
}>`
  visibility: hidden;
  position: relative;
  display: flex;
  align-items: center;
  min-height: ${(p) => (p.height ? `${p.height}px` : '80px')};
  ${(p) => {
    if (p.alternateCards) {
      return `width: 50%;`;
    } else if (p.noTitle) {
      return `width: 90%;`;
    } else {
      return `width: 75%;`;
    }
  }}
  ${(p) => {
    if (!p.flip) {
      return `
        &.left {
          order: 1;
          justify-content: flex-end;
        }
        &.right {
          order: 3;
          justify-content: flex-start;
        }
      `;
    } else {
      return `
        justify-content: flex-end;
        &.left {
          order: 3;
        }
        &.right {
          order: 1;
        }
      `;
    }
  }}
    &.visible {
    visibility: visible;
    animation: ${animateVisible} 0.25s ease-in;
  }
`;

export const VerticalCircleContainer = styled.div`
  position: relative;
  z-index: 1;
`;

export const TimelineTitleWrapper = styled.div<{
  alternateCards?: boolean;
  flip?: boolean;
  hide?: boolean;
  mode?: TimelineMode;
}>`
  align-items: center;
  display: ${(p) => (p.hide && p.mode === 'VERTICAL' ? 'none' : 'flex')};
  ${(p) => (p.alternateCards ? 'width: 50%' : 'width: 15%')};

  &.left {
    justify-content: ${(p) => (p.flip ? 'flex-end' : 'flex-start')};
    order: ${(p) => (p.flip && p.mode === 'VERTICAL_ALTERNATING' ? '1' : '3')};
  }

  &.right {
    ${(p) =>
      p.flip
        ? `
      order: 3;
      justify-content: flex-start;`
        : `order: 1;
    justify-content: flex-end;`};
  }
`;
