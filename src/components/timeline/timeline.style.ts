import { Theme } from '@models/Theme';
import { TimelineMode } from '@models/TimelineModel';
import styled, { css } from 'styled-components';

// Default theme for components that require Theme
const defaultTheme: Theme = {
  primary: '#ccc',
  secondary: '#666',
};

// Create custom scrollbar that works with optional theme
const ScrollBarWithDefault = css`
  scrollbar-color: ${(p: { theme?: { primary?: string } }) =>
      p.theme?.primary || defaultTheme.primary}
    default;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 0.3em;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(p: { theme?: { primary?: string } }) =>
      p.theme?.primary || defaultTheme.primary};
    outline: 1px solid
      ${(p: { theme?: { primary?: string } }) =>
        p.theme?.primary || defaultTheme.primary};
  }
`;

export const Wrapper = styled.div<{
  cardPositionHorizontal?: 'TOP' | 'BOTTOM';
}>`
  display: flex;
  flex-direction: column;
  /* cannot remove this */
  height: 100%;
  z-index: 0;

  &:focus {
    outline: 0;
  }

  overflow: hidden;
  position: relative;
  width: 100%;

  &.horizontal {
    justify-content: flex-start;
  }

  &.js-focus-visible :focus:not(.focus-visible) {
    // outline: 0;
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
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  ${(p) => (p.mode === 'HORIZONTAL' ? 'position: relative' : '')};
  scroll-behavior: smooth;
  width: 100%;
  // order: ${(p) => (p.position === 'top' ? 1 : 0)};

  ${ScrollBarWithDefault}

  &.horizontal {
    min-height: 150px;
  }

  padding: ${({ $scrollable }) => (!$scrollable ? '0 1rem 0' : '')};
`;

export const TimelineMain = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  transform: translate(0, -50%);

  &.vertical {
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
  }
`;

export const Outline = styled.div<{ color?: string; height?: number }>`
  position: absolute;
  right: 0;
  left: 0;
  width: 100%;
  height: ${(p) => `${p.height}px`};
  margin-right: auto;
  margin-left: auto;
  background: ${(p) => p.color};
`;

export const TimelineControlContainer = styled.div<{
  active?: boolean;
  mode?: TimelineMode;
}>`
  display: flex;
  align-items: center;
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
  display: flex;
  align-items: flex-start;
  justify-content: ${(p) => (p.$showAllCards ? 'flex-start' : 'center')};
  width: 100%;
  margin: 1.5rem auto;
  padding: 0 1rem;
  overflow-x: hidden;
  gap: 1.5rem;
`;

export const ToolbarWrapper = styled.div<{ position: 'top' | 'bottom' }>`
  display: flex;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  border-radius: 6px;
  width: 100%;
  padding: 0;
  margin: ${(p) => (p.position === 'top' ? '0 0 20px 0' : '20px 0 0 0')};
  order: ${(p) => (p.position === 'top' ? 0 : 1)};
  z-index: 1;
`;

export const ExtraControls = styled.ul<{
  $hide: boolean;
  $slideShowRunning: boolean;
}>`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0.1rem;
  visibility: ${(p) => (p.$hide ? 'hidden' : 'visible')};
`;

export const ExtraControlChild = styled.li`
  margin: 0 0.5rem;
  padding: 0;
`;

export const SearchBoxContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;
