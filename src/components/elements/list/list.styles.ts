import { Theme } from '@models/Theme';
import styled, { css } from 'styled-components';

// Theme-specific constants
const themeStyles = {
  border: (theme: Theme) => `1px solid ${theme.primary}`,
  transparent: '1px solid transparent'
};

// Reusable flex container mixin
const flexContainer = css`
  display: flex;
  align-items: center;
`;

// Base styles for list items and containers
const baseStyles = css`
  ${flexContainer}
  margin: 0;
  width: 100%;
`;

// Common styles with improved typing
const commonStyles = css`
  ${baseStyles}
  background: #f5f5f5;
  border-radius: 4px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

// Main list container
export const ListStyle = styled.ul`
  ${baseStyles}
  flex-direction: column;
  justify-content: center;
  list-style: none;
  padding: 0;
`;

// Interactive list item with theme support
export const ListItemStyle = styled.li<{
  $active?: boolean;
  $selectable?: boolean;
  $theme: Theme;
}>`
  ${commonStyles}
  border: ${(p) => p.$active ? themeStyles.border(p.$theme) : themeStyles.transparent};
  flex-direction: ${(p) => p.$selectable ? 'row' : 'column'};
  background: ${(p) => p.$theme.toolbarBtnBgColor};
  padding: 0.25rem;
  width: calc(100% - 0.5rem);
  user-select: none;

  &:hover {
    border: ${(p) => themeStyles.border(p.$theme)};
    cursor: pointer;
  }
`;

// Title styles
export const TitleStyle = styled.h1<{ theme: Theme }>`
  color: ${(p) => p.theme.primary};
  font-size: 1rem;
  font-weight: normal;
  margin: 0.2rem 0;
  text-align: left;
  white-space: nowrap;
  align-self: flex-start;
`;

// Title description styles
export const TitleDescriptionStyle = styled.p<{ theme: Theme }>`
  font-size: 0.8rem;
  font-weight: normal;
  margin: 0;
  padding: 0.1rem;
  text-align: left;
  width: 100%;
  color: ${(p) => p.theme.cardSubtitleColor};
`;

// Checkbox components with improved structure
export const CheckboxWrapper = styled.span`
  ${flexContainer}
  width: 2rem;
  justify-content: center;
`;

export const CheckboxStyle = styled.span<{ selected?: boolean; theme: Theme }>`
  ${flexContainer}
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  margin: 0 0.25rem 0 0.1rem;
  border-radius: 50%;
  background: ${(p) => p.selected ? p.theme.primary : p.theme.toolbarBgColor};
  ${(p) => !p.selected && `box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1)`};
  color: #fff;

  svg {
    width: 80%;
    height: 80%;
  }
`;

// Content wrapper with conditional width
export const StyleAndDescription = styled.div<{ $selectable?: boolean }>`
  ${flexContainer}
  flex-direction: column;
  width: ${(p) => p.$selectable ? 'calc(100% - 2rem)' : '100%'};
`;
