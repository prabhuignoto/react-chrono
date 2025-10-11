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
    justifyContent: 'flex-start',
    width: 'full',
  }),
  {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    maxWidth: '100%',
    gap: tokens.semantic.spacing.sm,
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
    boxShadow: `0 1px 2px rgba(0, 0, 0, 0.04)`,
    padding: `${tokens.semantic.spacing.sm} ${tokens.semantic.spacing.md}`,
    border: `1px solid ${tokens.semantic.color.border.muted}`,
    transition: `all ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
    minHeight: '3.5rem', // Slightly taller for better touch targets
    gap: tokens.semantic.spacing.sm,

    selectors: {
      '&:hover': {
        cursor: 'pointer',
        borderColor: tokens.semantic.color.interactive.primary,
        boxShadow: `0 2px 8px -1px rgba(0, 0, 0, 0.08), 0 4px 12px -2px ${tokens.semantic.color.interactive.primary}20`,
        transform: 'translateY(-1px)',
        backgroundColor: `${tokens.semantic.color.interactive.primary}08`,
      },
      '&:active': {
        transform: 'translateY(0px) scale(0.99)',
        backgroundColor: `${tokens.semantic.color.interactive.primary}10`,
        borderColor: `${tokens.semantic.color.interactive.primary}60`,
        boxShadow: `0 1px 4px -1px rgba(0, 0, 0, 0.1)`,
      },
      '&:focus-visible': {
        outline: `2px solid ${tokens.semantic.color.interactive.primary}`,
        outlineOffset: '2px',
      },
    },

    '@media': {
      '(max-width: 768px)': {
        padding: `${tokens.semantic.spacing.sm} ${tokens.semantic.spacing.md}`,
        minHeight: '3.25rem',
        gap: tokens.semantic.spacing.sm,
      },
      '(prefers-reduced-motion: reduce)': {
        transition: 'background 0.1s ease-in-out, border-color 0.1s ease-in-out',
        transform: 'none',
      },
    },
  },
]);

export const listItemActive = style({
  borderColor: tokens.semantic.color.interactive.primary,
  backgroundColor: `${tokens.semantic.color.interactive.primary}12`,
  boxShadow: `0 0 0 1px ${tokens.semantic.color.interactive.primary}40, 0 2px 6px -1px ${tokens.semantic.color.interactive.primary}15`,
  fontWeight: tokens.semantic.typography.fontWeight.semibold,

  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      left: '-1px',
      top: '-1px',
      bottom: '-1px',
      width: '4px',
      backgroundColor: tokens.semantic.color.interactive.primary,
      borderRadius: `${tokens.semantic.borderRadius.md} 0 0 ${tokens.semantic.borderRadius.md}`,
      boxShadow: `2px 0 4px -1px ${tokens.semantic.color.interactive.primary}30`,
    },
    '&:hover': {
      backgroundColor: `${tokens.semantic.color.interactive.primary}15`,
      borderColor: tokens.semantic.color.interactive.primary,
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
    width: '1.25rem',
    height: '1.25rem',
    margin: `0 ${tokens.semantic.spacing.xs} 0 0`,
    borderRadius: tokens.semantic.borderRadius.sm,
    color: tokens.semantic.color.background.elevated,
    border: `2px solid ${tokens.semantic.color.border.default}`,
    transition: `all ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
    backgroundColor: 'transparent',
    selectors: {
      '&:hover': {
        borderColor: tokens.semantic.color.interactive.primary,
        backgroundColor: `${tokens.semantic.color.interactive.primary}08`,
      },
    },
    '@media': {
      '(prefers-reduced-motion: reduce)': {
        transition: 'background 0.1s ease-in-out, border-color 0.1s ease-in-out',
      },
    },
  },
]);

export const checkboxSelected = style({
  background: tokens.semantic.color.interactive.primary,
  borderColor: tokens.semantic.color.interactive.primary,
  boxShadow: `0 0 0 2px ${tokens.semantic.color.interactive.primary}20`,
  selectors: {
    '&:hover': {
      background: `${tokens.semantic.color.interactive.primary}dd`,
      borderColor: `${tokens.semantic.color.interactive.primary}dd`,
    },
  },
});

export const styleAndDescription = style([
  sprinkles({ display: 'flex' }),
  {
    flexDirection: 'column',
    flex: 1,
    minWidth: 0, // Allow flex child to shrink
    gap: '0.25rem',
    justifyContent: 'center',
  },
]);

export const title = style({
  color: tokens.semantic.color.text.primary,
  fontFamily: `var(--timeline-controls-font-family, ${baseFontFamily})`,
  fontSize: `var(--timeline-controls-font-size, 0.9375rem)`,
  fontWeight: `var(--timeline-controls-font-weight, ${tokens.semantic.typography.fontWeight.semibold})`,
  fontStyle: `var(--timeline-controls-font-style, normal)`,
  margin: 0,
  textAlign: 'left',
  lineHeight: 1.5,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  letterSpacing: '-0.01em',

  '@media': {
    '(max-width: 768px)': {
      fontSize: '0.875rem',
    },
  },
});

export const description = style({
  fontFamily: `var(--timeline-controls-font-family, ${baseFontFamily})`,
  fontSize: `var(--timeline-controls-font-size, 0.8125rem)`,
  fontWeight: `var(--timeline-controls-font-weight, ${tokens.semantic.typography.fontWeight.normal})`,
  fontStyle: `var(--timeline-controls-font-style, normal)`,
  margin: 0,
  padding: 0,
  textAlign: 'left',
  width: '100%',
  color: tokens.semantic.color.text.secondary,
  lineHeight: 1.4,
  opacity: 0.9,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  '@media': {
    '(max-width: 768px)': {
      fontSize: '0.75rem',
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
