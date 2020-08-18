import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div`
  align-items: center;
  border: 1px solid transparent;
  display: flex;
  justify-content: center;
  position: relative;
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

export const Circle = styled.div`
  background: #0f52ba;
  border-radius: 50%;
  cursor: pointer;
  height: 1rem;
  margin: 1rem;
  position: relative;
  width: 1rem;

  &.active {
    animation: ${scaleUp} 0.1s ease-in;
    transform: scale(1.4);

    &::after {
      background: #ffdf00;
      border-radius: 50%;
      content: '';
      display: block;
      height: 12px;
      left: 0;
      margin-left: auto;
      margin-right: auto;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 12px;
      z-index: -1;
    }
  }
  
  &.in-active {
    animation: ${scaleDown} 0.1s ease-in;
    transform: scale(1);
  }
`;

export const TimelineTitleContainer = styled.div<{ position?: string }>`
  position: absolute;
  &.top {
    bottom: 3rem;
  }
  &.bottom {
    top: 3rem;
  }
`;

export const TimelineContentContainer = styled.div<{position?: string}>`
  align-items: flex-start;
  animation: ${show} 0.25s ease-in;
  background: #fff;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  border-left: 2px solid #0f52ba;
  display: flex;
  filter: drop-shadow(2px 2px 10px rgba(0,0,0,0.25));
  min-width: 650px;
  padding: 0.5rem;
  position: absolute;
  z-index: 9999;

  &.top {
    bottom: 4rem;
  }
  &.bottom {
    top: 4rem;
  }
`