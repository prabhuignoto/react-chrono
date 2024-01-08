import { Theme } from '@models/Theme';
import { TimelineContentModel } from '@models/TimelineContentModel';
import { RefObject } from 'react';

export type ContentHeaderProps = Pick<
  TimelineContentModel,
  'theme' | 'url' | 'title' | 'media' | 'content'
>;

export type ContentFooterProps = {
  canShow: boolean;
  isNested?: boolean;
  isResuming?: boolean;
  onExpand: () => void;
  paused: boolean;
  progressRef: RefObject<HTMLProgressElement>;
  remainInterval: number;
  showMore: boolean;
  showProgressBar?: boolean;
  showReadMore?: boolean | '';
  startWidth: number;
  textContentIsLarge: boolean;
  theme?: Theme;
  triangleDir?: string;
};
