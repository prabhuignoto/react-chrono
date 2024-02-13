import { TimelineModel } from '@models/TimelineModel';

export type ListModel = {
  activeItemIndex?: number;
  items: ListItemModel[];
  multiSelectable?: boolean;
  onClick?: (id?: string) => void;
} & Pick<TimelineModel, 'theme'>;

export type ListItemModel = {
  active?: boolean;
  description: string;
  id: string;
  onClick?: (id: string) => void;
  onSelect?: () => void;
  selectable?: boolean;
  selected?: boolean;
  title: string;
} & Pick<TimelineModel, 'theme'>;
