import { recipe } from '@vanilla-extract/recipes';
import { tokens } from '../../../styles/tokens/index.css';
import { sprinkles } from '../../../styles/system/sprinkles.css';
import { patterns } from '../../../styles/system/recipes.css';
import { baseStyles } from '../../../styles/system/static.css';

// Main wrapper using new unified system
export const wrapper = recipe({
  base: [
    patterns.card({
      size: 'md',
      elevation: 'high',
      interactive: true,
    }),
    sprinkles({
      display: 'flex',
      flexDirection: 'column',
      gap: 'sm',
    }),
    baseStyles.willChange,
    {
      border: `1px solid ${tokens.semantic.color.border.default}`,
      borderRadius: tokens.semantic.borderRadius.xl,
      isolation: 'isolate',
      visibility: 'visible',
      backgroundColor: tokens.semantic.color.background.elevated,
      transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,

      selectors: {
        '&:hover': {
          transform: 'translateY(-2px) scale(1.01)',
          boxShadow: tokens.semantic.shadow.cardHover,
        },
        '&:active': {
          transform: 'translateY(0px) scale(1)',
          boxShadow: tokens.semantic.shadow.cardActive,
        },
      },

      '@media': {
        '(prefers-reduced-motion: reduce)': {
          selectors: {
            '&:hover': {
              transform: 'none',
            },
            '&:active': {
              transform: 'none',
            },
          },
        },
      },
    },
  ],
  variants: {
    orientation: {
      vertical: sprinkles({ justifyContent: 'flex-start' }),
      horizontal: sprinkles({ justifyContent: 'center' }),
    },
    size: {
      sm: patterns.card({ size: 'sm' }),
      md: patterns.card({ size: 'md' }),
      lg: patterns.card({ size: 'lg' }),
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
});

// Timeline title container using new patterns
export const timelineTitleContainer = recipe({
  base: [
    patterns.text({ variant: 'h2' }),
    sprinkles({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    {
      padding: `${tokens.semantic.spacing.sm} ${tokens.semantic.spacing.md}`,
      borderRadius: tokens.semantic.borderRadius.lg,
      background: `linear-gradient(135deg, ${tokens.semantic.color.background.elevated} 0%, ${tokens.semantic.color.background.elevated}f8 100%)`,
      boxShadow: tokens.semantic.shadow.card,
      backdropFilter: 'blur(12px)',
      border: `1px solid ${tokens.semantic.color.border.default}`,
      transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
      color: tokens.semantic.color.text.primary,
    },
  ],
  variants: {
    mode: {
      vertical: {
        marginBottom: tokens.semantic.spacing.xl,
        alignSelf: 'stretch',
      },
      horizontal: {
        position: 'relative',
        whiteSpace: 'nowrap',
        zIndex: tokens.semantic.zIndex.controls,
        marginBottom: tokens.semantic.spacing.sm,
      },
      horizontal_all: {
        position: 'relative',
        whiteSpace: 'nowrap',
        zIndex: tokens.semantic.zIndex.controls,
        marginBottom: tokens.semantic.spacing.sm,
        display: 'flex',
        visibility: 'visible',
        opacity: 1,
      },
    },
    interactive: {
      true: {
        cursor: 'pointer',
        selectors: {
          '&:hover': {
            boxShadow: tokens.semantic.shadow.cardHover,
            transform: 'translateY(-1px)',
            backgroundColor: `${tokens.semantic.color.interactive.primary}05`,
          },
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    mode: 'horizontal',
    interactive: false,
  },
});

// Export types for TypeScript integration
export type WrapperVariants = Parameters<typeof wrapper>[0];
export type TimelineTitleContainerVariants = Parameters<
  typeof timelineTitleContainer
>[0];
