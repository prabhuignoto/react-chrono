import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/tokens.css';

export const button = style({
  alignItems: 'center',
  background: vars.color.primary,
  borderRadius: '50%',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  height: '1.5rem',
  justifyContent: 'center',
  padding: 0,
  width: '1.5rem',
  margin: '0 0.25rem',
  color: '#fff',
});

export const buttonIcon = style({ width: '70%', height: '70%' });


