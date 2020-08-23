import styled, { keyframes } from "styled-components";

export const TimelineTreeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
`;

const animateVisible = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
    visibility: hidden;
  }
  to {
    opacity: 1;
    transform: scale(1);
    visibility: visible;
  }
`;

export const Branch = styled.div`
  align-items: center;
  display: flex;
  position: relative;
  visibility: hidden;
  width: 100%;
  min-height: 200px;
  
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

export const Trunk = styled.div`
  background: #0f52ba;
  height: 100%;
  height: 100%;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  right: 0;
  width: 4px;
`;

export const TreeTrunkWrapper = styled.div`
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
    background: #0f52ba;
    content: '';
    display: block;
    height: 100%;
    left: 0;
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    right: 0;
    width: 3px;
    z-index: -1;
  }
`;

export const TimelineItemContentWrapper = styled.div`
  width: 45%;
  visibility: hidden;
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
`;

export const TimelineTreeTitleWrapper = styled.div`
  align-items: center;
  display: flex;
  width: 45%;

  &.left {
    justify-content: flex-start;
    order: 3;
  }
  
  &.right {
    justify-content: flex-end;
    order: 1;
  }
`;