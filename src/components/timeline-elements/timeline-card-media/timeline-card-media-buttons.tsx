import styled from 'styled-components';
import { Theme } from '../../../models/Theme';

const Button = styled.button`
  align-items: center;
  background: none;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  height: 1.5rem;
  justify-content: center;
  padding: 0;
  width: 1.5rem;
  margin: 0 0.25rem;

  svg {
    width: 70%;
    height: 70%;
  }
`;

export const ExpandButton = styled(Button)<{
  expandFull?: boolean;
  theme: Theme;
}>`
  &:hover {
    color: ${(p) => p.theme?.primary};
  }
`;

export const ShowHideTextButton = styled(Button)<{
  showText?: boolean;
  theme: Theme;
}>`
  &:hover {
    color: ${(p) => p.theme?.primary};
  }
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
