import styled from '@emotion/styled';
import { Theme } from '../../../models/TimelineTreeModel';

export const TimelineNavWrapper = styled.ul<{theme?: Theme}>`
  display: flex;
  list-style: none;
  padding: 0;
  border-radius: 20px;
  background: ${p => p.theme.primary};
`;

export const TimelineNavItem = styled.li<{ disable: boolean }>`
  padding: 0.1rem;
  ${(p) => p.disable ? "pointer-events: none; filter: opacity(0.4)" : ""};
`;

export const TimelineNavButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  outline: 0;
  width: 2rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const TimelineControlContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

export const ControlButton = styled.div<{theme?: Theme}>`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${p => p.theme.primary};
  border-radius: 50%;
  margin: 0 0.2rem;
  cursor: pointer;

  svg {
    color: #fff;
    width: 60%;
    height: 60%;
  }
`

export const MediaToggle = styled(ControlButton)``;

export const ReplayWrapper = styled(ControlButton)``;
