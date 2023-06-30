import { Theme } from '@models/Theme';
import styled, { css } from 'styled-components';

const Button = css`
  align-items: center;
  background: none;
  // background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  height: 1.5rem;
  justify-content: center;
  padding: 0;
  width: 1.5rem;
  margin: 0 0.25rem;
  background: ${(p) => p.theme?.primary};
  color: #fff;

  svg {
    width: 70%;
    height: 70%;
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
