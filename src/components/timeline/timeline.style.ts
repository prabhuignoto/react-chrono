import styled from '@emotion/styled';
import { Theme } from '../../models/Theme';
import { TimelineMode } from '../../models/TimelineModel';

export const Wrapper = styled.div<{
  cardPositionHorizontal?: 'TOP' | 'BOTTOM';
}>`
  display: flex;
  flex-direction: column;
  /* cannot remove this */
  height: 100%;
  outline: 0;
  overflow: hidden;
  position: relative;
  user-select: none;
  width: 100%;

  ${(p) =>
    p.cardPositionHorizontal === 'TOP'
      ? `
    & > div:nth-of-type(1) {
      order: 2;
    }
    & > div:nth-of-type(2) {
      order: 1; 
    }
    & > div:nth-of-type(3) {
      order: 3;
    }
  `
      : ''};

  &.horizontal {
    justify-content: flex-start;
  }

  &.js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }

  &.js-focus-visible .focus-visible {
    outline: 2px solid #528deb;
  }
`;

export const TimelineMainWrapper = styled.div<{
  theme?: Theme;
  scrollable?: boolean | { scrollbar: boolean };
}>`
  align-items: flex-start;
  display: flex;
  justify-content: center;
  overflow-y: ${(p) => (p.scrollable ? 'auto' : 'hidden')};
  overflow-x: hidden;
  overscroll-behavior: contain;
  position: relative;
  scroll-behavior: smooth;
  scrollbar-color: ${(p) => p.theme.primary} default;
  scrollbar-width: thin;
  width: 100%;
  padding: ${(p) => {
    if (p.scrollable) {
      return (p.scrollable instanceof Boolean && p.scrollable) ||
        (p.scrollable as { scrollbar: boolean }).scrollbar
        ? ''
        : '0 1rem 0';
    }
  }};

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

export const TimelineContentRender = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 98%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
