import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { vars } from '../../../styles/tokens.css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../../styles/sprinkles/sprinkles.css';
import { reveal, slideFromRight, slideInFromLeft, slideInFromTop } from './card-animations.css';

export const baseCard = style({
  background: vars.color.cardBg,
  borderRadius: '12px',
  border: `1px solid ${vars.color.buttonBorder}`,
  boxShadow: vars.shadow.elevationLg,
  backdropFilter: 'blur(10px)',
  transition: `transform ${vars.transition.duration.normal} ${vars.transition.easing.standard}, box-shadow ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
});

export const itemContentWrapper = style([
  sprinkles({ display: 'flex' }),
  {
    selectors: {
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: vars.shadow.elevationLg,
      },
      '&:focus:not(:focus-visible):not(.focus-visible)': {
        outline: 'none',
        boxShadow: vars.shadow.elevationLg,
      },
      '&:focus-visible, &.focus-visible': {
        outline: '3px solid transparent',
        outlineOffset: '4px',
        boxShadow: vars.shadow.elevationLg,
      },
    },
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    lineHeight: 1.5,
    margin: 0,
    position: 'relative',
    padding: '1.5rem',
    overflow: 'hidden',
    width: '100%',
  },
]);

export const timelineCardHeader = style({
  width: '100%',
  padding: 0,
  marginBottom: '1rem',
});

export const cardTitleBase = style({
  margin: 0,
  width: '100%',
  textAlign: 'left',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  lineHeight: 1.3,
});

export const cardTitle = style([
  cardTitleBase,
  {
    color: vars.color.cardTitle,
    fontSize: '1.25rem',
    marginBottom: '0.75rem',
  },
]);

export const cardTitleActive = style({ color: vars.color.primary });

// Optional recipe to compose title state without changing existing exports
export const cardTitleRecipe = recipe({
  base: [
    cardTitleBase,
    {
      color: vars.color.cardTitle,
      fontSize: '1.25rem',
      marginBottom: '0.75rem',
    },
  ],
  variants: {
    active: {
      true: { color: vars.color.primary },
      false: {},
    },
  },
  defaultVariants: { active: false },
});

export const cardSubTitle = style([
  cardTitleBase,
  {
    color: vars.color.cardSubtitle,
    fontWeight: 500,
    letterSpacing: '-0.01em',
    lineHeight: 1.4,
    opacity: 0.9,
    fontSize: '0.95rem',
  },
]);

export const timelineContentDetails = style({
  fontSize: '0.95rem',
  fontWeight: 400,
  margin: 0,
  width: '100%',
  color: vars.color.cardDetails,
  lineHeight: 1.6,
  selectors: { '& + &': { marginTop: '0.75rem' } },
});

export const timelineSubContent = style({
  marginBottom: '0.75rem',
  display: 'block',
  fontSize: '0.875rem',
  color: vars.color.cardDetails,
  lineHeight: 1.5,
  opacity: 0.85,
});

export const contentDetailsWrapper = style([
  sprinkles({ display: 'flex', width: '100%' }),
  {
    alignItems: 'flex-start',
    flexDirection: 'column',
    margin: 0,
    position: 'relative',
    overflowX: 'hidden',
    transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    padding: 0,
    background: vars.color.cardBg,
  },
]);

export const showMoreButton = style([
  sprinkles({ display: 'flex' }),
  {
    background: 'none',
    border: 'none',
    padding: 0,
    margin: '1rem 0.5rem 0.5rem auto',
    color: vars.color.primary,
    fontSize: '0.875rem',
    fontWeight: 500,
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
    cursor: 'pointer',
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
    transition: 'all 0.2s ease',
  },
]);

export const chevronIconWrapper = style([
  sprinkles({ display: 'flex', alignItems: 'center', justifyContent: 'center' }),
  {
    height: '1.25em',
    marginLeft: '0.2em',
    marginTop: '0.2em',
    width: '1.25em',
  },
]);


