import styled from 'styled-components';

export const ListStyle = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 300px;
`;

export const ListItemStyle = styled.li`
  margin: 0;
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;
  &:last-child {
    margin-bottom: 0;
  }
  border-radius: 4px;
  background: #f5f5f5;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);

  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`;

export const TitleStyle = styled.h1`
  margin: 0.2rem 0;
`;

export const TitleDescriptionStyle = styled.p`
  padding: 0.1rem;
  margin: 0;
`;
