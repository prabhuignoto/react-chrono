import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../../styles/tokens.css';

// Base styles
export const baseButton = style({
  appearance: 'none',
  border: 'none',
  margin: 0,
  background: 'none',
  font: 'inherit',
  cursor: 'pointer',
  outline: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  borderRadius: '6px',
  color: vars.color.icon,
  backgroundColor: vars.color.toolbarBtnBg,
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: vars.color.buttonBorder,
  boxShadow: vars.shadow.elevationSm,
  transition: `all ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
  selectors: {
    '&:hover:not(:disabled)': {
      color: vars.color.primary,
      backgroundColor: vars.color.buttonHoverBg,
      borderColor: vars.color.buttonHoverBorder,
      boxShadow: vars.shadow.elevationMd,
      transform: 'translateY(-1px)',
    },
    '&:active:not(:disabled)': {
      transform: 'translateY(0)',
      boxShadow: vars.shadow.elevationSm,
    },
    '&:focus-visible': {
      boxShadow: `${vars.shadow.focusRing}, ${vars.shadow.elevationSm}`,
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
      color: vars.color.icon,
      backgroundColor: vars.color.buttonActiveBg,
      boxShadow: 'none',
      transform: 'none',
    },
  },
  '@media': {
    '(max-width: 480px)': {
      width: '40px',
      height: '40px',
      minWidth: '40px',
      minHeight: '40px',
    },
    '(prefers-contrast: high)': {
      borderWidth: '2px',
      borderColor: 'currentColor',
    },
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

export const sizeVariants = {
  small: style({
    width: '28px',
    height: '28px',
    padding: '6px',
  }),
  medium: style({
    width: '36px',
    height: '36px',
    padding: '8px',
  }),
  large: style({
    width: '40px',
    height: '40px',
    padding: '9px',
  }),
};

globalStyle(`${sizeVariants.small} svg`, { width: '16px', height: '16px', flexShrink: 0 });
globalStyle(`${sizeVariants.medium} svg`, { width: '20px', height: '20px', flexShrink: 0 });
globalStyle(`${sizeVariants.large} svg`, { width: '22px', height: '22px', flexShrink: 0 });

export const fullscreenState = {
  true: style({
    color: vars.color.primary,
    backgroundColor: `${vars.color.primary}11`,
    borderColor: `${vars.color.primary}44`,
  }),
  false: style({}),
};

export const fullscreenButton = recipe({
  base: [baseButton],
  variants: {
    size: sizeVariants,
    isFullscreen: fullscreenState,
  },
  defaultVariants: { size: 'medium', isFullscreen: false },
});

// Secondary recipe name for clearer import site usage without breaking the existing one
export const fullscreenButtonRecipe = fullscreenButton;


