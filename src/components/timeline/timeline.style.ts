import { Theme } from '@models/Theme';
import { TimelineMode } from '@models/TimelineModel';
import styled, { css } from 'styled-components';
import { zIndex } from '../../styles/z-index';
import { ScrollBar } from '../common/styles';

// CSS transform and animation fallbacks
const getTransform = (transform?: string) => transform || 'none';

const transitionMixin = css`
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -ms-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
  transition: all 0.2s ease;
`;

// Timeline wrapper with improved cross-browser support
export const Wrapper = styled.div<{
  cardPositionHorizontal?: 'TOP' | 'BOTTOM';
  theme?: Theme;
  $translate?: string;
}>`
  -webkit-transform: ${props => getTransform(props.$translate)};
  -moz-transform: ${props => getTransform(props.$translate)};
  -ms-transform: ${props => getTransform(props.$translate)};
  transform: ${props => getTransform(props.$translate)};
  ${transitionMixin}
  display: flex;
  flex-direction: column;
  /* cannot remove this */
  height: 100%;
  z-index: ${zIndex.timelineCard - 2}; /* Base z-index for timeline */

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
    /* outline: 0; */
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
  ${p => (p.mode === 'HORIZONTAL' ? 'position: relative' : '')};
  scroll-behavior: smooth;
  width: 100%;
  background-color: ${p => p.theme?.timelineBgColor || 'transparent'};
  /* order: ${p => (p.position === 'top' ? 1 : 0)}; */
  background: transparent;
  F ${ScrollBar} &.horizontal {
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
  height: ${p => `${p.height}px`};
  margin-right: auto;
  margin-left: auto;
  background: ${p => p.color};
`;

export const TimelineControlContainer = styled.div<{
  active?: boolean;
  mode?: TimelineMode;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;

  filter: ${p => {
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
  margin: ${p => (p.position === 'top' ? '0 0 20px 0' : '20px 0 0 0')};
  order: ${p => (p.position === 'top' ? 0 : 1)};
  z-index: ${zIndex.controls - 1}; /* Below controls but above base timeline */
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

export const ExtraControlChild = styled.li`
  display: flex;
  margin: 0.5rem 0;
  margin-right: 0.5rem;
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

  &::-webkit-search-cancel-button {
    appearance: none;
    height: 10px;
    width: 10px;
    margin-left: 0.2rem;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" fill="%23${p =>
      p.theme?.toolbarTextColor?.substring(
        1,
      )}"><path d=\"M.7.7l8.6 8.6M9.3.7L.7 9.3\" stroke=\"%23${p =>
      p.theme?.toolbarTextColor?.substring(1)}\" stroke-width=\"1.5\"/></svg>');
    cursor: pointer;
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }
`;

export const SearchInfo = styled.span<{ theme?: Theme }>`
  font-size: 0.8rem;
  color: ${p => p.theme?.toolbarTextColor};
  opacity: 0.8;
  margin: 0 0.5rem;
  white-space: nowrap;
`;
