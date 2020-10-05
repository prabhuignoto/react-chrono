import styled from "styled-components";
import { Theme } from "../../models/TimelineTreeModel";

export const TitleWrapper = styled.div<{ theme: Theme }>`
  border-radius: 0.2rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.95rem;
  font-weight: 600;
  max-width:  180px;
  overflow: hidden;
  padding: 0.25rem 0.5rem;
  text-overflow: ellipsis;
  white-space: nowrap;

  &.active {
    background: ${(p) => p.theme.secondary};
    color: ${(p) => p.theme.primary};
  }
`;
