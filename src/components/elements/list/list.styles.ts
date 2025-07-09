import { Theme } from '@models/Theme';
import styled, { css } from 'styled-components';

// Theme-specific constants
const themeStyles = {
  border: (theme: Theme) => `1px solid ${theme.primary}`,
  transparent: '1px solid transparent',
};

// Reusable flex container mixin with fallbacks
const flexContainer = css`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;

// Base styles for list items and containers
const baseStyles = css`
  ${flexContainer}
  margin: 0;
  width: 100%;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
`;

// Common styles with improved typing and vendor prefixes
const commonStyles = css<{ $theme: Theme }>`
  ${baseStyles}
  background: ${p => p.$theme?.toolbarBtnBgColor || '#f5f5f5'};
  border-radius: 4px;
  -webkit-box-shadow: 0px 1px 1px
    ${p => p.$theme?.shadowColor || 'rgba(0, 0, 0, 0.1)'};
  box-shadow: 0px 1px 1px ${p => p.$theme?.shadowColor || 'rgba(0, 0, 0, 0.1)'};
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

// Main list container with improved responsive layout
export const ListStyle = styled.ul`
  ${baseStyles}
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 100%;

  @media screen and (max-width: 768px) {
    padding: 0.5rem;
  }

  @media screen and (max-width: 480px) {
    padding: 0.25rem;
  }
`;

// Interactive list item with theme support
export const ListItemStyle = styled.li<{
  $active?: boolean;
  $selectable?: boolean;
  $theme: Theme;
}>`
  ${commonStyles}
  border: ${p =>
    p.$active ? themeStyles.border(p.$theme) : themeStyles.transparent};
  flex-direction: ${p => (p.$selectable ? 'row' : 'column')};
  background: ${p => p.$theme.toolbarBtnBgColor};
  padding: 0.25rem;
  width: calc(100% - 0.5rem);
  user-select: none;

  &:hover {
    border: ${p => themeStyles.border(p.$theme)};
    cursor: pointer;
  }
`;

// Title styles
export const TitleStyle = styled.h1<{ theme: Theme }>`
  color: ${p => p.theme.iconColor || p.theme.primary};
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
  color: ${p => p.theme.cardSubtitleColor};
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
  background: ${p => (p.selected ? p.theme.primary : p.theme.toolbarBgColor)};
  ${p => !p.selected && `box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1)`};
  color: #ffffff;

  svg {
    width: 80%;
    height: 80%;
  }
`;

// Content wrapper with conditional width
export const StyleAndDescription = styled.div<{ $selectable?: boolean }>`
  ${flexContainer}
  flex-direction: column;
  width: ${p => (p.$selectable ? 'calc(100% - 2rem)' : '100%')};
`;
