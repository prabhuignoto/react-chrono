import { style } from '@vanilla-extract/css';
import { tokens } from '../../../styles/tokens/index.css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../../styles/system/sprinkles.css';

// Base font family with proper CSS custom property fallback for Google Fonts
const baseFontFamily = `var(--timeline-font-family, 'Inter, system-ui, ui-sans-serif, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif')`;

export const titleWrapper = style([
  sprinkles({ px: 'xs', py: 'xs' }),
  {
    borderRadius: '0.2rem',
    fontFamily: `var(--timeline-title-font-family, ${baseFontFamily})`,
    fontSize: `var(--timeline-title-font-size, 1rem)`,
    fontWeight: `var(--timeline-title-font-weight, 600)`,
    fontStyle: `var(--timeline-title-font-style, normal)`,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    minWidth: 0,
    maxWidth: '100%',
    color: tokens.semantic.color.text.primary,
  },
]);

export const titleActive = style({
  background: tokens.semantic.color.background.secondary,
  color: tokens.semantic.color.interactive.primary,
});

export const titleRecipe = recipe({
  base: [titleWrapper],
  variants: {
    active: {
      true: [titleActive],
      false: {},
    },
  },
  defaultVariants: { active: false },
});
