import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { Theme } from '../../../models/Theme';
import { TimelineMode } from '../../../models/TimelineModel';

export const TimelineItemContentWrapper = styled.section<{
  theme: Theme;
  noMedia?: boolean;
  minHeight?: number;
  mode?: TimelineMode;
}>`
  align-items: flex-start;
  background: #fff;
  border-radius: 5px;
  display: flex;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
  flex-direction: column;
  justify-content: flex-start;
  line-height: 1.5rem;
  margin: ${(p) => (p.mode !== 'VERTICAL_ALTERNATING' ? '1rem 0' : '')};
  position: relative;
  text-align: left;
  width: 100%;

  &.active {
    color: ${(p) => p.theme.primary};
  }

  &:focus {
    outline: 1px solid ${(p) => p.theme.primary};
  }
`;

export const TimelineCardHeader = styled.header`
  width: 100%;
`;

export const TimelineContentSubTitle = styled.p<{ dir?: string }>`
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0;
  padding-left: 0.5rem;
  text-align: left;
  width: 97%;
`;

export const TimelinecardTitle = styled.p<{ theme: Theme; dir?: string }>`
  color: #323232;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  margin-top: 0.5rem;
  padding-left: 0.5rem;
  &.active {
    color: ${(p) => p.theme.primary};
  }
  text-align: left;
  width: 97%;
`;

export const TimelineContentDetails = styled.p`
  color: #191919;
  font-size: 0.85rem;
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
  margin-bottom: 0.5rem;
  max-height: 200px;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-color: ${(p) => p.theme.primary} default;
  scrollbar-width: thin;
  transition: max-height 0.1s linear;
  width: 100%;

  &.show-less {
    max-height: 50px;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      width: 0;
    }
    overflow: hidden;
  }

  &::-webkit-scrollbar {
    width: 0.25em;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(p) => p.theme.primary};
    outline: 1px solid ${(p) => p.theme.primary};
  }
`;

export const ShowMore = styled.span<{ show?: boolean; theme?: Theme }>`
  align-items: center;
  align-self: flex-end;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  display: ${(p) => (p.show ? 'flex' : 'none')};
  font-size: 0.75rem;
  justify-self: flex-end;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-top: auto;
  padding: 0.1rem 0.5rem;

  &:hover {
    background: ${(p) => p.theme.primary};
    color: #fff;
  }
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
  startWidth?: number;
  paused?: boolean;
  duration?: number;
  color?: string;
}>`
  background: ${(p) => p.color};
  bottom: -0.75rem;
  display: block;
  height: 3px;
  left: 0;
  position: absolute;

  ${(p) => {
    if (!p.paused && p.startWidth && p.startWidth > 0) {
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

export const ChevronIconWrapper = styled.span<{ collapsed?: boolean }>`
  align-items: center;
  display: flex;
  height: 1rem;
  justify-content: center;
  margin-left: 0.2rem;
  margin-top: 0.2rem;
  width: 1rem;
  ${(p) =>
    p.collapsed
      ? `
      transform: rotate(90deg);
  `
      : `transform: rotate(-90deg)`};

  svg {
    height: 100%;
    width: 100%;
  }
`;
