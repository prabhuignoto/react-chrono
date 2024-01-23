import styled from 'styled-components';
import { PopoverPosition } from '.';

export const PopoverWrapper = styled.div``;

export const PopoverHolder = styled.div<{ position: PopoverPosition }>`
  position: absolute;
  z-index: 100;
`;

export const Selecter = styled.div`
  padding: 0.1rem;
  display: flex;
  align-items: center;
  justfy-content: space-between;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
`;

export const SelecterIcon = styled.span`
  display: flex;
  width: 1rem;
  height: 1rem;

  & svg {
    width: 100%;
    height: 100%;
  }
`;

export const SelecterLabel = styled.span`
  text-align: left;
`;
