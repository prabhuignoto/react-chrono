import styled from 'styled-components';
import { Theme } from '../../models/Theme';
import { TimelineMode } from '../../models/TimelineModel';

export const Wrapper = styled.div<{
  cardPositionHorizontal?: 'TOP' | 'BOTTOM';
  hideControls?: boolean;
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
  user-select: none;
  width: 100%;

  ${(p) =>
    p.cardPositionHorizontal === 'TOP' && !p.hideControls
      ? `
    & > div:nth-of-type(1) {
      order: 2;
    }
    & > div:nth-of-type(2) {
      order: 3;
    }
    & > div:nth-of-type(3) {
      order: 1;
    }
  `
      : ''};

  ${(p) =>
    p.cardPositionHorizontal === 'TOP' && p.hideControls
      ? `
    & > div:nth-of-type(1) {
      order: 2;
    }
    & > div:nth-of-type(2) {
      order: 1;
    }
  `
      : ''};

  &.horizontal {
    justify-content: flex-start;
  }

  &.js-focus-visible :focus:not(.focus-visible) {
    outline: 0;
  }

  &.js-focus-visible .focus-visible {
    outline: 2px solid #528deb;
  }
`;

export const TimelineMainWrapper = styled.div<{
  mode?: TimelineMode;
  scrollable?: boolean | { scrollbar: boolean };
  theme?: Theme;
}>`
  align-items: flex-start;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  ${(p) => (p.mode === 'HORIZONTAL' ? 'position: relative' : '')};
  scroll-behavior: smooth;
  scrollbar-color: ${(p) => p.theme.primary} default;
  scrollbar-width: thin;
  width: 100%;

  &::-webkit-scrollbar {
    width: 0.5em;
    height: 0;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(p) => p.theme.primary};
    outline: 1px solid ${(p) => p.theme.primary};
  }

  &.horizontal {
    height: 6rem;
  }

  padding: ${({ scrollable }) => (!scrollable ? '0 1rem 0' : '')};
`;

export const TimelineMain = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  left: 0;
  position: absolute;
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

export const TimelineContentRender = styled.div<{ showAllCards?: boolean }>`
  margin-left: auto;
  margin-right: auto;
  width: 98%;
  display: flex;
  align-items: flex-start;
  justify-content: ${(p) => (p.showAllCards ? 'flex-start' : 'center')};
  overflow-x: hidden;
`;
