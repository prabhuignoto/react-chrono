import { ReactNode } from 'react';
import { Theme } from './Theme';
import { TimelineCardModel } from './TimelineItemModel';
import { TimelineMode } from './TimelineModel';
export interface TimelineHorizontalModel {
    autoScroll: (t: Partial<Scroll>) => void;
    contentDetailsChildren?: ReactNode | ReactNode[];
    handleItemClick: (id?: string) => void;
    hasFocus?: boolean;
    iconChildren?: ReactNode;
    itemWidth?: number;
    items: TimelineCardModel[];
    mode?: TimelineMode;
    onElapsed?: (id?: string) => void;
    slideShowRunning?: boolean;
    theme?: Theme;
    wrapperId: string;
}
export interface Scroll {
    /**
     * Height of the Timeline card content
     *
     * @type {number}
     * @memberof Scroll
     */
    contentHeight: number;
    /**
     * Offset of the Content card
     *
     * @type {number}
     * @memberof Scroll
     */
    contentOffset: number;
    /**
     * Offset of the timeline point
     *
     * @type {number}
     * @memberof Scroll
     */
    pointOffset: number;
    /**
     * Width of the timeline point
     *
     * @type {number}
     * @memberof Scroll
     */
    pointWidth: number;
    /**
     * Height of the timeline point
     *
     * @type {number}
     * @memberof Scroll
     */
    timelinePointHeight: number;
}
