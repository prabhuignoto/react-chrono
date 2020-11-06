import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { Theme } from '../../../models/Theme';

export const Wrapper = styled.div`
  align-items: center;
  border: 1px solid transparent;
  display: flex;
  justify-content: center;
  position: relative;

  &.vertical {
    justify-content: flex-start;
  }
`;

export const Item = styled.div``;

const scaleUp = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.4);
  }
`;

const scaleDown = keyframes`
  from {
    transform: scale(1.4);
  }
  to {
    transform: scale(1);
  }
`;

const show = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const CircleWrapper = styled.div`
  /* height: 100%; */
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 5rem;
`;

export const Circle = styled.div<{ theme: Theme }>`
  background: ${(p) => p.theme.primary};
  border-radius: 50%;
  cursor: pointer;
  height: 1rem;
  width: 1rem;

  &.active {
    animation: ${scaleUp} 0.1s ease-in;
    transform: scale(1.4);

    &::after {
      background: ${(p) => p.theme.secondary};
      border-radius: 50%;
      content: '';
      display: block;
      height: 0.75rem;
      left: 50%;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%) translateX(-50%);
      width: 0.75rem;
      z-index: -1;
    }
  }

  &.in-active {
    animation: ${scaleDown} 0.1s ease-in;
    transform: scale(1);
  }
`;

export const TimelineTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &.vertical {
    margin-bottom: 1rem;
  }

  &.horizontal {
    position: absolute;
    bottom: 2rem;
  }
`;

export const TimelineContentContainer = styled.div<{
  position?: string;
  active?: boolean;
}>`
  align-items: flex-start;
  animation: ${show} 0.25s ease-in;

  &.horizontal {
    min-width: 400px;
  }

  &.vertical {
    width: calc(100% - 5rem);
    margin-left: auto;
    flex-direction: column;
  }
`;
