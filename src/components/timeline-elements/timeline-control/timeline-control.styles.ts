import { Theme } from '@models/Theme';
import { TimelineMode } from '@models/TimelineModel';
import styled from 'styled-components';

export const TimelineNavWrapper = styled.ul<{ theme?: Theme }>`
  border-radius: 25px;
  display: flex;
  list-style: none;
  padding: 0.25rem 0.25rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  background: ${(p) => p.theme.toolbarBtnBgColor};
`;

export const TimelineNavItem = styled.li<{ $disable?: boolean }>`
  padding: 0.1em;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(p) =>
    p.$disable
      ? 'pointer-events: none; filter: opacity(0.5) grayscale(95%);'
      : ''};
`;

export const TimelineNavButton = styled.button<{
  mode?: TimelineMode;
  rotate?: 'TRUE' | 'FALSE';
  theme?: Theme;
}>`
  align-items: center;
  background: ${(p) => p.theme.primary};
  filter: brightness(1.25);
  border-radius: 50%;
  border: 0;
  color: #fff;
  cursor: pointer;
  display: flex;
  height: 2rem;
  justify-content: center;
  margin: 0 0.25rem;
  padding: 0;
  transition: all 0.2s ease-in-out;
  width: 2rem;

  transform: ${(p) => {
    if (p.rotate === 'TRUE') {
      return `rotate(90deg)`;
    }
  }};

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    transform: ${(p) => (p.rotate === 'TRUE' ? 'rotate(90deg)' : '')}
      scale(0.95);
  }

  svg {
    width: 1rem;
    height: 1rem;
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
  height: 2rem;
  justify-content: center;
  margin-left: 0.5rem;
  width: 2rem;
  outline: 0;
  color: #fff;
  transition: all 0.2s ease-in-out;

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const MediaToggle = styled(ControlButton)``;

export const ReplayWrapper = styled(ControlButton)``;
