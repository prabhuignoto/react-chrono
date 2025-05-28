/**
 * Stable Context - Contains configuration values that rarely change
 * This context is optimized for stable values to reduce unnecessary re-renders
 */
import { createContext } from 'react';
import { TimelineProps, ButtonTexts } from '@models/TimelineModel';

export interface StableContextProps {
  // Configuration that rarely changes
  staticDefaults: {
    borderLessCards: boolean;
    cardLess: boolean;
    disableTimelinePoint: boolean;
    disableToolbar: boolean;
    enableBreakPoint: boolean;
    enableDarkToggle: boolean;
    enableLayoutSwitch: boolean;
    enableQuickJump: boolean;
    focusActiveItemOnLoad: boolean;
    highlightCardsOnHover: boolean;
    isChild: boolean;
    lineWidth: number;
    mediaHeight: number;
    nestedCardHeight: number;
    noUniqueId: boolean;
    parseDetailsAsHTML: boolean;
    scrollable: boolean | { scrollbar: boolean };
    timelinePointDimension: number;
    timelinePointShape: 'circle' | 'square' | 'diamond';
    titleDateFormat: string;
    toolbarPosition: 'top' | 'bottom';
    uniqueId: string;
    useReadMore: boolean;
  };

  // Computed configuration values
  computedCardHeight: number;
  computedActiveItemIndex: number;
  computedSlideShowType: string;
  computedMediaAlign: string;
  newContentDetailsHeight: number;

  // Memoized configuration objects
  memoizedButtonTexts: ButtonTexts;
  memoizedClassNames: Record<string, string>;
  memoizedFontSizes: Record<string, string>;
  memoizedMediaSettings: Record<string, any>;
  memoizedSemanticTags: Record<string, string>;

  // Stable props from timeline
  mode?: TimelineProps['mode'];
  cardHeight?: number;
  flipLayout?: boolean;
  items?: TimelineProps['items'];
  fontSizes?: TimelineProps['fontSizes'];
  textOverlay?: boolean;
  mediaSettings?: TimelineProps['mediaSettings'];
  responsiveBreakPoint?: number;
  enableBreakPoint?: boolean;
  slideItemDuration?: number;
  slideShowType?: string;
  cardPositionHorizontal?: TimelineProps['cardPositionHorizontal'];
  disableNavOnKey?: boolean;
  itemWidth?: number;
  lineWidth?: number;
  scrollable?: boolean | { scrollbar: boolean };
  onScrollEnd?: () => void;
  toolbarPosition?: 'top' | 'bottom';
  disableToolbar?: boolean;
  cardWidth?: number;
  borderLessCards?: boolean;
  disableAutoScrollOnClick?: boolean;
  classNames?: Record<string, string>;
  showProgressOnSlideshow?: boolean;
  disableInteraction?: boolean;
  highlightCardsOnHover?: boolean;
  disableClickOnCircle?: boolean;
  disableTimelinePoint?: boolean;
  enableQuickJump?: boolean;
  enableLayoutSwitch?: boolean;
  cardLess?: boolean;
  useReadMore?: boolean;
}

export const StableContext = createContext<StableContextProps>({
  staticDefaults: {
    borderLessCards: false,
    cardLess: false,
    disableTimelinePoint: false,
    disableToolbar: false,
    enableBreakPoint: true,
    enableDarkToggle: false,
    enableLayoutSwitch: true,
    enableQuickJump: true,
    focusActiveItemOnLoad: false,
    highlightCardsOnHover: false,
    isChild: false,
    lineWidth: 3,
    mediaHeight: 200,
    nestedCardHeight: 150,
    noUniqueId: false,
    parseDetailsAsHTML: false,
    scrollable: { scrollbar: false },
    timelinePointDimension: 16,
    timelinePointShape: 'circle',
    titleDateFormat: 'MMM DD, YYYY',
    toolbarPosition: 'top',
    uniqueId: 'react-chrono',
    useReadMore: true,
  },
  computedCardHeight: 200,
  computedActiveItemIndex: 0,
  computedSlideShowType: 'reveal',
  computedMediaAlign: 'center',
  newContentDetailsHeight: 150,
  memoizedButtonTexts: {
    first: 'First',
    last: 'Last',
    play: 'Play',
    stop: 'Stop',
    previous: 'Previous',
    next: 'Next',
    dark: 'Dark',
    light: 'Light',
    timelinePoint: 'Timeline Point',
    searchPlaceholder: 'Search...',
    searchAriaLabel: 'Search timeline',
    clearSearch: 'Clear search',
    nextMatch: 'Next match',
    previousMatch: 'Previous match',
  },
  memoizedClassNames: {},
  memoizedFontSizes: {},
  memoizedMediaSettings: {},
  memoizedSemanticTags: {},
});
