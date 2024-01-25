export type ListModel = {
  items: ListItemModel[];
  onSelect?: (id?: string) => void;
};

export type ListItemModel = {
  description: string;
  id?: string;
  onSelect?: (id?: string) => void;
  title: string;
};
