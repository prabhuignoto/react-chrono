import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../styles/sprinkles/enhanced-sprinkles.css';
import { globalStyle } from '@vanilla-extract/css';

// Enhanced toolbar wrapper with comprehensive variants
export const toolbarWrapper = recipe({
  base: [
    sprinkles({
      display: 'flex',
      alignItems: 'center',
      width: 'full',
      position: 'sticky',
    }),
    {
      fontWeight: 'bold',
      textAlign: 'center',
      textDecoration: 'none',
      borderRadius: '8px',
      padding: '0.5rem 1rem',
      zIndex: 1000,
      justifyContent: 'space-between',
      gap: '1rem',
      minHeight: 'auto',
      flexWrap: 'wrap',
      top: '0',
      backgroundColor:
        'var(--timeline-toolbar-bg-color, var(--timeline-bg-color, #ffffff))',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      boxShadow: '0 2px 8px var(--timeline-shadow-color, rgba(0, 0, 0, 0.1))',
      color: 'var(--timeline-text-color, #1e293b)',
    },
  ],
  variants: {
    position: {
      top: {
        margin: '0 0 16px 0',
        order: '0',
      },
      bottom: {
        margin: '16px 0 0 0',
        order: '1',
      },
    },
    fullscreen: {
      true: {},
      false: {},
    },
    responsive: {
      mobile: {},
      tablet: {},
      desktop: {},
    },
  },
  compoundVariants: [
    {
      variants: { responsive: 'mobile' },
      style: {
        padding: '0.75rem 0.5rem',
        gap: '0.75rem',
        justifyContent: 'center',
      },
    },
    {
      variants: { responsive: 'tablet' },
      style: {
        padding: '0.5rem 0.75rem',
        gap: '0.75rem',
      },
    },
  ],
  defaultVariants: {
    position: 'top',
    fullscreen: false,
    responsive: 'desktop',
  },
});

// Enhanced extra controls with improved responsive behavior
export const extraControls = recipe({
  base: [
    sprinkles({
      display: 'flex',
      alignItems: 'center',
    }),
    {
      alignSelf: 'center',
      listStyle: 'none',
      margin: '0',
      padding: '0.125rem',
      flexShrink: '0',
      gap: '0.5rem',
      flexWrap: 'wrap',
    },
  ],
  variants: {
    hide: {
      true: { visibility: 'hidden' },
      false: { visibility: 'visible' },
    },
    slideShowRunning: {
      true: {},
      false: {},
    },
    responsive: {
      mobile: {
        width: '100%',
        justifyContent: 'center',
        order: '1',
      },
      tablet: {
        justifyContent: 'center',
        gap: '0.5rem',
      },
      desktop: {},
    },
  },
  defaultVariants: {
    hide: false,
    slideShowRunning: false,
    responsive: 'desktop',
  },
});

// Enhanced search wrapper with variant-based interaction states
export const searchWrapper = recipe({
  base: [
    sprinkles({
      display: 'flex',
      alignItems: 'center',
      width: 'full',
      position: 'relative',
    }),
    {
      padding: '0.2rem 0.6rem',
      borderRadius: '6px',
      border: '1px solid #e5e7eb',
      transition:
        'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
      minHeight: '38px',
      background: '#ffffff',
    },
  ],
  variants: {
    focused: {
      true: {
        borderColor: '#3b82f6',
        boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
        background: 'rgba(255, 255, 255, 0.1)',
      },
      false: {},
    },
    hovered: {
      true: {
        borderColor: '#3b82f6',
      },
      false: {},
    },
    disabled: {
      true: {
        opacity: '0.5',
        pointerEvents: 'none',
      },
      false: {},
    },
  },
  defaultVariants: {
    focused: false,
    hovered: false,
    disabled: false,
  },
});

// Enhanced search input with comprehensive styling
export const searchInput = style({
  flexGrow: '1',
  border: 'none',
  outline: 'none',
  background: 'transparent',
  color: 'var(--timeline-text-color, #1e293b)',
  fontSize: '0.9rem',
  padding: '0.4rem 0.2rem',
  minHeight: '28px',
  selectors: {
    '&::placeholder': {
      color: 'var(--timeline-muted-color, #6b7280)',
      opacity: '0.8',
      fontWeight: '400',
    },
    '&:disabled': {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
    '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus': {
      WebkitTextFillColor: 'var(--timeline-text-color, #1e293b) !important',
      WebkitBoxShadow: '0 0 0px 1000px transparent inset',
      transition: 'background-color 5000s ease-in-out 0s',
    },
    '&::-webkit-search-cancel-button': {
      appearance: 'none',
      height: '10px',
      width: '10px',
      marginLeft: '0.2rem',
      cursor: 'pointer',
      opacity: '0.6',
    },
    '&::-webkit-search-cancel-button:hover': {
      opacity: '1',
    },
  },
});

// Enhanced search info with responsive typography
export const searchInfo = style({
  fontSize: '0.8rem',
  color: 'var(--timeline-text-color, #1e293b)',
  opacity: '0.8',
  margin: '0 0.4rem',
  whiteSpace: 'nowrap',
  flexShrink: '0',
});

// Enhanced search controls with better layout
export const searchControls = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
  }),
  {
    gap: '0.25rem',
    flexShrink: '0',
    marginLeft: 'auto',
  },
]);

// Enhanced extra control child with consistent spacing
export const extraControlChild = style([
  sprinkles({ display: 'flex' }),
  {
    margin: '0.5rem 0',
    marginRight: '0.5rem',
  },
]);

// Enhanced toolbar sections with responsive variants
export const toolbarSection = recipe({
  base: [
    sprinkles({
      display: 'flex',
      alignItems: 'center',
    }),
    {
      gap: '0.5rem',
      flexShrink: '0',
    },
  ],
  variants: {
    primary: {
      true: { order: '-1' },
      false: {},
    },
    responsive: {
      mobile: {
        justifyContent: 'center',
      },
      tablet: {
        gap: '0.4rem',
      },
      desktop: {},
    },
  },
  defaultVariants: {
    primary: false,
    responsive: 'desktop',
  },
});

// Enhanced navigation group
export const navigationGroup = recipe({
  base: [
    toolbarSection(),
    {
      flexWrap: 'nowrap',
    },
  ],
  variants: {
    compact: {
      true: { gap: '0.25rem' },
      false: {},
    },
  },
  defaultVariants: {
    compact: false,
  },
});

// Enhanced search group with better responsive behavior
export const searchGroup = recipe({
  base: [
    toolbarSection(),
    {
      flex: '1 1 300px',
      maxWidth: '600px',
      justifyContent: 'center',
    },
  ],
  variants: {
    responsive: {
      mobile: {
        flex: '1 1 auto',
        order: '-1',
        width: '100%',
      },
      tablet: {},
      desktop: {},
    },
  },
  defaultVariants: {
    responsive: 'desktop',
  },
});

// Enhanced action group
export const actionGroup = recipe({
  base: [
    toolbarSection(),
    {
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
    },
  ],
  variants: {
    responsive: {
      mobile: {
        justifyContent: 'center',
      },
      tablet: {
        justifyContent: 'center',
      },
      desktop: {},
    },
  },
  defaultVariants: {
    responsive: 'desktop',
  },
});

// Critical globalStyles for cross-browser compatibility and complex selectors
// These handle pseudo-selectors and browser-specific features that cannot be variants

// Toolbar child alignment
globalStyle(`${toolbarWrapper} > *`, {
  alignSelf: 'center',
});

// Fullscreen API compatibility - essential for cross-browser support
globalStyle(
  `:fullscreen ${toolbarWrapper}, :-webkit-full-screen ${toolbarWrapper}, :-moz-full-screen ${toolbarWrapper}, :-ms-fullscreen ${toolbarWrapper}`,
  {
    position: 'sticky',
    top: '0',
    zIndex: '1000001',
    background: '#ffffff',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    margin: '0 0 1rem 0',
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    visibility: 'visible',
    opacity: '1',
    pointerEvents: 'auto',
    height: 'auto',
    overflow: 'visible',
  },
);

// Extra controls child wrapper styling
globalStyle(`${extraControls} .control-wrapper`, {
  display: 'flex',
  alignItems: 'center',
  alignSelf: 'center',
  flexShrink: '0',
});

// Search wrapper pseudo-selector interactions
globalStyle(`${searchWrapper}:focus-within`, {
  borderColor: '#3b82f6',
  boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
  background: 'rgba(255, 255, 255, 0.1)',
});

globalStyle(`${searchWrapper}:hover`, {
  borderColor: '#3b82f6',
});

// Search controls navigation wrapper
globalStyle(`${searchControls} .timeline-nav-wrapper`, {
  display: 'flex',
  alignItems: 'center',
});