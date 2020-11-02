import styled from '@emotion/styled';
import { Theme } from '../../../models/Theme';
import { TimelineMode } from '../../../models/TimelineModel';

export const TimelineNavWrapper = styled.ul<{ theme?: Theme }>`
  background: rgba(229, 229, 229, 0.85);
  border-radius: 25px;
  display: flex;
  list-style: none;
  padding: 0.25rem 0.25rem;
`;

export const TimelineNavItem = styled.li<{ disable?: boolean }>`
  padding: 0.1rem;
  ${(p) => (p.disable ? 'pointer-events: none; filter: opacity(0.7)' : '')};
`;

export const TimelineNavButton = styled.button<{
  theme?: Theme;
  mode?: TimelineMode;
}>`
  align-items: center;
  background: ${(p) => p.theme.primary};
  border-radius: 50%;
  border: 0;
  color: #fff;
  cursor: pointer;
  display: flex;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.25));
  height: 1.75rem;
  justify-content: center;
  margin: 0 0.2rem;
  padding: 0;
  transition: all 0.1s ease-in;
  width: 1.75rem;

  transform: ${(p) => {
    if (p.mode !== 'HORIZONTAL') {
      return `rotate(90deg)`;
    }
  }};

  &:active {
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.25));
    transform: ${(p) => (p.mode !== 'HORIZONTAL' ? 'rotate(90deg)' : '')}
      scale(0.9);
  }

  svg {
    width: 80%;
    height: 80%;
  }
`;

export const TimelineControlContainer = styled.div<{
  slideShowActive?: boolean;
}>`
  align-items: center;
  display: flex;
  justify-content: center;
  visibility: ${(p) => (p.slideShowActive ? 'hidden' : 'visible')};
`;

export const ControlButton = styled.div<{ theme?: Theme }>`
  align-items: center;
  background: ${(p) => p.theme.primary};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 1.75rem;
  justify-content: center;
  margin-left: 0.5rem;
  width: 1.75rem;
  outline: 0;
  color: #fff;

  svg {
    width: 80%;
    height: 80%;
  }
`;

export const MediaToggle = styled(ControlButton)``;

export const ReplayWrapper = styled(ControlButton)``;
