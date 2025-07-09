import styled from 'styled-components';
import { Theme } from '../../models/Theme';
import { TimelineMode } from '../../models/TimelineModel';

export const Wrapper = styled.div<{
  cardPositionHorizontal?: 'TOP' | 'BOTTOM';
  theme?: Theme;
}>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto Condensed', sans-serif;
  position: relative;
  z-index: 0;

  &:focus-visible {
    outline: 2px solid ${p => p.theme?.primary || '#0066cc'};
    outline-offset: 2px;
  }

  button:focus-visible,
  a:focus-visible,
  input:focus-visible {
    outline: 2px solid ${p => p.theme?.primary || '#0066cc'};
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.2);
  }

  overflow: hidden;
  &.horizontal {
    justify-content: flex-start;
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
  ${p => (p.mode === 'HORIZONTAL' ? 'position: relative' : '')};
  scroll-behavior: smooth;
  width: 100%;
  background-color: ${p => p.theme?.timelineBgColor || 'transparent'};
  padding: ${({ $scrollable }) => (!$scrollable ? '0 1rem 0' : '')};
`;

export const TimelineContentRender = styled.div<{ $showAllCards?: boolean }>`
  display: flex;
  align-items: flex-start;
  justify-content: ${p => (p.$showAllCards ? 'flex-start' : 'center')};
  width: 98%;
  margin-right: auto;
  margin-left: auto;
  overflow-x: hidden;
`;

export const ToolbarWrapper = styled.div<{ position: 'top' | 'bottom' }>`
  display: flex;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  border-radius: 6px;
  width: 100%;
  padding: 0;
  margin: ${p => (p.position === 'top' ? '0 0 4px 0' : '4px 0 0 0')};
  order: ${p => (p.position === 'top' ? 0 : 1)};
  z-index: 1;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
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
  visibility: ${p => (p.$hide ? 'hidden' : 'visible')};
  flex-shrink: 0;
`;

export const SearchWrapper = styled.div<{ theme?: Theme }>`
  display: flex;
  align-items: center;
  background-color: ${p => p.theme?.toolbarBtnBgColor};
  padding: 0.1rem 0.5rem;
  border-radius: 6px;
  border: 1px solid ${p => p.theme?.buttonBorderColor};
  flex-grow: 1;
  max-width: 400px;
  margin: 0 1rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus-within {
    border-color: ${p => p.theme?.primary};
    box-shadow: 0 0 0 2px ${p => p.theme?.glowColor};
  }
`;

export const SearchInput = styled.input<{ theme?: Theme }>`
  flex-grow: 1;
  border: none;
  outline: none;
  background: transparent;
  color: ${p => p.theme?.toolbarTextColor};
  font-size: 0.9rem;
  padding: 0.4rem 0.5rem;

  &::placeholder {
    color: ${p => p.theme?.toolbarTextColor};
    opacity: 0.6;
  }
`;

export const SearchInfo = styled.span<{ theme?: Theme }>`
  font-size: 0.8rem;
  color: ${p => p.theme?.toolbarTextColor};
  opacity: 0.8;
  margin: 0 0.5rem;
  white-space: nowrap;
`;

export const Outline = styled.div<{ color?: string; height?: number }>`
  position: absolute;
  right: 0;
  left: 0;
  width: 100%;
  height: ${p => `${p.height}px`};
  margin-right: auto;
  margin-left: auto;
  background: ${p => p.color};
  z-index: 0;
  border-radius: 4px;
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
