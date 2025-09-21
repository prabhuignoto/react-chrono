import { ReactNode } from 'react';
import { Theme } from './Theme';
import { TimelineItemModel } from './TimelineItemModel';
import {
  LayoutConfig,
  InteractionConfig,
  ContentConfig,
  DisplayConfig,
  MediaConfig,
  AnimationConfig,
  StyleConfig,
  AccessibilityConfig,
  I18nConfig,
} from './TimelineConfig';

/**
 * Timeline display modes
 */
export type TimelineMode =
  | 'horizontal'
  | 'vertical'
  | 'alternating'
  | 'horizontal-all';

/**
 * New improved Timeline component props with grouped configuration
 * This provides a cleaner, more intuitive API surface
 */
export interface TimelinePropsV2 {
  // === Core Required Props ===

  /** Array of timeline items to display */
  items: TimelineItemModel[];

  // === Core Optional Props ===

  /** Timeline display mode */
  mode?: TimelineMode;

  /** Custom React content for timeline cards */
  children?: ReactNode | ReactNode[];

  /** Visual theme configuration */
  theme?: Theme;

  /** Index of initially active timeline item */
  activeItemIndex?: number;

  // === Grouped Configuration Objects ===

  /** Layout and sizing options */
  layout?: LayoutConfig;

  /** User interaction and navigation options */
  interaction?: InteractionConfig;

  /** Content handling and display options */
  content?: ContentConfig;

  /** Visual display and styling options */
  display?: DisplayConfig;

  /** Media content configuration */
  media?: MediaConfig;

  /** Animation and slideshow options */
  animation?: AnimationConfig;

  /** Custom styling and CSS classes */
  style?: StyleConfig;

  /** Accessibility and internationalization */
  accessibility?: AccessibilityConfig;

  /** Comprehensive internationalization configuration */
  i18n?: I18nConfig;

  // === Event Callbacks ===

  /** Callback when a timeline item is selected */
  onItemSelected?: (data: {
    item: Pick<
      TimelineItemModel,
      'title' | 'cardDetailedText' | 'cardSubtitle' | 'cardTitle'
    >;
    index: number;
  }) => void;

  /** Callback when scrolling reaches the end */
  onScrollEnd?: () => void;

  /** Callback when theme changes (e.g., dark mode toggle) */
  onThemeChange?: (theme: Theme) => void;

  /** Callback when slideshow restarts */
  onRestartSlideshow?: () => void;

  // === Advanced Options ===

  /** Enable dynamic updates to timeline items */
  allowDynamicUpdate?: boolean;

  /** Custom unique identifier for the timeline */
  id?: string;

  /** Dark mode configuration */
  darkMode?: {
    /** Enable dark mode */
    enabled?: boolean;
    /** Show dark mode toggle in toolbar */
    showToggle?: boolean;
  };
}

/**
 * Backward compatibility: Maps old props to new grouped structure
 */
export interface LegacyTimelineProps {
  // Layout props (deprecated - use layout config)
  /** @deprecated Use layout.cardWidth */
  cardWidth?: number;
  /** @deprecated Use layout.cardHeight */
  cardHeight?: number;
  /** @deprecated Use layout.pointSize */
  timelinePointDimension?: number;
  /** @deprecated Use layout.lineWidth */
  lineWidth?: number;
  /** @deprecated Use layout.itemWidth */
  itemWidth?: number;
  /** @deprecated Use layout.responsive.breakpoint */
  responsiveBreakPoint?: number;
  /** @deprecated Use layout.responsive.enabled */
  enableBreakPoint?: boolean;
  /** @deprecated Use layout.positioning.cardPosition */
  cardPositionHorizontal?: 'TOP' | 'BOTTOM';
  /** @deprecated Use layout.positioning.flipLayout */
  flipLayout?: boolean;

  // Interaction props (deprecated - use interaction config)
  /** @deprecated Use interaction.keyboardNavigation */
  disableNavOnKey?: boolean;
  /** @deprecated Use interaction.pointClick */
  disableClickOnCircle?: boolean;
  /** @deprecated Use interaction.autoScroll */
  disableAutoScrollOnClick?: boolean;
  /** @deprecated Use interaction.focusOnLoad */
  focusActiveItemOnLoad?: boolean;
  /** @deprecated Use interaction.cardHover */
  highlightCardsOnHover?: boolean;
  /** @deprecated Use interaction.disabled */
  disableInteraction?: boolean;

  // Content props (deprecated - use content config)
  /** @deprecated Use content.allowHTML */
  parseDetailsAsHTML?: boolean;
  /** @deprecated Use content.readMore */
  useReadMore?: boolean;
  /** @deprecated Use content.textOverlay */
  textOverlay?: boolean;
  /** @deprecated Use content.dateFormat */
  titleDateFormat?: string;
  /** @deprecated Use content.compactText */
  textDensity?: 'LOW' | 'HIGH';
  /** @deprecated Use content.semanticTags */
  semanticTags?: {
    cardTitle?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
    cardSubtitle?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  };

  // Display props (deprecated - use display config)
  /** @deprecated Use display.borderless */
  borderLessCards?: boolean;
  /** @deprecated Use display.cardsDisabled */
  cardLess?: boolean;
  /** @deprecated Use display.pointsDisabled */
  disableTimelinePoint?: boolean;
  /** @deprecated Use display.pointShape */
  timelinePointShape?: 'circle' | 'square' | 'diamond';
  /** @deprecated Use display.allCardsVisible */
  showAllCardsHorizontal?: boolean;
  /** @deprecated Use display.toolbar.enabled */
  disableToolbar?: boolean;
  /** @deprecated Use display.toolbar.position */
  toolbarPosition?: 'top' | 'bottom';
  /** @deprecated Use display.scrollable */
  scrollable?: boolean | { scrollbar: boolean };

  // Media props (deprecated - use media config)
  /** @deprecated Use media.height */
  mediaHeight?: number;
  /** @deprecated Use media config */
  mediaSettings?: {
    align?: 'left' | 'right' | 'center';
    fit?: 'cover' | 'contain' | 'fill' | 'none';
  };

  // Animation props (deprecated - use animation config)
  /** @deprecated Use animation.slideshow.enabled */
  slideShow?: boolean;
  /** @deprecated Use animation.slideshow.duration */
  slideItemDuration?: number;
  /** @deprecated Use animation.slideshow.type */
  slideShowType?: 'reveal' | 'slide_in' | 'slide_from_sides';
  /** @deprecated Use animation.slideshow.showProgress */
  showProgressOnSlideshow?: boolean;
  /** @deprecated Use animation.slideshow.showOverallProgress */
  showOverallSlideshowProgress?: boolean;

  // Style props (deprecated - use style config)
  /** @deprecated Use style.classNames */
  classNames?: {
    card?: string;
    cardMedia?: string;
    cardSubTitle?: string;
    cardText?: string;
    cardTitle?: string;
    controls?: string;
    title?: string;
  };
  /** @deprecated Use style.fontSizes */
  fontSizes?: {
    cardSubtitle?: string;
    cardText?: string;
    cardTitle?: string;
    title?: string;
  };

  // Accessibility props (deprecated - use accessibility config)
  /** @deprecated Use accessibility.buttonTexts */
  buttonTexts?: {
    first: string;
    last: string;
    next?: string;
    previous?: string;
    play?: string;
    stop?: string;
  };

  // Deprecated/removed props
  /** @deprecated No longer used */
  noUniqueId?: boolean;
  /** @deprecated Use id prop instead */
  uniqueId?: string;
  /** @deprecated Internal prop, should not be used externally */
  isChild?: boolean;
  /** @deprecated Use content.detailsHeight or remove entirely */
  contentDetailsHeight?: number;
  /** @deprecated Use media.height instead */
  nestedCardHeight?: number;
  /** @deprecated Use darkMode.enabled and darkMode.showToggle */
  darkMode?: boolean;
  /** @deprecated Use darkMode.showToggle */
  enableDarkToggle?: boolean;
  /** @deprecated Use display.toolbar configuration */
  enableQuickJump?: boolean;
  /** @deprecated Use display.toolbar configuration */
  enableLayoutSwitch?: boolean;
}
