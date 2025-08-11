import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/tokens.css';
import { sprinkles } from '../../../styles/sprinkles/sprinkles.css';
import { recipe } from '@vanilla-extract/recipes';

export const button = style([
  sprinkles({ display: 'flex', placeCenter: 'center', mx: 'xs' }),
  {
    background: vars.color.primary,
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    height: '1.5rem',
    padding: 0,
    width: '1.5rem',
    // Preserve vertical margins from previous shorthand (0 0.25rem)
    marginBlock: 0,
    color: '#fff',
  },
]);

export const buttonIcon = style({ width: '70%', height: '70%' });

// Optional recipe for size variants without breaking existing exports
export const buttonRecipe = recipe({
  base: [button],
  variants: {
    size: {
      sm: { width: '1.25rem', height: '1.25rem' },
      md: { width: '1.5rem', height: '1.5rem' },
      lg: { width: '1.75rem', height: '1.75rem' },
    },
  },
  defaultVariants: { size: 'md' },
});


