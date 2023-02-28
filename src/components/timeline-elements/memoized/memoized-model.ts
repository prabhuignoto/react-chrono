import React, { ReactNode } from 'react';
import { Theme } from '../../../models/Theme';

type common = {
  classString?: string;
  color?: string;
  dir?: string;
  fontSize?: string;
  theme?: Theme;
};

export interface Title extends common {
  active?: boolean;
  title?: string;
  url?: string;
}

export interface Content extends common {
  content?: string | ReactNode;
}

export type ExpandButtonModel = {
  expanded?: boolean;
  onExpand?: (ev: React.PointerEvent | React.KeyboardEvent) => void;
  textInsideMedia?: boolean;
} & Pick<common, 'theme'>;

export type ShowHideTextButtonModel = {
  onToggle: (ev: React.PointerEvent | React.KeyboardEvent) => void;
  show?: boolean;
  textInsideMedia?: boolean;
} & Pick<common, 'theme'>;
