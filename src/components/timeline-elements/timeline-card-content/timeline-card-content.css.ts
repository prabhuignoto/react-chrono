import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { vars } from '../../../styles/tokens.css';
import { reveal, slideFromRight, slideInFromLeft, slideInFromTop } from './card-animations.css.ts';

export const baseCard = style({
  background: vars.color.cardBg,
  borderRadius: '12px',
  boxShadow:
    '0 2px 4px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.06), 0 8px 16px rgba(0,0,0,0.08)',
  backdropFilter: 'blur(10px)',
});

export const itemContentWrapper = style({
  selectors: {
    '&:focus:not(:focus-visible):not(.focus-visible)': {
      outline: 'none',
      boxShadow:
        '0 2px 4px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.06), 0 8px 16px rgba(0,0,0,0.08)',
    },
    '&:focus-visible, &.focus-visible': {
      outline: '3px solid transparent',
      outlineOffset: '4px',
      boxShadow:
        '0 2px 4px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.06), 0 8px 16px rgba(0,0,0,0.08)',
    },
  },
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  lineHeight: 1.5,
  margin: 0,
  position: 'relative',
  padding: '1.5rem',
  overflow: 'hidden',
  width: '100%',
});

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

export const contentDetailsWrapper = style({
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  position: 'relative',
  overflowX: 'hidden',
  transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  width: '100%',
  padding: 0,
  background: vars.color.cardBg,
});

export const showMoreButton = style({
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
  display: 'flex',
  justifySelf: 'flex-end',
  transition: 'all 0.2s ease',
});

export const chevronIconWrapper = style({
  alignItems: 'center',
  display: 'flex',
  height: '1.25em',
  justifyContent: 'center',
  marginLeft: '0.2em',
  marginTop: '0.2em',
  width: '1.25em',
});


