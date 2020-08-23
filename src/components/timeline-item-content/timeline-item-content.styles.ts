import styled from "styled-components";

export const TimelineItemContentWrapper = styled.div`
  align-items: flex-start;
  background: #fff;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  filter: drop-shadow(2px 2px 5px rgba(0,0,0,0.25));
  font-family: 'Roboto Mono', monospace;
  height: 100%;
  justify-content: flex-start;
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
  padding: 0.25rem 0.75rem 0.5rem;
  font-weight: 400;
  font-size: 0.9rem;
`;

export const TimelineContentTitle = styled.span`
  font-size: 1rem;
  font-weight: 500;
  margin: 0.25rem 0;
  padding-left: 0.75rem;
`;