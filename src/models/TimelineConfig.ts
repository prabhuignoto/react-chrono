/**
 * New grouped configuration interfaces for better API organization
 * This provides a cleaner, more intuitive way to configure the timeline
 */

import { ReactNode } from 'react';

/**
 * Layout and sizing configuration
 */
export interface LayoutConfig {
  /** Maximum width of timeline cards in pixels */
  cardWidth?: number;
  
  /** Minimum height of timeline cards in pixels */
  cardHeight?: number;
  
  /** Size of timeline points in pixels */
  pointSize?: number;
  
  /** Width of the timeline track line in pixels */
  lineWidth?: number;
  
  /** Width of each timeline section in horizontal mode */
  itemWidth?: number;
  
  /** Height of the timeline container (number = px or CSS length string) */
  timelineHeight?: number | string;
  
  /** Responsive behavior configuration */
  responsive?: {
    /** Viewport width breakpoint for switching modes */
    breakpoint?: number;
    /** Whether responsive breakpoint switching is enabled */
    enabled?: boolean;
  };
  
  /** Positioning and layout options */
  positioning?: {
    /** Card position in horizontal mode */
    cardPosition?: 'top' | 'bottom';
    /** Flip layout for RTL support */
    flipLayout?: boolean;
  };
}

/**
 * User interaction and navigation configuration
 */
export interface InteractionConfig {
  /** Enable keyboard navigation with arrow keys */
  keyboardNavigation?: boolean;
  
  /** Enable clicking on timeline points */
  pointClick?: boolean;
  
  /** Enable auto-scroll to active items */
  autoScroll?: boolean;
  
  /** Focus active item on component load */
  focusOnLoad?: boolean;
  
  /** Highlight cards on mouse hover */
  cardHover?: boolean;
  
  /** Disable all user interactions */
  disabled?: boolean;
}

/**
 * Content handling and display configuration
 */
export interface ContentConfig {
  /** Allow HTML parsing in card content */
  allowHTML?: boolean;
  
  /** Enable read more functionality for long content */
  readMore?: boolean;
  
  /** Display text as overlay on media */
  textOverlay?: boolean;
  
  /** Date format for timeline titles */
  dateFormat?: string;
  
  /** Use compact text display */
  compactText?: boolean;
  
  /** Semantic HTML tags for accessibility */
  semanticTags?: {
    title?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
    subtitle?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  };
}

/**
 * Visual display and styling configuration
 */
export interface DisplayConfig {
  /** Remove borders and shadows from cards */
  borderless?: boolean;
  
  /** Hide timeline cards completely */
  cardsDisabled?: boolean;
  
  /** Hide timeline points */
  pointsDisabled?: boolean;
  
  /** Shape of timeline points */
  pointShape?: 'circle' | 'square' | 'diamond';
  
  /** Show all cards simultaneously in horizontal mode */
  allCardsVisible?: boolean;
  
  /** Toolbar configuration */
  toolbar?: {
    /** Enable/disable the toolbar */
    enabled?: boolean;
    /** Position of the toolbar */
    position?: 'top' | 'bottom';
    /** Make toolbar sticky during scroll */
    sticky?: boolean;
  };
  
  /** Scrolling configuration */
  scrollable?: boolean | { 
    /** Show scrollbar */
    scrollbar: boolean; 
  };
}

/**
 * Media content configuration
 */
export interface MediaConfig {
  /** Minimum height of media elements in pixels */
  height?: number;
  
  /** Media alignment within cards */
  align?: 'left' | 'center' | 'right';
  
  /** CSS object-fit property for images */
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * Animation and slideshow configuration
 */
export interface AnimationConfig {
  /** Slideshow configuration */
  slideshow?: {
    /** Enable slideshow functionality */
    enabled?: boolean;
    /** Duration each slide is displayed in milliseconds */
    duration?: number;
    /** Type of slideshow transition animation */
    type?: 'reveal' | 'slide' | 'fade';
    /** Auto-start slideshow on load */
    autoStart?: boolean;
    /** Show progress indicator on individual cards */
    showProgress?: boolean;
    /** Show overall progress bar */
    showOverallProgress?: boolean;
  };
}

/**
 * Styling and theming configuration
 */
export interface StyleConfig {
  /** Custom CSS class names for elements */
  classNames?: {
    card?: string;
    cardMedia?: string;
    cardSubTitle?: string;
    cardText?: string;
    cardTitle?: string;
    controls?: string;
    title?: string;
    timelinePoint?: string;
    timelineTrack?: string;
  };
  
  /** Custom font sizes */
  fontSizes?: {
    cardSubtitle?: string;
    cardText?: string;
    cardTitle?: string;
    title?: string;
  };
}

/**
 * Accessibility and internationalization
 */
export interface AccessibilityConfig {
  /** Custom button text labels */
  buttonTexts?: {
    first?: string;
    last?: string;
    next?: string;
    previous?: string;
    play?: string;
    stop?: string;
  };
  
  /** Search functionality labels */
  search?: {
    placeholder?: string;
    ariaLabel?: string;
    clearLabel?: string;
  };
}