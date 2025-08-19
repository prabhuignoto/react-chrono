import { style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles/sprinkles.css';

// Cross-browser transition mixin
const transitionMixin = {
  WebkitTransition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  MozTransition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  msTransition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  OTransition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
};

// Base wrapper styles
const baseWrapper = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  }),
  {
    ...transitionMixin,
    zIndex: 0,
    position: 'relative',
    overflow: 'visible',
    outline: 0,
  },
]);

// Timeline wrapper recipe with variants
export const timelineWrapper = recipe({
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
    height: {
      auto: { height: 'auto' },
      full: { height: '100%' },
      custom: {}, // Will be overridden by inline styles
    },
    fullscreen: {
      true: {},
      false: {},
    },
    focusVisible: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    mode: 'vertical',
    height: 'full',
    fullscreen: false,
    focusVisible: true,
  },
});

// Focus styles using globalStyle for better specificity
globalStyle(`${timelineWrapper}:focus`, {
  outline: 0,
});

globalStyle(`${timelineWrapper}.js-focus-visible :focus:not(.focus-visible)`, {
  outline: 0,
});

globalStyle(`${timelineWrapper}.js-focus-visible .focus-visible`, {
  outline: '2px solid #528deb',
  outlineOffset: '2px',
});

// Toolbar navigation focus override
globalStyle(`${timelineWrapper}[data-toolbar-navigation='true'] :focus`, {
  outline: '0 !important',
});

// Keyboard navigation focus
globalStyle(`${timelineWrapper}[data-keyboard-focus='true'] :focus-visible`, {
  outline: '2px solid #528deb',
  outlineOffset: '2px',
});

// Fullscreen browser-specific styles
globalStyle(
  `${timelineWrapper}:fullscreen, ${timelineWrapper}:-webkit-full-screen, ${timelineWrapper}:-moz-full-screen, ${timelineWrapper}:-ms-fullscreen`,
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
  `${timelineWrapper}:fullscreen > *, ${timelineWrapper}:-webkit-full-screen > *, ${timelineWrapper}:-moz-full-screen > *, ${timelineWrapper}:-ms-fullscreen > *`,
  {
    width: '100%',
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
);

// Safari fullscreen handling
globalStyle(`${timelineWrapper}:-webkit-full-screen`, {
  WebkitTransform: 'translateZ(0)',
  transform: 'translateZ(0)',
});

// Firefox fullscreen handling
globalStyle(`${timelineWrapper}:-moz-full-screen`, {
  MozAppearance: 'none',
});

// Backdrop styles
globalStyle(
  `${timelineWrapper}:fullscreen::backdrop, ${timelineWrapper}:-webkit-full-screen::backdrop, ${timelineWrapper}:-moz-full-screen::backdrop, ${timelineWrapper}:-ms-fullscreen::backdrop`,
  {
    background: '#ffffff',
  },
);

// Timeline main wrapper base
const baseMainWrapper = style([
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
    background: 'transparent',
    scrollBehavior: 'auto',
    maxHeight: 'calc(100vh - 80px)', // Account for sticky toolbar
    position: 'relative',
  },
]);

// Timeline main wrapper recipe
export const timelineMainWrapper = recipe({
  base: baseMainWrapper,
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
    flex: {
      auto: { flex: '0 0 auto' },
      fill: { flex: '1 1 auto' },
    },
    fullscreen: {
      true: {
        background: 'transparent !important',
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
      },
      false: {},
    },
  },
  defaultVariants: {
    mode: 'vertical',
    scrollable: true,
    flex: 'fill',
    fullscreen: false,
  },
});

// Fullscreen styles for main wrapper
globalStyle(
  `:fullscreen ${timelineMainWrapper}, :-webkit-full-screen ${timelineMainWrapper}, :-moz-full-screen ${timelineMainWrapper}, :-ms-fullscreen ${timelineMainWrapper}`,
  {
    background: 'transparent !important',
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
  },
);

// Timeline main content
const baseTimelineMain = style({
  position: 'absolute',
  top: '50%',
  left: '0',
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  transform: 'translate(0, -50%)',
});

export const timelineMain = recipe({
  base: baseTimelineMain,
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
  defaultVariants: {
    mode: 'vertical',
    fullscreen: false,
  },
});

// Fullscreen styles for timeline main
globalStyle(
  `:fullscreen ${timelineMain}, :-webkit-full-screen ${timelineMain}, :-moz-full-screen ${timelineMain}, :-ms-fullscreen ${timelineMain}`,
  {
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
);

globalStyle(
  `:fullscreen ${timelineMain}.vertical, :-webkit-full-screen ${timelineMain}.vertical, :-moz-full-screen ${timelineMain}.vertical, :-ms-fullscreen ${timelineMain}.vertical`,
  {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    transform: 'none',
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
);

// Timeline outline
export const timelineOutline = recipe({
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

// Timeline control container
export const timelineControlContainer = recipe({
  base: style([
    sprinkles({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    {
      minHeight: '3rem',
      transition: 'filter 0.3s ease',
    },
  ]),
  variants: {
    active: {
      true: { filter: 'opacity(1)' },
      false: { filter: 'opacity(0.9)' },
    },
    visibility: {
      show: { visibility: 'visible' },
      hide: { visibility: 'hidden' },
    },
  },
  defaultVariants: {
    active: true,
    visibility: 'show',
  },
});

// Timeline content render
export const timelineContentRender = recipe({
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
  },
  defaultVariants: {
    showAllCards: false,
    fullscreen: false,
  },
});

// Fullscreen styles for content render
globalStyle(
  `:fullscreen ${timelineContentRender}, :-webkit-full-screen ${timelineContentRender}, :-moz-full-screen ${timelineContentRender}, :-ms-fullscreen ${timelineContentRender}`,
  {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1',
  },
);
