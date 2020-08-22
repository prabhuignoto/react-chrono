export interface TreeLeafModel {
  className: string;
  id?: string;
  active?: boolean;
  onClick: (id: string) => void;
  onActive: (circleOffset: number) => void;
}

export interface TreeBranchModel {
  className: string;
  index: number;
  contentText: string;
  active?: boolean;
  id?: string;
  onClick: (id: string) => void;
  onActive: (
    circleOffset: number,
    contentHeight: number,
    contentOffset: number
  ) => void;
  title: string;
  visible?: boolean;
}