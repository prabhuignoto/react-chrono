import { globalStyle, style } from '@vanilla-extract/css';
import { visuallyHidden } from '../../../styles/a11y.css';
import { vars } from '../../../styles/tokens.css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../../styles/sprinkles/sprinkles.css';

export const srOnly = visuallyHidden;

export const navWrapper = style([
  sprinkles({ display: 'flex', alignItems: 'center', p: 'xs' }),
  {
    borderRadius: '8px',
    listStyle: 'none',
    background: vars.color.toolbarBg,
    position: 'relative',
    zIndex: vars.zIndex.controls,
  },
]);

export const navItem = style([
  sprinkles({ display: 'flex', alignItems: 'center', justifyContent: 'center' }),
  { padding: 0 },
]);

export const navItemDisabled = style({
  pointerEvents: 'none',
  filter: 'opacity(0.4)',
});

export const navButton = style({
  alignItems: 'center',
  background: vars.color.toolbarBtnBg,
  borderRadius: '6px',
  border: `1px solid ${vars.color.buttonBorder}`,
  color: vars.color.toolbarText,
  cursor: 'pointer',
  display: 'flex',
  height: '36px',
  justifyContent: 'center',
  alignSelf: 'center',
  margin: '0 0.25rem',
  padding: 0,
  transition: `background-color ${vars.transition.duration.normal} ${vars.transition.easing.standard}, transform ${vars.transition.duration.fast} ${vars.transition.easing.standard}, box-shadow ${vars.transition.duration.normal} ${vars.transition.easing.standard}, border-color ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
  width: '36px',
  boxShadow: vars.shadow.elevationSm,
});

export const navButtonRotate = style({ transform: 'rotate(90deg)' });

export const navButtonHover = style({});
globalStyle(`${navButton}:hover`, {
  background: vars.color.buttonHoverBg,
  borderColor: vars.color.buttonHoverBorder,
  boxShadow: vars.shadow.elevationMd,
  transform: 'translateY(-1px)',
});

export const navButtonActive = style({});
globalStyle(`${navButton}:active`, {
  transform: 'scale(0.95)',
  background: vars.color.toolbarBtnBg,
  boxShadow: vars.shadow.insetSm,
});

export const navButtonFocus = style({});
globalStyle(`${navButton}:focus`, { outline: `2px solid ${vars.color.primary}`, outlineOffset: '2px' });
globalStyle(`${navButton}:focus:not(:focus-visible)`, { outline: 'none' });

export const navButtonSvg = style({ width: '20px', height: '20px', color: vars.color.icon });

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
    background: vars.color.cardBg,
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
]);

export const timelineControlContainer = style([
  sprinkles({ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 'sm' }),
  { position: 'relative', zIndex: vars.zIndex.controls },
]);

export const controlButton = style([
  sprinkles({ display: 'flex', placeCenter: 'center' }),
  {
    background: vars.color.primary,
    borderRadius: '50%',
    cursor: 'pointer',
    height: '3em',
    marginLeft: '0.5em',
    width: '3em',
    outline: 0,
    color: '#fff',
  },
]);

export const controlButtonSvg = style({ width: '80%', height: '80%' });

