import { Theme } from '@models/Theme';
import React, { ForwardRefExoticComponent, ReactNode } from 'react';
import { TextOrContentModel } from '../timeline-card-content/text-or-content';

type common = {
  classString?: string;
  color?: string;
  dir?: string;
  fontSize?: string;
  padding?: boolean;
  theme?: Theme;
};

export interface Title extends common {
  active?: boolean;
  padding?: boolean;
  title?: string;
  url?: string;
  urlClassName?: string
}

export interface Content extends common {
  content?: string | ReactNode;
}

export type ExpandButtonModel = {
  expanded?: boolean;
  onExpand?: (ev: React.PointerEvent | React.KeyboardEvent) => void;
  textOverlay?: boolean;
} & Pick<common, 'theme'>;

export type ShowHideTextButtonModel = {
  onToggle: (ev: React.PointerEvent | React.KeyboardEvent) => void;
  show?: boolean;
  textOverlay?: boolean;
} & Pick<common, 'theme'>;

export type DetailsTextMemoModel = {
  expand?: boolean;
  height?: number;
  onRender?: (height?: number) => void;
  show?: boolean;
  text: ForwardRefExoticComponent<TextOrContentModel>;
  textOverlay?: boolean;
  theme?: Theme;
};

export type TextContentMemoModel = Title &
  Content &
  ExpandButtonModel &
  ShowHideTextButtonModel &
  DetailsTextMemoModel;

export type CardMediaHeaderMemoModel = Title & Content;
