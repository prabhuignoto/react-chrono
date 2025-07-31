import { Theme } from '@models/Theme';
import styled, { css } from 'styled-components';

// Base styles for flex containers - using memo to prevent recreation
const flexContainer = css`
  display: flex;
  align-items: center;
`;

// Enhanced toolbar wrapper with better visual hierarchy and responsive design
export const ToolbarWrapper = styled.div<{ theme: Theme }>`
  ${flexContainer};
  list-style: none;
  margin: 0;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.toolbarBgColor};
  transform: translateY(0);
  filter: drop-shadow(
    0 2px 8px ${({ theme }) => theme.shadowColor || 'rgba(0, 0, 0, 0.12)'}
  );
  width: 100%;
  min-height: 60px;
  border-radius: 8px;
  flex-wrap: nowrap;
  will-change: transform;
  border: ${({ theme }) =>
    theme.buttonBorderColor ? `1px solid ${theme.buttonBorderColor}` : 'none'};
  gap: 0.75rem;
  align-items: center;
  transition: all 0.2s ease-in-out;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    min-height: auto;
    padding: 0.75rem 0.5rem;
    gap: 0.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem;
    flex-direction: column;
    gap: 0.75rem;
  }
`;

// Enhanced toolbar list item with better accessibility and touch targets
export const ToolbarListItem = styled.div<{ theme?: Theme }>`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  
  &:first-child {
    // margin-right: auto;
  }
  
  &:last-child {
    // margin-left: auto;
  }
  
  &:hover {
    background-color: transparent;
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme?.primary || '#007acc'};
    outline-offset: 2px;
    border-radius: 4px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
  
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme?.primary || '#007acc'};
    outline-offset: 2px;
  }
  
  &[role="button"] {
    tabindex: 0;
  }
  
  @media (max-width: 768px) {
    &:first-child,
    &:last-child {
      margin: 0;
    }
    
    min-height: 48px;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

// Enhanced icon wrapper with better sizing and hover effects
export const IconWrapper = styled.span`
  ${flexContainer};
  justify-content: center;
  align-items: center;
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  transition: all 0.2s ease-in-out;
  
  svg {
    width: 100%;
    height: 100%;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }
  
  &:hover svg {
    transform: scale(1.1);
  }
  
  @media (max-width: 480px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

// Enhanced content wrapper with better layout control
export const ContentWrapper = styled.span`
  ${flexContainer};
  flex-wrap: nowrap;
  min-width: 0;
  transition: all 0.2s ease-in-out;
  
  @media (max-width: 768px) {
    flex: 1;
  }
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

// Toolbar section wrapper for better grouping
export const ToolbarSection = styled.div<{ $primary?: boolean; theme?: Theme }>`
  ${flexContainer};
  gap: 0.5rem;
  padding: ${({ $primary }) => $primary ? '0.25rem 0.5rem' : '0'};
  border-radius: ${({ $primary }) => $primary ? '6px' : '0'};
  background-color: ${({ theme, $primary }) => 
    $primary ? theme?.toolbarBtnBgColor || 'rgba(0, 0, 0, 0.05)' : 'transparent'};
  border: ${({ theme, $primary }) => 
    $primary && theme?.buttonBorderColor ? `1px solid ${theme.buttonBorderColor}` : 'none'};
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: ${({ theme, $primary }) => 
      $primary ? theme?.toolbarBtnBgColor || 'rgba(0, 0, 0, 0.08)' : 'transparent'};
  }
  
  @media (max-width: 768px) {
    gap: 0.25rem;
    padding: ${({ $primary }) => $primary ? '0.2rem 0.4rem' : '0'};
  }
  
  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;
