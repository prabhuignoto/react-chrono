import styled from 'styled-components';

export const ListStyle = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ListItemStyle = styled.li`
  margin: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`;

export const TitleStyle = styled.h1``;

export const TitleDescriptionStyle = styled.p``;
