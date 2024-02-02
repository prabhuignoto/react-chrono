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
  justify-content: space-between;
  max-height: 500px;
  overflow-y: auto;
  padding: 0.5rem;
  position: absolute;
  top: 3.5rem;
  flex-direction: column;
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
  padding: 0.5em 0.75em;
  font-size: 14px;
  font-weight: normal;
  user-select: none;
  cursor: pointer;
`;

export const SelecterIcon = styled.span<{ theme: Theme }>`
  align-items: center;
  display: flex;
  height: 1.5rem;
  justify-content: center;
  width: 1.5rem;
  color: ${({ theme }) => theme.primary};

  & svg {
    height: 100%;
    width: 100%;
  }
`;

export const SelecterLabel = styled.span`
  text-transform: capitalize;
  text-align: left;
  font-size: 1.1rem;
`;

export const Header = styled.div`
  width: 100%;
  height: 30px;
`;

export const Content = styled.div`
  height: calc(100% - 30px);
  overflow-y: auto;
  padding: 1rem;
`;

export const CloseButton = styled.button<{ theme: Theme }>`
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-left: auto;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 0.5rem;
`;
