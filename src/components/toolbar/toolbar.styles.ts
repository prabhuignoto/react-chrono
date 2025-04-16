import { Theme } from '@models/Theme';
import styled, { css } from 'styled-components';

// Base styles for flex containers - using memo to prevent recreation
const flexContainer = css`
  display: flex;
  align-items: center;
`;

// Use transform instead of box-shadow for better performance
export const ToolbarWrapper = styled.ul<{ theme: Theme }>`
  ${flexContainer};
  list-style: none;
  margin: 0;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.toolbarBgColor};
  transform: translateY(0);
  filter: drop-shadow(0 2px 1px rgba(0, 0, 0, 0.1));
  width: 100%;
  height: 100%;
  border-radius: 6px;
  flex-wrap: wrap;
  will-change: transform;
  gap: 0.5rem;
`;

// Toolbar list item styles
export const ToolbarListItem = styled.li`
  padding: 0;
  margin: 0;
  min-width: 2rem;
  min-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.toolbarBtnBgColor};
    filter: brightness(0.95);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Icon wrapper styles
export const IconWrapper = styled.span`
  ${flexContainer};
  justify-content: center;
  width: 1rem;
  height: 1rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

// Content wrapper styles
export const ContentWrapper = styled.span`
  ${flexContainer};
  padding: 0 0.5rem;
  font-size: 0.875rem;
`;
