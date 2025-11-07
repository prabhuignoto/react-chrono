/**
 * New grouped configuration interfaces for better API organization
 * This provides a cleaner, more intuitive way to configure the timeline
 */

/**
 * Layout and sizing configuration
 */
export interface LayoutConfig {
  /** Maximum width of timeline cards in pixels */
  cardWidth?: number;

  /** Height of timeline cards in pixels, or 'auto' for automatic sizing based on content */
  cardHeight?: number | 'auto';

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

  /** Content alignment within timeline cards */
  alignment?: {
    /** Horizontal alignment of content */
    horizontal?: 'left' | 'center' | 'right' | 'stretch';
    /** Vertical alignment of content */
    vertical?: 'top' | 'center' | 'bottom' | 'stretch';
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
    /** Search input width configuration */
    search?: {
      /** Default width of search section (CSS length string) */
      width?: string;
      /** Maximum width of search section (CSS length string) */
      maxWidth?: string;
      /** Minimum width of search section (CSS length string) */
      minWidth?: string;
      /** Width of actual input field (CSS length string) */
      inputWidth?: string;
      /** Maximum width of actual input field (CSS length string) */
      inputMaxWidth?: string;
    };
  };

  /** Scrolling configuration */
  scrollable?:
    | boolean
    | {
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

  /** Google Fonts configuration */
  googleFonts?: {
    /** Primary font family name from Google Fonts */
    fontFamily: string;

    /** Font configurations for different text elements */
    elements?: {
      /** Timeline item titles */
      title?: {
        weight?:
          | 'thin'
          | 'extra-light'
          | 'light'
          | 'regular'
          | 'medium'
          | 'semi-bold'
          | 'bold'
          | 'extra-bold'
          | 'black'
          | 100
          | 200
          | 300
          | 400
          | 500
          | 600
          | 700
          | 800
          | 900;
        style?: 'normal' | 'italic';
        size?: string;
      };
      /** Timeline card titles */
      cardTitle?: {
        weight?:
          | 'thin'
          | 'extra-light'
          | 'light'
          | 'regular'
          | 'medium'
          | 'semi-bold'
          | 'bold'
          | 'extra-bold'
          | 'black'
          | 100
          | 200
          | 300
          | 400
          | 500
          | 600
          | 700
          | 800
          | 900;
        style?: 'normal' | 'italic';
        size?: string;
      };
      /** Timeline card subtitles */
      cardSubtitle?: {
        weight?:
          | 'thin'
          | 'extra-light'
          | 'light'
          | 'regular'
          | 'medium'
          | 'semi-bold'
          | 'bold'
          | 'extra-bold'
          | 'black'
          | 100
          | 200
          | 300
          | 400
          | 500
          | 600
          | 700
          | 800
          | 900;
        style?: 'normal' | 'italic';
        size?: string;
      };
      /** Timeline card main text content */
      cardText?: {
        weight?:
          | 'thin'
          | 'extra-light'
          | 'light'
          | 'regular'
          | 'medium'
          | 'semi-bold'
          | 'bold'
          | 'extra-bold'
          | 'black'
          | 100
          | 200
          | 300
          | 400
          | 500
          | 600
          | 700
          | 800
          | 900;
        style?: 'normal' | 'italic';
        size?: string;
      };
      /** Timeline controls and UI text */
      controls?: {
        weight?:
          | 'thin'
          | 'extra-light'
          | 'light'
          | 'regular'
          | 'medium'
          | 'semi-bold'
          | 'bold'
          | 'extra-bold'
          | 'black'
          | 100
          | 200
          | 300
          | 400
          | 500
          | 600
          | 700
          | 800
          | 900;
        style?: 'normal' | 'italic';
        size?: string;
      };
    };

    /** Additional font weights to load */
    weights?: Array<
      | 'thin'
      | 'extra-light'
      | 'light'
      | 'regular'
      | 'medium'
      | 'semi-bold'
      | 'bold'
      | 'extra-bold'
      | 'black'
      | 100
      | 200
      | 300
      | 400
      | 500
      | 600
      | 700
      | 800
      | 900
      | 'italic'
      | string
    >;

    /** Font display strategy for loading */
    display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';

    /** Preconnect to Google Fonts for faster loading */
    preconnect?: boolean;
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

/**
 * Comprehensive internationalization configuration
 */
export interface I18nConfig {
  /** Complete internationalization configuration for all timeline texts */
  texts?: import('./TimelineI18n').TimelineI18nConfig;
  /** Locale code (e.g., 'en', 'es', 'fr', 'de') for future locale-specific features */
  locale?: string;
  /** Text direction for RTL language support */
  direction?: 'ltr' | 'rtl';
}

/**
 * Dark mode configuration
 */
export interface DarkModeConfig {
  /** Enable dark mode */
  enabled?: boolean;
  /** Show dark mode toggle button in toolbar */
  showToggle?: boolean;
}
