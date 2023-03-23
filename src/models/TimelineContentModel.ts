import { ReactNode } from 'react';
import { Theme } from './Theme';
import { TimelineItemModel } from './TimelineItemModel';
import { Media } from './TimelineMediaModel';

export type TimelineContentModel = {
  active?: boolean;
  branchDir?: string;
  content?: string | ReactNode;
  customContent?: React.ReactNode;
  detailedText?: string | string[];
  flip?: boolean;
  hasFocus?: boolean;
  id?: string;
  isNested?: boolean;
  items?: TimelineItemModel[];
  media?: Media;
  nestedCardHeight?: number;
  onClick?: (id: string) => void;
  onElapsed?: (id?: string) => void;
  onShowMore: () => void;
  slideShowActive?: boolean;
  theme?: Theme;
  timelineContent?: React.ReactNode;
  title?: string;
  url?: string;
};
