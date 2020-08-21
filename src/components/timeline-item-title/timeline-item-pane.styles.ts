import styled from "styled-components";

export const PaneTitle = styled.div`
  border-radius: 0.2rem;
  font-family: 'Roboto Mono', monospace;
  padding: 0.25rem 0.5rem;
  white-space: nowrap;
  font-size: 0.9rem;
  font-weight: 500;
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

