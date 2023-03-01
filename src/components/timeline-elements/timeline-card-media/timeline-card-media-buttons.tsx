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
  position: absolute;
  width: 1.5rem;
  z-index: 10px;

  svg {
    width: 70%;
    height: 70%;
  }
`;

export const ExpandButton = styled(Button)<{
  expandFull?: boolean;
  theme: Theme;
}>`
  right: 0.5rem;
  top: 0.5rem;

  &:hover {
    color: ${(p) => p.theme?.primary};
  }
`;

export const ShowHideTextButton = styled(Button)<{
  showText?: boolean;
  theme: Theme;
}>`
  top: 0.5rem;
  right: 2.5rem;

  &:hover {
    color: ${(p) => p.theme?.primary};
  }
`;
