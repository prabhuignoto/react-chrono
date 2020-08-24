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
  padding: 0.25rem 0.75rem 0rem;
  font-weight: 400;
  font-size: 0.9rem;
`;

export const TimelineContentTitle = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 0.5rem;
  padding-left: 0.75rem;
  color: #323232;
  &.active {
    color: #0f52ba;
  }
`;

export const TimelineContentDetails = styled.p`
  font-size: 0.8rem;
  font-weight: 400;
  color: #666666;
  padding: 0 0.75rem;
  margin: 0;
`;

export const TimelineContentDetailsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.25rem;
  transition: max-height .2s linear;
  max-height: 300px;
  overflow-y: auto;

  &.show-less {
    max-height: 100px;
    overflow: hidden;
  }

  &::-webkit-scrollbar {
    width: 0.35em;
  }
  
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #0f52ba;
    outline: 1px solid #0f52ba;
  }
`;

export const ShowMore = styled.span`
  font-size: 0.75rem;
  margin-left: 0.75rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;