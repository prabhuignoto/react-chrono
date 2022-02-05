import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Theme } from '../../../models/Theme';
import { TimelineMode } from '../../../models/TimelineModel';

export const TimelineItemContentWrapper = styled.section<{
  borderLess?: boolean;
  maxWidth?: number;
  minHeight?: number;
  mode?: TimelineMode;
  noMedia?: boolean;
  theme?: Theme;
}>`
  align-items: flex-start;
  background: ${(p) => p.theme.cardBgColor};
  border-radius: 4px;
  display: flex;
  ${(p) =>
    !p.borderLess ? `filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.2))` : 'none'};
  flex-direction: column;
  justify-content: flex-start;
  line-height: 1.5em;
  margin: ${(p) =>
    p.mode === 'HORIZONTAL'
      ? '0 auto'
      : p.mode !== 'VERTICAL_ALTERNATING'
      ? '1em 0'
      : ''};
  max-width: ${(p) => p.maxWidth}px;
  min-height: ${(p) => p.minHeight}px;
  position: relative;
  text-align: left;
  width: 98%;
  z-index: 0;

  &:focus {
    outline: 1px solid ${(p) => p.theme?.primary};
  }
`;

export const TimelineCardHeader = styled.header`
  width: 100%;
`;

export const TimelineContentSubTitle = styled.p<{
  dir?: string;
  theme?: Theme;
}>`
  color: ${(p) => p.theme.primary};
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0;
  padding-left: 0.5rem;
  text-align: left;
  width: 97%;
`;

export const TimelineCardTitle = styled.p<{ dir?: string; theme: Theme }>`
  color: ${(p) => p.theme.cardForeColor};
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0.5em;
  margin: 0;
  padding-left: 0.5em;
  padding-top: 0.25em;
  &.active {
    color: ${(p) => p.theme.primary};
  }
  text-align: left;
  width: 95%;
`;

export const TimelineContentDetails = styled.p<{ theme?: Theme }>`
  color: ${(p) => p.theme.cardForeColor};
  font-size: 0.85rem;
  font-weight: 400;
  margin: 0;
  width: 100%;
`;

export const TimelineSubContent = styled.span`
  margin-bottom: 0.5rem;
  display: block;
`;

export const TimelineContentDetailsWrapper = styled.div<{
  borderLess?: boolean;
  customContent?: boolean;
  theme?: Theme;
  useReadMore?: boolean;
}>`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  margin: 0 auto;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  ${(p) => (p.useReadMore && !p.customContent ? 'max-height: 150px;' : '')}
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-color: ${(p) => p.theme?.primary} default;
  scrollbar-width: thin;
  transition: max-height 100ms linear;
  width: ${(p) => (p.borderLess ? '100%' : '95%')};
  padding: 0.25em 0.5em;

  &::-webkit-scrollbar {
    width: 0.3em;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(p) => p.theme?.primary};
    outline: 1px solid ${(p) => p.theme?.primary};
  }

  &.show-less {
    max-height: 50px;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      width: 0;
    }
    overflow: hidden;
  }
`;

export const ShowMore = styled.span<{ show?: boolean; theme?: Theme }>`
  align-items: center;
  align-self: flex-end;
  border-radius: 4px;
  cursor: pointer;
  display: ${(p) => (p.show ? 'flex' : 'none')};
  font-size: 0.75rem;
  justify-self: flex-end;
  margin-bottom: 0.5em;
  margin-left: 0.5em;
  margin-right: 0.5em;
  margin-top: auto;
  padding: 0.25em;

  &:hover {
    /* background: ${(p) => p.theme.primary}; */
    color: ${(p) => p.theme.primary};
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
  color?: string;
  duration?: number;
  paused?: boolean;
  startWidth?: number;
}>`
  background: ${(p) => p.color};
  bottom: -0.75em;
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
  height: 1.25em;
  justify-content: center;
  margin-left: 0.2em;
  margin-top: 0.2em;
  width: 1.25em;
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

export const TriangleIconWrapper = styled.span<{ dir?: string; theme?: Theme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 50%;
  background: ${(p) => p.theme.cardBgColor};
  transform: translateY(-50%) rotate(225deg);
  z-index: -1;

  & svg {
    width: 100%;
    height: 100%;
    fill: #fff;
  }

  ${(p) => (p.dir === 'left' ? `right: -8px;` : `left: -8px;`)};
`;
