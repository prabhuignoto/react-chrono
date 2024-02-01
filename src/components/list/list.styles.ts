import { Theme } from '@models/Theme';
import styled from 'styled-components';

export const ListStyle = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
`;

export const ListItemStyle = styled.li<{ theme: Theme; active?: boolean }>`
  margin: 0;
  padding: 0.25rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  width: 98%;
  &:last-child {
    margin-bottom: 0;
  }
  border-radius: 4px;
  background: #f5f5f5;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  border: ${(p) =>
    p.active ? `1px solid ${p.theme.primary}` : '1px solid transparent'};

  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
    border: 1px solid ${(p) => p.theme.primary};
  }
`;

export const TitleStyle = styled.h1<{ theme: Theme }>`
  margin: 0.2rem 0;
  text-align: left;
  width: 100%;
  font-size: 1.1rem;
  color: ${(p) => p.theme.primary};
  font-weight: bold;
`;

export const TitleDescriptionStyle = styled.p`
  padding: 0.1rem;
  margin: 0;
  text-align: left;
  width: 100%;
  font-size: 0.8rem;
  font-weight: normal;
`;
