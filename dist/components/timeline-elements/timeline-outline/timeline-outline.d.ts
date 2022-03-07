import React from 'react';
import { Theme } from '../../../models/Theme';
import { TimelineMode } from '../../../models/TimelineModel';
export declare enum OutlinePosition {
    'left' = 0,
    'right' = 1
}
export interface TimelineOutlineItem {
    id?: string;
    name?: string;
    selected?: boolean;
}
export interface TimelineOutlineModel {
    items?: TimelineOutlineItem[];
    mode?: TimelineMode;
    onSelect?: (index: number) => void;
    theme?: Theme;
}
declare const TimelineOutline: React.FunctionComponent<TimelineOutlineModel>;
export { TimelineOutline };
