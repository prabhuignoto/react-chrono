import { Theme } from "./Theme";
import { Scroll } from "./TimelineCollnModel";
import { Media } from "./TimelineMediaModel";
import { TimelineCardModel } from "./TimelineItemModel";
import { TimelineMode } from "./TimelineModel";

interface CommonPropsModel {
  alternateCards?: boolean;
  cardHeight?: number;
  mode?: TimelineMode;
  onClick: (id?: string) => void;
  slideItemDuration?: number;
  slideShowRunning?: boolean;
  theme?: Theme;
  onElapsed?: (id?: string) => void;
}

interface CommonBranchAndLeafModel extends CommonPropsModel {
  active?: boolean;
  className: string;
  id?: string;
}

export interface TreeLeafModel extends CommonBranchAndLeafModel {
  onActive: (timelinePointOffset: number) => void;
}

export interface TreeBranchModel extends CommonBranchAndLeafModel {
  contentDetailedText?: string;
  contentText: string;
  contentTitle?: string;
  index: number;
  media?: Media;
  onShowMore?: () => void;
  title: string;
  visible?: boolean;
  onActive: (
    timelinePointOffset: number,
    timelineContentHeight: number,
    timelineContentOffset: number
  ) => void;
}

export interface TimelineTreeModel extends CommonPropsModel {
  activeTimelineItem: number;
  autoScroll: (s: Partial<Scroll>) => void;
  items: TimelineCardModel[];
}
