import { globalStyle, style } from '@vanilla-extract/css';
import { visuallyHidden } from '../../../styles/a11y.css';
import { tokens } from '../../../styles/tokens/index.css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../../styles/sprinkles/sprinkles.css';

export const srOnly = visuallyHidden;

export const navWrapper = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  {
    listStyle: 'none',
    position: 'relative',
    zIndex: tokens.semantic.zIndex.controls,
    gap: '0.25rem',
  },
]);

export const navItem = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  { padding: 0 },
]);

export const navItemDisabled = style({
  pointerEvents: 'none',
  filter: 'opacity(0.4)',
});

export const navButton = style({
  alignItems: 'center',
  background: tokens.semantic.color.background.secondary,
  borderRadius: '6px',
  border: '1px solid',
  borderColor: tokens.semantic.color.border.default,
  color: tokens.semantic.color.text.secondary,
  cursor: 'pointer',
  display: 'flex',
  height: '36px',
  justifyContent: 'center',
  alignSelf: 'center',
  margin: '0 0.25rem',
  padding: 0,
  minWidth: '36px',
  boxShadow: tokens.semantic.shadow.card,
  transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
  width: '36px',
  selectors: {
    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },
  '@media': {
    '(max-width: 480px)': {
      height: '44px',
      width: '44px',  
      minWidth: '44px',
      // Ensure touch targets are at least 44x44px
    },
  },
});

export const navButtonRotate = style({ transform: 'rotate(90deg)' });

export const navButtonHover = style({});
globalStyle(`${navButton}:hover:not(:disabled)`, {
  background: `${tokens.semantic.color.interactive.primary}08`,
  borderColor: `${tokens.semantic.color.interactive.primary}40`,
  boxShadow: `0 4px 12px -2px ${tokens.semantic.color.interactive.primary}20, 0 2px 6px -1px rgba(0, 0, 0, 0.1)`,
  transform: 'translateY(-2px)',
  color: tokens.semantic.color.interactive.primary,
});

export const navButtonActive = style({});
globalStyle(`${navButton}:active:not(:disabled)`, {
  transform: 'translateY(0) scale(0.96)',
  background: `${tokens.semantic.color.interactive.primary}12`,
  borderColor: `${tokens.semantic.color.interactive.primary}60`,
  boxShadow: `inset 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px ${tokens.semantic.color.interactive.primary}30`,
  color: tokens.semantic.color.interactive.primary,
});

export const navButtonFocus = style({});
globalStyle(`${navButton}:focus`, {
  outline: `2px solid ${tokens.semantic.color.interactive.primary}`,
  outlineOffset: '2px',
});
globalStyle(`${navButton}:focus:not(:focus-visible)`, { outline: 'none' });

export const navButtonSvg = style({
  width: '1.25rem', // 20px - standardized button icon size
  height: '1.25rem',
  color: 'inherit', // Inherit color from parent button
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: `transform ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
  '@media': {
    '(max-width: 480px)': {
      width: '1.375rem', // 22px
      height: '1.375rem',
    },
  },
});

// Optional recipe API for variant-driven usage without breaking existing exports
export const navButtonRecipe = recipe({
  base: [navButton],
  variants: {
    rotated: {
      true: [navButtonRotate],
      false: {},
    },
    size: {
      sm: { width: '28px', height: '28px' },
      md: { width: '36px', height: '36px' },
      lg: { width: '40px', height: '40px' },
    },
  },
  defaultVariants: { rotated: false, size: 'md' },
});

export const controlContainer = style([
  sprinkles({ display: 'flex', alignItems: 'center', gap: 'sm', p: 'sm' }),
  {
    background: tokens.semantic.color.background.elevated,
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
]);

export const timelineControlContainer = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    my: 'sm',
  }),
  { position: 'relative', zIndex: tokens.semantic.zIndex.controls },
]);

export const controlButton = style([
  sprinkles({ display: 'flex', placeCenter: 'center' }),
  {
    background: tokens.semantic.color.interactive.primary,
    borderRadius: '50%',
    cursor: 'pointer',
    height: '3em',
    marginLeft: '0.5em',
    width: '3em',
    outline: 0,
    color: '#fff',
  },
]);

export const controlButtonSvg = style({ 
  width: '80%', 
  height: '80%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
