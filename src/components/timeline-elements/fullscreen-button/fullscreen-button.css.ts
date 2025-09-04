import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { tokens } from '../../../styles/tokens/index.css';
import { sprinkles } from '../../../styles/system/sprinkles.css';
import { patterns } from '../../../styles/system/recipes.css';
import { baseStyles } from '../../../styles/system/static.css';

// Base button using new unified system
export const baseButton = style([
  patterns.toolbarButton(),
  baseStyles.willChange,
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  }),
  {
    appearance: 'none',
    margin: 0,
    font: 'inherit',
    cursor: 'pointer',
    outline: 'none',
    borderRadius: tokens.semantic.borderRadius.md,
    color: tokens.semantic.color.text.secondary,
    backgroundColor: tokens.semantic.color.background.elevated,
    border: `1px solid ${tokens.semantic.color.border.default}`,
    boxShadow: tokens.semantic.shadow.card,
    transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,

    selectors: {
      '&:hover:not(:disabled)': {
        background: `${tokens.semantic.color.interactive.primary}08`,
        borderColor: `${tokens.semantic.color.interactive.primary}40`,
        boxShadow: `0 4px 12px -2px ${tokens.semantic.color.interactive.primary}20, 0 2px 6px -1px rgba(0, 0, 0, 0.1)`,
        transform: 'translateY(-2px)',
        color: tokens.semantic.color.interactive.primary,
      },
      '&:active:not(:disabled)': {
        transform: 'translateY(0) scale(0.96)',
        background: `${tokens.semantic.color.interactive.primary}12`,
        borderColor: `${tokens.semantic.color.interactive.primary}60`,
        boxShadow: `inset 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px ${tokens.semantic.color.interactive.primary}30`,
        color: tokens.semantic.color.interactive.primary,
      },
      '&:focus-visible': {
        outline: `2px solid ${tokens.semantic.color.border.interactive}`,
        outlineOffset: '2px',
        boxShadow: tokens.semantic.shadow.cardHover,
      },
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
        color: tokens.semantic.color.text.muted,
        backgroundColor: tokens.semantic.color.background.secondary,
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
  },
]);

export const sizeVariants = {
  small: style({
    width: tokens.component.toolbar.button.size,
    height: tokens.component.toolbar.button.size,
    padding: tokens.semantic.spacing.xs,
  }),
  medium: style({
    width: '36px',
    height: '36px',
    padding: tokens.semantic.spacing.sm,
  }),
  large: style({
    width: '40px',
    height: '40px',
    padding: tokens.semantic.spacing.sm,
  }),
};

globalStyle(`${sizeVariants.small} svg`, {
  width: '16px',
  height: '16px',
  flexShrink: 0,
});
globalStyle(`${sizeVariants.medium} svg`, {
  width: '20px',
  height: '20px',
  flexShrink: 0,
});
globalStyle(`${sizeVariants.large} svg`, {
  width: '22px',
  height: '22px',
  flexShrink: 0,
});

export const fullscreenState = {
  true: style({
    color: tokens.semantic.color.interactive.primary,
    backgroundColor: `${tokens.semantic.color.interactive.primary}15`,
    borderColor: `${tokens.semantic.color.interactive.primary}40`,
  }),
  false: style({}),
};

export const fullscreenButton = recipe({
  base: baseButton,
  variants: {
    size: sizeVariants,
    isFullscreen: fullscreenState,
  },
  defaultVariants: { size: 'medium', isFullscreen: false },
});

// Export types for TypeScript integration
export type FullscreenButtonVariants = Parameters<typeof fullscreenButton>[0];

// Secondary recipe name for clearer import site usage without breaking the existing one
export const fullscreenButtonRecipe = fullscreenButton;
