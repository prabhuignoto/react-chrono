import styled from "styled-components";
import { Theme } from "../../models/TimelineTreeModel";

export const TimelineItemContentWrapper = styled.div<{theme: Theme}>`
  align-items: flex-start;
  background: #fff;
  border-radius: 0.75rem;
  display: flex;
  filter: drop-shadow(2px 2px 5px rgba(0,0,0,0.25));
  flex-direction: column;
  font-family: 'Roboto Mono', monospace;
  height: 100%;
  justify-content: flex-start;
  line-height: 1.5rem;
  margin: 0 auto;
  min-height: 100px;
  text-align: left;
  width: 100%;
  
  &.active {
    color: ${(p) => p.theme.primary};
  }
`;

export const TimelineContentText = styled.span`
  font-size: 0.9rem;
  font-weight: 400;
  padding: 0.25rem 0.75rem 0rem;
`;

export const TimelineContentTitle = styled.span<{theme: Theme}>`
  color: #323232;
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 0.5rem;
  padding-left: 0.75rem;
  &.active {
    color: ${(p) => p.theme.primary};
  }
`;

export const TimelineContentDetails = styled.p`
  color: #666666;
  font-size: 0.8rem;
  font-weight: 400;
  margin: 0;
  padding: 0 0.75rem;
  touch-action: none;

  &.active {
    background: #f9f9f9;
  }
`;

export const TimelineContentDetailsWrapper = styled.div<{theme: Theme}>`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 0.25rem;
  max-height: 300px;
  overflow-y: auto;
  scrollbar-width: 0.35em;
  transition: max-height .2s linear;
  width: 100%;

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
    background-color: ${(p) => p.theme.primary};
    outline: 1px solid ${(p) => p.theme.primary};
  }
`;

export const ShowMore = styled.span<{show?: boolean}>`
  cursor: pointer;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
  margin-left: 0.75rem;
  visibility: ${(p) => p.show ? "visible" : "hidden"};
  height: ${(p) => !p.show ? "0" : ""};
`;