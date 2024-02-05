import { Theme } from '@models/Theme';
import styled from 'styled-components';

export const ListStyle = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  list-style: none;
  margin: 0;
  width: 100%;
  padding: 0;
`;

export const ListItemStyle = styled.li<{
  active?: boolean;
  selectable?: boolean;
  theme: Theme;
}>`
  align-items: center;
  background: #f5f5f5;
  border: ${(p) =>
    p.active ? `1px solid ${p.theme.primary}` : '1px solid transparent'};
  border-radius: 4px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: ${(p) => (p.selectable ? 'row' : 'column')};
  margin: 0;
  margin-bottom: 1rem;
  padding: 0.25rem 0.5rem;
  width: 100%;

  &:hover {
    background-color: #f5f5f5;
    border: 1px solid ${(p) => p.theme.primary};
    cursor: pointer;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const TitleStyle = styled.h1<{ theme: Theme }>`
  color: ${(p) => p.theme.primary};
  font-size: 1rem;
  font-weight: normal;
  margin: 0.2rem 0;
  text-align: left;
  white-space: nowrap;
`;

export const TitleDescriptionStyle = styled.p`
  font-size: 0.8rem;
  font-weight: normal;
  margin: 0;
  padding: 0.1rem;
  text-align: left;
  width: 100%;
`;

export const CheckboxWrapper = styled.span`
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CheckboxStyle = styled.span<{ selected?: boolean; theme: Theme }>`
  align-items: center;
  background-color: white;
  ${(p) =>
    !p.selected ? `box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);` : ''};
  background: ${(p) => (p.selected ? p.theme.primary : '#fff')};
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

export const StyleAndDescription = styled.div<{ selectable?: boolean }>`
  flex-direction: column;
  display: flex;
  width: ${(p) => (p.selectable ? 'calc(100% - 2rem)' : '100%')};
`;
