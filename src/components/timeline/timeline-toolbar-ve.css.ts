import { style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles/sprinkles.css';

// Base toolbar wrapper styles
const baseToolbarWrapper = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
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
    position: 'sticky',
    top: '0',
    backgroundColor: 'var(--timeline-toolbar-bg-color, var(--timeline-bg-color, #ffffff))',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: '0 2px 8px var(--timeline-shadow-color, rgba(0, 0, 0, 0.1))',
    color: 'var(--timeline-text-color, #1e293b)',
  },
]);

// Toolbar wrapper recipe
export const toolbarWrapper = recipe({
  base: baseToolbarWrapper,
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
  },
  defaultVariants: {
    position: 'top',
    fullscreen: false,
  },
});

// Responsive toolbar styles
globalStyle(`${toolbarWrapper} > *`, {
  alignSelf: 'center',
});

globalStyle(`${toolbarWrapper}`, {
  '@media': {
    '(max-width: 768px)': {
      padding: '0.5rem 0.75rem',
      gap: '0.75rem',
    },
    '(max-width: 480px)': {
      padding: '0.75rem 0.5rem',
      gap: '0.75rem',
      justifyContent: 'center',
    },
  },
});

// Fullscreen toolbar styles
globalStyle(`:fullscreen ${toolbarWrapper}, :-webkit-full-screen ${toolbarWrapper}, :-moz-full-screen ${toolbarWrapper}, :-ms-fullscreen ${toolbarWrapper}`, {
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
});

// Extra controls
export const extraControls = recipe({
  base: style([
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
  ]),
  variants: {
    hide: {
      true: { visibility: 'hidden' },
      false: { visibility: 'visible' },
    },
    slideShowRunning: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    hide: false,
    slideShowRunning: false,
  },
});

globalStyle(`${extraControls} .control-wrapper`, {
  display: 'flex',
  alignItems: 'center',
  alignSelf: 'center',
  flexShrink: '0',
});

globalStyle(`${extraControls}`, {
  '@media': {
    '(max-width: 768px)': {
      justifyContent: 'center',
      gap: '0.5rem',
    },
    '(max-width: 480px)': {
      width: '100%',
      justifyContent: 'center',
      order: '1',
    },
  },
});

// Extra control child
export const extraControlChild = style([
  sprinkles({ display: 'flex' }),
  {
    margin: '0.5rem 0',
    marginRight: '0.5rem',
  },
]);

// Search wrapper
export const searchWrapper = recipe({
  base: style([
    sprinkles({
      display: 'flex',
      alignItems: 'center',
    }),
    {
      padding: '0.2rem 0.6rem',
      borderRadius: '6px',
      border: '1px solid #e5e7eb',
      width: '100%',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
      minHeight: '38px',
      position: 'relative',
      background: '#ffffff',
    },
  ]),
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
  },
  defaultVariants: {
    focused: false,
    hovered: false,
  },
});

globalStyle(`${searchWrapper}:focus-within`, {
  borderColor: '#3b82f6',
  boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
  background: 'rgba(255, 255, 255, 0.1)',
});

globalStyle(`${searchWrapper}:hover`, {
  borderColor: '#3b82f6',
});

// Search input
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

// Search info
export const searchInfo = style({
  fontSize: '0.8rem',
  color: 'var(--timeline-text-color, #1e293b)',
  opacity: '0.8',
  margin: '0 0.4rem',
  whiteSpace: 'nowrap',
  flexShrink: '0',
});

// Search controls
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

globalStyle(`${searchControls} .timeline-nav-wrapper`, {
  display: 'flex',
  alignItems: 'center',
});

// Toolbar sections
export const toolbarSection = recipe({
  base: style([
    sprinkles({
      display: 'flex',
      alignItems: 'center',
    }),
    {
      gap: '0.5rem',
      flexShrink: '0',
    },
  ]),
  variants: {
    primary: {
      true: { order: '-1' },
      false: {},
    },
  },
  defaultVariants: {
    primary: false,
  },
});

globalStyle(`${toolbarSection}`, {
  '@media': {
    '(max-width: 768px)': {
      gap: '0.4rem',
    },
    '(max-width: 480px)': {
      justifyContent: 'center',
    },
  },
});

// Navigation group
export const navigationGroup = recipe({
  base: [
    toolbarSection(),
    style({
      flexWrap: 'nowrap',
    }),
  ],
});

// Search group
export const searchGroup = recipe({
  base: [
    toolbarSection(),
    style({
      flex: '1 1 300px',
      maxWidth: '600px',
      justifyContent: 'center',
    }),
  ],
});

globalStyle(`${searchGroup}`, {
  '@media': {
    '(max-width: 480px)': {
      flex: '1 1 auto',
      order: '-1',
      width: '100%',
    },
  },
});

// Action group
export const actionGroup = recipe({
  base: [
    toolbarSection(),
    style({
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
    }),
  ],
});

globalStyle(`${actionGroup}`, {
  '@media': {
    '(max-width: 768px)': {
      justifyContent: 'center',
    },
  },
});