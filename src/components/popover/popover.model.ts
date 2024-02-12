import { Theme } from '@models/Theme';
import { ReactNode } from 'react';

export type PopOverModel = {
  children: ReactNode | ReactNode[];
  isDarkMode?: boolean;
  placeholder?: string;
  position: 'top' | 'bottom';
  theme?: Theme;
  width?: string | number;
};
