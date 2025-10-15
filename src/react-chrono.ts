import ReactChrono from './components';
import { TimelineItemModel } from './models/TimelineItemModel';
import { TimelinePropsV2 } from './models/TimelinePropsV2';
import {
  LayoutConfig,
  InteractionConfig,
  ContentConfig,
  DisplayConfig,
  MediaConfig,
  AnimationConfig,
  StyleConfig,
  AccessibilityConfig,
} from './models/TimelineConfig';

// Import Vanilla Extract styles (Vite will bundle the CSS automatically)
import './styles/global.css';

export { ReactChrono as Chrono };

// Main types
export type TimelineItem = TimelineItemModel;
export type TimelineProps = TimelinePropsV2;

// Configuration types for grouped props
export type {
  LayoutConfig,
  InteractionConfig,
  ContentConfig,
  DisplayConfig,
  MediaConfig,
  AnimationConfig,
  StyleConfig,
  AccessibilityConfig,
};
