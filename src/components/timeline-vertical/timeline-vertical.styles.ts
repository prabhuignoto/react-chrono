import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

export const TimelineVerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 1rem;
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

export const VerticalItemWrapper = styled.div<{ alternateCards?: boolean }>`
  align-items: center;
  display: flex;
  position: relative;
  visibility: hidden;
  width: 100%;

  &.left {
    margin-right: auto;
  }
  &.right {
    margin-left: auto;
  }

  &.visible {
    visibility: visible;
  }
`;

export const TreeTrunkWrapper = styled.div<{
  bg?: string;
  alternateCards?: boolean;
}>`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 10%;

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
    width: 3px;
    z-index: 0;
  }
`;

export const TimelineCardContentWrapper = styled.div<{
  alternateCards?: boolean;
}>`
  visibility: hidden;
  ${(p) => (p.alternateCards ? 'width: 45%;' : 'width: 75%; height: 85%')};
  /* padding: 1rem 0; */

  &.left {
    order: 1;
  }

  &.right {
    order: 2;
  }

  &.visible {
    visibility: visible;
    animation: ${animateVisible} 0.25s ease-in;
  }
`;

export const TrunkPointWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

export const TimelineTitleWrapper = styled.div<{
  alternateCards?: boolean;
}>`
  align-items: center;
  display: flex;
  ${(p) => (p.alternateCards ? 'width: 45%' : 'width: 10%')};

  &.left {
    justify-content: flex-start;
    order: 3;
  }

  &.right {
    justify-content: flex-end;
    order: 1;
  }
`;
