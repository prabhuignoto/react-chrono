import { Theme } from '../../../models/Theme';

export interface Title {
  active?: boolean;
  classString?: string;
  color?: string;
  dir?: string;
  fontSize?: string;
  theme?: Theme;
  title?: string;
  url?: string;
}

export interface Content {
  classString?: string;
  color?: string;
  content?: string;
  dir?: string;
  fontSize?: string;
  theme?: Theme;
}
