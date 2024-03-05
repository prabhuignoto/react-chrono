import { Theme } from '@models/Theme';
import React, { ForwardRefExoticComponent, ReactNode } from 'react';
import { TextOrContentModel } from '../timeline-card-content/text-or-content';

// Common properties shared by multiple interfaces
type common = {
  classString?: string; // CSS class string
  color?: string; // Color value
  dir?: string; // Text direction
  fontSize?: string; // Font size
  padding?: boolean; // Whether to apply padding
  theme?: Theme; // Theme object
};

// Interface for the Title component
export interface Title extends common {
  active?: boolean; // Whether the title is active
  padding?: boolean; // Whether to apply padding
  title?: string; // Title text
  url?: string; // URL for the title
}

// Interface for the Content component
export interface Content extends common {
  content?: string | ReactNode; // Content text or ReactNode
}

// Type for the ExpandButtonModel
export type ExpandButtonModel = {
  expanded?: boolean; // Whether the button is expanded
  onExpand?: (ev: React.PointerEvent | React.KeyboardEvent) => void; // Event handler for expand action
  textOverlay?: boolean; // Whether to overlay text on the button
} & Pick<common, 'theme'>;

// Type for the ShowHideTextButtonModel
export type ShowHideTextButtonModel = {
  onToggle: (ev: React.PointerEvent | React.KeyboardEvent) => void; // Event handler for toggle action
  show?: boolean; // Whether to show the button
  textOverlay?: boolean; // Whether to overlay text on the button
} & Pick<common, 'theme'>;

// Type for the DetailsTextMemoModel
export type DetailsTextMemoModel = {
  expand?: boolean; // Whether to expand the details text
  height?: number; // Height of the details text
  onRender?: (height?: number) => void; // Callback function for rendering the details text
  show?: boolean; // Whether to show the details text
  text: ForwardRefExoticComponent<TextOrContentModel>; // Text component for the details text
  textOverlay?: boolean; // Whether to overlay text on the details text
  theme?: Theme; // Theme object
};

// Type for the TextContentMemoModel
export type TextContentMemoModel = Title &
  Content &
  ExpandButtonModel &
  ShowHideTextButtonModel &
  DetailsTextMemoModel;

// Type for the CardMediaHeaderMemoModel
export type CardMediaHeaderMemoModel = Title & Content;
