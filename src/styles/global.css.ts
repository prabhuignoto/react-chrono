import { globalFontFace, globalStyle } from '@vanilla-extract/css';
import { vars } from './tokens.css';
import { lightThemeClass, darkThemeClass } from './themes.css';

globalStyle('*', {
  boxSizing: 'border-box',
});

globalStyle('html, body, #root', {
  margin: 0,
  height: '100%',
});

globalStyle('body', {
  background: vars.color.background,
  color: vars.color.text,
  fontFamily: vars.font.body,
});
// Default to light theme; demo can toggle by switching class on root.
globalStyle(':root', {
  vars: {},
});
globalStyle(`.${lightThemeClass}`, {});
globalStyle(`.${darkThemeClass}`, {});

globalFontFace('Inter', {
  src: 'local(Inter)',
  fontDisplay: 'swap',
});


