import { Theme } from '@models/Theme';
import styled from 'styled-components';

export const ToolbarWrapper = styled.ul<{ theme: Theme }>`
  list-style: none;
  margin: 0;
  display: flex;
  align-items: center;
  background-color: ${(p) => p.theme.toolbarBgColor};
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  border-radius: 6px;
  flex-wrap: wrap;
  padding: 0.25rem;
`;

export const ToolbarListItem = styled.li`
  padding: 0;
  margin: 0 0.5rem;
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
`;

export const ContentWrapper = styled.span`
  display: flex;
`;
