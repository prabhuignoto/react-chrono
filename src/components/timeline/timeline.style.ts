import { Theme } from '@models/Theme';
import { TimelineMode } from '@models/TimelineModel';
import styled from 'styled-components';
import { ScrollBar } from '../common/styles';

export const Wrapper = styled.div<{
  cardPositionHorizontal?: 'TOP' | 'BOTTOM';
}>`
  display: flex;
  flex-direction: column;
  /* cannot remove this */
  height: 100%;

  &:focus {
    outline: 0;
  }

  overflow: hidden;
  position: relative;
  width: 100%;

  &.horizontal {
    justify-content: flex-start;
  }

  &.js-focus-visible .focus-visible {
    outline: 2px solid #528deb;
  }
`;

export const TimelineMainWrapper = styled.div<{
  $scrollable?: boolean | { scrollbar: boolean };
  mode?: TimelineMode;
  position?: 'top' | 'bottom';
  theme?: Theme;
}>`
align-items: flex-start;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  ${(p) => (p.mode === 'HORIZONTAL' ? 'position: relative' : '')};
  scroll-behavior: smooth;
  width: 100%;

  ${ScrollBar}

  &.horizontal {
    min-height: 150px;
  }

  padding: ${({ $scrollable }) => (!$scrollable ? '0 1rem 0' : '')};
`;

export const TimelineMain = styled.div`
  align-items: center;
  display: flex;
  left: 0;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  transition: all 0.2s ease;

  &.vertical {
    align-items: flex-start;
    height: 100%;
    justify-content: flex-start;
    width: 100%;
  }
`;

export const Outline = styled.div<{ color?: string; height?: number }>`
  background: ${(p) => p.color};
  height: ${(p) => `${p.height}px`};
  left: 0;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  right: 0;
  width: 100%;
`;

export const TimelineControlContainer = styled.div<{
  active?: boolean;
  mode?: TimelineMode;
}>`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 3rem;

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

export const TimelineContentRender = styled.div<{ $showAllCards?: boolean }>`
  align-items: flex-start;
  display: flex;
  justify-content: ${(p) => (p.$showAllCards ? 'flex-start' : 'center')};
  margin-left: auto;
  margin-right: auto;
  overflow-x: hidden;
  width: 98%;
`;

export const ToolbarWrapper = styled.div<{ position: 'top' | 'bottom' }>`
  border-radius: 6px;
  display: flex;
  font-weight: bold;
  margin: ${(p) => (p.position === 'top' ? '0 0 20px 0' : '20px 0 0 0')};
  order: ${(p) => (p.position === 'top' ? 0 : 1)};
  padding: 0;
  text-align: center;
  text-decoration: none;
  width: 100%;
`;

export const ExtraControls = styled.ul<{
  $hide: boolean;
  $slideShowRunning: boolean;
}>`
  align-items: center;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0.1rem;
  visibility: ${(p) => (p.$hide ? 'hidden' : 'visible')};
`;

export const ExtraControlChild = styled.li`
  display: flex;
  margin: 0.5rem 0;
  margin-right: 0.5rem;
`;