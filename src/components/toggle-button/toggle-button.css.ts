import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { tokens } from '../../styles/tokens/index.css';
import { sprinkles } from '../../styles/system/sprinkles.css';
import { patterns } from '../../styles/system/recipes.css';

export const buttonWrapper = recipe({
  base: [
    patterns.button({ variant: 'ghost', size: 'md' }),
    sprinkles({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'sm',
    }),
    {
      cursor: 'pointer',
      borderRadius: tokens.semantic.borderRadius.full,
      border: `1px solid ${tokens.semantic.color.border.default}`,
      userSelect: 'none',
      backgroundColor: tokens.semantic.color.background.elevated,
      transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,

      selectors: {
        '&:hover': {
          backgroundColor: tokens.semantic.color.interactive.muted,
          borderColor: tokens.semantic.color.border.interactive,
          transform: 'scale(1.05)',
        },
        '&:active': {
          transform: 'scale(0.95)',
        },
      },
    },
  ],
  variants: {
    active: {
      true: {
        backgroundColor: tokens.semantic.color.interactive.primary,
        color: tokens.semantic.color.background.primary,
        borderColor: tokens.semantic.color.interactive.primary,
      },
      false: {},
    },
    size: {
      sm: {
        padding: tokens.semantic.spacing.xs,
      },
      md: {
        padding: tokens.semantic.spacing.sm,
      },
      lg: {
        padding: tokens.semantic.spacing.md,
      },
    },
  },
  defaultVariants: {
    active: false,
    size: 'md',
  },
});

export const toggleSwitch = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  {
    color: tokens.semantic.color.text.primary,
    transition: `color ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
  },
]);

// Export types for TypeScript integration
export type ButtonWrapperVariants = Parameters<typeof buttonWrapper>[0];
