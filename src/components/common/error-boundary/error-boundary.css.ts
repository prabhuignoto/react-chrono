import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/tokens.css';

export const errorBoundaryContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  minHeight: '200px',
  backgroundColor: vars.color.background,
  border: `1px solid ${vars.color.buttonBorder}`,
  borderRadius: '8px',
  margin: '1rem',
});

export const errorTitle = style({
  fontSize: '1.5rem',
  fontWeight: 600,
  color: vars.color.text,
  marginBottom: '1rem',
});

export const errorMessage = style({
  fontSize: '1rem',
  color: vars.color.muted,
  textAlign: 'center',
  marginBottom: '1.5rem',
  maxWidth: '500px',
});

export const retryButton = style({
  padding: '0.5rem 1.5rem',
  fontSize: '1rem',
  fontWeight: 500,
  color: '#ffffff',
  backgroundColor: vars.color.primary,
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: `all ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
  ':hover': {
    backgroundColor: vars.color.buttonHoverBg,
    transform: 'translateY(-1px)',
    boxShadow: vars.shadow.elevationMd,
  },
  ':active': {
    transform: 'translateY(0)',
  },
});