import { TimelineModel } from '@models/TimelineModel';

export type ListModel = {
  activeItemIndex?: number;
  items: ListItemModel[];
  multiSelectable?: boolean;
  onClick?: (id?: string) => void;
  onSelect?: (id?: string) => void;
  selectable?: boolean;
} & Pick<TimelineModel, 'theme'>;

export type ListItemModel = {
  description?: string;
  id?: string;
  onSelect?: (id?: string) => void;
  selected?: boolean;
  title: string;
};
