import styled from "styled-components";

export const TimelineTreeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
`;

export const Branch = styled.div`
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
  &.left {
    order: 1;
  }
  
  &.right {
    order: 2;
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