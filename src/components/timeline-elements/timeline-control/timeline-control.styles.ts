import styled from "styled-components";

export const TimelineControlWrapper = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const TimelineControlItem = styled.li<{disable: boolean}>`
  padding: 0.2rem;
  ${(p) => p.disable ? "pointer-events: none; filter: opacity(0.4)" : ""};
`;

export const TimelineControlButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  outline: 0;
`;

