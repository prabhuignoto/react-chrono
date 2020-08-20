import styled from "styled-components";

export const TimelineTreeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  /* overflow-y: auto; */
  padding: 1rem;
`;

export const Branch = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  
  &.left {
    margin-right: auto;
  }
  &.right {
    margin-left: auto;
  }
`;

export const Trunk = styled.div`
  width: 4px;
  height: 100%;
  position: absolute;
  height: 100%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  background: #0f52ba;
`;

export const TreeTrunkWrapper = styled.div`
  height: 100%;
  width: 10%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.left {
    order: 2;
  }
  
  &.right {
    order: 1;
  }

  &::after {
    content: '';
    display: block;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    height: 100%;
    position: absolute;
    width: 3px;
    background: #0f52ba;
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

export const TrunkCircleWrapper = styled.div`
  position: relative;
`;

export const TimelineTreeTitleWrapper = styled.div`
  width: 45%;
  display: flex;
  align-items: center;

  &.left {
    order: 3;
    justify-content: flex-start;
  }
  
  &.right {
    order: 1;
    justify-content: flex-end;
  }
`;