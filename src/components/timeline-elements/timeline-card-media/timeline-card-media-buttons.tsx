import { Theme } from '@models/Theme';
import styled, { css } from 'styled-components';

const Button = css<{ theme: Theme }>`
  align-items: center;
  background: none;
  // background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  height: 2rem;
  justify-content: center;
  padding: 0;
  width: 2rem;
  margin: 0 0.25rem;
  background: ${(p) => p.theme?.primary};
  color: #fff;
  transition: all 0.2s ease-in-out;

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const ExpandButton = styled.button<{
  // expandFull?: boolean;
  theme: Theme;
}>`
  ${Button}
`;

export const ShowHideTextButton = styled.button<{
  showText?: boolean;
  theme: Theme;
}>`
  ${Button}
`;

export const ButtonWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: auto;
`;
