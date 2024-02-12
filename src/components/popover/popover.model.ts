import { Theme } from '@models/Theme';
import { ReactNode } from 'react';

export type PopOverModel = {
  children: ReactNode | ReactNode[];
  isDarkMode?: boolean;
  placeholder?: string;
  position: PopoverPosition;
  theme?: Theme;
  width?: string | number;
};

export type PopoverPosition = 'up' | 'down' | 'left' | 'right';
