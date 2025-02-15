import { Theme } from '@models/Theme';
import styled, { css } from 'styled-components';

// Utility mixin for centering content using flexbox
const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Dynamic box shadow generator based on dark mode and open state
const boxShadow = (isDarkMode: boolean, open: boolean) =>
  !open
    ? `0px 1px 1px rgba(0, 0, 0, ${isDarkMode ? '0.85' : '0.2'})`
    : 'inset 0 0 1px 1px rgba(0, 0, 0, 0.2)';

// Base wrapper for the popover component
export const PopoverWrapper = styled.div`
`;

// Main popover container with positioning and visibility controls
export const PopoverHolder = styled.div<{
  $isMobile?: boolean;
  $position?: 'top' | 'bottom';
  $theme?: Theme;
  $visible?: boolean;
  $width: number;
}>`
  ${flexCenter};
  flex-direction: column;
  background: ${({ $theme }) => $theme.toolbarBgColor};
  border-radius: 6px;
  box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.5);
  max-height: 500px;
  overflow-y: auto;
  padding: 0.5rem;
  position: absolute;
  ${(p) => (p.$position === 'bottom' ? `bottom: 3.5rem` : `top: 4rem`)};
  ${(p) => (p.$isMobile ? 'left: 4px;' : '')};
  width: ${({ $isMobile, $width = 300 }) =>
    $isMobile ? '90%' : `${$width}px`};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition:
    opacity 0.2s ease-in-out,
    transform 0.2s ease-in-out;
  transform: ${(p) => (p.$visible ? 'translateY(0)' : 'translateY(-10px)')};
  z-index: 99999;
`;

// Clickable selector button that triggers the popover
export const Selecter = styled.div<{
  $isDarkMode: boolean;
  $isMobile?: boolean;
  $open?: boolean;
  $theme: Theme;
}>`
  ${flexCenter};
  background: ${({ $theme }) => $theme.toolbarBtnBgColor};
  color: ${({ $theme }) => $theme.toolbarTextColor};
  border-radius: 25px;
  box-shadow: ${({ $open, $isDarkMode }) => boxShadow($isDarkMode, $open)};
  cursor: pointer;
  justify-content: space-between;
  padding: ${(p) => (p.$isMobile ? '0.4rem' : `0.4rem 0.5rem`)};
  user-select: none;
`;

// Icon component within the selector with rotation animation
export const SelecterIcon = styled.span<{ $open: boolean; $theme: Theme }>`
  ${flexCenter};
  color: ${({ $theme }) => $theme.primary};
  height: 1.25rem;
  width: 1.25rem;
  transition: transform 0.2s ease-in-out;
  margin-right: 0.1rem;

  & svg {
    height: 100%;
    width: 100%;
  }
`;

// Text label for the selector button
export const SelecterLabel = styled.span`
  font-size: 0.9rem;
  text-align: left;
  white-space: nowrap;
`;

// Top section of the popover containing controls
export const Header = styled.div`
  height: 30px;
  width: 100%;
`;

// Scrollable content area of the popover
export const Content = styled.div`
  height: calc(100% - 30px);
  overflow-y: auto;
  width: 100%;
`;

// Close button with icon for dismissing the popover
export const CloseButton = styled.button<{ theme: Theme }>`
  ${flexCenter};
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  margin-bottom: 0.5rem;
  margin-left: auto;
`;
