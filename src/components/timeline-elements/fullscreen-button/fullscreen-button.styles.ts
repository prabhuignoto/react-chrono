import styled, { css } from 'styled-components';
import { FullscreenButtonStyleProps } from './fullscreen-button.model';

/**
 * Size configurations for the fullscreen button
 */
const buttonSizes = {
  small: {
    size: '28px',
    iconSize: '16px',
    padding: '6px',
  },
  medium: {
    size: '36px',
    iconSize: '20px',
    padding: '8px',
  },
  large: {
    size: '40px',
    iconSize: '22px',
    padding: '9px',
  },
} as const;

/**
 * Base button styles with modern design principles
 */
const baseButtonStyles = css<FullscreenButtonStyleProps>`
  /* Reset and base styles */
  appearance: none;
  border: none;
  margin: 0;
  background: none;
  font: inherit;
  cursor: pointer;
  outline: none;

  /* Layout and sizing */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 6px;

  /* Dynamic sizing based on size prop */
  ${({ $size }) => {
    const config = buttonSizes[$size];
    return css`
      width: ${config.size};
      height: ${config.size};
      padding: ${config.padding};

      svg {
        width: ${config.iconSize};
        height: ${config.iconSize};
        flex-shrink: 0;
      }
    `;
  }}

  /* Color and theming */
  color: ${({ theme }) =>
    theme?.iconColor || theme?.primary || '#333'};
  background-color: ${({ theme }) =>
    theme?.toolbarBtnBgColor || theme?.cardBgColor || 'transparent'};

  /* Modern shadow and border */
  border: 1px solid
    ${({ theme }) =>
      theme?.buttonBorderColor ||
      theme?.shadowColor ||
      'rgba(0, 0, 0, 0.1)'};
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.1);

  /* Smooth transitions */
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  /* Hover effects */
  &:hover:not(:disabled) {
    color: ${({ theme }) => theme?.primary || '#007bff'};
    background-color: ${({ theme }) =>
      theme?.buttonHoverBgColor ||
      theme?.cardBgColor ||
      'rgba(0, 0, 0, 0.02)'};
    border-color: ${({ theme }) => theme?.primary || '#007bff'};
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.08),
      0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }

  /* Active/pressed state */
  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.05),
      0 1px 3px rgba(0, 0, 0, 0.1);
  }

  /* Focus state for accessibility */
  &:focus-visible {
    box-shadow:
      0 0 0 3px ${({ theme }) => theme?.primary}33 || 'rgba(0, 123, 255, 0.2)',
      0 1px 2px rgba(0, 0, 0, 0.05),
      0 1px 3px rgba(0, 0, 0, 0.1);
  }

  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: ${({ theme }) => theme?.iconColor || '#999'};
    background-color: ${({ theme }) =>
      theme?.buttonActiveBgColor || 'rgba(0, 0, 0, 0.02)'};
    border-color: ${({ theme }) => theme?.shadowColor || 'rgba(0, 0, 0, 0.1)'};
    box-shadow: none;
    transform: none;
  }

  /* Active fullscreen state indicator */
  ${({ $isFullscreen, theme }) =>
    $isFullscreen &&
    css`
      color: ${theme?.primary || '#007bff'};
      background-color: ${theme?.primary}11 || 'rgba(0, 123, 255, 0.1)';
      border-color: ${theme?.primary}44 || 'rgba(0, 123, 255, 0.3)';
    `}

  /* Responsive adjustments */
  @media (max-width: 480px) {
    /* Match timeline button mobile sizing */
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;

    svg {
      width: 22px;
      height: 22px;
    }
  }

  @media (max-width: 768px) {
    /* Slightly larger touch targets on mobile */
    min-width: ${({ $size }) => buttonSizes[$size].size};
    min-height: ${({ $size }) => buttonSizes[$size].size};

    /* Reduce hover effects on touch devices */
    @media (hover: none) {
      &:hover:not(:disabled) {
        transform: none;
        box-shadow:
          0 1px 2px rgba(0, 0, 0, 0.05),
          0 1px 3px rgba(0, 0, 0, 0.1);
      }
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    border-width: 2px;
    border-color: currentColor;
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover:not(:disabled),
    &:active:not(:disabled) {
      transform: none;
    }
  }
`;

/**
 * Styled fullscreen button component with comprehensive theming and accessibility
 */
export const FullscreenButtonWrapper = styled.button<FullscreenButtonStyleProps>`
  ${baseButtonStyles}

  /* Additional custom styles can be added here */
  
  /* Ensure proper icon alignment */
  svg {
    pointer-events: none;
    user-select: none;
  }

  /* Loading state (for future enhancement) */
  &[data-loading='true'] {
    pointer-events: none;

    svg {
      opacity: 0.6;
    }
  }

  /* High DPI displays */
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
    /* Ensure crisp borders on high-DPI displays */
    border-width: 0.5px;
  }
`;
