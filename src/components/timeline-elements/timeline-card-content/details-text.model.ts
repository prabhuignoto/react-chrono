import { TimelineContentModel } from '@models/TimelineContentModel';
import { ReactNode } from 'react';

export type DetailsTextProps = {
  cardActualHeight?: number;
  contentDetailsClass?: string;
  customContent?: ReactNode;
  detailedText: TimelineContentModel['detailedText'];
  detailsHeight?: number;
  gradientColor?: string;
  showMore?: boolean;
  timelineContent: TimelineContentModel['timelineContent'];
};
