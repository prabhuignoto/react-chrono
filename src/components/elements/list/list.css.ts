import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { tokens } from '../../../styles/tokens/index.css';
import { sprinkles } from '../../../styles/system/sprinkles.css';
import { patterns } from '../../../styles/system/recipes.css';
import { baseStyles } from '../../../styles/system/static.css';

// Base font family with proper CSS custom property fallback for Google Fonts
const baseFontFamily = `var(--timeline-font-family, 'Inter, system-ui, ui-sans-serif, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif')`;

export const list = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 'full',
  }),
  {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    maxWidth: '100%',
    gap: tokens.semantic.spacing.xs,
    // Smoother scrolling for long lists
    scrollBehavior: 'smooth',
  },
]);

export const listItem = style([
  patterns.interactive({ hover: 'lift' }),
  sprinkles({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 'full',
  }),
  {
    margin: 0,
    position: 'relative', // For active state pseudo-element
    background: tokens.semantic.color.background.elevated,
    borderRadius: tokens.semantic.borderRadius.md,
    boxShadow: `0 1px 3px ${tokens.semantic.color.background.overlay}`,
    padding: `${tokens.semantic.spacing.xs} ${tokens.semantic.spacing.sm}`,
    border: `1px solid ${tokens.semantic.color.border.muted}`,
    transition: `all ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
    minHeight: '3rem', // Consistent height for compact look
    gap: tokens.semantic.spacing.xs,

    selectors: {
      '&:hover': {
        cursor: 'pointer',
        borderColor: tokens.semantic.color.border.interactive,
        boxShadow: `0 4px 12px -2px ${tokens.semantic.color.background.overlay}`,
        transform: 'translateY(-2px)',
        backgroundColor: `${tokens.semantic.color.interactive.primary}08`,
      },
      '&:active': {
        transform: 'translateY(0px) scale(0.99)',
        backgroundColor: `${tokens.semantic.color.interactive.primary}12`,
        borderColor: tokens.semantic.color.interactive.primary,
        boxShadow: `0 2px 8px -2px ${tokens.semantic.color.background.overlay}`,
      },
      '&:focus-visible': {
        outline: `2px solid ${tokens.semantic.color.interactive.primary}`,
        outlineOffset: '2px',
      },
    },

    '@media': {
      '(max-width: 768px)': {
        padding: `${tokens.semantic.spacing.xs} ${tokens.semantic.spacing.sm}`,
        minHeight: '2.75rem',
        gap: tokens.semantic.spacing.xxs,
      },
    },
  },
]);

export const listItemActive = style({
  borderColor: tokens.semantic.color.interactive.primary,
  backgroundColor: `${tokens.semantic.color.interactive.primary}15`,
  boxShadow: `0 0 0 1px ${tokens.semantic.color.interactive.primary}30, 0 2px 8px -2px ${tokens.semantic.color.background.overlay}`,

  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '3px',
      backgroundColor: tokens.semantic.color.interactive.primary,
      borderRadius: '0 2px 2px 0',
    },
  },
});

export const checkboxWrapper = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  { width: '2rem' },
]);

export const checkbox = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  {
    width: '1.1rem',
    height: '1.1rem',
    margin: `0 ${tokens.semantic.spacing.xs} 0 ${tokens.semantic.spacing.xs}`,
    borderRadius: tokens.semantic.borderRadius.full,
    color: tokens.semantic.color.background.elevated,
    border: `1px solid ${tokens.semantic.color.border.default}`,
    transition: `all ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
    selectors: {
      '&:hover': {
        borderColor: tokens.semantic.color.interactive.primary,
      },
    },
  },
]);

export const checkboxSelected = style({
  background: tokens.semantic.color.interactive.primary,
});

export const styleAndDescription = style([
  sprinkles({ display: 'flex' }),
  {
    flexDirection: 'column',
    flex: 1,
    minWidth: 0, // Allow flex child to shrink
    gap: tokens.semantic.spacing.xxs,
  },
]);

export const title = style({
  color: tokens.semantic.color.text.primary,
  fontFamily: `var(--timeline-controls-font-family, ${baseFontFamily})`,
  fontSize: `var(--timeline-controls-font-size, 0.875rem)`,
  fontWeight: `var(--timeline-controls-font-weight, 600)`,
  fontStyle: `var(--timeline-controls-font-style, normal)`,
  margin: 0,
  textAlign: 'left',
  lineHeight: 1.4,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  '@media': {
    '(max-width: 768px)': {
      fontSize: '0.8rem',
    },
  },
});

export const description = style({
  fontFamily: `var(--timeline-controls-font-family, ${baseFontFamily})`,
  fontSize: `var(--timeline-controls-font-size, 0.75rem)`,
  fontWeight: `var(--timeline-controls-font-weight, normal)`,
  fontStyle: `var(--timeline-controls-font-style, normal)`,
  margin: 0,
  padding: 0,
  textAlign: 'left',
  width: '100%',
  color: tokens.semantic.color.text.secondary,
  lineHeight: 1.3,
  opacity: 0.85,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  '@media': {
    '(max-width: 768px)': {
      fontSize: '0.7rem',
    },
  },
});

export const listItemRecipe = recipe({
  base: [listItem],
  variants: {
    active: { true: [listItemActive], false: {} },
  },
  defaultVariants: { active: false },
});
