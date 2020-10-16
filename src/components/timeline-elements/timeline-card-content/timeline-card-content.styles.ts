import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { TimelineMode } from "../../../models/TimelineModel";
import { Theme } from "../../../models/TimelineTreeModel";

export const TimelineItemContentWrapper = styled.div<{ theme: Theme, noMedia?: boolean, minHeight?: number, mode?: TimelineMode }>`
  align-items: flex-start;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  font-family: 'Open Sans', monospace;

  justify-content: flex-start;
  line-height: 1.5rem;
  margin: 1rem 0;
  text-align: left;
  width: 100%;
  min-height: ${p => !p.noMedia ? p.minHeight : "150"}px;
  position: relative;

  height: ${p => {
    if (!p.noMedia && p.mode === "HORIZONTAL") {
      return 0
    }
  }};

  ${p => p.noMedia ? `
    background: #fff;
    filter: drop-shadow(0 0 5px rgba(0,0,0,0.2));`: null};


  &.active {
    color: ${(p) => p.theme.primary};
  }
`;

export const TimelineContentText = styled.span<{ dir?: string }>`
  font-size: 0.8rem;
  font-weight: 600;
  padding-left: 0.5rem;
  width: 95%;
  text-align: left;
`;

export const TimelineContentTitle = styled.span<{ theme: Theme, dir?: string }>`
  color: #323232;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0.5rem;
  padding-left: 0.5rem;
  &.active {
    color: ${(p) => p.theme.primary};
  }
  text-align: left;
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

const slideAnimation = (start?: number, end?: number) => keyframes`
  0% {
    width: ${start}px;
  }
  100% {
    width: ${end}px;
  }  
`;

export const SlideShowProgressBar = styled.span<{
  startWidth?: number, paused?: boolean, duration?: number, color?: string;
}>`
  animation-iteration-count: 1;
  animation-play-state: paused;
  background: ${p => p.color};
  bottom: -0.75rem;
  display: block;
  height: 3px;
  left: 0;
  position: absolute;

  ${p => {
    if (!p.paused && (p.startWidth && p.startWidth > 0)) {
      return css`
        animation: ${slideAnimation(p.startWidth, 0)} ${p.duration}ms ease-in;
        animation-play-state: running;
      `;
    } else {
      return css`
        animation-play-state: paused;
        width: ${p.startWidth}px;
      `;
    }
  }}

  svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
`;


