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
    marginBottom: '0.5rem',
    selectors: {
      '&:last-child': { marginBottom: 0 },
      '&:hover': { cursor: 'pointer', borderColor: vars.color.primary },
    },
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    padding: '0.25rem',
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
    width: '1.25rem',
    height: '1.25rem',
    margin: '0 0.25rem 0 0.1rem',
    borderRadius: '50%',
    color: vars.color.cardBg,
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
  fontSize: '1rem',
  fontWeight: 'normal',
  margin: '0.2rem 0',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  alignSelf: 'flex-start',
});

export const description = style({
  fontSize: '0.8rem',
  fontWeight: 'normal',
  margin: 0,
  padding: '0.1rem',
  textAlign: 'left',
  width: '100%',
  color: vars.color.cardSubtitle,
});

export const listItemRecipe = recipe({
  base: [listItem],
  variants: {
    active: { true: [listItemActive], false: {} },
  },
  defaultVariants: { active: false },
});


