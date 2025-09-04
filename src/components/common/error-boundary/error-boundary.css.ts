import { style } from '@vanilla-extract/css';
import { tokens } from '../../../styles/tokens/index.css';

export const errorBoundaryContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  minHeight: '200px',
  backgroundColor: tokens.semantic.color.background.primary,
  border: `1px solid ${tokens.semantic.color.border.default}`,
  borderRadius: '8px',
  margin: '1rem',
});

export const errorTitle = style({
  fontSize: '1.5rem',
  fontWeight: 600,
  color: tokens.semantic.color.text.primary,
  marginBottom: '1rem',
});

export const errorMessage = style({
  fontSize: '1rem',
  color: tokens.semantic.color.text.secondary,
  textAlign: 'center',
  marginBottom: '1.5rem',
  maxWidth: '500px',
});

export const retryButton = style({
  padding: '0.5rem 1.5rem',
  fontSize: '1rem',
  fontWeight: 500,
  color: '#ffffff',
  backgroundColor: tokens.semantic.color.interactive.primary,
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
  ':hover': {
    backgroundColor: tokens.semantic.color.interactive.primaryHover,
    transform: 'translateY(-1px)',
    boxShadow: tokens.semantic.shadow.cardHover,
  },
  ':active': {
    transform: 'translateY(0)',
  },
});
