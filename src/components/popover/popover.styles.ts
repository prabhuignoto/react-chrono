import styled from 'styled-components';
import { PopoverPosition } from '.';

export const PopoverWrapper = styled.div``;

export const PopoverHolder = styled.div<{ position: PopoverPosition }>`
  align-items: center;
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  max-height: 500px;
  overflow-y: auto;
  padding: 0.5rem;
  position: absolute;
  top: 3rem;
  z-index: 100;
`;

export const Selecter = styled.div`
  align-items: center;
  background: rgba(255, 255, 255, 1);
  border-radius: 25px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  padding: 0.1rem;
  padding: 0.5em 0.25em;
  font-size: 14px;
`;

export const SelecterIcon = styled.span`
  align-items: center;
  display: flex;
  height: 1rem;
  justify-content: center;
  width: 1rem;

  & svg {
    height: 100%;
    width: 100%;
  }
`;

export const SelecterLabel = styled.span`
  text-align: left;
`;
