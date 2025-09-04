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
    padding: 0,
    maxWidth: '100%',
    gap: tokens.semantic.spacing.xs,
  },
]);

export const listItem = style([
  patterns.interactive({ hover: 'lift' }),
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    width: 'full',
  }),
  {
    margin: 0,
    background: tokens.semantic.color.background.elevated,
    borderRadius: tokens.semantic.borderRadius.sm,
    boxShadow: tokens.semantic.shadow.card,
    padding: `${tokens.semantic.spacing.xs} ${tokens.semantic.spacing.sm}`, // Reduced vertical padding
    border: `1px solid ${tokens.semantic.color.border.default}`,
    transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,

    selectors: {
      '&:hover': {
        cursor: 'pointer',
        borderColor: tokens.semantic.color.border.interactive,
        boxShadow: tokens.semantic.shadow.cardHover,
        transform: 'translateY(-1px)',
        backgroundColor: `${tokens.semantic.color.interactive.primary}05`,
      },
      '&:active': {
        transform: 'translateY(0px) scale(0.98)',
        backgroundColor: `${tokens.semantic.color.interactive.primary}10`,
        borderColor: tokens.semantic.color.interactive.primary,
      },
    },
  },
]);

export const listItemActive = style({
  borderColor: tokens.semantic.color.interactive.primary,
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
  { flexDirection: 'column' },
]);

export const title = style({
  color: tokens.semantic.color.interactive.primary,
  fontFamily: `var(--timeline-controls-font-family, ${baseFontFamily})`,
  fontSize: `var(--timeline-controls-font-size, 0.875rem)`, // Reduced from 1rem
  fontWeight: `var(--timeline-controls-font-weight, 500)`, // Slightly bolder for better hierarchy
  fontStyle: `var(--timeline-controls-font-style, normal)`,
  margin: '0.15rem 0', // Reduced margin
  textAlign: 'left',
  whiteSpace: 'nowrap',
  alignSelf: 'flex-start',
  lineHeight: 1.3,
});

export const description = style({
  fontFamily: `var(--timeline-controls-font-family, ${baseFontFamily})`,
  fontSize: `var(--timeline-controls-font-size, 0.75rem)`, // Reduced from 0.8rem
  fontWeight: `var(--timeline-controls-font-weight, normal)`,
  fontStyle: `var(--timeline-controls-font-style, normal)`,
  margin: 0,
  padding: '0.05rem 0', // Reduced padding
  textAlign: 'left',
  width: '100%',
  color: tokens.semantic.color.text.secondary,
  lineHeight: 1.2,
  opacity: 0.85, // Slightly reduced opacity for better hierarchy
});

export const listItemRecipe = recipe({
  base: [listItem],
  variants: {
    active: { true: [listItemActive], false: {} },
  },
  defaultVariants: { active: false },
});
