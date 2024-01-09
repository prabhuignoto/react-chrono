import { Theme } from '@models/Theme';
import { TimelineMode } from '@models/TimelineModel';
import styled, { css, keyframes } from 'styled-components';

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

export const VerticalItemWrapper = styled.li<{
  $alternateCards?: boolean;
  $cardHeight?: number;
  $cardLess?: boolean;
  $isNested?: boolean;
  theme?: Theme;
}>`
  display: flex;
  position: relative;
  visibility: hidden;
  width: 100%;
  align-items: stretch;
  justify-content: center;
  margin: 1rem 0;
  list-style: none;

  &.left {
    margin-right: auto;
  }
  &.right {
    margin-left: auto;
  }

  &.visible {
    visibility: visible;
  }

  ${(p) =>
    p.$isNested
      ? css`
          position: relative;

          &:not(:last-child)::after {
            content: '';
            position: absolute;
            width: 2px;
            height: 2rem;
            background: ${(p) => p.theme.primary};
            left: 50%;
            transform: translateX(-50%);
            bottom: -2rem;
          }
        `
      : css``}
`;

export const TimelineCardContentWrapper = styled.div<{
  $alternateCards?: boolean;
  $cardLess?: boolean;
  $flip?: boolean;
  $noTitle?: boolean;
  height?: number;
}>`
  visibility: hidden;
  position: relative;
  display: flex;
  align-items: center;
  ${(p) => {
    if (p.$alternateCards) {
      return `width: 50%;`;
    } else if (p.$noTitle) {
      return `width: 95%;`;
    } else {
      return `width: 75%;`;
    }
  }}
  ${(p) => {
    if (!p.$flip) {
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

export const TimelineTitleWrapper = styled.div<{
  $alternateCards?: boolean;
  $flip?: boolean;
  $hide?: boolean;
  mode?: TimelineMode;
}>`
  align-items: center;
  display: ${(p) => (p.$hide && p.mode === 'VERTICAL' ? 'none' : 'flex')};
  ${(p) => (p.$alternateCards ? 'width: 50%' : 'width: 15%')};

  &.left {
    justify-content: ${(p) => (p.$flip ? 'flex-end' : 'flex-start')};
    order: ${(p) => (p.$flip && p.mode === 'VERTICAL_ALTERNATING' ? '1' : '3')};
  }

  &.right {
    ${(p) =>
      p.$flip
        ? `
      order: 3;
      justify-content: flex-start;`
        : `order: 1;
    justify-content: flex-end;`};
  }
`;
