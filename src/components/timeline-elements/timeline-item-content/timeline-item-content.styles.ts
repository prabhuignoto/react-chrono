import styled from "styled-components";
import { TimelineMode } from "../../../models/TimelineModel";
import { Theme } from "../../../models/TimelineTreeModel";

export const TimelineItemContentWrapper = styled.div<{ theme: Theme, noMedia?: boolean }>`
  align-items: flex-start;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto Mono', monospace;
  height: 100%;
  justify-content: flex-start;
  line-height: 1.5rem;
  margin: 0 auto;
  /* min-height: 100px; */
  text-align: left;
  width: 100%;

  ${p => p.noMedia ? `
    background: #fff;
    filter: drop-shadow(0 0 5px rgba(0,0,0,0.2));`: null};

  &.active {
    color: ${(p) => p.theme.primary};
  }
`;

export const TimelineContentText = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  padding-left: 0.5rem;
  width: 95%;
`;

export const TimelineContentTitle = styled.span<{ theme: Theme }>`
  color: #323232;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0.5rem;
  padding-left: 0.5rem;
  &.active {
    color: ${(p) => p.theme.primary};
  }
`;

export const TimelineContentDetails = styled.p`
  color: #666666;
  font-size: 0.8rem;
  font-weight: 400;
  margin: 0;
  padding-left: 0.5rem;
  touch-action: none;
  width: 95%;

  &.active {
    background: #f9f9f9;
  }
`;

export const TimelineContentDetailsWrapper = styled.div<{ theme: Theme }>`
  align-items: center;
  display: flex;
  flex-direction: column;
  /* margin-top: 0.25rem; */
  margin-top: auto;
  max-height: 350px;
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

export const ShowMore = styled.span<{ show?: boolean }>`
  cursor: pointer;
  font-size: 0.75rem;
  margin-top: auto;
  margin-bottom: 0.5rem;
  margin-left: 0.75rem;
  visibility: ${(p) => p.show ? "visible" : "hidden"};
  height: ${(p) => !p.show ? "0" : ""};
`;

export const MediaWrapper = styled.div<{ theme: Theme, active?: boolean, mode?: TimelineMode }>`
  height: ${p => p.mode === "HORIZONTAL" ? "350px" : "300px"};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${p => p.mode !== "HORIZONTAL" ? "90%" : "70%"};
  align-self: center;
  padding: 0.5rem;
  position: relative;
  background: ${p => p.active ? `rgba(${p.theme.secondary}, 0.35)` : ""};
  border-radius: 4px;
`;

export const Media = styled.img<{ mode?: TimelineMode, visible?: boolean, active?: boolean }>`
  object-fit: ${p => p.mode === "TREE" ? "contain" : "contain"};
  object-fit: "contain";
  width: 100%;
  justify-self: center;
  flex: 4;
  height: 100%;
  visibility: ${p => p.visible ? "visible" : "hidden"};
  border: ${p => p.active ? `1px solid ${p.theme.primary}` : ""};
`;

export const MediaDetailsWrapper = styled.div<{ mode?: TimelineMode }>`
  position: absolute;
  bottom: -1rem;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: ${p => {
    switch (p.mode) {
      case "HORIZONTAL": return "80%";
      case "VERTICAL": return "80%";
      case "TREE": return "80%";
    }
  }};
  min-height: 100px;
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 6px;
  background: rgba(255,255,255, 0.8);
  /* background: rgba(0,0,0,0.7); */
  filter: drop-shadow(0 0 20px rgba(0,0,0,0.5));
  padding-bottom: 0.5rem;
`;
