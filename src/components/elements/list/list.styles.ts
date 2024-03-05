import { Theme } from '@models/Theme';
import styled from 'styled-components';

// Style constants
const BACKGROUND_COLOR = '#f5f5f5';
const BORDER_COLOR = 'rgba(0, 0, 0, 0.1)';

// Common styles
const commonStyles = `
  align-items: center;
  background: ${BACKGROUND_COLOR};
  border-radius: 4px;
  box-shadow: 0px 1px 1px ${BORDER_COLOR};
  display: flex;
  margin: 0;
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.5rem;
  width: 100%;

  &:last-child {
    margin-bottom: 0;
  }
`;

// List styles
export const ListStyle = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  list-style: none;
  margin: 0;
  padding: 0;popo
  width: 100%;
`;

// List item styles
export const ListItemStyle = styled.li<{
  $active?: boolean;
  $selectable?: boolean;
  $theme: Theme;
}>`
  ${commonStyles}
  border: ${(p) =>
    p.$active ? `1px solid ${p.$theme.primary}` : '1px solid transparent'};
  flex-direction: ${(p) => (p.$selectable ? 'row' : 'column')};
  background: ${(p) => p.$theme.toolbarBtnBgColor};
  &:hover {
    border: 1px solid ${(p) => p.$theme.primary};
    cursor: pointer;
  }
  user-select: none;
`;

// Title styles
export const TitleStyle = styled.h1<{ theme: Theme }>`
  color: ${(p) => p.theme.primary};
  font-size: 1rem;
  font-weight: normal;
  margin: 0.2rem 0;
  text-align: left;
  white-space: nowrap;
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

// Checkbox wrapper styles
export const CheckboxWrapper = styled.span`
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Checkbox styles
export const CheckboxStyle = styled.span<{ selected?: boolean; theme: Theme }>`
  align-items: center;
  background-color: white;
  ${(p) => !p.selected && `box-shadow: inset 0 0 0 1px ${BORDER_COLOR};`}
  background: ${(p) => (p.selected ? p.theme.primary : p.theme.toolbarBgColor)};
  color: #fff;
  border-radius: 50%;
  display: flex;
  height: 1.25rem;
  justify-content: center;
  margin-right: 0.25rem;
  margin-left: 0.1rem;
  width: 1.25rem;

  svg {
    width: 80%;
    height: 80%;
  }
`;

// Style and description wrapper styles
export const StyleAndDescription = styled.div<{ $selectable?: boolean }>`
  flex-direction: column;
  display: flex;
  width: ${(p) => (p.$selectable ? 'calc(100% - 2rem)' : '100%')};
`;
