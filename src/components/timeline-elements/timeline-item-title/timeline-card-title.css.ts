import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/tokens.css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../../styles/sprinkles/sprinkles.css';

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
    color: vars.color.cardTitle,
  },
]);

export const titleActive = style({
  background: vars.color.muted,
  color: vars.color.primary,
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
