import { Theme } from '@models/Theme';
import { TimelineMode } from '@models/TimelineModel';
import styled from 'styled-components';

export const TimelineNavWrapper = styled.ul<{ theme?: Theme }>`
  background: rgba(229, 229, 229, 0.85);
  border-radius: 25px;
  display: flex;
  list-style: none;
  padding: 0.25em 0.25em;
`;

export const TimelineNavItem = styled.li<{ $disable?: boolean }>`
  padding: 0.1em;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(p) => (p.$disable ? 'pointer-events: none; filter: opacity(0.7)' : '')};
`;

export const TimelineNavButton = styled.button<{
  mode?: TimelineMode;
  rotate?: 'TRUE' | 'FALSE';
  theme?: Theme;
}>`
  align-items: center;
  background: ${(p) => p.theme.primary};
  border-radius: 50%;
  border: 0;
  color: #fff;
  cursor: pointer;
  display: flex;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.25));
  height: 20px;
  justify-content: center;
  margin: 0 0.2em;
  padding: 0;
  transition: all 0.1s ease-in;
  width: 20px;

  transform: ${(p) => {
    if (p.rotate === 'TRUE') {
      return `rotate(90deg)`;
    }
  }};

  &:active {
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.25));
    transform: ${(p) => (p.rotate === 'TRUE' ? 'rotate(90deg)' : '')} scale(0.9);
  }

  svg {
    width: 80%;
    height: 80%;
  }
`;

export const TimelineControlContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const ControlButton = styled.button<{ theme?: Theme }>`
  align-items: center;
  background: ${(p) => p.theme.primary};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 2em;
  justify-content: center;
  margin-left: 0.5em;
  width: 2em;
  outline: 0;
  color: #fff;

  svg {
    width: 80%;
    height: 80%;
  }
`;

export const MediaToggle = styled(ControlButton)``;

export const ReplayWrapper = styled(ControlButton)``;
