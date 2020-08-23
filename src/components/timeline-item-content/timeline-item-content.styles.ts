import styled from "styled-components";

export const TimelineItemContentWrapper = styled.div`
  align-items: flex-start;
  background: #fff;
  border-radius: 1rem;
  display: flex;
  filter: drop-shadow(2px 2px 5px rgba(0,0,0,0.25));
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
  font-weight: 500;
  height: 100%;
  justify-content: center;
  line-height: 1.5rem;
  margin: 0 auto;
  min-height: 100px;
  text-align: left;
  width: 100%;

  &.active {
    color: #0f52ba;
  }
`;

export const TimelineContentText = styled.span`
  padding: 1rem;
`;