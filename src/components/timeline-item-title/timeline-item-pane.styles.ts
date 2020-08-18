import styled from "styled-components";

export const PaneTitle = styled.div`
  font-family: 'Roboto Mono', monospace;
  white-space: nowrap;
  border-radius: 0.2rem;
  padding: 0.25rem;

  &.active {
    font-weight: 500;
    font-size: 1rem;
    background: #ffdf00;
    color: #0f52ba;
  }
`;

