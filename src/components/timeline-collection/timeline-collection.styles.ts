import styled from "styled-components";

export const TimelineCollectionWrapper = styled.ul`
  display: flex;
  list-style: none;
  width: 100%;
  padding: 1rem;
  margin: 0;
  &.vertical {
    flex-direction: column;
  }
  &.horizontal {
    flex-direction: row;
  }
`;

export const TimelineItemWrapper = styled.li<{ width: number }>`
  width: ${p => p.width}px;

  &.vertical {
    width: 100%;
    margin-bottom: 2rem;
    /* TO DO */
    min-height: 100px;
  }
`;


export const Connector = styled.div`
  position: absolute;
  left: 0;
  background: red;
  height: 100%;
  width: 3px;
  top: 0;
  left: 4rem;
`;
