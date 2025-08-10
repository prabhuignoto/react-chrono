import { globalStyle, style } from '@vanilla-extract/css';

export const wrapper = style({
  alignItems: 'center',
  border: '1px solid transparent',
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
  height: '100%',
});

globalStyle(`${wrapper}.vertical`, {
  justifyContent: 'flex-start',
});

export const timelineTitleContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

globalStyle(`${timelineTitleContainer}.vertical`, { marginBottom: '1em' });

globalStyle(`${timelineTitleContainer}.horizontal`, {
  position: 'absolute',
  top: '-2rem',
  left: '50%',
  transform: 'translateX(-50%)',
  whiteSpace: 'nowrap',
  zIndex: 3,
});

globalStyle(`${timelineTitleContainer}.horizontal_all`, {
  position: 'absolute',
  top: '-2rem',
  left: '50%',
  transform: 'translateX(-50%)',
  whiteSpace: 'nowrap',
  zIndex: 3,
});


