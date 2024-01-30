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
  background: rgba(255, 255, 255, 1);
  border-radius: 25px;
  align-items: center;
  justify-content: space-between;
  padding: 0.25em 0.5em;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 14px;
`;

export const SelecterIcon = styled.span`
  display: flex;
  width: 1rem;
  height: 1rem;
  justify-content: center;
  align-items: center;

  & svg {
    width: 100%;
    height: 100%;
  }
`;

export const SelecterLabel = styled.span`
  text-align: left;
`;
