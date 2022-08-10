import { Theme } from './Theme';

export interface TitleModel {
  active?: boolean;
  align?: 'left' | 'right';
  classString?: string;
  theme?: Theme;
  title?: string;
}
