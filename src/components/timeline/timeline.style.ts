import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  outline: 0;
  position: relative;
  width: 100%;
  user-select: none;
  
  &.horizontal {
    height: 12rem;
  }

  &.vertical, &.tree {
    height: 100%;
  }
  `;

export const TimelineMainWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;
  scroll-behavior: smooth;
  width: 100%;
  padding: 1rem;

  &.horizontal {
    height: 10rem;
  }

  &.vertical {
    height: 100%;
  }
 `;

export const TimelineMain = styled.div`
  align-items: center;
  display: flex;
  left: 0;
  position: absolute;
  transition: all 0.2s ease;

  &.tree {
    height: 100%;
  }
  
  &.vertical {
    align-items: flex-start;
    height: 100%;
    justify-content: flex-start;
    width: 100%;
  }
  `;

export const Outline = styled.div`
  background: #0f52ba;
  height: 3px;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  right: 0;
  width: 100%;
  `;

export const TimelineControlContainer = styled.div`
  align-items: center;
  display: flex;
  height: 2rem;
  width: 100%;
`;

export const TimelineContentRender = styled.div`
  left: 0;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  right: 0;
  top: 3rem;
  width: 70%;
`;
