import styled from "styled-components";

export const TimelineCollectionWrapper = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 1rem;
  width: 100%;
  &.vertical {
    flex-direction: column;
  }
  &.horizontal {
    flex-direction: row;
  }
`;

export const TimelineItemWrapper = styled.li<{ width: number }>`
  width: ${(p) => p.width}px;
  visibility: hidden;

  &.vertical {
    margin-bottom: 2rem;
    min-height: 100px;
    width: 100%;
  }

  &.visible {
    visibility: visible;
  }
`;