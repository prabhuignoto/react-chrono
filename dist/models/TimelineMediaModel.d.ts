import { Theme } from './Theme';
export declare type MediaType = 'VIDEO' | 'IMAGE';
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
    content?: string;
    hideMedia: boolean;
    id?: string;
    media: Media;
    onMediaStateChange: (state: MediaState) => void;
    slideshowActive?: boolean;
    theme?: Theme;
    title?: string;
    url?: string;
}
