import styled from '@emotion/styled';
import { Theme } from '../../../models/Theme';
import { TimelineMode } from '../../../models/TimelineModel';

export const TimelineNavWrapper = styled.ul<{ theme?: Theme }>`
  border-radius: 25px;
  display: flex;
  list-style: none;
  padding: 0.25rem 0.25rem;
  background: rgba(229,229,229,0.85);
`;

export const TimelineNavItem = styled.li<{ disable?: boolean }>`
  padding: 0.1rem;
  ${(p) => p.disable ? "pointer-events: none; filter: opacity(0.7)" : ""};
`;

export const TimelineNavButton = styled.button<{ theme?: Theme, mode?: TimelineMode }>`
  align-items: center;
  background: ${p => p.theme.primary};
  border-radius: 50%;
  border: 0;
  color: #fff;
  cursor: pointer;
  display: flex;
  filter: drop-shadow(0 0 5px rgba(0,0,0,0.25));
  height: 2rem;
  justify-content: center;
  margin: 0 0.2rem;
  outline: 0;
  width: 2rem;

  transform: ${p => {
    if (p.mode !== "HORIZONTAL") {
      return `rotate(90deg)`;  
    }
  }};

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const TimelineControlContainer = styled.div<{ slideShowActive?: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${p => p.slideShowActive ? "hidden" : "visible"};
`;

export const ControlButton = styled.div<{ theme?: Theme }>`
  align-items: center;
  background: ${p => p.theme.primary};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 2rem;
  justify-content: center;
  margin-left: 0.5rem;
  width: 2rem;

  svg {
    color: #fff;
    width: 60%;
    height: 60%;
  }
`

export const MediaToggle = styled(ControlButton)``;

export const ReplayWrapper = styled(ControlButton)``;
