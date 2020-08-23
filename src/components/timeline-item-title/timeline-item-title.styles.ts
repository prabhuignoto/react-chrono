import styled from "styled-components";

export const TitleWrapper = styled.div`
  border-radius: 0.2rem;
  font-family: 'Roboto Mono', monospace;
  padding: 0.25rem 0.5rem;
  white-space: nowrap;
  font-size: 1.1rem;
  font-weight: 400;
  overflow: hidden;
  max-width:  180px;
  text-overflow: ellipsis;

  &.active {
    background: #ffdf00;
    color: #0f52ba;
    font-weight: 600;
    border-radius: 1rem;
  }
`;
