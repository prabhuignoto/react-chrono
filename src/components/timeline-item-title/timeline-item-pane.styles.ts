import styled from "styled-components";

export const PaneTitle = styled.div`
  border-radius: 0.2rem;
  font-family: 'Roboto Mono', monospace;
  padding: 0.25rem;
  white-space: nowrap;

  &.active {
    background: #ffdf00;
    color: #0f52ba;
    font-size: 1rem;
    font-weight: 500;
  }
`;

