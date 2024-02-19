import { Theme } from '@models/Theme';
import styled from 'styled-components';

export const PopoverWrapper = styled.div``;

export const PopoverHolder = styled.div<{
  position?: 'top' | 'bottom';
  theme?: Theme;
  visible?: boolean;
}>`
  align-items: flex-start;
  background: ${({ theme }) => theme.toolbarBgColor};
  background:;
  border-radius: 6px;
  box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 500px;
  overflow-y: auto;
  padding: 0.5rem;
  position: absolute;
  ${(p) => (p.position === 'bottom' ? `bottom: 3.5rem` : `top: 3.5rem`)};
  width: 100%;
  z-index: 100;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.1s ease-in-out;
`;

export const Selecter = styled.div<{
  $isDarkMode: boolean;
  $isMobile?: boolean;
  open?: boolean;
  theme: Theme;
}>`
  align-items: center;
  background: ${({ theme }) => theme.toolbarBtnBgColor};
  color: ${({ theme }) => theme.toolbarTextColor};
  border-radius: 25px;
  box-shadow: ${({ open, $isDarkMode: isDarkMode }) =>
    !open
      ? `0px 1px 1px rgba(0, 0, 0, ${isDarkMode ? '0.85' : '0.2'})`
      : 'inset 0 0 1px 1px rgba(0, 0, 0, 0.2)'};
  cursor: pointer;
  display: flex;
  font-weight: normal;
  justify-content: space-between;
  padding: ${(p) => (p.$isMobile ? '0.4rem' : `0.4rem 0.4rem 0.4rem 0.4rem`)};
  user-select: none;
`;

export const SelecterIcon = styled.span<{ open: boolean; theme: Theme }>`
  align-items: center;
  color: ${({ theme }) => theme.primary};
  display: flex;
  height: 1.25rem;
  justify-content: center;
  width: 1.25rem;
  // transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease-in-out;
  margin-right: 0.1rem;

  & svg {
    height: 100%;
    width: 100%;
  }
`;

export const SelecterLabel = styled.span`
  font-size: 0.9rem;
  text-align: left;
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
