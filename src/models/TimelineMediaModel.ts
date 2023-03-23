import { ReactNode } from 'react';
import { Theme } from './Theme';

export type MediaType = 'VIDEO' | 'IMAGE';
export interface MediaSource {
  type?: string;
  url: string;
}

export interface Media {
  name?: string;
  source: MediaSource;
  type: MediaType;
}

export interface MediaState {
  id?: string;
  paused?: boolean;
  playing?: boolean;
}

export interface CardMediaModel {
  active?: boolean;
  cardHeight?: number;
  content?: string | ReactNode;
  detailsText?: ReactNode;
  hideMedia: boolean;
  id?: string;
  media: Media;
  onMediaStateChange: (state: MediaState) => void;
  paused?: boolean;
  progressRef?: React.RefObject<HTMLDivElement>;
  remainInterval?: number;
  resuming?: boolean;
  showProgressBar?: boolean;
  slideshowActive?: boolean;
  startWidth?: number;
  theme?: Theme;
  title?: string;
  triangleDir?: string;
  url?: string;
}
