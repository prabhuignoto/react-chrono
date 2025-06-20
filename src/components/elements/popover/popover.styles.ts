import { Theme } from '@models/Theme';
import styled, { css } from 'styled-components';
import { zIndex } from '../../../styles/z-index';

// Utility mixin for centering content using flexbox
const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Helper functions for shared styling logic
const getBorderStyle = (theme: Theme) =>
  theme.buttonBorderColor
    ? `1px solid ${theme.buttonBorderColor}`
    : '1px solid transparent';

const getElevatedShadow = (theme: Theme) =>
  `0px 5px 16px ${theme.shadowColor || 'rgba(0, 0, 0, 0.5)'}`;

const getInteractiveShadow = (theme: Theme, isOpen?: boolean) =>
  !isOpen
    ? `0px 1px 3px ${theme.shadowColor || 'rgba(0, 0, 0, 0.2)'}`
    : `inset 0 0 1px 1px ${theme.shadowColor || 'rgba(0, 0, 0, 0.2)'}`;

const BORDER_RADIUS = '6px';

// Base wrapper for the popover component
export const PopoverWrapper = styled.div`
  position: relative;
  display: inline-block;
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
  border-radius: ${BORDER_RADIUS};
  border: ${({ $theme }) => getBorderStyle($theme)};
  box-shadow: ${({ $theme }) => getElevatedShadow($theme)};
  max-height: 500px;
  overflow-y: auto;
  padding: 0.75rem;
  position: absolute;
  top: calc(100% + 8px);
  bottom: auto;
  left: 0;
  z-index: ${zIndex.popover};
  width: ${({ $isMobile, $width = 300 }) =>
    $isMobile ? 'calc(100vw - 2rem)' : `${$width}px`};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  transition:
    opacity 0.2s ease-in-out,
    transform 0.2s ease-in-out,
    visibility 0.2s ease-in-out;
  transform: ${(p) => (p.$visible ? 'translateY(0)' : 'translateY(-8px)')};
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
  border-radius: ${BORDER_RADIUS};
  border: ${({ $theme }) => getBorderStyle($theme)};
  box-shadow: ${({ $open, $theme }) => getInteractiveShadow($theme, $open)};
  cursor: pointer;
  justify-content: space-between;
  padding: ${(p) => (p.$isMobile ? '0.5rem 0.6rem' : `0.5rem 0.75rem`)};
  user-select: none;
  margin-right: 0.75rem;
  min-height: 36px;
  transition:
    background-color 0.15s ease-out,
    border-color 0.15s ease-out,
    box-shadow 0.15s ease-out;

  &:hover {
    background: ${({ $theme }) =>
      $theme.buttonHoverBgColor || $theme.toolbarBtnBgColor};
    border-color: ${({ $theme }) =>
      $theme.buttonHoverBorderColor || $theme.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ $theme }) => $theme.primary || '#0077ff'};
    outline-offset: 2px;
  }
`;

// Icon component within the selector with rotation animation
export const SelecterIcon = styled.span<{ $open: boolean; $theme: Theme }>`
  ${flexCenter};
  color: ${({ $theme }) => $theme.iconColor || $theme.primary};
  height: 1.25rem;
  width: 1.25rem;
  transition: transform 0.2s ease-in-out;
  margin-right: 0.5rem;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0)')};

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
  font-weight: 500;
`;

// Top section of the popover containing controls
export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding-bottom: 0.5rem;
`;

// Scrollable content area of the popover
export const Content = styled.div`
  width: 100%;
  overflow-y: auto;
  max-height: 400px;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
`;

// Close button with icon for dismissing the popover
export const CloseButton = styled.button<{ theme: Theme }>`
  ${flexCenter};
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.iconColor || theme.primary};
  cursor: pointer;
  padding: 0.25rem;
  margin: 0;
  height: 28px;
  width: 28px;
  border-radius: 4px;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary || '#0077ff'};
    outline-offset: 2px;
  }
`;
