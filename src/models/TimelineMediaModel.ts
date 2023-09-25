import { ForwardRefExoticComponent, ReactNode } from 'react';
import { Theme } from './Theme';
import { TextOrContentModel } from '../components/timeline-elements/timeline-card-content/text-or-content';

/**
 * Represents the type of media (video or image).
 */
export type MediaType = 'VIDEO' | 'IMAGE';

/**
 * Represents the source of a media element.
 */
export interface MediaSource {
  // Type of the media source (optional).
  type?: string;

  // URL of the media source.
  url: string;
}

/**
 * Represents the model for media content.
 */
export interface Media {
  // Name of the media (optional).
  name?: string;

  // Source of the media.
  source: MediaSource;

  // Type of the media (video or image).
  type: MediaType;
}

/**
 * Represents the state of media playback.
 */
export interface MediaState {
  // Unique identifier for the media.
  id?: string;

  // Indicates if media is paused.
  paused?: boolean;

  // Indicates if media is currently playing.
  playing?: boolean;
}

/**
 * Represents the model for media within a card.
 */
export interface CardMediaModel {
  // Indicates if the media is active.
  active?: boolean;

  // Height of the card containing the media.
  cardHeight?: number;

  // Content associated with the media.
  content?: string | ReactNode;

  // Text details associated with the media.
  detailsText?: ForwardRefExoticComponent<TextOrContentModel>;

  // Indicates if media should be hidden.
  hideMedia: boolean;

  // Unique identifier for the media.
  id?: string;

  // Media content and source information.
  media: Media;

  // Event handler for media state changes.
  onMediaStateChange: (state: MediaState) => void;

  // Indicates if media playback is paused.
  paused?: boolean;

  // Reference to the progress bar element.
  progressRef?: React.RefObject<HTMLDivElement>;

  // Interval for remaining media playback.
  remainInterval?: number;

  // Indicates if media playback is resuming.
  resuming?: boolean;

  // Indicates if the progress bar should be shown.
  showProgressBar?: boolean;

  // Indicates if slideshow mode is active.
  slideshowActive?: boolean;

  // Initial width for the media element.
  startWidth?: number;

  // Theme to be applied to the media card.
  theme?: Theme;

  // Title of the media card.
  title?: string;

  // Direction of the triangle indicator.
  triangleDir?: string;

  // URL associated with the media.
  url?: string;

  // Class applied to title, if url is present
  urlClassName?: string
}
