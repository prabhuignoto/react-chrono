import styled from '@emotion/styled';
import { Theme } from '../../../models/Theme';
import { TimelineMode } from '../../../models/TimelineModel';

export const MediaWrapper = styled.div<{
  theme?: Theme;
  active?: boolean;
  mode?: TimelineMode;
  dir?: string;
  slideShowActive?: boolean;
  cardHeight?: number;
}>`
  ${(p) => (p.cardHeight ? `min-height: ${p.cardHeight}px;` : '')};
  align-items: center;
  align-self: center;
  background: ${(p) => (p.active ? `rgba(${p.theme?.secondary}, 0.35)` : '')};
  border-radius: 4px;
  flex-direction: row;
  height: 0;
  padding: 0.5em;
  pointer-events: ${(p) => (!p.active && p.slideShowActive ? 'none' : '')};
  position: relative;
  text-align: center;
  width: 100%;

  ${(p) => {
    if (p.mode === 'HORIZONTAL') {
      return `
        justify-content: flex-start;
      `;
    } else {
      if (p.dir === 'left') {
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

export const CardImage = styled.img<{
  mode?: TimelineMode;
  visible?: boolean;
  active?: boolean;
  dir?: string;
}>`
  flex: 4;
  justify-self: center;
  margin-left: auto;
  margin-right: auto;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  visibility: ${(p) => (p.visible ? 'visible' : 'hidden')};
`;

export const CardVideo = styled.video<{ height?: number }>`
  max-width: 100%;
  max-height: 100%;
  margin-left: auto;
  margin-right: auto;
`;

export const MediaDetailsWrapper = styled.div<{ mode?: TimelineMode }>`
  /* position: absolute; */
  bottom: -1em;
  left: 0;
  right: 0;
  /* margin-left: auto; */
  margin-right: auto;
  width: ${(p) => {
    switch (p.mode) {
      case 'HORIZONTAL':
        return '100%';
      case 'VERTICAL':
        return '100%';
      case 'VERTICAL_ALTERNATING':
        return '100%';
    }
  }};
  /* min-height: 100px; */
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 6px;
  padding-bottom: 0.5em;
`;

export const ErrorMessage = styled.span`
  color: #a3a3a3;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  right: 0;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
`;

export const IFrameVideo = styled.iframe`
  position: relative;
  height: 100%;
  width: 100%;
`;
