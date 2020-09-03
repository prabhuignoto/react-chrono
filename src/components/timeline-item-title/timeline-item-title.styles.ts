import styled from "styled-components";
import { Theme } from "../../models/TimelineTreeModel";

export const TitleWrapper = styled.div<{ theme: Theme }>`
  border-radius: 0.2rem;
  font-family: 'Roboto Mono', monospace;
  padding: 0.25rem 0.5rem;
  white-space: nowrap;
  font-size: 0.95em;
  font-weight: 400;
  overflow: hidden;
  max-width:  180px;
  text-overflow: ellipsis;

  &.active {
    background: ${(p) => p.theme.secondary};
    color: ${(p) => p.theme.primary};
  }
`;
