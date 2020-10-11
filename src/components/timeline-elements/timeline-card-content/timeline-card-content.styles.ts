import styled from '@emotion/styled';
import { TimelineMode } from "../../../models/TimelineModel";
import { Theme } from "../../../models/TimelineTreeModel";

export const TimelineItemContentWrapper = styled.div<{ theme: Theme, noMedia?: boolean, minHeight?: number, mode?: TimelineMode }>`
  align-items: flex-start;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  font-family: 'Open Sans', monospace;

  height: ${p => {
    if (!p.noMedia) {
      return 0
    }
  }};
  justify-content: flex-start;
  line-height: 1.5rem;
  margin: 1rem 0;
  text-align: left;
  width: 100%;
  min-height: ${p => !p.noMedia ? p.minHeight : "150"}px;

  ${p => p.noMedia ? `
    background: #fff;
    filter: drop-shadow(0 0 5px rgba(0,0,0,0.2));`: null};

  &.active {
    color: ${(p) => p.theme.primary};
  }
  overflow: hidden;
`;

export const TimelineContentText = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  padding-left: 0.5rem;
  width: 95%;
`;

export const TimelineContentTitle = styled.span<{ theme: Theme }>`
  color: #323232;
  font-size: 1rem;
  font-weight: 600;
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
  touch-action: none;
  width: 97%;

  &.active {
    background: #f9f9f9;
  }
`;

export const TimelineContentDetailsWrapper = styled.div<{ theme: Theme }>`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  margin-top: auto;
  max-height: 200px;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: 0.35em;
  transition: max-height .2s linear;
  width: 100%;

  &.show-less {
    max-height: 50px;
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

export const MediaWrapper = styled.div<{ theme: Theme, active?: boolean, mode?: TimelineMode, dir?: string }>`
  /* height: ${p => p.mode === "HORIZONTAL" ? "350px" : "300px"}; */
  height: 100%;
  /* min-height: 250px;
  max-height: 450px; */
  flex-direction: row;
  align-items: center;
  width: 100%;
  align-self: center;
  padding: 0.5rem;
  position: relative;
  background: ${p => p.active ? `rgba(${p.theme.secondary}, 0.35)` : ""};
  border-radius: 4px;

  ${p => {
    if (p.mode === "HORIZONTAL") {
      return `
        justify-content: flex-start;
      `;
    } else {
      if (p.dir === "left") {
        return `
        justify-content: flex-start;
      `;
      } else {
        return `
        justify-content: flex-end;
      `;
      }
    }
  }}
`;

export const Media = styled.img<{ mode?: TimelineMode, visible?: boolean, active?: boolean }>`
  max-width: 100%;
  justify-self: center;
  flex: 4;
  max-height: 70%;
  visibility: ${p => p.visible ? "visible" : "hidden"};
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
`;

export const MediaDetailsWrapper = styled.div<{ mode?: TimelineMode }>`
  /* position: absolute; */
  bottom: -1rem;
  left: 0;
  right: 0;
  /* margin-left: auto; */
  margin-right: auto;
  width: ${p => {
    switch (p.mode) {
      case "HORIZONTAL": return "100%";
      case "VERTICAL": return "100%";
      case "TREE": return "100%";
    }
  }};
  min-height: 100px;
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 6px;
  /* background: rgba(255,255,255, 0.95); */
  /* background: rgba(0,0,0,0.7); */
  /* filter: drop-shadow(0 0 20px rgba(0,0,0,0.5)); */
  padding-bottom: 0.5rem;
`;
