import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/tokens.css';
import { sprinkles } from '../../../styles/sprinkles/sprinkles.css';
import { recipe } from '@vanilla-extract/recipes';

export const list = style([
  sprinkles({ display: 'flex' }),
  {
    flexDirection: 'column',
    justifyContent: 'center',
    listStyle: 'none',
    padding: 0,
    width: '100%',
    maxWidth: '100%',
  },
]);

export const listItem = style([
  sprinkles({ display: 'flex' }),
  {
    flexDirection: 'column',
    margin: 0,
    width: '100%',
    background: vars.color.toolbarBtnBg,
    borderRadius: '4px',
    boxShadow: `0px 1px 1px ${vars.color.shadow}`,
    marginBottom: '0.4rem', // Slightly reduced spacing
    selectors: {
      '&:last-child': { marginBottom: 0 },
      '&:hover': {
        cursor: 'pointer',
        borderColor: vars.color.primary,
        boxShadow: `0px 2px 4px ${vars.color.shadow}`, // Enhanced hover shadow
        transform: 'translateY(-1px)', // Subtle hover lift
      },
    },
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    padding: '0.3rem 0.4rem', // Better padding for compact design
    transition: `all ${vars.transition.duration.fast} ${vars.transition.easing.standard}`,
  },
]);

export const listItemActive = style({ borderColor: vars.color.primary });

export const checkboxWrapper = style([
  sprinkles({ display: 'flex', placeCenter: 'center' }),
  { width: '2rem' },
]);

export const checkbox = style([
  sprinkles({ display: 'flex', placeCenter: 'center' }),
  {
    width: '1.1rem', // Slightly smaller for better proportion
    height: '1.1rem',
    margin: '0 0.3rem 0 0.1rem', // Better spacing
    borderRadius: '50%',
    color: vars.color.cardBg,
    border: `1px solid ${vars.color.buttonBorder}`,
    transition: `all ${vars.transition.duration.fast} ${vars.transition.easing.standard}`,
    selectors: {
      '&:hover': {
        borderColor: vars.color.primary,
      },
    },
  },
]);

export const checkboxSelected = style({
  background: vars.color.primary,
});

export const styleAndDescription = style([
  sprinkles({ display: 'flex' }),
  { flexDirection: 'column' },
]);

export const title = style({
  color: vars.color.primary,
  fontSize: '0.875rem', // Reduced from 1rem
  fontWeight: 500, // Slightly bolder for better hierarchy
  margin: '0.15rem 0', // Reduced margin
  textAlign: 'left',
  whiteSpace: 'nowrap',
  alignSelf: 'flex-start',
  lineHeight: 1.3,
});

export const description = style({
  fontSize: '0.75rem', // Reduced from 0.8rem
  fontWeight: 'normal',
  margin: 0,
  padding: '0.05rem 0', // Reduced padding
  textAlign: 'left',
  width: '100%',
  color: vars.color.cardSubtitle,
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
