import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Theme } from '../../../models/Theme';

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
  width: 5em;
`;

interface CircleModel {
  theme?: Theme;
  dimension?: number;
}

export const Circle = styled.div<CircleModel>`
  border-radius: 50%;
  cursor: pointer;
  height: ${(p) => p.dimension}px;
  width: ${(p) => p.dimension}px;

  &.active {
    &.using-icon {
      /* transform: scale(1.75); */
    }
    &:not(.using-icon) {
      transform: scale(1.25);
    }

    &::after {
      border-radius: 50%;
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
    background: ${(p: CircleModel) => p.theme?.primary};

    &.active {
      &::after {
        background: ${(p) => p.theme.secondary};
      }
    }

    &.in-active {
      animation: ${scaleDown} 0.1s ease-in;
    }
  }

  &.using-icon {
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(1.25);

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
  position?: string;
  active?: boolean;
}>`
  align-items: flex-start;
  animation: ${show} 0.25s ease-in;

  &.horizontal {
    min-width: 400px;
  }

  &.vertical {
    width: calc(100% - 5em);
    margin-left: auto;
    flex-direction: column;
  }
`;
