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
  position: relative;
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
  background: ${({ $theme }) => $theme?.toolbarBgColor};
  border-radius: 8px;
  box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.25);
  max-height: 500px;
  overflow-y: auto;
  padding: 1rem;
  position: absolute;
  ${(p) => (p.$position === 'bottom' ? `bottom: 3.5rem` : `top: 4rem`)};
  ${(p) => (p.$isMobile ? 'left: 4px;' : '')};
  width: ${({ $isMobile, $width = 300 }) =>
    $isMobile ? '90%' : `${$width}px`};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition:
    opacity 0.25s ease-in-out,
    transform 0.25s ease-in-out;
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
  border-radius: 6px;
  box-shadow: ${({ $open, $isDarkMode }) =>
    boxShadow($isDarkMode ?? false, $open ?? false)};
  cursor: pointer;
  justify-content: space-between;
  padding: ${(p) => (p.$isMobile ? '0.5rem' : `0.6rem 0.8rem`)};
  user-select: none;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ $theme }) =>
      $theme.toolbarBtnBgColor === '#fff'
        ? '#f5f5f5'
        : `color-mix(in srgb, ${$theme.toolbarBtnBgColor} 90%, white)`};
  }
`;

// Icon component within the selector with rotation animation
export const SelecterIcon = styled.span<{ $open: boolean; $theme: Theme }>`
  ${flexCenter};
  color: ${({ $theme }) => $theme.primary};
  height: 1.25rem;
  width: 1.25rem;
  transition: transform 0.2s ease-in-out;
  margin-right: ${({ $open }) => ($open ? '0.5rem' : '0.4rem')};
  // transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0)')};

  & svg {
    height: 100%;
    width: 100%;
  }
`;

// Text label for the selector button
export const SelecterLabel = styled.span`
  font-size: 0.95rem;
  text-align: left;
  white-space: nowrap;
  font-weight: 500;
  letter-spacing: 0.01em;
`;

// Top section of the popover containing controls
export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 0 0.25rem 0.75rem 0.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  margin-bottom: 0.75rem;
`;

// Scrollable content area of the popover
export const Content = styled.div`
  height: calc(100% - 30px);
  overflow-y: auto;
  width: 100%;
  padding: 0.25rem 0.5rem;

  /* Improve scrollbar appearance */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 3px;
  }
`;

// Close button with icon for dismissing the popover
export const CloseButton = styled.button<{ theme: Theme }>`
  ${flexCenter};
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  margin: 0;
  padding: 0.5rem;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
  border-radius: 50%;

  &:hover {
    color: ${({ theme }) =>
      theme.primary === '#06c'
        ? '#0055b3'
        : `color-mix(in srgb, ${theme.primary} 80%, black)`};
    transform: scale(1.05);
  }
`;
