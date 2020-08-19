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
  width: ${p => p.width}px;

  &.vertical {
    /* TO DO */
    margin-bottom: 2rem;
    min-height: 100px;
    width: 100%;
  }
`;


export const Connector = styled.div`
  background: red;
  height: 100%;
  left: 0;
  left: 4rem;
  position: absolute;
  top: 0;
  width: 3px;
`;
