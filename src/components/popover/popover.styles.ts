import styled from 'styled-components';
import { PopoverPosition } from '.';

export const PopoverWrapper = styled.div``;

export const PopoverHolder = styled.div<{ position: PopoverPosition }>`
  position: absolute;
  z-index: 100;
  background: rgba(255, 255, 255, 1);
  padding: 0.5rem;
  box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  top: 3rem;
  max-height: 300px;
  overflow-y: auto;
`;

export const Selecter = styled.div`
  padding: 0.1rem;
  display: flex;
  background: rgba(255, 255, 255, 1);
  border-radius: 25px;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em 0.25em;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
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
