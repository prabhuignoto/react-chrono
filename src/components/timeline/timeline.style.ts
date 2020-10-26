import styled from '@emotion/styled';
import { Theme } from '../../models/Theme';
import { TimelineMode } from '../../models/TimelineModel';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
  outline: 0;
  overflow: hidden;

  &.horizontal {
    justify-content: flex-start;
    /* &.top {
    }

    &.bottom {
      justify-content: flex-end;
    } */
  }

  &.vertical,
  &.tree {
    height: 100%;
  }
`;

export const TimelineMainWrapper = styled.div<{ theme?: Theme, scrollable?: boolean }>`
  align-items: center;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: ${p => p.scrollable ? "auto" : "hidden"};
  overscroll-behavior: contain;
  padding: ${p => p.scrollable ? "1rem 2rem 1rem 0" : "1rem 0"};
  position: relative;
  scroll-behavior: smooth;
  scrollbar-color: ${(p) => p.theme.primary} default;
  scrollbar-width: thin;
  width: 100%;

  &::-webkit-scrollbar {
    width: .5em;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(p) => p.theme.primary};
    outline: 1px solid ${(p) => p.theme.primary};
  }

  &.horizontal {
    height: 3rem;
  }

  &.vertical {
    height: 100%;
  }
`;

export const TimelineMain = styled.div`
  align-items: center;
  display: flex;
  left: 0;
  bottom: 0;
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

export const Outline = styled.div<{ color?: string }>`
  background: ${(p) => p.color};
  height: 3px;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  right: 0;
  width: 100%;
`;

export const TimelineControlContainer = styled.div<{
  mode?: TimelineMode;
  active?: boolean;
}>`
  align-items: center;
  display: flex;
  justify-content: center;
  /* margin-top: auto;
  margin-bottom: auto; */

  filter: ${(p) => {
    if (p.active) {
      return `opacity(1);`;
    } else {
      return `opacity(0.9);`;
    }
  }};

  &.hide {
    visibility: hidden;
  }

  &.show {
    visibility: visible;
  }
`;

export const TimelineContentRender = styled.div`
  /* left: 0; */
  margin-left: auto;
  margin-right: auto;
  /* position: absolute; */
  /* right: 0; */
  /* top: 3rem; */
  width: 98%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
