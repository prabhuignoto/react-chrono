import { Theme } from './Theme';
import { TimelineMode } from './TimelineModel';

export type MediaType = 'VIDEO' | 'IMAGE';

export interface MediaSource {
  url: string;
  type?: string;
}

export interface Media {
  name?: string;
  type: MediaType;
  source: MediaSource;
}

export interface MediaState {
  id?: string;
  paused?: boolean;
  playing?: boolean;
}

export interface CardMediaModel {
  active?: boolean;
  media: Media;
  id?: string;
  mode?: TimelineMode;
  onMediaStateChange: (state: MediaState) => void;
  theme?: Theme;
  title?: string;
  content: string;
  slideshowActive?: boolean;
  hideMedia: boolean;
  cardHeight?: number;
}
