import { style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles/sprinkles.css';
import { vars } from '../../styles/tokens.css';

// Cross-browser transition mixin
const transitionMixin = {
  WebkitTransition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  MozTransition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  msTransition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  OTransition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
};

// Transform utilities
const getTransform = (transform?: string) => transform || 'none';

// Base wrapper with cross-browser support
const baseWrapper = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  }),
  {
    ...transitionMixin,
    height: '100%', // Default height
    zIndex: parseInt(vars.zIndex.timelineCard) - 2,
    outline: '0',
    overflow: 'visible',
    position: 'relative',
  },
]);

// Advanced timeline wrapper with full browser support
export const timelineWrapperAdvanced = recipe({
  base: baseWrapper,
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
  },
  defaultVariants: {
    mode: 'vertical',
    translate: 'none',
    darkMode: false,
    fullscreen: false,
    height: 'full',
  },
});

// Focus styles with improved accessibility
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

// Toolbar navigation focus override
globalStyle(`${timelineWrapperAdvanced}[data-toolbar-navigation='true'] :focus`, {
  outline: '0',
});

// Keyboard navigation focus
globalStyle(`${timelineWrapperAdvanced}[data-keyboard-focus='true'] :focus-visible`, {
  outline: '2px solid #528deb',
  outlineOffset: '2px',
});

// Cross-browser fullscreen support
globalStyle(`${timelineWrapperAdvanced}:fullscreen, ${timelineWrapperAdvanced}:-webkit-full-screen, ${timelineWrapperAdvanced}:-moz-full-screen, ${timelineWrapperAdvanced}:-ms-fullscreen`, {
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
});

// Fullscreen children styles
globalStyle(`${timelineWrapperAdvanced}:fullscreen > *, ${timelineWrapperAdvanced}:-webkit-full-screen > *, ${timelineWrapperAdvanced}:-moz-full-screen > *, ${timelineWrapperAdvanced}:-ms-fullscreen > *`, {
  width: '100%',
  maxWidth: '1200px',
  marginLeft: 'auto',
  marginRight: 'auto',
});

// Safari-specific fullscreen
globalStyle(`${timelineWrapperAdvanced}:-webkit-full-screen`, {
  WebkitTransform: 'translateZ(0)',
  transform: 'translateZ(0)',
});

// Firefox-specific fullscreen
globalStyle(`${timelineWrapperAdvanced}:-moz-full-screen`, {
  MozAppearance: 'none',
});

// Backdrop styles
globalStyle(`${timelineWrapperAdvanced}:fullscreen::backdrop, ${timelineWrapperAdvanced}:-webkit-full-screen::backdrop, ${timelineWrapperAdvanced}:-moz-full-screen::backdrop, ${timelineWrapperAdvanced}:-ms-fullscreen::backdrop`, {
  background: '#ffffff',
});

// Advanced timeline main wrapper
const baseMainWrapperAdvanced = style([
  sprinkles({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  }),
  {
    overflowY: 'auto',
    overflowX: 'visible',
    overscrollBehavior: 'contain',
    width: '100%',
    background: 'transparent',
  },
]);

export const timelineMainWrapperAdvanced = recipe({
  base: baseMainWrapperAdvanced,
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
  },
  defaultVariants: {
    mode: 'vertical',
    scrollable: true,
    position: 'top',
    height: 'auto',
    flex: 'fill',
  },
});

// Scrollbar styles
globalStyle(`${timelineMainWrapperAdvanced}`, {
  // Firefox scrollbar
  scrollbarColor: '#3b82f6 transparent',
  scrollbarWidth: 'thin',
});

// Webkit scrollbar styles
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

// Fullscreen styles for main wrapper
globalStyle(`:fullscreen ${timelineMainWrapperAdvanced}, :-webkit-full-screen ${timelineMainWrapperAdvanced}, :-moz-full-screen ${timelineMainWrapperAdvanced}, :-ms-fullscreen ${timelineMainWrapperAdvanced}`, {
  background: 'transparent',
  flex: '1',
  overflowY: 'auto',
  overflowX: 'visible',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 2rem',
  minHeight: '0',
});

// Advanced timeline main content
export const timelineMainAdvanced = recipe({
  base: style({
    position: 'absolute',
    top: '50%',
    left: '0',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'translate(0, -50%)',
  }),
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
  },
  defaultVariants: {
    mode: 'vertical',
  },
});

// Fullscreen styles for timeline main
globalStyle(`:fullscreen ${timelineMainAdvanced}, :-webkit-full-screen ${timelineMainAdvanced}, :-moz-full-screen ${timelineMainAdvanced}, :-ms-fullscreen ${timelineMainAdvanced}`, {
  position: 'relative',
  top: 'auto',
  left: 'auto',
  transform: 'none',
  width: '100%',
  height: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

globalStyle(`:fullscreen ${timelineMainAdvanced}.vertical, :-webkit-full-screen ${timelineMainAdvanced}.vertical, :-moz-full-screen ${timelineMainAdvanced}.vertical, :-ms-fullscreen ${timelineMainAdvanced}.vertical`, {
  position: 'relative',
  top: 'auto',
  left: 'auto',
  transform: 'none',
  width: '100%',
  height: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
});

// Advanced outline with proper positioning
export const timelineOutlineAdvanced = recipe({
  base: style({
    position: 'absolute',
    right: '0',
    left: '0',
    width: '100%',
    marginRight: 'auto',
    marginLeft: 'auto',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: '2',
  }),
  variants: {
    showAllCards: {
      true: {
        width: 'calc(100% + 2rem)',
        left: '-1rem',
      },
      false: {},
    },
  },
  defaultVariants: {
    showAllCards: false,
  },
});

// Show all cards horizontal mode extension
globalStyle(`.show-all-cards-horizontal ${timelineOutlineAdvanced}`, {
  width: 'calc(100% + 2rem)',
  left: '-1rem',
});

// Advanced control container
export const timelineControlContainerAdvanced = recipe({
  base: style([
    sprinkles({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    {
      minHeight: '3rem',
    },
  ]),
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
  },
  defaultVariants: {
    active: true,
    visibility: 'show',
  },
});

// Advanced content render with fullscreen support
export const timelineContentRenderAdvanced = recipe({
  base: style([
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
  ]),
  variants: {
    showAllCards: {
      true: { justifyContent: 'flex-start' },
      false: { justifyContent: 'center' },
    },
  },
  defaultVariants: {
    showAllCards: false,
  },
});

// Fullscreen styles for content render
globalStyle(`:fullscreen ${timelineContentRenderAdvanced}, :-webkit-full-screen ${timelineContentRenderAdvanced}, :-moz-full-screen ${timelineContentRenderAdvanced}, :-ms-fullscreen ${timelineContentRenderAdvanced}`, {
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  justifyContent: 'center',
  alignItems: 'center',
  flex: '1',
});