import { TimelineModel } from '@models/TimelineModel';

export type ListModel = {
  items: ListItemModel[];
  onSelect?: (id?: string) => void;
} & Pick<TimelineModel, 'theme'>;

export type ListItemModel = {
  description: string;
  id?: string;
  onSelect?: (id?: string) => void;
  title: string;
};
