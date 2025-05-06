import { Theme } from '@models/Theme';
import { TimelineMode } from '@models/TimelineModel';
import styled, { css } from 'styled-components';

export const ScreenReaderOnly = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export const TimelineNavWrapper = styled.div<{ theme?: Theme }>`
  border-radius: 8px;
  display: flex;
  list-style: none;
  padding: 0.25rem;
  // box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  background: ${(p) => p.theme.toolbarBgColor};
  // border: 1px solid ${(p) => p.theme.toolbarBtnBgColor};

  .nav-item {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &.disabled {
      pointer-events: none;
      filter: opacity(0.4);
    }
  }
`;

export const TimelineNavItem = styled.li<{ $disable?: boolean }>`
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(p) =>
    p.$disable
      ? 'pointer-events: none; filter: opacity(0.4);'
      : 'cursor: pointer;'};
`;

export const TimelineNavButton = styled.button<{
  mode?: TimelineMode;
  rotate?: 'TRUE' | 'FALSE';
  theme?: Theme;
  $active?: boolean;
}>`
  align-items: center;
  background: ${(p) => p.theme.toolbarBtnBgColor};
  border-radius: 6px;
  border: 1px solid transparent;
  color: ${(p) => p.theme.toolbarTextColor ?? p.theme.secondary};
  cursor: pointer;
  display: flex;
  height: 28px;
  justify-content: center;
  margin: 0 0.2rem;
  padding: 0;
  transition:
    background-color 0.2s ease-out,
    transform 0.15s ease-out,
    box-shadow 0.2s ease-out,
    border-color 0.2s ease-out;
  width: 28px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);

  transform: ${(p) => (p.rotate === 'TRUE' ? 'rotate(90deg)' : 'none')};

  &:hover {
    background: ${(p) => p.theme.toolbarBtnBgColor};
    border-color: ${(p) => p.theme.primary};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: ${(p) => (p.rotate === 'TRUE' ? 'rotate(90deg)' : 'none')}
      scale(0.95);
    background: ${(p) => p.theme.toolbarBtnBgColor};
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);
  }

  ${(p) =>
    p.$active &&
    css`
      background: ${p.theme.secondary};
      border-color: ${p.theme.primary};
      &:hover {
        background: ${p.theme.secondary};
        opacity: 0.9;
        box-shadow: 0 1px 2px rgba(22, 20, 20, 0.12);
      }
      svg {
        // color: ${p.theme.secondary};
        color: red;
      }
    `}

  svg {
    width: 75%;
    height: 75%;
    color: ${(p) => p.theme.primary};
    transition: color 0.2s ease-out;
  }
`;

export const TimelineControlContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;
`;

export const ControlButton = styled.button<{ theme?: Theme }>`
  align-items: center;
  background: ${(p) => p.theme.primary};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 3em;
  justify-content: center;
  margin-left: 0.5em;
  width: 3em;
  outline: 0;
  color: #fff;

  svg {
    width: 80%;
    height: 80%;
  }
`;

export const MediaToggle = styled(ControlButton)``;

export const ReplayWrapper = styled(ControlButton)``;
