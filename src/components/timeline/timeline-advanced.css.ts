import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles/enhanced-sprinkles.css';
import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../styles/tokens.css';

// Enhanced cross-browser transition mixin
const transitionMixin = {
  WebkitTransition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  MozTransition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  msTransition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  OTransition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
};

// Advanced timeline wrapper with comprehensive browser support
export const timelineWrapperAdvanced = recipe({
  base: [
    sprinkles({
      display: 'flex',
      flexDirection: 'column',
      width: 'full',
      position: 'relative',
    }),
    {
      ...transitionMixin,
      height: '100%',
      zIndex: parseInt(vars.zIndex.timelineCard) - 2,
      outline: '0',
      overflow: 'visible',
    },
  ],
  variants: {
    mode: {
      horizontal: {
        justifyContent: 'flex-start',
      },
      vertical: {},
      horizontal_all: {
        justifyContent: 'flex-start',
      },
      tree: {},
    },
    translate: {
      none: {},
      custom: {}, // Will be overridden by transform prop
    },
    darkMode: {
      true: {},
      false: {},
    },
    fullscreen: {
      true: {
        // Cross-browser user selection
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent',
        // Cross-browser box sizing
        WebkitBoxSizing: 'border-box',
        MozBoxSizing: 'border-box',
        boxSizing: 'border-box',
        // Scrollbar styles
        scrollbarWidth: 'auto',
        msOverflowStyle: 'auto',
      },
      false: {},
    },
    height: {
      auto: { height: 'auto' },
      full: { height: '100%' },
      custom: {}, // For custom height strings
    },
    scrollbarStyle: {
      default: {},
      hidden: {
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      },
    },
  },
  compoundVariants: [
    {
      variants: { fullscreen: true, mode: 'vertical' },
      style: {
        background: '#ffffff',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '999999',
      },
    },
    {
      variants: { fullscreen: true, mode: 'horizontal' },
      style: {
        background: '#ffffff',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '999999',
      },
    },
  ],
  defaultVariants: {
    mode: 'vertical',
    translate: 'none',
    darkMode: false,
    fullscreen: false,
    height: 'full',
    scrollbarStyle: 'default',
  },
});

// Advanced timeline main wrapper with enhanced scrolling
export const timelineMainWrapperAdvanced = recipe({
  base: [
    sprinkles({
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      width: 'full',
    }),
    {
      overflowY: 'auto',
      overflowX: 'visible',
      overscrollBehavior: 'contain',
      background: 'transparent',
    },
  ],
  variants: {
    mode: {
      horizontal: {
        position: 'relative',
        minHeight: '150px',
      },
      vertical: {},
      horizontal_all: {
        position: 'relative',
        minHeight: '150px',
      },
      tree: {},
    },
    scrollable: {
      true: {},
      false: {
        padding: '0 0.5rem 0',
      },
    },
    position: {
      top: {},
      bottom: {},
    },
    height: {
      auto: { height: 'auto' },
      custom: {}, // For custom heights
    },
    flex: {
      auto: { flex: '0 0 auto' },
      fill: { flex: '1 1 auto' },
    },
    scrollbarTheme: {
      default: {},
      minimal: {},
    },
  },
  compoundVariants: [
    {
      variants: { scrollbarTheme: 'minimal' },
      style: {
        // Firefox scrollbar
        scrollbarColor: '#3b82f6 transparent',
        scrollbarWidth: 'thin',
      },
    },
  ],
  defaultVariants: {
    mode: 'vertical',
    scrollable: true,
    position: 'top',
    height: 'auto',
    flex: 'fill',
    scrollbarTheme: 'default',
  },
});

// Advanced timeline main content with enhanced positioning
export const timelineMainAdvanced = recipe({
  base: {
    position: 'absolute',
    top: '50%',
    left: '0',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'translate(0, -50%)',
  },
  variants: {
    mode: {
      vertical: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
      },
      horizontal: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },
      horizontal_all: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        flexDirection: 'row',
        overflowX: 'auto',
      },
      tree: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
      },
    },
    fullscreen: {
      true: {
        position: 'relative',
        top: 'auto',
        left: 'auto',
        transform: 'none',
        width: '100%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { fullscreen: true, mode: 'vertical' },
      style: {
        alignItems: 'flex-start',
      },
    },
  ],
  defaultVariants: {
    mode: 'vertical',
    fullscreen: false,
  },
});

// Advanced outline with enhanced positioning
export const timelineOutlineAdvanced = recipe({
  base: {
    position: 'absolute',
    right: '0',
    left: '0',
    width: '100%',
    marginRight: 'auto',
    marginLeft: 'auto',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: '2',
  },
  variants: {
    showAllCards: {
      true: {
        width: 'calc(100% + 2rem)',
        left: '-1rem',
      },
      false: {},
    },
    mode: {
      horizontal: {},
      vertical: {},
      horizontal_all: {
        width: 'calc(100% + 2rem)',
        left: '-1rem',
      },
      tree: {},
    },
  },
  defaultVariants: {
    showAllCards: false,
    mode: 'vertical',
  },
});

// Advanced control container with better interaction states
export const timelineControlContainerAdvanced = recipe({
  base: [
    sprinkles({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    {
      minHeight: '3rem',
      transition: 'filter 0.3s ease',
    },
  ],
  variants: {
    active: {
      true: { filter: 'opacity(1)' },
      false: { filter: 'opacity(0.9)' },
    },
    visibility: {
      show: {
        visibility: 'visible',
      },
      hide: {
        visibility: 'hidden',
      },
    },
    interaction: {
      enabled: {},
      disabled: {
        pointerEvents: 'none',
      },
    },
  },
  defaultVariants: {
    active: true,
    visibility: 'show',
    interaction: 'enabled',
  },
});

// Advanced content render with responsive behavior
export const timelineContentRenderAdvanced = recipe({
  base: [
    sprinkles({
      display: 'flex',
      alignItems: 'flex-start',
    }),
    {
      width: '98%',
      marginRight: 'auto',
      marginLeft: 'auto',
      overflowX: 'hidden',
    },
  ],
  variants: {
    showAllCards: {
      true: { justifyContent: 'flex-start' },
      false: { justifyContent: 'center' },
    },
    fullscreen: {
      true: {
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        justifyContent: 'center',
        alignItems: 'center',
        flex: '1',
      },
      false: {},
    },
    responsive: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    showAllCards: false,
    fullscreen: false,
    responsive: true,
  },
});

// Essential browser-specific globalStyles that cannot be converted to variants
// These handle cross-browser fullscreen API compatibility and accessibility

// Focus management - critical for accessibility
globalStyle(`${timelineWrapperAdvanced}:focus`, {
  outline: '0',
});

globalStyle(`${timelineWrapperAdvanced}.js-focus-visible :focus:not(.focus-visible)`, {
  outline: '0',
});

globalStyle(`${timelineWrapperAdvanced}.js-focus-visible .focus-visible`, {
  outline: '2px solid #528deb',
  outlineOffset: '2px',
});

globalStyle(`${timelineWrapperAdvanced}[data-toolbar-navigation='true'] :focus`, {
  outline: '0',
});

globalStyle(`${timelineWrapperAdvanced}[data-keyboard-focus='true'] :focus-visible`, {
  outline: '2px solid #528deb',
  outlineOffset: '2px',
});

// Cross-browser fullscreen API compatibility
globalStyle(
  `${timelineWrapperAdvanced}:fullscreen, ${timelineWrapperAdvanced}:-webkit-full-screen, ${timelineWrapperAdvanced}:-moz-full-screen, ${timelineWrapperAdvanced}:-ms-fullscreen`,
  {
    background: '#ffffff',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    overflowY: 'auto',
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '999999',
  },
);

globalStyle(
  `${timelineWrapperAdvanced}:fullscreen > *, ${timelineWrapperAdvanced}:-webkit-full-screen > *, ${timelineWrapperAdvanced}:-moz-full-screen > *, ${timelineWrapperAdvanced}:-ms-fullscreen > *`,
  {
    width: '100%',
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
);

// Safari-specific fullscreen handling
globalStyle(`${timelineWrapperAdvanced}:-webkit-full-screen`, {
  WebkitTransform: 'translateZ(0)',
  transform: 'translateZ(0)',
});

// Firefox-specific fullscreen handling
globalStyle(`${timelineWrapperAdvanced}:-moz-full-screen`, {
  MozAppearance: 'none',
});

// Fullscreen backdrop styling
globalStyle(
  `${timelineWrapperAdvanced}:fullscreen::backdrop, ${timelineWrapperAdvanced}:-webkit-full-screen::backdrop, ${timelineWrapperAdvanced}:-moz-full-screen::backdrop, ${timelineWrapperAdvanced}:-ms-fullscreen::backdrop`,
  {
    background: '#ffffff',
  },
);

// Enhanced scrollbar styling for webkit browsers
globalStyle(`${timelineMainWrapperAdvanced}::-webkit-scrollbar`, {
  width: '0.3em',
});

globalStyle(`${timelineMainWrapperAdvanced}::-webkit-scrollbar-track`, {
  boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.2)',
});

globalStyle(`${timelineMainWrapperAdvanced}::-webkit-scrollbar-thumb`, {
  background: '#3b82f6',
  outline: '1px solid #3b82f6',
});