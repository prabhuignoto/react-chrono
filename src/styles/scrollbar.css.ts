import { globalStyle, style } from '@vanilla-extract/css';

// Opt-in thin scrollbar utility. Apply this class to a scroll container.
export const scrollbarThin = style({});

globalStyle(`${scrollbarThin}`, {
  scrollbarColor: 'currentColor default',
  scrollbarWidth: 'thin',
});

globalStyle(`${scrollbarThin}::-webkit-scrollbar`, { width: '0.3em' });
globalStyle(`${scrollbarThin}::-webkit-scrollbar-track`, {
  boxShadow: 'inset 0 0 6px rgba(0,0,0,0.2)',
});
globalStyle(`${scrollbarThin}::-webkit-scrollbar-thumb`, {
  backgroundColor: 'currentcolor',
  outline: '1px solid currentcolor',
});


