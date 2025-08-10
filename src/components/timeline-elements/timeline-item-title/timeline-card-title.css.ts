import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/tokens.css';

export const titleWrapper = style({
  borderRadius: '0.2rem',
  fontSize: '1rem',
  fontWeight: 600,
  overflow: 'hidden',
  padding: '0.25rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  minWidth: 0,
  maxWidth: '100%',
  color: vars.color.cardTitle,
});

export const titleActive = style({
  background: vars.color.muted,
  color: vars.color.primary,
});


