import { style } from '@vanilla-extract/css';
import { tokens } from '../../../styles/tokens/index.css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../../styles/system/sprinkles.css';

export const titleWrapper = style([
  sprinkles({ px: 'xs', py: 'xs' }),
  {
    borderRadius: '0.2rem',
    fontSize: '1rem',
    fontWeight: 600,
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
