import { style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { tokens } from '../../../styles/tokens/index.css';
import { animationUtils, transitions } from '../../../styles/animations.css';
import { layoutBase } from '../../../styles/layout.css';

// Base card foundation
const cardBase = style([
  {
    background: tokens.semantic.card.background.gradient || `linear-gradient(135deg, ${tokens.semantic.color.card.bg} 0%, ${tokens.semantic.color.card.bg}f5 100%)`,
    borderRadius: tokens.semantic.borderRadius.xl,
    border: `1px solid ${tokens.semantic.color.card.border}`,
    boxShadow: tokens.semantic.shadow.card,
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
        padding: tokens.semantic.spacing.sm,
        borderRadius: tokens.semantic.borderRadius.md,
      },
      md: {
        minWidth: '280px',
        padding: tokens.semantic.spacing.md,
      },
      lg: {
        minWidth: '320px',
        padding: tokens.semantic.spacing.lg,
      },
    },

    elevation: {
      flat: { boxShadow: tokens.semantic.shadow.none || 'none' },
      low: { boxShadow: tokens.semantic.shadow.card },
      medium: { boxShadow: tokens.semantic.shadow.card },
      high: { boxShadow: tokens.semantic.shadow.cardHover },
    },

    interactive: {
      true: {
        cursor: 'pointer',
        selectors: {
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: tokens.semantic.shadow.cardHover,
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
          background: tokens.semantic.card.border.gradient || `linear-gradient(135deg, ${tokens.semantic.color.interactive.primary}20 0%, transparent 50%, ${tokens.semantic.color.interactive.primary}10 100%)`,
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
      gap: tokens.semantic.spacing.sm,
      width: '100%',
    },
  ],

  variants: {
    spacing: {
      tight: { gap: tokens.semantic.spacing.xs },
      normal: { gap: tokens.semantic.spacing.sm },
      loose: { gap: tokens.semantic.spacing.md },
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
    gap: tokens.semantic.spacing.xs,
    marginBottom: tokens.semantic.spacing.sm,
  },
]);

// Card title
export const cardTitle = style({
  fontSize: tokens.semantic.typography.fontSize.lg,
  fontWeight: tokens.semantic.typography.fontWeight.semibold,
  lineHeight: tokens.semantic.typography.lineHeight.tight,
  color: tokens.semantic.color.card.title || tokens.semantic.color.text.primary,
  margin: 0,
});

// Card subtitle
export const cardSubtitle = style({
  fontSize: tokens.semantic.typography.fontSize.sm,
  fontWeight: tokens.semantic.typography.fontWeight.medium,
  lineHeight: tokens.semantic.typography.lineHeight.normal,
  color: tokens.semantic.color.card.subtitle || tokens.semantic.color.text.secondary,
  margin: 0,
  opacity: 0.8,
});

// Card body
export const cardBody = style({
  fontSize: tokens.semantic.typography.fontSize.body,
  lineHeight: tokens.semantic.typography.lineHeight.relaxed,
  color: tokens.semantic.color.card.details || tokens.semantic.color.text.primary,
});

// Focus management for interactive cards
globalStyle(`${card.classNames.base}:focus-visible`, {
  outline: `2px solid ${tokens.semantic.color.interactive.focusRing || tokens.semantic.color.interactive.primary}`,
  outlineOffset: '2px',
});
