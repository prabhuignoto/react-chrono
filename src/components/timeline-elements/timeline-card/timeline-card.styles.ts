import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import { Theme } from "../../../models/TimelineTreeModel";

export const Wrapper = styled.div`
  align-items: center;
  border: 1px solid transparent;
  display: flex;
  justify-content: center;
  position: relative;

  &.vertical {
    justify-content: flex-start;
    height: 100%;
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

export const TimelinePointWrapper = styled.div`
  width: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
`;

export const TimelinePoint = styled.div<{theme: Theme}>`
  background: ${p => p.theme.primary};
  border-radius: 50%;
  cursor: pointer;
  height: 1rem;
  width: 1rem;

  &.active {
    animation: ${scaleUp} 0.1s ease-in;
    transform: scale(1.4);

    &::after {
      background: ${p => p.theme.secondary};
      border-radius: 50%;
      content: '';
      display: block;
      height: 0.75rem;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%) translateX(-50%);
      left: 50%;
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
    &.top {
      bottom: 2rem;
    }
    &.bottom {
      top: 1rem;
    }
  }
`;

export const TimelineContentContainer = styled.div<{ position?: string }>`
  align-items: flex-start;
  animation: ${show} 0.25s ease-in;
  
  &.horizontal {
    /* position: absolute; */
    min-width: 400px;
    /* max-width: 70%; */
    /* z-index: 9999; */
  }

  &.vertical {
    width: calc(100% - 5rem);
    margin-left: auto;
    flex-direction: column;
    height: 100%;
  }

  &.top {
    /* bottom: 0rem; */
  }

  &.bottom {
    top: 6rem;
    /* left: 0; */
  }
`;
