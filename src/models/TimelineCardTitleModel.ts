import { Theme } from './Theme';

export interface TitleModel {
  title?: string;
  active?: boolean;
  theme?: Theme;
  align?: 'left' | 'right';
}
