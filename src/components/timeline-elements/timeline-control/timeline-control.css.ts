import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../../styles/tokens.css';

export const srOnly = style({
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
});

export const navWrapper = style({
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  listStyle: 'none',
  padding: '0.25rem',
  background: vars.color.toolbarBg,
  position: 'relative',
  zIndex: vars.zIndex.controls,
});

export const navItem = style({
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const navItemDisabled = style({
  pointerEvents: 'none',
  filter: 'opacity(0.4)',
});

export const navButton = style({
  alignItems: 'center',
  background: vars.color.toolbarBtnBg,
  borderRadius: '6px',
  border: `1px solid ${vars.color.buttonBorder}`,
  color: vars.color.toolbarText,
  cursor: 'pointer',
  display: 'flex',
  height: '36px',
  justifyContent: 'center',
  alignSelf: 'center',
  margin: '0 0.25rem',
  padding: 0,
  transition:
    'background-color 0.2s ease-out, transform 0.15s ease-out, box-shadow 0.2s ease-out, border-color 0.2s ease-out',
  width: '36px',
  boxShadow: `0 1px 1px ${vars.color.shadow}`,
});

export const navButtonRotate = style({ transform: 'rotate(90deg)' });

export const navButtonHover = style({});
globalStyle(`${navButton}:hover`, {
  background: vars.color.buttonHoverBg,
  borderColor: vars.color.buttonHoverBorder,
  boxShadow: `0 2px 4px ${vars.color.shadow}`,
  transform: 'translateY(-1px)',
});

export const navButtonActive = style({});
globalStyle(`${navButton}:active`, {
  transform: 'scale(0.95)',
  background: vars.color.toolbarBtnBg,
  boxShadow: `inset 0 1px 1px ${vars.color.shadow}`,
});

export const navButtonFocus = style({});
globalStyle(`${navButton}:focus`, { outline: `2px solid ${vars.color.primary}`, outlineOffset: '2px' });
globalStyle(`${navButton}:focus:not(:focus-visible)`, { outline: 'none' });

export const navButtonSvg = style({ width: '20px', height: '20px', color: vars.color.icon });

export const controlContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem',
  background: vars.color.cardBg,
  borderRadius: '4px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
});

export const timelineControlContainer = style({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  margin: '0.5rem 0',
  position: 'relative',
  zIndex: vars.zIndex.controls,
});

export const controlButton = style({
  alignItems: 'center',
  background: vars.color.primary,
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'flex',
  height: '3em',
  justifyContent: 'center',
  marginLeft: '0.5em',
  width: '3em',
  outline: 0,
  color: '#fff',
});

export const controlButtonSvg = style({ width: '80%', height: '80%' });

