/**
 * Legacy context types and default functions
 * This file contains only type definitions and default functions to avoid circular dependencies
 */
import { createContext } from 'react';
import {
  TimelineProps as PropsModel,
  TextDensity,
} from '@models/TimelineModel';

export type LegacyContextProps = PropsModel & {
  isMobile?: boolean;
  toggleDarkMode?: () => void;
  updateHorizontalAllCards?: (state: boolean) => void;
  updateTextContentDensity?: (value: TextDensity) => void;
};

export interface ButtonTexts {
  first?: string;
  last?: string;
  play?: string;
  stop?: string;
  previous?: string;
  next?: string;
  dark?: string;
  light?: string;
  timelinePoint?: string;
  searchPlaceholder?: string;
  searchAriaLabel?: string;
  clearSearch?: string;
  nextMatch?: string;
  previousMatch?: string;
}

// Legacy context for backward compatibility - exported without circular dependency
export const LegacyGlobalContext = createContext<LegacyContextProps>({});
