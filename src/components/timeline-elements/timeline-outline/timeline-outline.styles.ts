import { Theme } from '@models/Theme';
import styled, { keyframes } from 'styled-components';
import { OutlinePosition } from './timeline-outline';

const open = keyframes`
  from {
    width: 30px;
    height: 30px;
  }

  to: {
    width: 200px;
    height: 50%;
  }
  `;

const close = keyframes`
  from {
    width: 200px;
    height: 50%;
  }

  to: {
    width: 30px;
    height: 30px;
  }
`;

export const OutlineWrapper = styled.div<{
  open?: boolean;
  position?: OutlinePosition;
}>`
  animation: ${(p) => (p.open ? open : close)};
  animation-duration: 0.2s;
  animation-timing-function: ease-in;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid ${(p) => (p.open ? '#f5f5f5' : 'none')};
  height: 50%;
  position: absolute;
  top: 1rem;
  width: 100%;
  z-index: 9000;
  ${(p) =>
    p.position === OutlinePosition.left ? `left: 1rem;` : `right: 3rem;`};
  ${(p) =>
    p.open
      ? `
    width: 200px;
    height: 50%;
    box-shadow: 0 5px 10px 2px rgba(0,0,0,0.2);
    overflow-y: auto;`
      : `width: 30px; height: 30px;`};
`;

export const OutlinePane = styled.aside<{ open?: boolean }>`
  align-items: center;
  border-radius: 4px;
  display: flex;
  justify-content: center;
`;

export const OutlineButton = styled.button<{
  open?: boolean;
  position?: OutlinePosition;
  theme?: Theme;
}>`
  align-items: center;
  align-self: flex-end;
  background: #fff;
  border-radius: 4px;
  border: 0;
  box-shadow: ${(p) => (!p.open ? '0 0 10px 2px rgba(0,0,0,0.2)' : 'none')};
  cursor: pointer;
  display: flex;
  height: 30px;
  justify-content: center;
  padding: 0;
  width: 30px;

  ${(p) =>
    p.position === OutlinePosition.left
      ? 'margin-right: auto;'
      : 'margin-left: auto;'};

  & svg {
    width: 70%;
    height: 70%;
  }

  & svg path {
    color: ${(p) => p.theme.primary};
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  list-style: none;
  margin: 0;
  overflow-y: auto;
  padding: 0;
  width: 80%;
`;

export const ListItem = styled.li`
  align-items: center;
  display: flex;
  font-size: 0.9rem;
  justify-content: flex-start;
  margin: 0.75rem 0;
  cursor: pointer;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    display: block;
    width: 100%;
    position: absolute;
    height: 1px;
    background: #ddd;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: -50%;
  }
`;

export const ListItemName = styled.span<{ selected?: boolean; theme?: Theme }>`
  font-size: 0.75rem;
  color: ${(p) => (p.selected ? p.theme.primary : '')};
  padding-left: 0.25rem;

  &:hover {
    color: ${(p) => p.theme.primary};
  }
`;

export const ListItemBullet = styled.span<{
  selected?: boolean;
  theme?: Theme;
}>`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-right: 1rem;
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${(p) =>
      p.selected ? `${p.theme.secondary}` : `${p.theme.primary}`};
    left: 0;
    margin: 0 auto;
    border: ${(p) =>
      p.selected
        ? `2px solid ${p.theme.secondary}`
        : `2px solid ${p.theme.primary}`};
  }
`;
