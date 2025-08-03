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
export const PopoverWrapper = styled.div``;

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
  z-index: ${zIndex.popover}; /* Use standardized z-index for popovers */
`;

// Clickable selector button that triggers the popover - matches navigation button size
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
  box-shadow: 0 1px 1px
    ${({ $theme }) => $theme.shadowColor ?? 'rgba(0, 0, 0, 0.08)'};
  cursor: pointer;
  justify-content: space-between;
  padding: 0;
  user-select: none;
  margin-right: 0.5rem;
  height: 36px;
  min-width: 36px;
  width: auto;
  padding: 0 0.5rem;
  transition:
    background-color 0.2s ease-out,
    border-color 0.2s ease-out,
    box-shadow 0.2s ease-out,
    transform 0.15s ease-out;

  &:hover {
    background: ${({ $theme }) =>
      $theme.buttonHoverBgColor || $theme.toolbarBtnBgColor};
    border-color: ${({ $theme }) =>
      $theme.buttonHoverBorderColor || $theme.primary};
    box-shadow: 0 2px 4px
      ${({ $theme }) => $theme.shadowColor ?? 'rgba(0, 0, 0, 0.12)'};
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.95);
    box-shadow: inset 0 1px 1px
      ${({ $theme }) => $theme.shadowColor ?? 'rgba(0, 0, 0, 0.1)'};
  }

  &:focus {
    outline: 2px solid ${({ $theme }) => $theme.primary || '#007acc'};
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

  /* Ensure crisp borders */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media (max-width: 480px) {
    height: 40px;
    min-width: 40px;
    padding: 0 0.6rem;
  }
`;

// Icon component within the selector with rotation animation
export const SelecterIcon = styled.span<{ $open: boolean; $theme: Theme }>`
  ${flexCenter};
  color: ${({ $theme }) => $theme.iconColor || $theme.primary};
  height: 20px;
  width: 20px;
  transition: transform 0.2s ease-in-out;
  margin-right: 0.25rem;
  flex-shrink: 0;

  & svg {
    height: 20px;
    width: 20px;
  }

  @media (max-width: 480px) {
    height: 22px;
    width: 22px;

    & svg {
      height: 22px;
      width: 22px;
    }
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
  color: ${({ theme }) => theme.iconColor || theme.primary};
  cursor: pointer;
  margin-bottom: 0.5rem;
  margin-left: auto;
`;
