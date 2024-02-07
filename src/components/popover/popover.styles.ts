import { Theme } from '@models/Theme';
import styled from 'styled-components';
import { PopoverPosition } from '.';

export const PopoverWrapper = styled.div``;

export const PopoverHolder = styled.div<{ position: PopoverPosition }>`
  align-items: flex-start;
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 500px;
  overflow-y: auto;
  padding: 0.5rem;
  position: absolute;
  top: 3.5rem;
  width: 100%;
  z-index: 100;
`;

export const Selecter = styled.div`
  align-items: center;
  background: rgba(255, 255, 255, 1);
  border-radius: 25px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-weight: normal;
  justify-content: space-between;
  padding: 0.1rem;
  padding: 0.5em 0.75em;
  user-select: none;
`;

export const SelecterIcon = styled.span<{ theme: Theme }>`
  align-items: center;
  color: ${({ theme }) => theme.primary};
  display: flex;
  height: 1.5rem;
  justify-content: center;
  width: 1.5rem;

  & svg {
    height: 100%;
    width: 100%;
  }
`;

export const SelecterLabel = styled.span`
  font-size: 1.1rem;
  text-align: left;
  text-transform: capitalize;
`;

export const Header = styled.div`
  height: 30px;
  width: 100%;
`;

export const Content = styled.div`
  height: calc(100% - 30px);
  overflow-y: auto;
  padding: 0.25rem;
  width: calc(100% - 0rem);
`;

export const CloseButton = styled.button<{ theme: Theme }>`
  align-items: center;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
  margin-left: auto;
`;
