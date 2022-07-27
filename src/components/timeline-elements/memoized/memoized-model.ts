import { Theme } from '../../../models/Theme';

export interface Title {
  active?: boolean;
  color?: string;
  dir?: string;
  fontSize?: string;
  theme?: Theme;
  title?: string;
  url?: string;
}

export interface Content {
  color?: string;
  content?: string;
  dir?: string;
  fontSize?: string;
  theme?: Theme;
}
