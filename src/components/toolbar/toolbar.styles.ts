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
  padding: 0.25rem;
  background-color: ${({ theme }) => theme.toolbarBgColor};
  transform: translateY(0);
  filter: drop-shadow(0 2px 1px rgba(0, 0, 0, 0.1));
  width: 100%;
  height: 100%;
  border-radius: 6px;
  flex-wrap: wrap;
  will-change: transform;
`;

// Toolbar list item styles
export const ToolbarListItem = styled.li`
  padding: 0;
  margin: 0 0.5rem;
`;

// Icon wrapper styles
export const IconWrapper = styled.span`
  ${flexContainer};
  justify-content: center;
  width: 1rem;
  height: 1rem;
`;

// Content wrapper styles
export const ContentWrapper = styled.span`
  ${flexContainer};
`;
