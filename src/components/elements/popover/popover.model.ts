import { Theme } from '@models/Theme';
import { ReactNode } from 'react';

export type PopoverPosition = 'top' | 'bottom';

export type PopOverModel = {
  $isMobile: boolean; // Made required
  children: ReactNode | ReactNode[];
  icon?: ReactNode;
  isDarkMode: boolean; // Made required for better props handling
  placeholder?: string;
  position: PopoverPosition;
  theme?: Theme;
  width: number; // Made required
};
