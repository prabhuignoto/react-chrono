import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/tokens.css';

export const buttonWrapper = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  borderRadius: '9999px',
  border: `1px solid ${vars.color.muted}`,
  padding: '4px 8px',
  userSelect: 'none',
});

export const toggleSwitch = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.text,
});


