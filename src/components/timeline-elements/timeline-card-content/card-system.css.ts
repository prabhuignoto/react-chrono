import { style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { designTokens } from '../../../styles/design-system.css';
import { animationUtils, transitions } from '../../../styles/animations.css';
import { layoutBase } from '../../../styles/layout.css';

// Base card foundation
const cardBase = style([
  {
    background: `linear-gradient(135deg, ${designTokens.color.card.bg} 0%, ${designTokens.color.card.bg}f5 100%)`,
    borderRadius: designTokens.radius.xl,
    border: `1px solid ${designTokens.color.card.border}`,
    boxShadow: designTokens.elevation.md,
    backdropFilter: 'blur(20px)',
    transition: transitions.normal,
    position: 'relative',
    overflow: 'hidden',
  },
]);

// Card recipe with variants
export const card = recipe({
  base: [cardBase, animationUtils.respectsReducedMotion],

  variants: {
    size: {
      sm: {
        minWidth: '200px',
        padding: designTokens.spacing.sm,
        borderRadius: designTokens.radius.md,
      },
      md: {
        minWidth: '280px',
        padding: designTokens.spacing.md,
      },
      lg: {
        minWidth: '320px',
        padding: designTokens.spacing.lg,
      },
    },

    elevation: {
      flat: { boxShadow: designTokens.elevation.none },
      low: { boxShadow: designTokens.elevation.sm },
      medium: { boxShadow: designTokens.elevation.md },
      high: { boxShadow: designTokens.elevation.lg },
    },

    interactive: {
      true: {
        cursor: 'pointer',
        selectors: {
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: designTokens.elevation.xl,
          },
          '&:active': {
            transform: 'translateY(0px)',
            transition: transitions.fast,
          },
        },
      },
      false: {},
    },

    animation: {
      none: {},
      fadeIn: animationUtils.fadeIn,
      slideLeft: animationUtils.entranceLeft,
      slideRight: animationUtils.entranceRight,
      slideTop: animationUtils.entranceTop,
    },

    bordered: {
      true: {
        '::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          padding: '1px',
          background: `linear-gradient(135deg, ${designTokens.color.primary}20 0%, transparent 50%, ${designTokens.color.primary}10 100%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          pointerEvents: 'none',
        },
      },
      false: {},
    },
  },

  defaultVariants: {
    size: 'md',
    elevation: 'medium',
    interactive: false,
    animation: 'none',
    bordered: false,
  },

  compoundVariants: [
    // Mobile optimizations
    {
      variants: { size: 'lg' },
      style: {
        '@media': {
          '(max-width: 768px)': {
            minWidth: '240px',
          },
          '(max-width: 480px)': {
            minWidth: '200px',
          },
        },
      },
    },
  ],
});

// Card content structure
export const cardContent = recipe({
  base: [
    layoutBase.flexColumn,
    {
      gap: designTokens.spacing.sm,
      width: '100%',
    },
  ],

  variants: {
    spacing: {
      tight: { gap: designTokens.spacing.xs },
      normal: { gap: designTokens.spacing.sm },
      loose: { gap: designTokens.spacing.md },
    },

    alignment: {
      start: { alignItems: 'flex-start' },
      center: { alignItems: 'center' },
      end: { alignItems: 'flex-end' },
    },
  },

  defaultVariants: {
    spacing: 'normal',
    alignment: 'start',
  },
});

// Card header
export const cardHeader = style([
  layoutBase.flexColumn,
  {
    gap: designTokens.spacing.xs,
    marginBottom: designTokens.spacing.sm,
  },
]);

// Card title
export const cardTitle = style({
  fontSize: designTokens.typography.fontSize.lg,
  fontWeight: designTokens.typography.fontWeight.semibold,
  lineHeight: designTokens.typography.lineHeight.tight,
  color: designTokens.color.card.title,
  margin: 0,
});

// Card subtitle
export const cardSubtitle = style({
  fontSize: designTokens.typography.fontSize.sm,
  fontWeight: designTokens.typography.fontWeight.medium,
  lineHeight: designTokens.typography.lineHeight.normal,
  color: designTokens.color.card.subtitle,
  margin: 0,
  opacity: 0.8,
});

// Card body
export const cardBody = style({
  fontSize: designTokens.typography.fontSize.base,
  lineHeight: designTokens.typography.lineHeight.relaxed,
  color: designTokens.color.card.details,
});

// Focus management for interactive cards
globalStyle(`${card.classNames.base}:focus-visible`, {
  outline: `2px solid ${designTokens.color.interactive.focusRing}`,
  outlineOffset: '2px',
});
